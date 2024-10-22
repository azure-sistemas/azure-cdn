﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrTable.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { XRControlViewModel, XRControlSurfaceBase } from './xrControl';
import { XRTableCellViewModel, XRTableCellSurface } from './xrTableCell';
import { XRTableRowViewModel, XRTableRowSurface } from './xrTableRow';
import { TableCalculationProvider } from './utils/_tableCalculationProvider';
import { ElementViewModel, ISurfaceContext, Point, Size, IElementViewModel } from '@devexpress/analytics-core/analytics-elements';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { IUnitProperties, ISelectionProvider } from '@devexpress/analytics-core/analytics-internal';
export declare class XRTableControlViewModel extends XRControlViewModel {
    private _getAdjacentCells;
    dispose(): void;
    constructor(control: any, parent: ElementViewModel, serializer?: ModelSerializer);
    updateRowLocation(row: XRTableRowViewModel, deltaHeight: number): void;
    addChild(control: IElementViewModel, position?: number, onComponentAdded?: any): void;
    insertRow(selectedRow: XRTableRowViewModel, isRowAbove: boolean, onComponentAdded: any): void;
    removeChild(selectedRow: XRTableRowViewModel): void;
    insertColumn(selectedCell: XRTableCellViewModel, isRight: boolean, onComponentAdded: any): void;
    addColumnToCalculation(diff: number, last?: boolean): void;
    tableCalculationProvider: TableCalculationProvider;
    rows: ko.ObservableArray<XRTableRowViewModel>;
    rowsTotalWeight: ko.Computed<number>;
    pixelHeightWeight: ko.Computed<number>;
    name: ko.Observable<string> | ko.Computed<string>;
    size: Size;
    location: Point;
    surface: XRTableSurface;
}
export declare class XRTableSurface extends XRControlSurfaceBase<XRTableControlViewModel> {
    private _isUpdating;
    static _unitProperties: IUnitProperties<XRTableControlViewModel>;
    _getChildrenHolderName(): string;
    dispose(): void;
    constructor(control: XRTableControlViewModel, context: ISurfaceContext);
    private _isCellInColumn;
    selectColumn(selection: ISelectionProvider, cellSurface: XRTableCellSurface): void;
    isThereIntersectionWithChildCollection(): boolean;
    rows: ko.ObservableArray<XRTableRowSurface>;
}
