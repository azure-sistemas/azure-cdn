﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\expressioneditor\reportExpressionEditorWrapper.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { IExpressionObject, WrappedExpressionOptions } from '../../dataObjects/expressions/_wrappedExpressionOptions';
import { Disposable, UndoEngine } from '@devexpress/analytics-core/analytics-utils';
import { ExpressionEditor } from '@devexpress/analytics-core/analytics-widgets';
import { getParentContainer } from '@devexpress/analytics-core/analytics-internal';
import { ReportExpressionEditorAdapter } from './reportExpressionEditorAdapter';
export interface IExpressionEditorProperty {
    propertyName: string;
    displayName: string;
    isSelected?: ko.Observable<boolean> | ko.Computed<boolean>;
    isBinded?: () => boolean;
    collapsed?: ko.Observable<boolean> | ko.Computed<boolean>;
    content?: WrappedExpressionOptions;
    items?: IExpressionEditorProperty[];
    templateName?: string;
    value?: ko.Observable<any>;
    click?: () => void;
}
export declare class ReportExpressionEditorWrapper extends Disposable {
    control: ko.Observable;
    value: ko.Observable<WrappedExpressionOptions> | ko.Computed<WrappedExpressionOptions>;
    _allProperties: IExpressionEditorProperty[];
    _undoEngine: UndoEngine;
    private _createMainPopupButtons;
    constructor(control: ko.Observable, value: ko.Observable<WrappedExpressionOptions> | ko.Computed<WrappedExpressionOptions>);
    apply(sender: any): boolean;
    onShowing(e: any): void;
    onHiding(e: any): void;
    createExpressionEditorProperties(expressionObj: IExpressionObject, properties: any, selected: any): any;
    switchExpression(property: IExpressionEditorProperty): void;
    updateExpression(expression: any): void;
    title: () => any;
    getPopupContainer: typeof getParentContainer;
    adapter: ko.Observable<ReportExpressionEditorAdapter>;
    editor: ko.Observable<ExpressionEditor>;
    properties: ko.Observable<IExpressionEditorProperty[]>;
    popupVisible: ko.Observable<boolean>;
    buttonItems: any[];
    currentProperty: IExpressionEditorProperty;
}
