"use client";

import { FileRouter } from "@/app/api/uploadthing/core";
import { generateUploadDropzone } from "@uploadthing/react";

const UploadthingDropzone = generateUploadDropzone<FileRouter>();

export { UploadthingDropzone };
