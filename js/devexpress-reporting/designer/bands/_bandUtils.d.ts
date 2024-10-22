﻿/**
* DevExpress HTML/JS Reporting (designer\bands\_bandUtils.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IBandsHolder } from './_bandHolder';
import { BandViewModel } from './xrBand';
import { SurfaceElementBase, IArea } from '@devexpress/analytics-core/analytics-elements';
export declare function sortBands(band1: any, band2: any): number;
export declare function setMarkerWidth(bandHolder: IBandsHolder, levelCount: any, currentLevel?: number): void;
export declare function getLevelCount(bandHolder: IBandsHolder): number;
export declare function insertBand(bands: ko.ObservableArray<BandViewModel>, newBand: BandViewModel): void;
export declare function initLevels(bands: BandViewModel[]): void;
export declare function generateArray(allbands: BandViewModel[], controlType: string, newLevel?: number): any[];
export declare function _getUnitAbsoluteRect(bandSurface: SurfaceElementBase<BandViewModel>, getPositionInParent: Function): IArea;
