﻿/**
* DevExpress HTML/JS Reporting (designer\actions\tableCellGroupActions.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { XRTableCellViewModel } from '../controls/xrTableCell';
import { BaseActionsProvider, ISelectionProvider } from '@devexpress/analytics-core/analytics-internal';
export declare class TableCellGroupActions extends BaseActionsProvider {
    private _selectionProvider;
    private _distributeColumnsAction;
    private _distributeRowsAction;
    constructor(selectionProvider: ISelectionProvider);
    _distributeColumns(): void;
    _distributeRows(): void;
    _calculateMinimalHeight(cell: XRTableCellViewModel): number;
    _calculateTextHeight(cell: XRTableCellViewModel): number;
    _calculateBordersHeight(cell: XRTableCellViewModel): number;
    _isCellTextControl(cell: XRTableCellViewModel): boolean;
    _calculatePaddingsHeight(cell: XRTableCellViewModel): number;
    _calculatePaddingsWidth(cell: XRTableCellViewModel): number;
    _selectedCells(): any[];
    condition(context: any): boolean;
}
