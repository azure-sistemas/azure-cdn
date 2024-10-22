﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\expressions\_wrappedExpressionOptions.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IExpressionBinding } from '../../controls/properties/expressionBinding';
import { ISerializationInfoArray, Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { IExpressionEditorFunction } from '@devexpress/analytics-core/analytics-widgets-internal';
import { IExpressionOptions } from '@devexpress/analytics-core/analytics-widgets';
export interface IExpressionObject {
    getInfo(): ISerializationInfoArray;
    getExpression(propertyName: string, eventName: string): IExpressionOptions;
    getExpressionsTreeItems(propertyName: string): IExpressionTreeItem[];
    validateExpression(): boolean;
    hasWarning(): boolean;
}
export interface IExpressionTreeItem {
    expressionName: string;
    eventName?: string;
    displayName?: string;
    localizationId?: string;
    expressionObj?: IExpressionOptions;
    innerItems?: IExpressionTreeItem[];
}
export declare class WrappedExpressionOptions extends Disposable implements IExpressionOptions {
    eventName?: string;
    constructor(options: IExpressionOptions, handlers?: {
        addExpression: (newVal: string) => void;
        removeExpression: (expression: IExpressionBinding) => void;
    }, fieldListProvider?: any, eventName?: string);
    onHiding(e: any): void;
    onShowing(e: any): void;
    isValid: ko.Observable<boolean> | ko.Computed<boolean>;
    warningMessage: ko.Observable<string>;
    expression: ko.Observable<IExpressionBinding> | ko.Computed<IExpressionBinding>;
    value: ko.Observable<string> | ko.Computed<string>;
    path: ko.Observable<string> | ko.Computed<string>;
    functions: Array<IExpressionEditorFunction>;
    customizeCategories?: (sender: any, categories: any, dblclick?: any) => void;
    rootItems: ({
        name: string;
        needPrefix: boolean;
        rootPath?: undefined;
    } | {
        name: string;
        needPrefix: boolean;
        rootPath: string;
    })[];
}
