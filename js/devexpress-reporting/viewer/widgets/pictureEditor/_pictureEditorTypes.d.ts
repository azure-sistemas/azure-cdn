﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\pictureEditor\_pictureEditorTypes.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare enum PictureEditorActionId {
    OpenFile = 0,
    PickImage = 1,
    Alignment = 2,
    Brush = 3,
    Clear = 4,
    Reset = 5
}
export interface IImageEditorItem {
    data?: string;
    url?: string;
    text?: string;
    visible?: boolean | ko.Computed<boolean>;
}
