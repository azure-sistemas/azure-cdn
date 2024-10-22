﻿/**
* DevExpress HTML/JS Reporting (designer\bands\_printAcrossBandsPlaceHolder.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { BandSurface } from './xrBand';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export declare class PrintAcrossBandsPlaceHolder extends Disposable {
    band: BandSurface;
    private findNextUntransparentSiblingBand;
    private findFirstNonAcrossBand;
    constructor(band: BandSurface);
    readonly bandModel: import("./xrBand").BandViewModel;
    isVisible: ko.Computed<boolean>;
    absolutePositionY: ko.Computed<number>;
    height: ko.Computed<number>;
}
