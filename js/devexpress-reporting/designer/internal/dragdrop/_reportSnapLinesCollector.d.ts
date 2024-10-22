﻿/**
* DevExpress HTML/JS Reporting (designer\internal\dragdrop\_reportSnapLinesCollector.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IArea } from '@devexpress/analytics-core/analytics-elements';
import { SnapLinesCollector } from '@devexpress/analytics-core/analytics-internal';
export declare class ReportSnapLinesCollector extends SnapLinesCollector {
    private _rtl;
    _getCollection(parent: any): {
        rect: ko.Observable<IArea>;
    }[];
    private _enumerateBandCollection;
    private _processBandRtl;
    _enumerateCollection(parent: any, parentAbsoluteProsition: {
        top: number;
        left: number;
    }, callback: (item: any, itemAbsoluteRect: {
        left: number;
        right: number;
        top: number;
        bottom: number;
    }) => void): void;
    constructor(_rtl: ko.Observable<boolean> | ko.Computed<boolean>);
}
