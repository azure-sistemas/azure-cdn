﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\expressioneditor\reportExpressionEditor.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
import { WrappedExpressionOptions } from '../../dataObjects/expressions/_wrappedExpressionOptions';
export declare class ReportExpressionEditor extends Editor {
    private _adapter;
    constructor(modelPropertyInfo: any, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
    patchOptions(reportExplorerProvider: any, editableObject: any): boolean;
    popupVisible: ko.Observable<boolean>;
    value: ko.Computed<WrappedExpressionOptions>;
}
