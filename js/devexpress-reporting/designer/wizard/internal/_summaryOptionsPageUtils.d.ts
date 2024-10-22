﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\_summaryOptionsPageUtils.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
export interface ISummaryOptions {
    columnName: string;
    flags: number;
}
export declare class SummaryOptionsWrapper {
    private _name;
    private static _getNumber;
    constructor(name: string, displayName: string);
    columnName: string;
    avg: ko.Observable<boolean>;
    count: ko.Observable<boolean>;
    max: ko.Observable<boolean>;
    min: ko.Observable<boolean>;
    sum: ko.Observable<boolean>;
    getOptions(): ISummaryOptions;
}
