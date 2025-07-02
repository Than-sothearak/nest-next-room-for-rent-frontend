import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import sharp from "sharp";

const s3Client = new S3Client({
  region: "ap-southeast-1",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

export async function uploadFileToS3(file) {
  try {
    const fileName = `${Date.now()}-${file.name}`;
    const fileType = file.type;

    // Convert file to Buffer
    const fileBuffer = Buffer.isBuffer(file) ? file : Buffer.from(await file.arrayBuffer());

    let uploadBuffer = fileBuffer;
    let contentType = fileType || "application/octet-stream";

    // Only compress/resize if it's an image
    if (fileType.startsWith("image/")) {
      uploadBuffer = await sharp(fileBuffer)
        .resize({ width: 1024 })
        .jpeg({ quality: 80 })
        .toBuffer();

      // Ensure under 500KB
      while (uploadBuffer.length > 500 * 1024) {
        uploadBuffer = await sharp(uploadBuffer)
          .jpeg({ quality: Math.max(10, Math.floor((uploadBuffer.length / 500) * 80)) })
          .toBuffer();
      }
      contentType = "image/jpeg";
      console.log('Image has been coverted under 500KB')
    }

    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      ACL: "public-read",
      Key: fileName,
      Body: uploadBuffer,
      ContentType: contentType,
    };

    await s3Client.send(new PutObjectCommand(params));
    console.log(`File uploaded successfully to S3: uploads/${fileName}`);
    return `https://${process.env.AWS_S3_BUCKET}.s3.ap-southeast-1.amazonaws.com/${fileName}`;
  } catch (error) {
    console.error("S3 Upload Error:", error);
    throw new Error("Failed to upload file to S3");
  }
}

// Helper function to delete file from S3
export async function deleteFileFromS3(file) {
  try {
    console.log(`File deleted successfully from S3: uploads/${file}`);
    
    if (!file) {
      throw new Error("File key is required for deletion");
    }

    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET,
        Key: `${file}`,
      })
    );

  } catch (error) {
    console.error("S3 Delete Error:", error);
    throw new Error("Failed to delete file from S3");
  }
}
