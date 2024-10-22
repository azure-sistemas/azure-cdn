﻿/**
* DevExpress HTML/JS Reporting (viewer\parameters\multiValuesHelper.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IDisplayedValue } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export declare class MultiValuesHelper {
    items: Array<IDisplayedValue>;
    constructor(value: ko.ObservableArray<any>, items: Array<IDisplayedValue>, selectAllValues: boolean);
    selectedItems: ko.ObservableArray<any>;
    isSelectedAll: ko.Observable<boolean> | ko.Computed<boolean>;
    maxDisplayedTags: number;
    dataSource: any;
    value: ko.ObservableArray<any>;
}
