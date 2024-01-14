import ow from 'ow';
import { APIGatewayProxyHandler, APIGatewayProxyResult, APIGatewayProxyEvent, Context } from 'aws-lambda';

import { deleteCanframeDummy } from './canframe/canframe.service';
import { buildLambdaHttpResponse } from './utils/helpers';
import { logger } from './utils/logger';


const tableName = process.env.DYNAMODB_TABLE_CANFRAMES;

export const handler: APIGatewayProxyHandler = async (
  lambdaEvent: APIGatewayProxyEvent,
  lambdaContext: Context
): Promise<APIGatewayProxyResult> => {
  logger.debug("context:", lambdaContext);
  logger.debug("request:", lambdaEvent);

  const vinId = lambdaEvent.pathParameters?.vinId;

  ow(tableName, ow.string.nonEmpty);
  ow(vinId, ow.string.nonEmpty);

  await deleteCanframeDummy(tableName, vinId);

  const response: APIGatewayProxyResult = buildLambdaHttpResponse({
    statusCode: 200,
    status: true,
    statusMessage: 'Success',
    data: { message: 'Delete a canframe!' },
  })

  return response;
}