﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\objectStorage.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ObjectItem, ObjectStorageItem } from './objectStorageItem';
import { DataSourceHelper } from '../helpers/_dataSourceHelper';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
export declare class ObjectsStorage extends Disposable {
    constructor(objects: ko.ObservableArray<ObjectItem>, dsHelperProvider: any);
    findType(content: string): ObjectStorageItem;
    getType(type: string): ObjectStorageItem;
    addValue(): ObjectStorageItem;
    createStaticLookUpSetting(): StaticListLookUpSettings;
    createDynamicLookUpSetting(): DynamicListLookUpSettings;
    createRangeSetting(): RangeParametersSettings;
    objects: ko.ObservableArray<ObjectItem>;
    dsHelperProvider: () => DataSourceHelper;
}
import { RangeParametersSettings } from './parameters/rangeSettings';
import { StaticListLookUpSettings, DynamicListLookUpSettings } from './parameters/lookupSettings';
