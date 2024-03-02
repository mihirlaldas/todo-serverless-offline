import { docClient } from "./dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { GetCommand } from "@aws-sdk/lib-dynamodb";

export async function get(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  const id = event.pathParameters?.id;
  if (!id) {
    console.error("Validation Failed");
    return {
      statusCode: 400,
      headers: { "Content-Type": "text/plain" },
      body: "Please give exact id of todo item",
    };
  }
  const command = new GetCommand({
    TableName: process.env.TODOS_TABLE_NAME,
    Key: {
      id,
    },
  });
  const result = await docClient.send(command);
  return {
    statusCode: 200,
    body: JSON.stringify(result.Item),
  };
}
