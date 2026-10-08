import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// Users table matching Firebase Auth UIDs
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email'),
  name: text('name'),
  phone: text('phone'),
  role: text('role').default('student').notNull(), // 'student' | 'parent' | 'faculty' | 'admin'
  isAnonymous: boolean('is_anonymous').default(false),
  studentClass: text('student_class'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Demo Class Bookings
export const demoBookings = pgTable('demo_bookings', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  name: text('name').notNull(),
  phone: text('phone').notNull(),
  email: text('email'),
  studentClass: text('student_class').notNull(),
  subject: text('subject').notNull(),
  preferredTime: text('preferred_time'),
  notes: text('notes'),
  status: text('status').default('Pending').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Relationships
export const usersRelations = relations(users, ({ many }) => ({
  demoBookings: many(demoBookings),
}));

export const demoBookingsRelations = relations(demoBookings, ({ one }) => ({
  user: one(users, {
    fields: [demoBookings.userId],
    references: [users.id],
  }),
}));
