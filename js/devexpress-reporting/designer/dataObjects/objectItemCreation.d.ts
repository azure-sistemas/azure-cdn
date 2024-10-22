﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\objectItemCreation.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ObjectItem } from './objectStorageItem';
import { DataSourceHelper } from '../helpers/_dataSourceHelper';
import { IModelSerializer } from '@devexpress/analytics-core/analytics-utils';
export declare function createNewObjectItem(model: any, dsHelperProvider?: () => DataSourceHelper, serializer?: IModelSerializer): ObjectItem;
