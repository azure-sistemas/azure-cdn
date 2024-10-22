﻿/**
* DevExpress HTML/JS Reporting (viewer\editing\models\characterCombEditingField.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { TextEditingFieldViewModelBase } from './textEditingField';
import { IEditingFieldViewModel, EditingField, IBounds } from '../editingField';
import * as ko from 'knockout';
import 'jquery-ui/ui/focusable';
export declare class CharacterCombEditingFieldViewModel extends TextEditingFieldViewModelBase implements IEditingFieldViewModel {
    field: EditingField;
    constructor(field: EditingField, pageWidth: number, pageHeight: number, zoom: ko.Observable<number> | ko.Computed<number>, bounds: IBounds);
    cells: {
        text: string;
        style: any;
    }[];
    rowsCount: number;
    colsCount: number;
    template: string;
    containerStyle: () => {};
    textStyle: () => {};
    zoom: ko.Observable<number> | ko.Computed<number>;
    active: ko.Observable<boolean>;
    activateEditor(viewModel: any, e: any): void;
    static setText(cells: {
        text: string;
    }[], textAlignment: string, rtl: boolean, text: string, rowsCount: number, colsCount: number): void;
}
