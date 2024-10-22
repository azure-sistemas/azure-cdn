﻿/**
* DevExpress HTML/JS Reporting (designer\internal\dragdrop\_reportExplorerDragDropHandler.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jqueryui" />
import { ReportControlsDragDropHelper } from './_reportControlsDragDropHelper';
import { SurfaceSelection, DragHelperContent, DragDropHandler } from '@devexpress/analytics-core/analytics-internal';
import { ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
import { UndoEngine } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export declare class ReportExplorerDragDropHandler extends DragDropHandler {
    private _canAddItems;
    private undoEngine;
    private _lastList;
    private _timeout;
    private _isStyle;
    private _isFormatingRule;
    private _isReportControl;
    dispose(): void;
    constructor(_canAddItems: ko.Computed<boolean>, surface: ko.Observable<ISurfaceContext> | ko.Computed<ISurfaceContext>, selection: SurfaceSelection, undoEngine: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>, dragHelperContent: DragHelperContent);
    startDrag(draggable: any): void;
    drag(event: JQueryEventObject, ui: JQueryUI.DraggableEventUIParams): void;
    doStopDrag(ui: any, draggable: any, event: JQueryEventObject): void;
    reportControlsDragDropHelper: ReportControlsDragDropHelper;
}
