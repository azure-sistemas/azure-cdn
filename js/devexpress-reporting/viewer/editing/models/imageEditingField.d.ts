﻿/**
* DevExpress HTML/JS Reporting (viewer\editing\models\imageEditingField.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IEditingFieldViewModel, EditingField, IBounds, ImageAlignment, ImageSizeMode } from '../editingField';
import { PictureEditMode } from '../../widgets/pictureEditor/pictureEditMode';
import { IPictureEditorOptions, IPictureEditorPopupTargetOptions, IPictureEditorCallbacks, PictureEditorModel } from '../../widgets/pictureEditor/_pictureEditorModel';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export declare class ImageEditingFieldViewModel extends Disposable implements IEditingFieldViewModel {
    field: EditingField;
    zoom: ko.Observable<number> | ko.Computed<number>;
    protected bounds: IBounds;
    static __DefaultImageType: string;
    protected popupTarget: string;
    constructor(field: EditingField, pageWidth: number, pageHeight: number, zoom: ko.Observable<number> | ko.Computed<number>, bounds: IBounds);
    getImage(): any;
    getImageType(): any;
    getPictureEditorOptions(): IPictureEditorOptions;
    alignment: ko.Computed<ImageAlignment>;
    sizeMode: ko.Computed<ImageSizeMode>;
    editMode: PictureEditMode;
    popupOptions: IPictureEditorPopupTargetOptions;
    template: string;
    active: ko.Observable<boolean>;
    containerStyle: () => {};
    callbacks: IPictureEditorCallbacks;
    onKeyDown(_: any, e: any): void;
    onFocusIn(s: PictureEditorModel): void;
    onDraw(s: PictureEditorModel): void;
    onBlur(s: PictureEditorModel): void;
}
