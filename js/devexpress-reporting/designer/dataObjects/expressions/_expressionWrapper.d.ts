﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\expressions\_expressionWrapper.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IExpressionBinding } from '../../controls/properties/expressionBinding';
import { IExpressionObject } from './_wrappedExpressionOptions';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export interface IPropertyDescription {
    events: string[];
    group?: string;
    objectProperties?: string[];
}
export declare class ExpressionWrapper extends Disposable {
    private _bindingMode;
    private _fieldListProvider?;
    dispose(): void;
    static createExpression(propertyName: any, eventName: any, expression: any): IExpressionBinding;
    private _valuesDictionary;
    private _displayNameDictionary;
    private _expressionsInfo;
    private _expressionsSerializationInfoCache;
    private _createPropertyByName;
    private _createInfo;
    private _addControlInfo;
    private _createSerializationInfo;
    private _getPropertyDescriptors;
    private _getExpressionFromArray;
    private _createExpressionMap;
    private _summaryFunctions;
    private _mapExpressionsToObjectByEventName;
    private _allExpressions;
    private _isValidExpressions;
    private _isWarningExpressions;
    private _getExpressionByPropertyName;
    private _mapExpressionsToObject;
    constructor(_bindingMode?: string, _fieldListProvider?: ko.Observable | ko.Computed);
    setPropertyDescription(controlType: string, propertyName: string, events: string[], objectProperties?: string[], group?: string): void;
    hidePropertyDescriptions(controlType: string, ...propertyNames: any[]): void;
    createExpressionsObject(controlType: string, expressions: ko.ObservableArray<IExpressionBinding>, path?: ko.Observable<string> | ko.Computed<string>, summaryRunning?: (name: string) => ko.Observable<boolean> | ko.Computed<boolean>): IExpressionObject;
    setLocalizationId(propertyName: string, localizationId: string, displayName?: string): void;
    setValues(propertyName: string, values: any[]): void;
}
