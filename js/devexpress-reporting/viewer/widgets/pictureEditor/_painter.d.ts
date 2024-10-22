﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\pictureEditor\_painter.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ImageSizeMode, ImageAlignment } from '../../editing/editingField';
import { ImagePainter } from './_imagePainter';
import { SignaturePainter } from './_signaturePainter';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export interface IPainterOptions {
    imageSource: string;
    imageType: string;
    zoom: ko.Observable<number> | ko.Computed<number>;
    sizeMode: ImageSizeMode;
    alignment: ImageAlignment;
    canDraw: ko.Observable<boolean> | ko.Computed<boolean>;
}
export declare class Painter extends Disposable {
    private $element;
    private _context;
    private _getContextPoint;
    private _pointerDownHandler;
    private _pointerMoveHandler;
    private _pointerLeaveHandler;
    private _addEvents;
    private _removeEvents;
    private _setCanvasSize;
    private _cleanCanvas;
    constructor(options: IPainterOptions);
    clear(): void;
    refresh(): void;
    initSize(element: JQuery, zoom: number): void;
    initCanvas(element: JQuery, zoom: number): void;
    imageFormatByType(imageType: string): string;
    getImage(): string;
    hasSignature(): boolean;
    dispose(): void;
    reset(initialImage: any, initialAlignment: any, initialSizeMode: any, initialImageType: any): void;
    initialSize: {
        width: number;
        height: number;
    };
    canDraw: boolean;
    height: number;
    format: (newVal?: string) => string;
    image: ko.Observable<string> | ko.Computed<string>;
    imageSizeMode: ko.Observable<ImageSizeMode>;
    imageAlignment: ko.Observable<ImageAlignment>;
    zoom: ko.Observable<number> | ko.Computed<number>;
    scale: ko.Observable<number> | ko.Computed<number>;
    lineWidth: ko.Observable<number>;
    lineColor: ko.Observable<string>;
    imagePainter: ImagePainter;
    signaturePainter: SignaturePainter;
}
