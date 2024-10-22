﻿/**
* DevExpress HTML/JS Reporting (designer\internal\dragdrop\_reportControlsDragDropHelper.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DragHelperContent, ISelectionTarget } from '@devexpress/analytics-core/analytics-internal';
import { ReorderTreeListDragDropHelper, TreeListItemViewModel } from '@devexpress/analytics-core/analytics-widgets-internal';
import { UndoEngine } from '@devexpress/analytics-core/analytics-utils';
export declare class ReportControlsDragDropHelper extends ReorderTreeListDragDropHelper {
    private _dragHelperContent?;
    private _undoEngine?;
    private _isTargetContainer;
    private _serializer;
    private _orderingAreaHeight;
    private _tableControlTypes;
    private _canReorder;
    private _canInsertToTarget;
    private _targetIsClosestOfDraggable;
    private _canDrop;
    private _insertTableChildren;
    private _getDroppableClassName;
    private _reorderBands;
    private _reorderTableControls;
    private _changeControlParent;
    constructor(_dragHelperContent?: DragHelperContent, _undoEngine?: UndoEngine);
    start(draggable: TreeListItemViewModel): void;
    setNewDropTarget(elementModel: any, element: HTMLElement, mouseLocationY?: number): void;
    getSiblings(): any;
    stop(): ISelectionTarget;
}
