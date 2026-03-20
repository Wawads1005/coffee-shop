import { createRouteHandler } from "uploadthing/next";
import { fileRouter } from "@/app/api/uploadthing/core";

const handler = createRouteHandler({
  router: fileRouter,
});
const { GET, POST } = handler;

export { GET, POST };
