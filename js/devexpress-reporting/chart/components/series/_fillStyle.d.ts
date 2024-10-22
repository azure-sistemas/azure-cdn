﻿/**
* DevExpress HTML/JS Reporting (chart\components\series\_fillStyle.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { IModelSerializer, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
export declare class FillStyle extends SerializableModel {
    static from(info: any, gradientTypeName: any): (model: any, serializer: any) => FillStyle;
    static toJson(model: FillStyle, serializer: IModelSerializer, refs: any): any;
    private _optionsTypeMap;
    constructor(model: any, info: ISerializationInfoArray, gradientTypeName: string, serializer?: IModelSerializer);
    isPropertyVisible(propertyName: any): any;
    updateOptions(fillMode: string, serializer: any, optionsObject: any): void;
    fillMode: ko.Observable<string> | ko.Computed<string>;
    options: ko.Observable<any>;
    gradientTypeName: string;
}
