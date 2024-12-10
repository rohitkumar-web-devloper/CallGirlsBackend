import fs from "fs";
import path from "path";

const SERVER_URL = "http://localhost:7575"; 

export const saveFileToServer = async (
  createReadStream: any,
  filename: string,
  folder: string
): Promise<string> => {
  const folderPath = path.join(__dirname, "uploads", folder);

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  const filePath = path.join(folderPath, filename);

  const fileUrl = `${SERVER_URL}/uploads/${folder}/${filename}`;

  return new Promise((resolve, reject) => {
    const stream = createReadStream();
    const writeStream = fs.createWriteStream(filePath);

    stream.pipe(writeStream);

    writeStream.on("finish", () => {
      resolve(fileUrl); 
    });

    writeStream.on("error", (err) => {
      reject(err);
    });
  });
};
