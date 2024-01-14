import ow from 'ow';
import { APIGatewayProxyHandler, APIGatewayProxyResult, APIGatewayProxyEvent, Context } from 'aws-lambda';

import { listCanframesDummy } from './canframe/canframe.service';
import { CanframeList } from './canframe/canframe.model';
import { buildLambdaHttpResponse } from './utils/helpers';
import { logger } from './utils/logger';

const tableName = process.env.DYNAMODB_TABLE_CANFRAMES;

export const handler: APIGatewayProxyHandler = async (
  lambdaEvent: APIGatewayProxyEvent,
  lambdaContext: Context
): Promise<APIGatewayProxyResult> => {
  logger.debug("context:", lambdaContext);
  logger.debug("request:", lambdaEvent);

  ow(tableName, ow.string.nonEmpty);

  const listCanframes = await listCanframesStep(tableName, '2023', 'asc');

  const response: APIGatewayProxyResult = buildLambdaHttpResponse({
    statusCode: 200,
    status: true,
    statusMessage: 'Success',
    data: { canframes: listCanframes.canframes },
  });

  return response;
}

const listCanframesStep = async (tableName: string, year: string, sort: string): Promise<CanframeList> => {
  try {
    const canframes = await listCanframesDummy(tableName, year, sort);
    return canframes;
  } catch (e) {
    throw e;
  }
};