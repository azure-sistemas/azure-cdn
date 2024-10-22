﻿/**
* DevExpress HTML/JS Reporting (designer\utils\utils.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { BandViewModel } from '../bands/xrBand';
import { ElementViewModel } from '@devexpress/analytics-core/analytics-elements';
import { ISelectionTarget } from '@devexpress/analytics-core/analytics-internal';
export declare function base64UTF16LEtobase64UTF8(base64UTF16: string, resultCallback: any): void;
export declare function _isReorderBand(dropTarget: ISelectionTarget, dragFrom: ElementViewModel): boolean;
export declare function _isMarginBand(band: BandViewModel): boolean;
export declare function _isPageBand(band: BandViewModel): boolean;
export declare var availableFonts: import("knockout").Observable<{
    [key: string]: string;
}>;
