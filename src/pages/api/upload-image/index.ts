import nextConnect from "next-connect";
import multerUpload from "@/utils/uploader/multer";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = nextConnect({
  onError: (res) => {
    return Response.json({ error: res });
  },
});

const uploadMiddleware = multerUpload.single("profilePhoto");

export const config = {
  api: {
    bodyParser: false,
  },
};

export const updateProfile = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  res.status(200).json({ msg: "uploaded success" });
};

handler.use(uploadMiddleware).post(updateProfile);

export default handler;
