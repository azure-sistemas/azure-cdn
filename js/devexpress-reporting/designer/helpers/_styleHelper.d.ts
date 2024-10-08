﻿/**
* DevExpress HTML/JS Reporting (designer\helpers\_styleHelper.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import { DesignControlsHelper } from '@devexpress/analytics-core/analytics-internal';
import { ReportViewModel } from '../controls/xrReport';
import { XRReportElementViewModel } from '../controls/xrReportelement';
import { StyleModel } from '../controls/properties/style';
export declare var stylesProperties: string[];
export declare class StylesHelper extends Disposable {
    private _report;
    private _controlsHelper;
    static styleEqualityComparer(x: StyleModel, y: StyleModel): boolean;
    static generateStyle(element: XRReportElementViewModel): StyleModel;
    constructor(_report: ReportViewModel, _controlsHelper: DesignControlsHelper);
    removeUnusedStyle(styleName: string): StyleModel;
}
