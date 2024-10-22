﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\internal\_eventProcessor.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISlideOptions } from '../mobilePreview';
export declare var slowdownDisctanceFactor: number;
export declare var minScale: number;
export declare class EventProcessor {
    element: any;
    slideOptions: ISlideOptions;
    private _direction;
    private _startingPositionX;
    private _startingPositionY;
    private _getFirstPageOffset;
    getDirection(x?: any, y?: any): {
        vertical: boolean;
        horizontal: boolean;
        scrollDown: boolean;
    };
    setPosition(x: any, y: any): void;
    initialize(x: number, y: number): void;
    start(e: JQueryEventObject): void;
    move(e: JQueryEventObject): void;
    end(e: JQueryEventObject): void;
    constructor(element: any, slideOptions: ISlideOptions);
    applySearchAnimation(value: any): void;
    isLeftMove: boolean;
    isRightMove: boolean;
    latestY: number;
    latestX: number;
    $window: JQuery<Window>;
    $element: JQuery;
    $gallery: JQuery<Element>;
    $galleryblocks: JQuery<Element>;
    $body: JQuery;
    firstMobilePageOffset: {
        left: number;
        top: number;
    };
}
