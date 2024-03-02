import { docClient } from "./dynamodb";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyCallback,
  Context,
} from "aws-lambda";

export async function list(
  event: APIGatewayProxyEvent,
  context: Context,
  callback: APIGatewayProxyCallback
) {
  const params = {
    TableName: process.env.TODOS_TABLE_NAME,
  };
  const command = new ScanCommand(params);
  try {
    const result = await docClient.send(command);
    return {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
  } catch (error) {
    callback(null, {
      statusCode: error.statusCode || 501,
      headers: { "Content-Type": "text/plain" },
      body: "Couldn't read the todo item.",
    });
    return;
  }
}
