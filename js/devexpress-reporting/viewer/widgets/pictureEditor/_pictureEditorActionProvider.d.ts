﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\pictureEditor\_pictureEditorActionProvider.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PictureEditorToolbarItem, PictureEditorToolbarItemWithPopup } from './_pictureEditorToolbarItem';
import { PictureEditorModel } from './_pictureEditorModel';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import { IImageEditorItem } from './_pictureEditorTypes';
export declare class PictureEditorActionProvider extends Disposable {
    private _editorModel;
    private _popupOptions;
    static colors: string[];
    private _getValues;
    private _getColorValues;
    private _initPopupOptions;
    createOpenFileAction(action: (e: any) => void): PictureEditorToolbarItem;
    createImagePickerAction(images: IImageEditorItem[], filterEnabled: boolean, action: (base64: string) => void): PictureEditorToolbarItemWithPopup;
    createSizingAction(): PictureEditorToolbarItemWithPopup;
    createBrushAction(): PictureEditorToolbarItemWithPopup;
    createResetItem(action: () => void): PictureEditorToolbarItem;
    createClearItem(action: () => void): PictureEditorToolbarItem;
    constructor(_editorModel: PictureEditorModel, _popupOptions: any);
}
