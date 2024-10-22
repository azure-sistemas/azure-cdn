﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\_multiValueEditor.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IDisplayedValue, Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export interface IMultiValueItem extends IDisplayedValue {
    selected?: ko.Observable<boolean> | ko.Computed<boolean>;
    toggleSelected?: () => void;
}
export declare class MultiValueEditorOptions extends Disposable {
    private _isValueSelected;
    constructor(value: ko.Observable<any>, items: Array<IDisplayedValue>);
    selectedItems: ko.Observable<Array<IMultiValueItem>> | ko.Computed<Array<IMultiValueItem>>;
    editorValue: ko.Observable<IMultiValueItem> | ko.Computed<IMultiValueItem>;
    isSelectedAll: ko.Observable<boolean> | ko.Computed<boolean>;
    _items: Array<IMultiValueItem>;
    selectedValuesString: ko.Observable<string> | ko.Computed<string>;
    displayItems: Array<IMultiValueItem>;
    dataSource: any;
    updateValue: () => void;
    onOptionChanged: (e: any) => void;
    value: ko.Observable | ko.Computed;
}
