import connectMongoDB from "./connectMongoDB";

export async function checkFileExists(filename: string): Promise<boolean> {
    const { client } = await connectMongoDB();
    const count = await client
      .db
      .collection("images.files")
      .countDocuments({ filename });
  
    return !!count;
  }