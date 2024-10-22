﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\parameters\parameterExpressionBinding.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ISerializationInfoArray, IModelSerializer } from '@devexpress/analytics-core/analytics-utils';
export interface IParameterExpressionBinding {
    propertyName: ko.Observable<string>;
    expression: ko.Observable<string>;
}
export declare function createExpressionProperty(object: any, propertyName: string, suffix?: string): WrappedExpressionOptions;
export declare class ParameterExpressionBinding implements IParameterExpressionBinding {
    static expressionSuff: string;
    getInfo(): ISerializationInfoArray;
    constructor(model: any, serializer?: IModelSerializer);
    isEmpty(): boolean;
    propertyName: ko.Observable<string>;
    expression: ko.Observable<string>;
}
import { WrappedExpressionOptions } from '../expressions/_wrappedExpressionOptions';
