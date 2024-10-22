﻿/**
* DevExpress HTML/JS Reporting (designer\bands\xrBand.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { ElementViewModel, ISurfaceContext, Size, SurfaceElementBase, IArea, IElementViewModel } from '@devexpress/analytics-core/analytics-elements';
import { SurfaceSelection, IUnitProperties } from '@devexpress/analytics-core/analytics-internal';
import { XRReportElementViewModel } from '../controls/xrReportelement';
export declare class BandViewModel extends XRReportElementViewModel {
    static unitProperties: string[];
    dispose(): void;
    createChildsArray(band: any, serializer: ModelSerializer): void;
    initHeight(): void;
    preInit(band: any, parent: ElementViewModel, serializer?: ModelSerializer): void;
    constructor(band: any, parent: ElementViewModel, serializer?: ModelSerializer);
    addChild(control: IElementViewModel): void;
    getPath(propertyName: any): any;
    initSize(): void;
    initialize(): void;
    removeChild(control: ElementViewModel): void;
    static isReorderingBand(control: ElementViewModel): boolean;
    isAllowedParent(target: IElementViewModel): boolean;
    private _isHeaderBandTypeOrThemSubBands;
    isPropertyVisible(name: string): any;
    isPropertyDisabled(name: string): any;
    level: ko.Observable<number> | ko.Computed<number>;
    _level: ko.Observable<number> | ko.Computed<number>;
    size: Size;
    name: ko.Observable<string> | ko.Computed<string>;
    height: ko.Observable<number> | ko.Computed<number>;
    bands: ko.ObservableArray<BandViewModel>;
    controls: ko.ObservableArray<XRControlViewModel>;
    heightFromControls: ko.Computed<number>;
    expanded: ko.Observable<boolean> | ko.Computed<boolean>;
    parentModel: ko.Observable<BandViewModel | ReportViewModel>;
    controlType: ReportBandsType;
    maxLevel: ko.PureComputed;
}
export declare class BandSurface extends SurfaceElementBase<BandViewModel> {
    private _getMarginWidth;
    coordinateGridOptions: any;
    dispose(): void;
    static _unitProperties: IUnitProperties<BandViewModel>;
    isSomeParentCollapsed: ko.Observable<boolean>;
    private _resize;
    private _isHeaderBandTypeOrThemSubBands;
    private _getUnitPositionInParent;
    private readonly _unitAbsoluteRect;
    createChildCollection(band: BandViewModel): void;
    createUnderCursor(): void;
    getTotalHeight(): number;
    getHeight(): number;
    getHasOwnRuler(): boolean;
    getBackgroundRect(): {
        top: number;
        bottom: any;
        height: number;
    };
    protected _initMultiColumn(): void;
    constructor(band: BandViewModel, context: ISurfaceContext, unitProperties?: IUnitProperties<BandViewModel>);
    getAbsolutePositionY(): number;
    updateAbsolutePosition(): void;
    markerClick(selection: SurfaceSelection): void;
    showMarker: boolean;
    templateName: string;
    selectionTemplate: string;
    vrulerTemplate: string;
    contentSelectionTemplate: string;
    leftMarginTemplate: string;
    leftMarginSelectionTemplate: string;
    canDrop(): boolean;
    minHeight: ko.Computed<number>;
    allowMultiselect: boolean;
    heightFromControls: ko.Computed<number>;
    subBandsHeight: ko.Computed<number>;
    heightWithoutSubBands: ko.Computed<number>;
    hasOwnRuler: ko.Computed<boolean>;
    rulerHeight: ko.Computed<number>;
    height: ko.Computed<number>;
    markerWidth: ko.Observable<number>;
    name: ko.Observable<string> | ko.Computed<string>;
    parent: ReportSurface | BandSurface;
    bandsHolder: BandsHolder;
    controls: ko.ObservableArray<XRControlSurface>;
    readonly zoom: ko.Observable<number> | ko.Computed<number>;
    collapsed: ko.Observable<boolean> | ko.Computed<boolean>;
    checkParent(surfaceParent: XRControlSurfaceBase<any>): boolean;
    canResize: ko.Computed<boolean>;
    backgroundRect: ko.Computed<IArea>;
    _totalHeight: ko.Computed<number>;
    multiColumn: ko.Computed<MultiColumnSurface>;
    printAcrossBandsPlaceHolder: PrintAcrossBandsPlaceHolder;
    printAcrossBands: ko.Observable<boolean>;
}
import { ReportViewModel, ReportSurface } from '../controls/xrReport';
import { BandsHolder } from './_bandHolder';
import { PrintAcrossBandsPlaceHolder } from './_printAcrossBandsPlaceHolder';
import { MultiColumnSurface } from './multiColumn';
import { XRControlViewModel, XRControlSurface, XRControlSurfaceBase } from '../controls/xrControl';
import { ReportBandsType } from './reportBandsType';
