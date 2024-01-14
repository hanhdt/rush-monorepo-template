/** Canframe Service Class */
import ow from 'ow';
import * as uuid from 'uuid';

import { listCanframes, singleCanframe, createCanframe, updateCanframe, deleteCanframe } from './canframe.dao';
import { CanframeList, CanframeItem } from './canframe.model';
import { logger } from '../utils/logger';

export async function listCanframesDummy(tableName: string, year: string, sort: string) : Promise<CanframeList> {
  logger.debug(`canframes.service::listCanframesDummy: in: year:${year}, sort: ${sort}, table: ${tableName}`);

  ow(year,'year', ow.string.nonEmpty);
  
  const canframes:CanframeItem[] = [];
  const rst:CanframeList = {
    canframes
  };

  const canframeDDBItems = await listCanframes(tableName, year, sort);

  if (canframeDDBItems?.canframes.length > 0) {
    rst.canframes = canframeDDBItems.canframes;
  }

  logger.debug(`canframes.service::listCanframesDummy: exit`, rst);
  return rst;
}

export async function singleCanframeDummy(tableName: string, vinId: string, year: string) : Promise<void | CanframeItem> {
  const canframe = await singleCanframe(tableName, vinId, year);
  logger.debug(`canframes.service::singleCanframeDummy:`, canframe);
  return canframe;
}

export async function createCanframeDummy(tableName: string, canframeParams: any) : Promise<void | CanframeItem> {
  const canframe = new CanframeItem();
  canframe.id = uuid.v4();
  canframe.year = canframeParams.year;
  canframe.model = canframeParams.model;
  await createCanframe(tableName, canframe);
  logger.debug(`canframes.service::createCanframeDummy exit: canframe: ${JSON.stringify(canframe)}`);
  return canframe;
}

export async function updateCanframeDummy(tableName: string, vinId: string, canframeParams: any) : Promise<void | CanframeItem> {
  const updatedCanframe = new CanframeItem();
  updatedCanframe.id = canframeParams.id;
  updatedCanframe.year = canframeParams.year;
  updatedCanframe.model = canframeParams.model;
  await updateCanframe(tableName, updatedCanframe);

  logger.debug(`canframes.service::updateCanframeDummy exit: canframe ${vinId}: ${JSON.stringify(updatedCanframe)}`);
  return updatedCanframe;
}

export async function deleteCanframeDummy(tableName: string, vinId: string) {
  await deleteCanframe(tableName, vinId);
  logger.debug(`canframes.service::deleteCanframeDummy exit`);
  return;
}
