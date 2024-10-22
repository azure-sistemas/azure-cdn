﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\styleseditor.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { StyleModel } from '../controls/properties/style';
import * as ko from 'knockout';
export declare class StylesEditorHeaderModel {
    static newItem: string;
    static newItemTextId: string;
    constructor(styleName: ko.Observable<string>, styles: ko.ObservableArray<StyleModel>, disabled: ko.Observable<boolean>, popupContainer: string);
    items: ko.Computed<StyleModel[]>;
    value: any;
    onValueChanged: (e: any) => void;
    displayExpr: string;
    valueExpr: string;
    displayCustomValue: boolean;
    placeholder: any;
    noDataText: any;
    disabled: ko.Observable<boolean> | ko.Computed<boolean>;
    dropDownOptions: any;
}
