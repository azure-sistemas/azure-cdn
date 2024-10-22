﻿/**
* DevExpress HTML/JS Reporting (chart\components\models\_stripLimit.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { IModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export declare class StripLimitViewModel extends SerializableModel {
    static from(model: any, serializer?: IModelSerializer): StripLimitViewModel;
    static toJson(value: any, serializer: any, refs: any): any;
    constructor(model: any, serializer?: IModelSerializer, info?: ISerializationInfoArray);
    enabled: ko.Observable<boolean>;
    axisValue: ko.Observable<string>;
    _axisValue: ko.Observable<string>;
}
