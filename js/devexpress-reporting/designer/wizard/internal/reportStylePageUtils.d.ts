﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\reportStylePageUtils.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare enum ReportStyle {
    Bold = 0,
    Casual = 1,
    Compact = 2,
    Corporate = 3,
    Formal = 4
}
export declare class ReportStyleItem {
    reportStyle: ReportStyle;
    constructor(textDefault: string, textID: string, reportStyle: ReportStyle);
    text: string;
    readonly className: string;
}
