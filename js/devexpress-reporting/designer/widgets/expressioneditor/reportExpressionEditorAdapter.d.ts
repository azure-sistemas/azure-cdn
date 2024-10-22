﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\expressioneditor\reportExpressionEditorAdapter.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { WrappedExpressionOptions } from '../../dataObjects/expressions/_wrappedExpressionOptions';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
export declare class ReportExpressionEditorAdapter extends Disposable {
    private values;
    value: ko.Observable<WrappedExpressionOptions> | ko.Computed<WrappedExpressionOptions>;
    private _relatedControlClassName;
    private _onHidingPopup;
    private _onShowingPopup;
    constructor(values: ko.Observable<any[]> | ko.Computed<any[]>, value: ko.Observable<WrappedExpressionOptions> | ko.Computed<WrappedExpressionOptions>);
    patchOptions(reportExplorerProvider: any, editableObject: any): boolean;
    private _createReportItems;
    private _createValuesTab;
    popupVisible: ko.Observable<boolean>;
}
