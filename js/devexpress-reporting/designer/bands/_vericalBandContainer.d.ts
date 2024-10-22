﻿/**
* DevExpress HTML/JS Reporting (designer\bands\_vericalBandContainer.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { BandSurface } from './xrBand';
import { ReportSurface } from '../controls/xrReport';
import { VerticalBandSurface } from './xrVerticalBand';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { SurfaceSelection } from '@devexpress/analytics-core/analytics-internal';
export declare class VerticalBandsContainerSurface extends Disposable {
    private _parent;
    markerWidth: ko.Observable<number>;
    dispose(): void;
    getBandPosition(): number;
    isLocked(): boolean;
    createScrollViewOptions(target: VerticalBandsContainerSurface, selection: SurfaceSelection): {
        direction: string;
        showScrollbar: string;
        useNative: boolean;
        scrollByContent: boolean;
        scrollByThumb: boolean;
        onStart: () => void;
        onScroll: (e: any) => void;
        onEnd: () => void;
    };
    constructor(_parent: ReportSurface | BandSurface);
    markerClick(selection: SurfaceSelection): void;
    getBandsWidth(bands: VerticalBandSurface[]): number;
    _getTopOffset(): number;
    name: string;
    focused: ko.Computed<boolean>;
    bandOffset: number;
    leftOffset: ko.Computed<number>;
    collapsed: ko.Computed<boolean>;
    selected: ko.Computed<boolean>;
    canResize: ko.Computed<boolean>;
    width: ko.Observable<number> | ko.Computed<number>;
    height: ko.Observable<number> | ko.Computed<number>;
    _height: ko.Computed<number>;
    leftMargin: ko.Computed<number>;
    readonly visible: boolean;
    templateName: string;
    selectionTemplate: string;
    vrulerTemplate: string;
    leftMarginTemplate: string;
    leftMarginSelectionTemplate: string;
    verticalBands: ko.ObservableArray<VerticalBandSurface>;
    minHeight: ko.Computed<number>;
    bandPosition: ko.Computed<number>;
    topOffset: ko.Computed<number>;
    readonly zoom: ko.Observable<number> | ko.Computed<number>;
    grayAreaWidth: ko.Observable<number> | ko.Computed<number>;
    grayAreaLeft: ko.Observable<number> | ko.Computed<number>;
    scrollOffset: ko.Observable<number>;
    locked: ko.Computed<boolean>;
}
