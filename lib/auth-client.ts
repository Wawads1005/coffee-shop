import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";
import { accessControl, adminRole, userRole } from "@/lib/permissions";
import { getBaseUrl } from "@/lib/utils";

const authClient = createAuthClient({
  baseURL: getBaseUrl(),
  plugins: [
    adminClient({
      ac: accessControl,
      roles: { user: userRole, admin: adminRole },
    }),
  ],
});

export { authClient };
