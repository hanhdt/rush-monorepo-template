import ow from 'ow';
import { APIGatewayProxyHandler, APIGatewayProxyResult, APIGatewayProxyEvent, Context } from 'aws-lambda';

import { buildLambdaHttpResponse } from './utils/helpers';
import { singleCanframeDummy } from './canframe/canframe.service';
import { logger } from './utils/logger';

const tableName = process.env.DYNAMODB_TABLE_CANFRAMES;

export const handler: APIGatewayProxyHandler = async (
  lambdaEvent: APIGatewayProxyEvent,
  lambdaContext: Context
): Promise<APIGatewayProxyResult> => {
  logger.debug("context:", lambdaContext);  
  logger.debug("request:", lambdaEvent);

  const vinId = lambdaEvent.pathParameters?.vinId;
  const year = lambdaEvent.queryStringParameters?.year;

  ow(tableName, ow.string.nonEmpty);
  ow(vinId, ow.string.nonEmpty);

  const canframe = await singleCanframeDummy(tableName, vinId, year ?? '2023');

  const response: APIGatewayProxyResult = buildLambdaHttpResponse({
    statusCode: 200,
    status: true,
    statusMessage: 'Success',
    data: { canframe },
  });

  return response;
}