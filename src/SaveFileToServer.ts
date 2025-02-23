import fs from "fs";
import path from "path";

const SERVER_URL = "https://node.lustloungh.com";

export const saveFileToServer = async (
  createReadStream: any,
  filename: string,
  folder: string
): Promise<string> => {
  // Ensure the base 'uploads' folder exists
  const uploadsPath = path.join(__dirname, "uploads");
  if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath, { recursive: true });
  }

  // Create the dynamic subfolder inside 'uploads'
  const folderPath = path.join(uploadsPath, folder);
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
