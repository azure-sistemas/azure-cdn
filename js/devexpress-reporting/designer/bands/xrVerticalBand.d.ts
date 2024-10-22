﻿/**
* DevExpress HTML/JS Reporting (designer\bands\xrVerticalBand.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { XRControlViewModel } from '../controls/xrControl';
import { ReportSurface } from '../controls/xrReport';
import { DetailReportBandSurface } from './xrDetailReportBand';
import { ElementViewModel, ISurfaceContext, SurfaceElementBase, IArea } from '@devexpress/analytics-core/analytics-elements';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { IUnitProperties } from '@devexpress/analytics-core/analytics-internal';
import { BandViewModel } from './xrBand';
export declare class VerticalBandViewModel extends BandViewModel {
    static unitProperties: any[];
    dispose(): void;
    initSize(): void;
    preInit(band: any, parent: ElementViewModel, serializer?: ModelSerializer): void;
    constructor(band: any, parent: ElementViewModel, serializer?: ModelSerializer);
    surface: VerticalBandSurface;
    controls: ko.ObservableArray<XRControlViewModel>;
    width: ko.Observable<number> | ko.Computed<number>;
    height: ko.Observable<number> | ko.Computed<number>;
    widthFromControls: ko.Computed<number>;
}
export declare class VerticalBandSurface extends SurfaceElementBase<VerticalBandViewModel> {
    static markerHeight: number;
    static _unitProperties: IUnitProperties<VerticalBandViewModel>;
    isSomeParentCollapsed: ko.Observable<boolean>;
    private _resize;
    private _getRtlAbsolutePositionX;
    private _getUnitPositionInParent;
    private readonly _unitAbsoluteRect;
    constructor(band: VerticalBandViewModel, context: ISurfaceContext, unitProperties?: IUnitProperties<VerticalBandViewModel>);
    getAbsolutePositionX(): number;
    updateAbsolutePosition(): void;
    minimumHeight(): number;
    minimumWidth(): number;
    collapsed: ko.Observable<boolean> | ko.Computed<boolean>;
    resizeHandles: ko.Computed<string>;
    templateName: string;
    selectiontemplate: string;
    contentSelectionTemplate: string;
    backgroundRect: ko.Computed<IArea>;
    parent: ReportSurface | DetailReportBandSurface;
    readonly verticalBandsContainer: import("./_vericalBandContainer").VerticalBandsContainerSurface;
    height: ko.Observable<number> | ko.Computed<number>;
    name: ko.Observable<string> | ko.Computed<string>;
    coordinateGridOptions: any;
    canResize: ko.Computed<boolean>;
    heightFromControls: ko.Computed<number>;
    widthFromControls: ko.Computed<number>;
}
