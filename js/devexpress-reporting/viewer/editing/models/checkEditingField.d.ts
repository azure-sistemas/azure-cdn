﻿/**
* DevExpress HTML/JS Reporting (viewer\editing\models\checkEditingField.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ImageSource } from '../../../common/imageSource';
import { IEditingFieldViewModel, EditingField } from '../editingField';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export declare enum GlyphStyle {
    StandardBox1 = 0,
    StandardBox2 = 1,
    YesNoBox = 2,
    YesNoSolidBox = 3,
    YesNo = 4,
    RadioButton = 5,
    Smiley = 6,
    Thumb = 7,
    Toggle = 8,
    Star = 9,
    Heart = 10
}
export declare enum CheckState {
    Unchecked = 0,
    Checked = 1,
    Indeterminate = 2
}
export declare function createCustomGlyphStyleCss(imageSource: ImageSource): {};
export declare function getCheckBoxTemplate(style: string, state: string, customGlyph: {}): any;
export declare class CheckEditingFieldViewModel extends Disposable implements IEditingFieldViewModel {
    private _editingFieldsProvider;
    private _toggleCheckState;
    constructor(field: EditingField, pageWidth: number, pageHeight: number, zoom: ko.Observable<number> | ko.Computed<number>, editingFieldsProvider: () => EditingField[]);
    template: string;
    field: EditingField;
    containerStyle: () => {};
    checkStyle: () => {};
    checkStateStyleIcon: any;
    customGlyphStyleCss: any;
    zoom: ko.Observable<number> | ko.Computed<number>;
    focused: ko.Observable<boolean>;
    onKeyDown(_: any, e: any): void;
    onBlur(): void;
    onFocus(): void;
    onClick(_: any, e: any): void;
    checked(): boolean;
    toggleCheckState(): void;
}
