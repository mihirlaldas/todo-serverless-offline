<!--
title: 'AWS TypeScript Example'
description: 'This template demonstrates how to deploy a TypeScript function running on AWS Lambda using Serverless Framework.'
layout: Doc
framework: v3
platform: AWS
language: nodeJS
priority: 1
authorLink: 'https://github.com/serverless'
authorName: 'Serverless, inc.'
authorAvatar: 'https://avatars1.githubusercontent.com/u/13742415?s=200&v=4'
-->

## Watch api demo

[![Demo serverless offline crud api](https://i9.ytimg.com/vi_webp/bKeYJk3UA2g/mq2.webp?sqp=CLD3iq8G-oaymwEmCMACELQB8quKqQMa8AEB-AGGCIAC0AWKAgwIABABGBMgTCh_MA8=&rs=AOn4CLD0QV7-Ap130ryyLCwnyl-5pRs_Ig)](https://www.youtube.com/watch?v=bKeYJk3UA2g)

## Setup

```bash
npm install
docker-compose up -d (to run dynamoDB in local docker desktop)
npm run db:migrate (imports schema)
npm start (starts docker and serverless offline )
```

## endpoints

| POST | http://localhost:3000/todos │
│ GET | http://localhost:3000/todos │
│ GET | http://localhost:3000/todos/{id} │
│ PUT | http://localhost:3000/todos/{id} │

# Serverless Framework AWS TypeScript Example

This template demonstrates how to deploy a TypeScript function running on AWS Lambda using Serverless Framework. The deployed function does not include any event definitions as well as any kind of persistence (database). For more advanced configurations check out the [examples repo](https://github.com/serverless/examples/) which includes integrations with SQS, DynamoDB or examples of functions that are triggered in `cron`-like manner. For details about configuration of specific `events`, please refer to our [documentation](https://www.serverless.com/framework/docs/providers/aws/events/).

## Usage

### Deployment

In order to deploy the example, you need to run the following command:

```
$ serverless deploy
```

After running deploy, you should see output similar to:

```bash
Deploying aws-node-typescript to stage dev (us-east-1)

✔ Service deployed to stack aws-node-typescript-dev (112s)

functions:
  hello: aws-node-typescript-dev-hello (806 B)
```

### Invocation

After successful deployment, you can invoke the deployed function by using the following command:

```bash
serverless invoke --function hello
```

Which should result in response similar to the following:

```json
{
  "message": "Go Serverless v3! Your function executed successfully!",
  "input": {}
}
```

### Local development

You can invoke your function locally by using the following command:

```bash
serverless invoke local --function hello
```

Which should result in response similar to the following:

```
{
    "message": "Go Serverless v3! Your function executed successfully!",
    "input": {}
}
```
