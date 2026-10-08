import { db } from './index.ts';
import { users } from './schema.ts';
import { eq } from 'drizzle-orm';

export interface UpsertUserData {
  uid: string;
  email?: string | null;
  name?: string | null;
  phone?: string | null;
  role?: string;
  isAnonymous?: boolean;
  studentClass?: string | null;
}

export async function getOrCreateUser(data: UpsertUserData) {
  try {
    const result = await db.insert(users)
      .values({
        uid: data.uid,
        email: data.email || null,
        name: data.name || null,
        phone: data.phone || null,
        role: data.role || 'student',
        isAnonymous: data.isAnonymous || false,
        studentClass: data.studentClass || null,
      })
      .onConflictDoUpdate({
        target: users.uid,
        set: {
          email: data.email || undefined,
          name: data.name || undefined,
          phone: data.phone || undefined,
          role: data.role || undefined,
          isAnonymous: data.isAnonymous !== undefined ? data.isAnonymous : undefined,
          updatedAt: new Date(),
        },
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error('Database getOrCreateUser query failed:', error);
    throw new Error('Database query failed. Please try again later.', { cause: error });
  }
}

export async function getUserByUid(uid: string) {
  try {
    const records = await db.select().from(users).where(eq(users.uid, uid)).limit(1);
    return records[0] || null;
  } catch (error) {
    console.error('Database getUserByUid query failed:', error);
    throw new Error('Database query failed.', { cause: error });
  }
}
