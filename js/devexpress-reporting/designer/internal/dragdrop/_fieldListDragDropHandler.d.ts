﻿/**
* DevExpress HTML/JS Reporting (designer\internal\dragdrop\_fieldListDragDropHandler.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jqueryui" />
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/resizable';
import 'jquery-ui/ui/widgets/selectable';
import 'jquery-ui/ui/widgets/mouse';
import { ReportSurface } from '../../controls/xrReport';
import { IComponentAddedEventArgs } from '../../utils/inititalizer';
import { SurfaceSelection, IDataSourceInfo, DragDropHandler, SnapLinesHelper, DragHelperContent } from '@devexpress/analytics-core/analytics-internal';
import { UndoEngine } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export declare class FieldListDragDropHandler extends DragDropHandler {
    private _canAddItems;
    private _undoEngine;
    private _dataSources;
    private _getKey;
    private _isIcon;
    private _setDragHelperContent;
    private _getDropTarget;
    private _needToChangeHelperContent;
    private _updateInnerControlSize;
    private _addControl;
    private _isDefaultBindingAssigned;
    canDrop(dropTarget: any, controlModel: any, metaData: any): boolean;
    constructor(_canAddItems: ko.Computed<boolean>, surface: ko.Observable<ReportSurface> | ko.Computed<ReportSurface>, selection: SurfaceSelection, _undoEngine: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>, snapHelper: SnapLinesHelper, dragHelperContent: DragHelperContent, _dataSources: ko.ObservableArray<IDataSourceInfo>, onComponentAdded?: any);
    drag(event: JQueryEventObject, ui: JQueryUI.DraggableEventUIParams): void;
    doStopDrag(ui: any, draggable: any): void;
    onComponentAdded: (e: IComponentAddedEventArgs) => void;
    dataBindingMode: ko.Computed<string>;
}
