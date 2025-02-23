import path from "path";
import fs from "fs";

const ensureFolderExists = (folderPath: string) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
};

const SERVER_URL = "https://node.lustloungh.com";

const uploadFile = async (file: any, folderName: string): Promise<string> => {
  try {
    const { createReadStream, filename, mimetype } = await file;

    const uploadsPath = path.join(__dirname, "uploads");
    const folderPath = path.join(uploadsPath, folderName);

    ensureFolderExists(folderPath);

    const filePath = path.join(folderPath, filename);

    const stream = createReadStream();
    const out = fs.createWriteStream(filePath);
    stream.pipe(out);

    await new Promise((resolve, reject) => {
      out.on("finish", resolve);
      out.on("error", reject);
    });

    const fileUrl = `${SERVER_URL}/uploads/${folderName}/${filename}`;
    return fileUrl;
  } catch (err) {
    console.error("Error processing file:", err);
    throw new Error("File upload failed");
  }
};

const MultipleFileUpload = async (profile: any[], folderName: string): Promise<string[]> => {
  const fileUrls = [];

  if (profile && Array.isArray(profile)) {
    for (const file of profile) {
      const fileUrl = await uploadFile(file, folderName);
      fileUrls.push(fileUrl);
    }
  }

  return fileUrls;
};

export default MultipleFileUpload;
