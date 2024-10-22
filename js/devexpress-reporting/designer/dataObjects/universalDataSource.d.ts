﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\universalDataSource.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ObjectItem, ObjectStorageParameter } from './objectStorageItem';
import { ISerializationInfoArray, IModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import * as ko from 'knockout';
import { FilterStringOptions } from '@devexpress/analytics-core/analytics-widgets';
export declare class TableInfoCollectionItem extends SerializableModel {
    constructor(model: any, dataSource: any, dsHelper: any, serializer?: IModelSerializer);
    filterString: ko.Observable<FilterStringOptions>;
}
export declare class UniversalDataSource extends ObjectItem {
    dispose(): void;
    getInfo(): ISerializationInfoArray;
    constructor(model: any, dsHelperProvider?: any, serializer?: IModelSerializer);
    parameters: ko.ObservableArray<ObjectStorageParameter>;
    tableInfoCollection: ko.ObservableArray<TableInfoCollectionItem>;
    spParameterInfoCollection: ko.ObservableArray<SerializableModel>;
}
