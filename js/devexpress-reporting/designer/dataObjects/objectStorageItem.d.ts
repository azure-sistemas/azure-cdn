﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\objectStorageItem.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DataSourceHelper } from '../helpers/_dataSourceHelper';
import { ISerializationInfoArray, Disposable, IModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
export declare class ObjectItem extends Disposable {
    dsHelperProvider?: () => DataSourceHelper;
    dispose(): void;
    getInfo(): ISerializationInfoArray;
    afterDeserialization(model: any, serializer: any): void;
    preInitProperties(model: any, dsHelperProvider?: () => DataSourceHelper, serializer?: IModelSerializer): void;
    constructor(model: any, dsHelperProvider?: () => DataSourceHelper, serializer?: IModelSerializer);
    objectType: ko.Observable<string> | ko.Computed<string>;
}
export declare class ObjectStorageItem extends ObjectItem {
    _getInfo(): ISerializationInfoArray;
    preInitProperties(model: any): void;
    constructor(model: any, dsHelperProvider?: any, serializer?: IModelSerializer);
    isEmpty(): boolean;
    content: ko.Observable<string> | ko.Computed<string>;
    type: ko.Observable<string> | ko.Computed<string>;
}
export declare class ObjectStorageParameter extends SerializableModel {
    constructor(model: any, serializer?: IModelSerializer);
}
