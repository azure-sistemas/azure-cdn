﻿/**
* DevExpress HTML/JS Reporting (designer\actions\tableCellActions.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { TableRowActions } from './tableRowActions';
import { XRTableCellViewModel } from '../controls/xrTableCell';
import { XRTableRowViewModel } from '../controls/xrTableRow';
import { XRTableControlViewModel } from '../controls/xrTable';
import { IComponentAddedEventArgs } from '../utils/inititalizer';
import { ISelectionProvider } from '@devexpress/analytics-core/analytics-internal';
export declare class TableCellActions extends TableRowActions {
    readonly _cell: XRTableCellViewModel;
    readonly _row: XRTableRowViewModel;
    readonly _table: XRTableControlViewModel;
    private readonly _cellSurface;
    constructor(selection: ISelectionProvider, onComponentAdded?: any, isDisabled?: () => boolean);
    insertCell(): void;
    deleteCell(): void;
    deleteRow(): void;
    insertColumn(isRight: boolean): void;
    deleteColumn(): void;
    condition(context: any): boolean;
    onComponentAdded: (e: IComponentAddedEventArgs) => void;
}
