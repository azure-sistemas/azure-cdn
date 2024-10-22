﻿/**
* DevExpress HTML/JS Reporting (designer\internal\dragdrop\_fieldListDragDropHelper.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { getUsefulReportWidth } from './_utils';
import { ElementViewModel, Size, IElementViewModel, ISurfaceContext, ISize } from '@devexpress/analytics-core/analytics-elements';
import { TreeListItemViewModel } from '@devexpress/analytics-core/analytics-widgets-internal';
import { ISelectionTarget } from '@devexpress/analytics-core/analytics-internal';
export declare class FieldListDragDropHelper {
    private _dataBindingMode;
    private _size?;
    constructor(_dataBindingMode: string, _size?: Size);
    private _createTable;
    private _getItemsFromList;
    private _getFirstLevelItems;
    createTableFromListSource(treeListItem: TreeListItemViewModel, parent: any): JQuery.Promise<IElementViewModel, any, any>;
    createTableFromItems(treeListItems: TreeListItemViewModel[], parent: any): JQuery.Promise<IElementViewModel, any, any>;
}
export declare var memberControlsMap: {
    'Array': {
        drop: (treeListItem: TreeListItemViewModel, dropTargetControl: ElementViewModel, dataBindingMode: any) => any;
        size: (surface?: ISurfaceContext) => ISize;
    };
    'Bool': {
        drop: (treeListItem: TreeListItemViewModel, dropTargetControl: ElementViewModel, dataBindingMode: any) => any;
        size: (surface?: ISurfaceContext) => ISize;
    };
    'List': {
        drop: (treeListItem: TreeListItemViewModel, dropTargetControl: ElementViewModel, dataBindingMode: any, size?: Size) => JQueryPromise<IElementViewModel>;
        size: typeof getUsefulReportWidth;
        adjustDropTarget: (dropTarget: ISelectionTarget) => any;
    };
    'MultiList': {
        drop: (treeListItem: TreeListItemViewModel, dropTargetControl: ElementViewModel, dataBindingMode: any, size?: Size) => JQueryPromise<IElementViewModel>;
        size: typeof getUsefulReportWidth;
        adjustDropTarget: (dropTarget: ISelectionTarget) => any;
    };
    'Default': {
        drop: (treeListItem: TreeListItemViewModel, dropTargetControl: ElementViewModel, dataBindingMode: any) => any;
        size: (surface?: ISurfaceContext) => ISize;
    };
};
