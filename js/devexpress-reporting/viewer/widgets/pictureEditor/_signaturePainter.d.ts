﻿/**
* DevExpress HTML/JS Reporting (viewer\widgets\pictureEditor\_signaturePainter.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export declare class SignaturePainter extends Disposable {
    dispose(): void;
    private _points;
    private _lastX;
    private _lastY;
    private _drawPath;
    private _drawCircle;
    private _drawAllPoints;
    drawCircle(context: any, x: any, y: any, color: any, width: any): void;
    drawPath(context: any, x: any, y: any, color: any, width: any): void;
    resetLastPosition(): void;
    resetPoints(): void;
    reset(): void;
    refresh(context: any): void;
    constructor();
    hasPoints: ko.Computed<boolean>;
}
