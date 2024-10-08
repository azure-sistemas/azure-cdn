﻿/**
* DevExpress HTML/JS Reporting (chart\widgets\_summaryFunctionEditor.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { FieldListEditor } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
export declare class SummaryFunctionModel {
    static availableItems: string[];
    static from(val: any): SummaryFunctionModel;
    static toJson(value: SummaryFunctionModel): {};
    private _updateArgs;
    constructor(functionName: any, args: any);
    functionName: ko.Observable<any>;
    args: ko.ObservableArray<{
        value: ko.Observable<string>;
    }>;
}
export declare class SummaryFunctionEditor extends FieldListEditor {
    constructor(modelPropertyInfo: any, level: any, parentDisabled?: ko.Computed<boolean>);
    getLocalization(displayName: any, localizationId: any): any;
    memberPadding: any;
    argumentTemplateName: string;
    actionsAreAvailable: ko.Observable<boolean>;
    add(): void;
    remove(index: any): void;
    availableItems(): string[];
}
