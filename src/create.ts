"use strict";

import { v4 as uuid } from "uuid";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyCallback,
  Context,
} from "aws-lambda";
import { docClient } from "./dynamodb";
export async function create(
  event: APIGatewayProxyEvent,
  context: Context,
  callback: APIGatewayProxyCallback
) {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body || "");
  if (typeof data.text !== "string") {
    console.error("Validation Failed");
    callback(null, {
      statusCode: 400,
      headers: { "Content-Type": "text/plain" },
      body: "Couldn't create the todo item. make sure its like {text: 'todo text'}",
    });
    return;
  }
  const params = {
    TableName: process.env.TODOS_TABLE_NAME,
    Item: {
      id: uuid(),
      text: data.text,
      checked: false,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };
  const command = new PutCommand(params);
  try {
    await docClient.send(command);
  } catch (error) {
    console.log(error);
    callback(null, {
      statusCode: error.statusCode || 501,
      headers: { "Content-Type": "text/plain" },
      body: "Couldn't create the todo item.",
    });
    return;
  }
  const response = {
    statusCode: 200,
    body: JSON.stringify(params.Item),
  };
  return response;
}
