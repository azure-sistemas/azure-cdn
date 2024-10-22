﻿/**
* DevExpress HTML/JS Reporting (designer\controls\crossTab\cellCreator.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { Disposable, ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { CrossTabFieldModel, XRCrossTabViewModel } from '../xrCrossTab';
import { CellKind } from './enums';
export interface ICrossTabCell {
    _columnIndex: ko.Observable<number>;
    _rowIndex: ko.Observable<number>;
    _columnSpan: ko.Observable<number>;
    _rowSpan: ko.Observable<number>;
    kind: ko.Observable<CellKind>;
    dataLevel?: number;
    rowLevel?: number;
    columnLevel?: number;
    field?: ko.Observable<CrossTabFieldModel>;
    dependentFields: CrossTabFieldModel[];
}
export declare class CrossTabCellInfo extends SerializableModel implements ICrossTabCell {
    constructor(model: any, serializer?: ModelSerializer);
    _columnIndex: ko.Observable<number>;
    _rowIndex: ko.Observable<number>;
    _columnSpan: ko.Observable<number>;
    _rowSpan: ko.Observable<number>;
    kind: ko.Observable<CellKind>;
    field: ko.Observable<CrossTabFieldModel>;
    dataLevel: number;
    rowLevel: number;
    columnLevel: number;
    dependentFields: CrossTabFieldModel[];
}
export declare class CellCreator extends Disposable {
    protected crossTab: XRCrossTabViewModel;
    readonly rowFieldCount: number;
    readonly columnFieldCount: number;
    readonly dataFieldCount: number;
    readonly rowDataCount: number;
    readonly columnDataCount: number;
    constructor(crossTab: XRCrossTabViewModel);
    nextRowIndex(cell: ICrossTabCell): number;
    lastRowIndex(cell: ICrossTabCell): number;
    nextColumnIndex(cell: ICrossTabCell): number;
    lastColumnIndex(cell: ICrossTabCell): number;
    setCellKind(cell: ICrossTabCell, kind: CellKind): void;
    setLevel(cell: ICrossTabCell, dataLevel: number, columnLevel: number, rowLevel: number): void;
    setDataLevel(cell: ICrossTabCell, level: number): void;
    setColumnLevel(cell: ICrossTabCell, level: number): void;
    setRowLevel(cell: ICrossTabCell, level: number): void;
    indexToLevel(index: number, count: number): number;
    setLayout(cell: ICrossTabCell, columnIndex: any, rowIndex: any, columnSpan: any, rowSpan: any): void;
    static createInstance(crossTab: XRCrossTabViewModel): CellCreator | HorizontalCreator | VerticalCreator;
    create(): any[];
    creator(cellKind: CellKind): ICrossTabCell;
    createCorners(columnCount: number, rowCount: number): ICrossTabCell[];
    createDataHeaders(): any[];
    createDataHeader(columnIndex: any, rowIndex: any, dataLevel: any, columnLevel?: number, rowLevel?: number): ICrossTabCell;
    createData(): ICrossTabCell[];
    createDataCell(colIndex: number, rowIndex: number, level: number): ICrossTabCell;
    createColumnTotals(startColumnIndex: number, startRowIndex: number, dataCount: number): any[];
    createColumnTotal(columnIndex: number, rowIndex: number, dataLevel: number, columnLevel: number): ICrossTabCell;
    createRowTotals(startColumnIndex: number, startRowIndex: number, dataCount: number): any[];
    createRowTotal(columnIndex: any, rowIndex: any, dataLevel: any, rowLevel: any): ICrossTabCell;
    createGrandTotals(dataItems: ICrossTabCell[], startRowIndex: number, startColumnIndex: number, columnInc: number, rowInc: number): any[];
    createGrandTotal(dataLevel: any, columnLevel: any, rowLevel: any): ICrossTabCell;
    setGrandTotalLayout(cells: ICrossTabCell, inc: number, columnIndex: any, rowIndex: any): void;
    createColumnHeaders(startColumnIndex: number, columnSpan: number, dataCount: number): any[];
    createColumnTotalHeaders(startColumnIndex: number, startRowIndex: number, rowSpan: number, dataCount: number): any[];
    createRowHeaders(startRowIndex: number, rowSpan: number, dataCount: number): any[];
    createRowTotalHeaders(startColumnIndex: number, columnSpan: number, startRowIndex: number, dataCount: number): any[];
    createEmptyHeaders(columnSpan: number): any[];
    createEmptyCells(dataCount: number): any[];
    createEmptyHeader(level: number): ICrossTabCell;
    createEmptyCell(level: number): ICrossTabCell;
    createColumnTotalHeader(level: number): ICrossTabCell;
    createColumnGrandTotalHeader(): ICrossTabCell;
    createRowTotalHeader(level: number): ICrossTabCell;
    createRowGrandTotalHeader(): ICrossTabCell;
    lastCorner: ICrossTabCell;
}
export declare class HorizontalCreator extends CellCreator {
    readonly columnDataCount: number;
    createCorners(columnCount: number, rowCount: number): ICrossTabCell[];
    createDataHeaders(): any[];
    createData(): any[];
    createRowTotals(startColumnIndex: number, startRowIndex: number, dataCount: number): any[];
    createColumnTotals(startColumnIndex: number, startRowIndex: number, dataCount: number): any[];
    createGrandTotals(dataItems: ICrossTabCell[], startRowIndex: number, startColumnIndex: number, columnIndex: number, rowIndex: number): any[];
    createColumnTotal(columnIndex: number, rowIndex: number, dataLevel: number, columnLevel: number): ICrossTabCell;
    createRowTotal(columnIndex: number, rowIndex: number, dataLevel: number, rowLevel: number): ICrossTabCell;
    createEmptyHeaders(columnSpan: number): any[];
}
export declare class VerticalCreator extends CellCreator {
    readonly rowDataCount: number;
    createCorners(columnCount: number, rowCount: number): ICrossTabCell[];
    createDataHeaders(): any[];
    createData(): any[];
    createRowTotals(startColumnIndex: number, startRowIndex: number, dataCount: number): any[];
    createColumnTotals(startColumnIndex: number, startRowIndex: number, dataCount: number): any[];
    createColumnTotal(columnIndex: number, rowIndex: number, dataLevel: number, columnLevel: number): ICrossTabCell;
    createRowTotal(columnIndex: number, rowIndex: number, dataLevel: number, rowLevel: number): ICrossTabCell;
    createGrandTotals(dataItems: ICrossTabCell[], startRowIndex: number, startColumnIndex: number, columnIndex: number, rowIndex: number): any[];
    setGrandTotalLayout(items: ICrossTabCell, inc: number, columnIndex: any, rowIndex: any): void;
    createEmptyCells(dataCount: number): any[];
}
