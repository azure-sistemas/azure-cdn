﻿/**
* DevExpress HTML/JS Reporting (designer\actions\tableRowActions.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { XRTableRowViewModel } from '../controls/xrTableRow';
import { XRTableControlViewModel } from '../controls/xrTable';
import { IComponentAddedEventArgs } from '../utils/inititalizer';
import { BaseActionsProvider, ISelectionProvider } from '@devexpress/analytics-core/analytics-internal';
export declare class TableRowActions extends BaseActionsProvider {
    selection: ISelectionProvider;
    readonly _row: XRTableRowViewModel;
    readonly _table: XRTableControlViewModel;
    isDisabled(): boolean;
    constructor(selection: ISelectionProvider, onComponentAdded?: any, isDisabled?: () => boolean);
    insertRowAbove(): void;
    insertRowBelow(): void;
    deleteRow(): void;
    condition(context: any): boolean;
    onComponentAdded: (e: IComponentAddedEventArgs) => void;
}
