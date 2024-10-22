﻿/**
* DevExpress HTML/JS Reporting (designer\internal\fieldlist\_fieldListController.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IDataMemberInfo, IAction } from '@devexpress/analytics-core/analytics-utils';
import { IActionsProvider, DragDropHandler } from '@devexpress/analytics-core/analytics-internal';
import { TreeListItemViewModel, ITreeListController } from '@devexpress/analytics-core/analytics-widgets-internal';
export declare class FieldListController implements ITreeListController {
    private _actionProviders;
    private _fieldListActionWrapper;
    private _customizeFieldListActions;
    private _selectedItems;
    dispose(): void;
    constructor(actionProviders?: IActionsProvider[], fieldListActionWrapper?: (actions: IAction[]) => void, dragDropHandler?: DragDropHandler, customizeFieldListActions?: (item: IDataMemberInfo, actions: IAction[]) => void);
    itemsFilter(item: IDataMemberInfo): boolean;
    static isList(item: IDataMemberInfo): boolean;
    hasItems: typeof FieldListController.isList;
    select(item: TreeListItemViewModel): void;
    canSelect(item: TreeListItemViewModel): boolean;
    getActions(item: TreeListItemViewModel): IAction[];
    canMultiSelect(item: TreeListItemViewModel): any;
    multiSelect(item: TreeListItemViewModel, isShiftPressed?: boolean, isCtrlPressed?: boolean): void;
    isDraggable(item: TreeListItemViewModel): boolean;
    dragDropHandler: DragDropHandler;
    selectedItem: TreeListItemViewModel;
    selectedItems(): TreeListItemViewModel[];
}
