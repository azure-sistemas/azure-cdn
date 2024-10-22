﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\dateRange\dateRangeEditor.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { DateRangeDialogElementsKeyboardHelper } from '../../accessibility/_dateRangeKeyboardHelper';
export interface IDateRangeEditorItem {
    displayName: string;
    range: () => Date[];
}
export interface IDateRangeEditorOptions {
    value: ko.ObservableArray<Date>;
    isMobile?: boolean;
}
export declare var predefinedDateRanges: IDateRangeEditorItem[];
export declare class DateRangeEditor extends Disposable {
    private _options;
    private _locker;
    private _getStringValue;
    _popupVisible: ko.Observable<boolean>;
    _showPopup: () => void;
    _hidePopup: () => void;
    _displayText: ko.Computed<string>;
    _$element: JQuery;
    _isSelected(item: IDateRangeEditorItem): boolean;
    constructor(_options: IDateRangeEditorOptions);
    private _toParameterValue;
    _accessibilityDialogItems: ko.ObservableArray<any>;
    _createTemplateData(value: ko.Observable<Date>, min: ko.Observable<Date>): {
        value: ko.Observable<Date>;
        min: ko.Observable<Date>;
        inRange: (date: Date) => boolean;
    };
    applyDate(range: Date[], force?: boolean): void;
    inRange(date: any): boolean;
    applyValue(updateEndDate?: boolean): void;
    popupTemplate: string;
    items: any[];
    startDate: ko.Observable<Date>;
    endDate: ko.Observable<Date>;
    popupModel: any;
    dialogKeyboardHelper: DateRangeDialogElementsKeyboardHelper;
}
