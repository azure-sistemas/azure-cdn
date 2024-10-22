﻿/**
* DevExpress HTML/JS Reporting (designer\internal\dragdrop\_selectionDragDropHandler.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
import { SurfaceSelection, SnapLinesHelper, DragHelperContent, SelectionDragDropHandler as AnalyticSelectionDragDropHandler } from '@devexpress/analytics-core/analytics-internal';
import { UndoEngine } from '@devexpress/analytics-core/analytics-utils';
export declare class SelectionDragDropHandler extends AnalyticSelectionDragDropHandler {
    private _canAddItems;
    private _localizationCanDrop;
    constructor(_canAddItems: ko.Computed<boolean>, surface: ko.Observable<ISurfaceContext> | ko.Computed<ISurfaceContext>, selection: SurfaceSelection, undoEngine: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>, snapHelper: SnapLinesHelper, dragHelperContent: DragHelperContent);
    getLocation(adjustedTarget: any, item: any): import("@devexpress/analytics-core/analytics-elements").IArea;
    canDrop(dropTarget: any, controlModel: any, metaData: any): boolean;
}
