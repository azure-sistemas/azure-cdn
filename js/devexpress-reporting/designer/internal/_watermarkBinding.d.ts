﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_watermarkBinding.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { BandSurface } from '../bands/xrBand';
import { ReportSurface } from '../controls/xrReport';
export interface WatermarkBindingOptions {
    band: BandSurface;
    reportSurface: ReportSurface;
    forLeftMargin: boolean;
    image: string;
    transparency: number;
    viewMode: string;
    align: string;
    tiling: boolean;
}
