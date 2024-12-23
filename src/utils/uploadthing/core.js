import { createUploadthing } from "uploadthing";

const f = createUploadthing();

export const ourFileRouter = {
  categoryImage: f({ image: { maxFileSize: "1MB" } }).onUploadComplete(
    async ({ metadata, file }) => {
      console.log("file url", file.url);
      return { uploadedBy: "JB" };
    }
  ),

  studentProfileImage: f({ image: { maxFileSize: "1MB" } }).onUploadComplete(
    async ({ metadata, file }) => {
      console.log("file url", file.url);
      return { uploadedBy: "JB" };
    }
  ),

  fileUploads: f({
    image: { maxFileSize: "1MB", maxFileCount: 4 },
    pdf: { maxFileSize: "1MB", maxFileCount: 4 },
    "application/msword": { maxFileSize: "1MB", maxFileCount: 4 },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
      maxFileSize: "1MB",
      maxFileCount: 4,
    },
    "application/vnd.ms-excel": { maxFileSize: "1MB", maxFileCount: 4 },
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
      maxFileSize: "1MB",
      maxFileCount: 4,
    },
    "application/vnd.ms-powerpoint": { maxFileSize: "1MB", maxFileCount: 4 },
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      {
        maxFileSize: "1MB",
        maxFileCount: 4,
      },
    "text/plain": { maxFileSize: "1MB", maxFileCount: 4 },
    "application/gzip": { maxFileSize: "1MB", maxFileCount: 4 },
    "application/zip": { maxFileSize: "1MB", maxFileCount: 4 },
  }).onUploadComplete(async ({ metadata, file }) => {
    console.log("file url", file.url);
    return { uploadedBy: "JB" };
  }),

  mailAttachments: f({
    image: { maxFileSize: "1MB", maxFileCount: 4 },
    pdf: { maxFileSize: "1MB", maxFileCount: 4 },
    "application/msword": { maxFileSize: "1MB", maxFileCount: 4 },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
      maxFileSize: "1MB",
      maxFileCount: 4,
    },
    "application/vnd.ms-excel": { maxFileSize: "1MB", maxFileCount: 4 },
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
      maxFileSize: "1MB",
      maxFileCount: 4,
    },
    "application/vnd.ms-powerpoint": { maxFileSize: "1MB", maxFileCount: 4 },
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      {
        maxFileSize: "1MB",
        maxFileCount: 4,
      },
    "text/plain": { maxFileSize: "1MB", maxFileCount: 4 },
    "application/gzip": { maxFileSize: "1MB", maxFileCount: 4 },
    "application/zip": { maxFileSize: "1MB", maxFileCount: 4 },
  }).onUploadComplete(async ({ metadata, file }) => {
    console.log("file url", file.url);
    return { uploadedBy: "JB" };
  }),
};

export default ourFileRouter;
