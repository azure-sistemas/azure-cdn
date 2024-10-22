﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\pictureEditor\_imagePainter.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ImageSizeMode, ImageAlignment } from '../../editing/editingField';
import * as ko from 'knockout';
export declare class ImagePainter {
    private _drawImage;
    private _getImageSize;
    private _getImageCoordinate;
    constructor(options: {
        imageSource: ko.Observable<string>;
        sizeMode: ko.Observable<ImageSizeMode>;
        alignment: ko.Observable<ImageAlignment>;
    });
    refresh(context: CanvasRenderingContext2D, scale?: number, contentSize?: any): JQuery.Promise<any, any, any>;
    format: ko.Observable<string>;
    image: ko.Observable<string> | ko.Computed<string>;
    sizeMode: ko.Observable<ImageSizeMode>;
    alignment: ko.Observable<ImageAlignment>;
}
