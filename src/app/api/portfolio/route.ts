import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";
import { NextRequest } from "next/server";

const TABLE_NAME = "thuhue-cms";
const PORTFOLIO_BLOCK_ID = "block_portfolio";

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
          block_id: { S: PORTFOLIO_BLOCK_ID },
        },
      })
    );

    if (!Item?.content) {
      return Response.json(
        {
          about: "",
          education: [],
          experience: [],
          volunteering: [],
          certifications: [],
          skills: [],
        },
        { status: 200 }
      );
    }

    const raw = Item.content.S;
    const content =
      typeof raw === "string" ? JSON.parse(raw) : raw;

    return Response.json(content);
  } catch (error) {
    console.error("DynamoDB GET portfolio error:", error);
    const message = error instanceof Error ? error.message : String(error);
    const err = error as Error & { code?: string };
    const details: Record<string, string> = {};
    if (err.name) details.name = err.name;
    if (err.code) details.code = err.code;
    return Response.json(
      {
        error: "Failed to fetch portfolio",
        message,
        ...details,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const content = body?.content ?? body;

    await client.send(
      new PutItemCommand({
        TableName: TABLE_NAME,
        Item: {
          block_id: { S: PORTFOLIO_BLOCK_ID },
          content: {
            S:
              typeof content === "string"
                ? content
                : JSON.stringify(content),
          },
        },
      })
    );

    return Response.json({ success: true });
  } catch (error) {
    console.error("DynamoDB POST portfolio error:", error);
    const message = error instanceof Error ? error.message : String(error);
    const err = error as Error & { code?: string };
    const details: Record<string, string> = {};
    if (err.name) details.name = err.name;
    if (err.code) details.code = err.code;
    return Response.json(
      {
        error: "Failed to save portfolio",
        message,
        ...details,
      },
      { status: 500 }
    );
  }
}
