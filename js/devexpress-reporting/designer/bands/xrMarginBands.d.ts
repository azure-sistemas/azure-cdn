﻿/**
* DevExpress HTML/JS Reporting (designer\bands\xrMarginBands.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { BandViewModel, BandSurface } from './xrBand';
import { ReportSurface } from '../controls/xrReport';
export declare class TopMarginBand extends BandViewModel {
    initHeight(): void;
}
export declare class BottomMarginBand extends BandViewModel {
    initHeight(): void;
}
export declare class BottomMarginSurface extends BandSurface {
    getBackgroundRect(): {
        top: number;
        bottom: any;
        height: number;
    };
    parent: ReportSurface;
}
