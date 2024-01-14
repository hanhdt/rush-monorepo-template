import { DynamoDB } from "aws-sdk";
import { CanframeList, CanframeItem } from './canframe.model';
import { logger } from '../utils/logger';


// DynamoDB client instance
const ddb = new DynamoDB.DocumentClient();

const _scanCanframes = async (tableName: string) : Promise<any> => {
  return await ddb.scan({ TableName: tableName }).promise();
};

export const listCanframes = async (tableName: string, year: string, sort: string) : Promise<CanframeList> => {
  try {
    const ddbItems = await _scanCanframes(tableName);
    const yearKey = year;
    const sortKeys = sort;

    let result : CanframeList = { canframes: [] };
    logger.debug(`canframes.dao::listCanframesDummy: exit`, ddbItems.Items, yearKey, sortKeys);

    if (ddbItems?.Items?.length) {
      for (const item of ddbItems.Items) {
        let cItem = new CanframeItem();
        cItem.id = item.id;
        cItem.year = item.year;
        cItem.model = item.model;
        result.canframes.push(cItem);
      }
    }

    return result;
  } catch (e) {
    throw e;
  }
};

export const singleCanframe = async (tableName: string, vinId: string, year: string) : Promise<CanframeItem>  => {
  try {
    const ddbItem = await ddb.get({
      TableName: tableName,
      Key: {
        id: vinId,
        year: year
      }
    }).promise();
    const canframe = ddbItem.Item as CanframeItem;
    logger.debug(`canframes.dao::singleCanframe: exit: ${JSON.stringify(canframe)}`);
    return canframe;
  } catch (e) {
    logger.error(`canframes.dao::singleCanframe: error: ${e}`);
    throw e;
  }
};

export const createCanframe = async (tableName: string, canframeItem: CanframeItem) => {
  try {
    // save the canframe to the dynamodb
    await ddb.put({
      TableName: tableName,
      Item: canframeItem as DynamoDB.DocumentClient.PutItemInputAttributeMap
    }).promise();
    logger.debug(`canframes.dao::createCanframe: exit: ${JSON.stringify(canframeItem)}`);

    return canframeItem;
  } catch (e) {
    logger.error(`canframes.controller::createCanframe: error: ${e}`);
    throw e;
  }
};

export const updateCanframe = async (tableName: string, canframeItem: CanframeItem) => {
  try {
    // save the canframe to the dynamodb
    await ddb.put({
      TableName: tableName,
      Item: canframeItem as DynamoDB.DocumentClient.PutItemInputAttributeMap
    }).promise();
    logger.debug(`canframes.dao::updateCanframe: exit: ${JSON.stringify(canframeItem)}`);
    return canframeItem;
  } catch (e) {
    logger.error(`canframes.dao::updateCanframe: error: ${e}`);
    throw e;
  }
};

export const deleteCanframe = async (tableName: string, vinId: string) => {
  try {
    logger.debug(`canframes.dao::deleteCanframe: exit: ${tableName} - ${vinId}`);
  } catch (e) {
    logger.error(`canframes.dao::deleteCanframe: error: ${e}`);
    throw e;
  }
};