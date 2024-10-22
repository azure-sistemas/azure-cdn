﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrShape.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { XRControlViewModel, XRControlSurface } from './xrControl';
import { ElementViewModel, ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
import * as ko from 'knockout';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
export declare class XRShapeViewModel extends XRControlViewModel {
    static timeout: number;
    static shapes: ({
        displayName: string;
        type: string;
        angle?: undefined;
        val?: undefined;
    } | {
        displayName: string;
        type?: undefined;
        angle?: undefined;
        val?: undefined;
    } | {
        displayName: string;
        angle: number;
        type: string;
        val?: undefined;
    } | {
        displayName: string;
        val: {
            '@NumberOfSides': number;
            '@StarPointCount'?: undefined;
        };
        type: string;
        angle?: undefined;
    } | {
        displayName: string;
        val: {
            '@StarPointCount': number;
            '@NumberOfSides'?: undefined;
        };
        type: string;
        angle?: undefined;
    })[];
    static createShape(model: any, serializer?: any): {
        'shapeType': ko.Observable<any>;
        'getInfo': () => any;
    };
    constructor(model: any, parent: ElementViewModel, serializer?: ModelSerializer);
    Shape: any;
    shapeFake: any;
}
export declare class XRShapeControlSurface extends XRControlSurface {
    constructor(control: XRControlViewModel, context: ISurfaceContext);
    imageSrc: ko.Computed<string>;
}
