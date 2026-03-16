import {
  defaultStatements,
  defaultRoles,
} from "better-auth/plugins/admin/access";
import { createAccessControl } from "better-auth/plugins/access";

const statements = {
  products: ["create", "read", "update", "delete"],
  categories: ["create", "read", "update", "delete"],
  ...defaultStatements,
} as const;

const accessControl = createAccessControl(statements);

const userRole = accessControl.newRole({
  products: ["read"],
  categories: ["read"],
  ...defaultRoles.user.statements,
});

const adminRole = accessControl.newRole({
  products: ["create", "read", "update", "delete"],
  categories: ["create", "read", "update", "delete"],
  ...defaultRoles.admin.statements,
});

export { accessControl, userRole, adminRole, statements };
