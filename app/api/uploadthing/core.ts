import {
  createUploadthing,
  FileRouter as UploadThingFileRouter,
} from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { headers as nextHeaders } from "next/headers";
import { auth } from "@/lib/auth";

type FileRouter = typeof fileRouter;

const uploadThing = createUploadthing();

const fileRouter = {
  imageUploader: uploadThing({
    image: {
      maxFileSize: "1024MB",
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const headers = await nextHeaders();
      const session = await auth.api.getSession({ headers });

      if (!session) {
        throw new UploadThingError("Unauthorized");
      }

      return session;
    })
    .onUploadComplete(async ({}) => {
      return {};
    }),
} satisfies UploadThingFileRouter;

export type { FileRouter };
export { fileRouter };
