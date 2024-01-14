import ow from 'ow';
import { APIGatewayProxyHandler, APIGatewayProxyResult, APIGatewayProxyEvent, Context } from 'aws-lambda';

import { createCanframeDummy } from './canframe/canframe.service';
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

  const canframe = await createCanframeStep(tableName, lambdaEvent.body);

  const response: APIGatewayProxyResult = buildLambdaHttpResponse({
    statusCode: 200,
    status: true,
    statusMessage: 'Success',
    data: { canframe },
  })

  return response;
}

const createCanframeStep = async (tableName: string, _bodyParams: any) => {
  try {
    const canframe = await createCanframeDummy(tableName, _bodyParams);
    return canframe;
  } catch (e) {
    logger.error(`canframes.controller::createCanframeStep: error: ${e}`);
  }
};