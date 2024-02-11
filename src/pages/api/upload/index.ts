/* eslint-disable @typescript-eslint/no-explicit-any */
import multer from "multer";
import streamifier from "streamifier";
import dotenv from "dotenv";
import { NextApiResponse } from "next";
import { cloudinary } from "@/utils/uploader/cloudinary";

dotenv.config();
const storage = multer.memoryStorage();
const upload = multer({ storage });
const uploadMiddleware = upload.single("file");

function runMiddleware(req: any, res: NextApiResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}
export default async function handler(req: any, res: NextApiResponse) {
  await runMiddleware(req, res, uploadMiddleware);
  const stream = await cloudinary.v2.uploader.upload_stream(
    {
      folder: "shope_finder_upload",
    },
    (error, result) => {
      if (error) res.status(500).json(error);
      res.status(200).json(result);
    }
  );
  streamifier.createReadStream(req.file.buffer).pipe(stream);
}
export const config = {
  api: {
    bodyParser: false,
  },
};
