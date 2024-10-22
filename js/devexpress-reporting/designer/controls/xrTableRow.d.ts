﻿/**
* DevExpress HTML/JS Reporting (designer\controls\xrTableRow.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { XRControlViewModel } from './xrControl';
import { XRTableControlViewModel } from './xrTable';
import { XRTableCellViewModel, XRTableCellSurface } from './xrTableCell';
import { TableComponentSurface, TableActionDirection } from './utils/_tableComponentSurface';
import { ISurfaceContext, IElementViewModel } from '@devexpress/analytics-core/analytics-elements';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { IUnitProperties } from '@devexpress/analytics-core/analytics-internal';
export declare class XRTableRowViewModel extends XRControlViewModel {
    static unitProperties: any[];
    dispose(): void;
    constructor(control: any, parent: XRTableControlViewModel, serializer?: ModelSerializer);
    hasCalculationNode(cellIndex: number): boolean;
    addCellToCalculation(cellIndex: number, delta: number): void;
    addColumnToCalculation(diff: number, last?: boolean): void;
    addTableOffset(width?: number, left?: number): void;
    addChild(control: IElementViewModel, position?: number, onComponentAdded?: any): void;
    insertCellCopy(selectedCell: XRTableCellViewModel, isRight: boolean, onComponentAdded: any): void;
    removeChild(selectedCell: XRTableCellViewModel): void;
    parentModel: ko.Observable<XRTableControlViewModel>;
    cells: ko.ObservableArray<XRTableCellViewModel>;
    cellsTotalWeight: ko.Computed<number>;
    pixelWidthWeight: ko.Computed<number>;
    name: ko.Observable<string> | ko.Computed<string>;
    weight: ko.Observable<number> | ko.Computed<number>;
    width: ko.Observable<number> | ko.Computed<number>;
    height: ko.Computed<number>;
    top: ko.Observable<number> | ko.Computed<number>;
    surface: XRTableRowSurface;
}
export declare class XRTableRowSurface extends TableComponentSurface<XRTableRowViewModel> {
    static _unitProperties: IUnitProperties<XRTableRowViewModel>;
    _getChildrenHolderName(): string;
    dispose(): void;
    constructor(control: XRTableRowViewModel, context: ISurfaceContext);
    getAdornTemplate(): string;
    direction: TableActionDirection;
    y: ko.Observable<number> | ko.Computed<number>;
    cells: ko.ObservableArray<XRTableCellSurface>;
}
