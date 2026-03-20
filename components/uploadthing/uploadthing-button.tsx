"use client";

import { FileRouter } from "@/app/api/uploadthing/core";
import { generateUploadButton } from "@uploadthing/react";

const UploadthingButton = generateUploadButton<FileRouter>();

export { UploadthingButton };
