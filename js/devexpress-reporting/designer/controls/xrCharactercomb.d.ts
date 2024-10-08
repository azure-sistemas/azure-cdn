﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrCharactercomb.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { XRControlViewModel, XRControlSurface } from './xrControl';
import { ElementViewModel, ISurfaceContext, ISize } from '@devexpress/analytics-core/analytics-elements';
import * as ko from 'knockout';
import { IModelSerializer } from '@devexpress/analytics-core/analytics-utils';
export declare class XRCharacterComb extends XRControlViewModel {
    static unitProperties: any[];
    isPropertyDisabled(name: string): any;
    private _createCellSideFromOriginalSide;
    constructor(control: any, parent: ElementViewModel, serializer?: IModelSerializer);
    roundSize(): void;
    font: ko.Observable<string> | ko.Computed<string>;
    cellWidth: ko.Computed<number>;
    cellHeight: ko.Computed<number>;
    autoCellSide: ko.Observable<number> | ko.Computed<number>;
    verticalSpacing: ko.Observable<number> | ko.Computed<number>;
    horizontalSpacing: ko.Observable<number> | ko.Computed<number>;
    textAlignment: ko.Observable<string> | ko.Computed<string>;
    sizeMode: ko.Observable<string> | ko.Computed<string>;
}
export declare class XRCharacterCombSurface extends XRControlSurface {
    private _createCell;
    private _updateCellsText;
    private _getBorderWidthBySpacing;
    private _applyBounds;
    updateArray(cellsCount: number, array?: Array<any>): void;
    fitBoundsToText(): void;
    constructor(control: XRCharacterComb, context: ISurfaceContext);
    getText(): string;
    borderWidth: ko.Computed<number>;
    borders: ko.Observable<string> | ko.Computed<string>;
    verticalSpacing: ko.Observable<number> | ko.Computed<number>;
    horizontalSpacing: ko.Observable<number> | ko.Computed<number>;
    fullCellWidth: ko.Computed<number>;
    fullCellHeight: ko.Computed<number>;
    cellSize: ISize;
    rtl: () => boolean;
    vertical: ko.Computed<number>;
    horizontal: ko.Computed<number>;
    topEmptySpace: ko.Computed<number>;
    leftEmptySpace: ko.Computed<number>;
    cells: ko.ObservableArray<any>;
}
