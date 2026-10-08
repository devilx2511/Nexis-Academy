import "dotenv/config";
import express from "express";
import fs from "fs";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { requireAuth, type AuthRequest } from "./src/middleware/auth.ts";
import { getOrCreateUser, getUserByUid } from "./src/db/users.ts";

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // In-memory data store for demo bookings, leads, and users
  const demoBookings: Array<any> = [];
  const contactMessages: Array<any> = [];

  // API Routes
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "Nexis Academy API", seo: "enabled", firebase: "configured", cloudSql: "enabled" });
  });

  // Sync Firebase Auth User with Cloud SQL PostgreSQL
  app.post("/api/auth/sync", requireAuth, async (req: AuthRequest, res) => {
    try {
      const uid = req.user?.uid;
      if (!uid) {
        return res.status(401).json({ error: "Unauthorized: Missing UID" });
      }

      const { role, name, phone, studentClass, isAnonymous } = req.body;
      const email = req.user?.email || req.body.email || null;

      const user = await getOrCreateUser({
        uid,
        email,
        name: name || req.user?.name || (email ? email.split('@')[0] : 'Nexis Student'),
        phone: phone || (req.user as any)?.phone_number || null,
        role: role || 'student',
        isAnonymous: isAnonymous || (req.user as any)?.firebase?.sign_in_provider === 'anonymous',
        studentClass: studentClass || null,
      });

      return res.json({ success: true, user });
    } catch (error: any) {
      console.error("Auth sync error:", error);
      return res.status(500).json({ error: "Failed to sync user with database", details: error.message });
    }
  });

  // Get current logged-in user profile from Cloud SQL
  app.get("/api/user/profile", requireAuth, async (req: AuthRequest, res) => {
    try {
      const uid = req.user?.uid;
      if (!uid) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const user = await getUserByUid(uid);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.json({ success: true, user });
    } catch (error: any) {
      console.error("Fetch profile error:", error);
      return res.status(500).json({ error: "Failed to fetch user profile", details: error.message });
    }
  });

  // Dynamic Server-Side Robots.txt Endpoint
  app.get("/robots.txt", (_req, res) => {
    const siteUrl = process.env.VITE_SITE_URL || "https://nexisacademy.com";
    const robotsTxt = `# Nexis Academy Robots.txt
# Technical SEO: ${siteUrl}

User-agent: *
Allow: /
Allow: /about
Allow: /courses
Allow: /faculty
Allow: /results
Allow: /testimonials
Allow: /faq
Allow: /contact
Allow: /blog
Allow: /privacy
Allow: /terms
Allow: /assets/
Allow: /logo.svg
Allow: /og-image.svg

# Protect Private Portals
Disallow: /portal
Disallow: /admin
Disallow: /devmode
Disallow: /api/

# Canonical Sitemap
Sitemap: ${siteUrl}/sitemap.xml
`;
    res.header("Content-Type", "text/plain");
    res.send(robotsTxt);
  });

  // Dynamic Server-Side XML Sitemap Endpoint
  app.get("/sitemap.xml", (_req, res) => {
    const siteUrl = process.env.VITE_SITE_URL || "https://nexisacademy.com";
    const today = new Date().toISOString().split("T")[0];

    const publicUrls = [
      { loc: `${siteUrl}/`, priority: "1.0", changefreq: "daily" },
      { loc: `${siteUrl}/courses`, priority: "0.9", changefreq: "weekly" },
      { loc: `${siteUrl}/about`, priority: "0.8", changefreq: "monthly" },
      { loc: `${siteUrl}/faculty`, priority: "0.8", changefreq: "monthly" },
      { loc: `${siteUrl}/results`, priority: "0.8", changefreq: "weekly" },
      { loc: `${siteUrl}/testimonials`, priority: "0.7", changefreq: "monthly" },
      { loc: `${siteUrl}/faq`, priority: "0.7", changefreq: "monthly" },
      { loc: `${siteUrl}/contact`, priority: "0.8", changefreq: "monthly" },
      { loc: `${siteUrl}/blog`, priority: "0.8", changefreq: "weekly" },
      { loc: `${siteUrl}/blog/5-habits-master-class-10-maths`, priority: "0.7", changefreq: "monthly" },
      { loc: `${siteUrl}/blog/why-visual-3d-models-accelerate-physics`, priority: "0.7", changefreq: "monthly" },
      { loc: `${siteUrl}/blog/parents-guide-board-exam-support`, priority: "0.7", changefreq: "monthly" },
      { loc: `${siteUrl}/privacy`, priority: "0.5", changefreq: "yearly" },
      { loc: `${siteUrl}/terms`, priority: "0.5", changefreq: "yearly" }
    ];

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${publicUrls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(sitemapXml);
  });

  // Demo Booking endpoint
  app.post("/api/demo-booking", (req, res) => {
    const { name, phone, email, studentClass, subject, preferredTime, notes } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ error: "Name and phone number are required." });
    }

    const booking = {
      id: `DEMO-${Date.now()}`,
      name,
      phone,
      email: email || "N/A",
      studentClass: studentClass || "Class 10",
      subject: subject || "Mathematics & Science",
      preferredTime: preferredTime || "Upcoming Saturday 4 PM",
      notes: notes || "",
      createdAt: new Date().toISOString(),
      status: "Confirmed"
    };

    demoBookings.push(booking);
    console.log("[NEXIS ACADEMY] New Demo Class Booking:", booking);

    return res.json({
      success: true,
      message: "Free Demo Class booked successfully!",
      bookingId: booking.id,
      details: booking
    });
  });

  // Contact / Callback request
  app.post("/api/contact", (req, res) => {
    const { name, phone, email, studentClass, subject, message } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ error: "Name and phone are required." });
    }

    const contact = {
      id: `MSG-${Date.now()}`,
      name,
      phone,
      email,
      studentClass,
      subject,
      message,
      createdAt: new Date().toISOString()
    };

    contactMessages.push(contact);
    console.log("[NEXIS ACADEMY] Contact Form Submission:", contact);

    return res.json({
      success: true,
      message: "Thank you for reaching out! A Nexis Academic Advisor will call you shortly."
    });
  });

  // Auth: Mock JWT login / Role-based profile endpoint
  app.post("/api/auth/login", (req, res) => {
    const { email, role = "student" } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }

    // Generate mock JWT token
    const mockToken = `nexis_jwt_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${Buffer.from(
      JSON.stringify({
        email,
        role,
        name: email.split("@")[0],
        exp: Date.now() + 86400000
      })
    ).toString("base64")}.mock_signature`;

    return res.json({
      success: true,
      token: mockToken,
      user: {
        id: `USR-${Math.floor(1000 + Math.random() * 9000)}`,
        name: email.split("@")[0].toUpperCase(),
        email,
        role,
        avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200`
      }
    });
  });

  // Server-side Gemini AI Doubt Solver & Course Assistant
  app.post("/api/ai/solve-doubt", async (req, res) => {
    const { question, subject = "General Science/Math" } = req.body;
    if (!question) {
      return res.status(400).json({ error: "Question prompt is required." });
    }

    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.json({
          answer: `[Nexis AI Offline Mode] Key concepts for "${question}":\n\n1. Break down the core formula/theorem.\n2. Apply step-by-step logic.\n3. Test with practice questions.\n\n(Note: Connect GEMINI_API_KEY for live real-time AI solutions!)`,
          sources: ["Nexis Academy Curriculum Guide"]
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are Nexis AI, the top-tier tutor at Nexis Academy. Answer the student's question clearly, encouragingly, and step-by-step for ${subject}:\n\nQuestion: "${question}"\n\nKeep response concise, structured with bullet points, formulas in text, and end with a quick check-for-understanding question.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
      });

      return res.json({
        answer: response.text || "No response generated.",
        subject
      });
    } catch (err: any) {
      console.error("[Gemini AI Error]:", err.message);
      return res.status(500).json({ error: "Failed to generate AI response: " + err.message });
    }
  });

  // Determine whether to serve compiled production build or Vite dev middleware
  const distPath = path.resolve(process.cwd(), "dist");
  const distIndexHtml = path.join(distPath, "index.html");
  const isProduction =
    process.env.NODE_ENV === "production" ||
    process.env.npm_lifecycle_event === "start" ||
    process.argv.includes("--prod");

  if (!isProduction || !fs.existsSync(distIndexHtml)) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distPath, { maxAge: "1d", index: false }));
    app.get("*", (_req, res) => {
      res.sendFile(distIndexHtml);
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(
      `Nexis Academy Server (${isProduction ? "production" : "development"}) running on http://0.0.0.0:${PORT}`
    );
  });
}

startServer();
