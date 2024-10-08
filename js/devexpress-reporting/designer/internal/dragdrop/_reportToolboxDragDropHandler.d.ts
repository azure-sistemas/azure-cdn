﻿/**
* DevExpress HTML/JS Reporting (designer\internal\dragdrop\_reportToolboxDragDropHandler.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ReportSurface } from '../../controls/xrReport';
import { IComponentAddedEventArgs } from '../../utils/inititalizer';
import { SurfaceSelection, ToolboxDragDropHandler, SnapLinesHelper, DragHelperContent, ISelectionTarget } from '@devexpress/analytics-core/analytics-internal';
import { IElementViewModel } from '@devexpress/analytics-core/analytics-elements';
import { UndoEngine, ControlsFactory } from '@devexpress/analytics-core/analytics-utils';
export declare class ReportToolboxDragDropHandler extends ToolboxDragDropHandler {
    _wholeWideControls: string[];
    dispose(): void;
    surface: ko.Observable<ReportSurface> | ko.Computed<ReportSurface>;
    constructor(surface: ko.Observable<ReportSurface> | ko.Computed<ReportSurface>, selection: SurfaceSelection, undoEngine: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>, snapHelper: SnapLinesHelper, dragHelperContent: DragHelperContent, controlsFactory: ControlsFactory, onComponentAdded?: any);
    helper(draggable: any): void;
    private _processProperty;
    doStopDrag(ui: any, draggable: any): void;
    addControl(control: IElementViewModel, dropTargetSurface: ISelectionTarget, size: any): void;
    onComponentAdded: (e: IComponentAddedEventArgs) => void;
}
