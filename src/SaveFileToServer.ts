import fs from "fs";
import path from "path";

export const saveFileToServer = async (
  createReadStream: any,
  filename: string,
  folder: string
): Promise<string> => {
  const uploadPath = path.join(__dirname, "uploads", folder, filename);

  const folderPath = path.join(__dirname, "uploads", folder);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true }); 
  }
  return new Promise((resolve, reject) => {
    const stream = createReadStream();
    const writeStream = fs.createWriteStream(uploadPath);

    stream.pipe(writeStream);

    writeStream.on("finish", () => resolve(uploadPath)); 

    writeStream.on("error", (err) => reject(err));
  });
};
