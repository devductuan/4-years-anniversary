import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";
import { NextRequest } from "next/server";

const TABLE_NAME = "thuhue-cms";
const SONGS_BLOCK_ID = "block_songs";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function GET() {
  try {
    const { Item } = await client.send(
      new GetItemCommand({
        TableName: TABLE_NAME,
        Key: {
          block_id: { S: SONGS_BLOCK_ID },
        },
      })
    );

    if (!Item?.content) {
      return Response.json({ content: [] }, { status: 200 });
    }

    const raw = Item.content.S;
    const content =
      typeof raw === "string" ? JSON.parse(raw) : raw;

    return Response.json({ content: Array.isArray(content) ? content : [] });
  } catch (error) {
    console.error("DynamoDB GET songs error:", error);
    return Response.json(
      { error: "Failed to fetch songs" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const content = Array.isArray(body) ? body : body?.content ?? body;

    await client.send(
      new PutItemCommand({
        TableName: TABLE_NAME,
        Item: {
          block_id: { S: SONGS_BLOCK_ID },
          content: {
            S: typeof content === "string" ? content : JSON.stringify(content),
          },
        },
      })
    );

    return Response.json({ success: true });
  } catch (error) {
    console.error("DynamoDB POST songs error:", error);
    return Response.json(
      { error: "Failed to save songs" },
      { status: 500 }
    );
  }
}
