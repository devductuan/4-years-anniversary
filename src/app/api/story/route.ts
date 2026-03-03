import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function GET() {
  const keyWithFolder = 'thuhue-images/thuhue-story.png';

  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: keyWithFolder,
  });

  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

  return new Response(JSON.stringify({ url: signedUrl }));
}