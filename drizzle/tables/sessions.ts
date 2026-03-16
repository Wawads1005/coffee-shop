import { pgTable, text, timestamp, index } from "drizzle-orm/pg-core";
import { usersTable } from "@/drizzle/tables/users";

type Session = typeof sessionsTable.$inferSelect;

const sessionsTable = pgTable(
  "sessions",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expiresAt").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt")
      .$onUpdate(() => new Date())
      .notNull(),
    ipAddress: text("ipAddress"),
    userAgent: text("userAgent"),
    userId: text("userId")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    impersonatedBy: text("impersonatedBy"),
  },
  (table) => [index("sessions_userId_idx").on(table.userId)],
);

export type { Session };
export { sessionsTable };
