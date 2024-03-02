import { docClient } from "./dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { UpdateCommand, UpdateCommandInput } from "@aws-sdk/lib-dynamodb";
export async function update(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body || "");
  if (typeof data.text !== "string" || typeof data.checked !== "boolean") {
    console.error("Validation Failed");
    return {
      statusCode: 400,
      headers: { "Content-Type": "text/plain" },
      body: "Couldn't update the item. required keys text and checked",
    };
  }
  const params: UpdateCommandInput = {
    TableName: process.env.TODOS_TABLE_NAME,
    Key: {
      id: event.pathParameters?.id,
    },
    ExpressionAttributeNames: {
      "#todo_text": "text",
    },
    ExpressionAttributeValues: {
      ":text": data.text,
      ":checked": data.checked,
      ":updatedAt": timestamp,
    },
    UpdateExpression:
      "SET #todo_text = :text, checked = :checked, updatedAt = :updatedAt",
    ReturnValues: "ALL_NEW",
  };
  const command = new UpdateCommand(params);

  try {
    const result = await docClient.send(command);
    return {
      statusCode: 201,
      body: JSON.stringify(result.Attributes),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: error.statusCode || 501,
      headers: { "Content-Type": "text/plain" },
      body: "Couldn't update the todo item.",
    };
  }
}

export function getUpdateParams(params: { [key: string]: any }) {
  return {
    UpdateExpression: `set ${Object.entries(params)
      .map((key) => `#${key} = :${key}`)
      .reduce((acc, str) => acc + str)
      .slice(0, -2)}`,

    ExpressionAttributeNames: Object.keys(params).reduce(
      (acc, key) => ({
        ...acc,
        [`#${key}`]: key,
      }),
      {}
    ),
    ExpressionAttributeValues: Object.values(params).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [`#${key}`]: value,
      }),
      {}
    ),
  };
}
