﻿/**
* DevExpress HTML/JS Reporting (designer\bands\xrPageBand.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { BandSurface } from './xrBand';
import { ReportSurface } from '../controls/xrReport';
export declare class PageFooterSurface extends BandSurface {
    getBackgroundRect(): {
        top: number;
        bottom: any;
        height: number;
    };
    parent: ReportSurface;
}
