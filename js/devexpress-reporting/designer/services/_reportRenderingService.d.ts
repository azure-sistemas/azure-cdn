﻿/**
* DevExpress HTML/JS Reporting (designer\services\_reportRenderingService.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { XRChartSurface } from '../controls/xrChart';
import { XRShapeControlSurface } from '../controls/xrShape';
import { XRRichSurface } from '../controls/xrRichText';
import { XRPdfContentViewModel } from '../controls/xrPdfContent';
export declare class ReportRenderingService {
    static getChartImage(surface: XRChartSurface): any;
    static getShapeImage(surface: XRShapeControlSurface): string;
    static getRichImage(surface: XRRichSurface, propertyName: any): any;
    static getPdfContentData(control: XRPdfContentViewModel): any;
}
