﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\parameters\lookUpValue.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ObjectStorageItem } from '../objectStorageItem';
import { ISerializationInfoArray, ISerializationInfo, ModelSerializer, IModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export declare class LookUpValue {
    static createNew(): LookUpValue;
    static from(model: any, serializer: ModelSerializer): LookUpValue;
    static toJson(value: any, serializer: any, refs: any): any;
    constructor(model: any, serializer?: IModelSerializer);
    getInfo(): ISerializationInfoArray;
    description: ko.Observable<string> | ko.Computed<string>;
    _value: ko.Observable<ObjectStorageItem> | ko.Computed<ObjectStorageItem>;
    value: ko.Computed<any>;
    valueInfo: ko.Observable<ISerializationInfo> | ko.Computed<ISerializationInfo>;
    readonly isEmpty: boolean;
}
