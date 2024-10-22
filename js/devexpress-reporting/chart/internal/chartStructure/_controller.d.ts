﻿/**
* DevExpress HTML/JS Reporting (chart\internal\chartStructure\_controller.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jqueryui" />
import { DragDropHandler, DragHelperContent, ObjectStructureTreeListController, SurfaceSelection } from '@devexpress/analytics-core/analytics-internal';
import { TreeListItemViewModel } from '@devexpress/analytics-core/analytics-widgets-internal';
import { UndoEngine } from '@devexpress/analytics-core/analytics-utils';
import { ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
import * as ko from 'knockout';
import { ChartTreeListDragDropHelper } from './_chartTreeListDragDropHelper';
export declare class ChartStructureTreeListController extends ObjectStructureTreeListController {
    private surface?;
    private undoEngine?;
    private dragdrophandler?;
    constructor(propertyNames?: string[], listPropertyNames?: string[], selectCallback?: (value: TreeListItemViewModel) => void, surface?: any, undoEngine?: any, dragdrophandler?: any);
}
export declare class ChartDragDropHandler extends DragDropHandler {
    private undoEngine;
    dispose(): void;
    constructor(surface: ko.Observable<ISurfaceContext> | ko.Computed<ISurfaceContext>, selection: SurfaceSelection, undoEngine: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>, dragHelperContent: DragHelperContent);
    startDrag(draggable: any): void;
    drag(event: JQueryEventObject, ui: JQueryUI.DraggableEventUIParams): void;
    doStopDrag(ui: any, draggable: any, event: JQueryEventObject): void;
    dragDropHelper: ChartTreeListDragDropHelper;
}
