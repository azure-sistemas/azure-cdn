﻿/**
* DevExpress HTML/JS Reporting (designer\bands\xrSubband.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { BandViewModel, BandSurface } from './xrBand';
import { ElementViewModel, IElementViewModel } from '@devexpress/analytics-core/analytics-elements';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
export declare class SubBandViewModel extends BandViewModel {
    constructor(band: any, parent: ElementViewModel, serializer?: ModelSerializer);
    isPropertyDisabled(name: string): any;
    isAllowedParent(target: IElementViewModel): boolean;
}
export declare class SubBandSurface extends BandSurface {
    getAbsolutePositionY(): number;
    getBackgroundRect(): {
        top: number;
        bottom: any;
        height: number;
    };
    protected _initMultiColumn(): void;
    parent: BandSurface;
    leftMarginTemplate: string;
}
