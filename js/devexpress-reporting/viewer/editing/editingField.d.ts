﻿/**
* DevExpress HTML/JS Reporting (viewer\editing\editingField.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { GlyphStyle } from './models/checkEditingField';
import * as ko from 'knockout';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
export interface IBounds {
    left: number;
    top: number;
    width: number;
    height: number;
    offset: {
        x: number;
        y: number;
    };
}
export declare enum ImageAlignment {
    TopLeft = 1,
    TopCenter = 2,
    TopRight = 3,
    MiddleLeft = 4,
    MiddleCenter = 5,
    MiddleRight = 6,
    BottomLeft = 7,
    BottomCenter = 8,
    BottomRight = 9
}
export declare enum ImageSizeMode {
    Normal = 0,
    StretchImage = 1,
    ZoomImage = 4,
    Squeeze = 5,
    Cover = 7
}
export interface IImageSourceBrickData {
    image: string;
    imageType: string;
}
export interface IImageBrickData extends IImageSourceBrickData {
    alignment: ImageAlignment;
    sizeMode: ImageSizeMode;
}
export interface IEditingFieldModel {
    id: string;
    groupID: string;
    readOnly: boolean;
    editorName: string;
    editValue: any | IImageBrickData;
    htmlValue: string;
    pageIndex: number;
    brickIndeces: string;
    type: string;
    bounds: IBounds;
    brickOptions: {
        rtl: boolean;
        rtlLayout: boolean;
        formatString: string;
        wordWrap: boolean;
        style: string;
        checkBoxBounds?: IBounds;
        characterCombBounds?: IBounds[];
        checkBoxGlyphOptions?: {
            customGlyphs: {
                key: number;
                value: IImageSourceBrickData;
            }[];
            glyphStyle: GlyphStyle;
        };
    };
}
export interface IEditingFieldViewModel {
    template: string;
    field: EditingField;
    activateEditor?: (viewModel: any, e: any) => void;
    hideEditor?: (shouldCommit: boolean) => void;
    active?: ko.Observable<boolean>;
    onClick?: (viewModel: any, e: any) => void;
    dispose?: () => void;
}
export interface IEditingFieldHtmlProvider {
    getEditingFieldHtml: (value: string, editingFieldIndex: number) => JQueryPromise<string>;
}
export declare class EditingField extends Disposable {
    protected _model: IEditingFieldModel;
    private _needToUseHtml;
    private _index;
    private _htmlProvider;
    private _readOnly;
    constructor(model: IEditingFieldModel, index: number, htmlProvider: IEditingFieldHtmlProvider);
    private _refreshHtmlValue;
    editingFieldChanged(field: EditingField, oldVal: any, newVal: any): any;
    readOnly: ko.Observable<boolean> | ko.Computed<boolean>;
    modelValue: ko.Observable | ko.Computed;
    editValue: ko.Computed<any>;
    _editorValue: ko.Observable | ko.Computed;
    htmlValue: ko.Observable<string> | ko.Computed<string>;
    editorName(): string;
    id(): string;
    groupID(): string;
    pageIndex(): number;
    type(): string;
    model(): IEditingFieldModel;
    createViewModel(zoom: ko.Observable<number> | ko.Computed<number>, pageWidth: number, pageHeight: number, editingFieldsProvider: () => EditingField[], bounds: IBounds): IEditingFieldViewModel;
}
