﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_ruler.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export declare class RulerViewModel extends Disposable {
    _initGrid(length: number, gridSize: any, gridLines: any, flip?: boolean): void;
    constructor(options: {
        length: () => number;
        units: ko.Observable<string> | ko.Computed<string>;
        zoom: ko.Observable<number> | ko.Computed<number>;
        direction?: string;
        flip?: any;
        disable?: {
            start: number;
            width: number;
        };
    });
    height: ko.Observable<number>;
    width: ko.Observable<number>;
    gridLines: ko.ObservableArray<any>;
    majorGridLines: ko.ObservableArray<any>;
    disable: any;
    defaultGridLinesCoordinate: ko.Observable<any>;
}
