import ow from 'ow';
import { APIGatewayProxyHandler, APIGatewayProxyResult, APIGatewayProxyEvent, Context } from 'aws-lambda';

import { updateCanframeDummy } from './canframe/canframe.service';
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

  const updatedCanframe = await updateCanframeStep(tableName, vinId, lambdaEvent.body);

  const response: APIGatewayProxyResult = buildLambdaHttpResponse({
    statusCode: 200,
    status: true,
    statusMessage: 'Success',
    data: { canframe: updatedCanframe },
  })

  return response;
}

const updateCanframeStep = async (tableName: string, vinId: string, _bodyParams: any) => {
  try {
    const canframe = await updateCanframeDummy(tableName, vinId, _bodyParams);
    return canframe;
  } catch (e) {
    logger.error(`canframes.controller::createCanframeStep: error: ${e}`);
  }
};