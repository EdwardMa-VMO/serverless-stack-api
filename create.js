import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now()
    }


  };
  console.log(data);
  console.log(params);
  try {
    await dynamoDbLib.call("put", params);

    console.log('PUT \n');
    console.log(params);
    return success(params.Item);
  } catch (e) {
    console.log('catch e \n');
    console.log(e);
    return failure({ status: false });
  }
}