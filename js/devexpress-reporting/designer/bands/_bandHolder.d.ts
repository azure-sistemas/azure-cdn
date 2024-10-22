﻿/**
* DevExpress HTML/JS Reporting (designer\bands\_bandHolder.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { BandSurface } from './xrBand';
import { MultiColumnSurface } from './multiColumn';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export interface IBandsHolder {
    bands: ko.ObservableArray<BandSurface>;
    verticalBandsContainer?: VerticalBandsContainerSurface;
}
export declare class BandsHolder extends Disposable implements IBandsHolder {
    private _container;
    dispose(): void;
    private _createBandsMapCollection;
    private _addHorizontalBand;
    private _addVerticalBand;
    initialize(bands: any): void;
    constructor(_container: ReportSurface | BandSurface);
    getHeight(): number;
    getTotalHeight(): number;
    getBandAbsolutePositionY(band: BandSurface): number;
    checkUnderCursor(): boolean;
    bands: ko.ObservableArray<BandSurface>;
    verticalBandsContainer: VerticalBandsContainerSurface;
    multiColumn: ko.Computed<MultiColumnSurface>;
}
import { ReportSurface } from '../controls/xrReport';
import { VerticalBandsContainerSurface } from './_vericalBandContainer';
