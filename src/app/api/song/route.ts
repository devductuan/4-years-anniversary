import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextRequest } from "next/server";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const key = searchParams.get("key") ?? "";
  const keyWithFolder = `${process.env.S3_BUCKET_FOLDER}/${key}`;

  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: keyWithFolder,
  });

  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

  return new Response(JSON.stringify({ url: signedUrl }));
}