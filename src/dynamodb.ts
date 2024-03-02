import { DynamoDBClient, DynamoDBClientConfig } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

let options: DynamoDBClientConfig = {};

if (process.env.IS_OFFLINE) {
  options = {
    region: "localhost",
    endpoint: "http://localhost:8000",
    credentials: {
      accessKeyId: "MockAccessKeyId",
      secretAccessKey: "MockSecretAccessKey",
    },
  };
}

const client = new DynamoDBClient(options);
export const docClient = DynamoDBDocumentClient.from(client);
