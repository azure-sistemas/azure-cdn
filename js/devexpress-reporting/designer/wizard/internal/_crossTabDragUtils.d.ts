﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\_crossTabDragUtils.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DragDropHandler } from '@devexpress/analytics-core/analytics-internal';
import { TreeListItemViewModel } from '@devexpress/analytics-core/analytics-widgets-internal';
import { FieldListController } from '../../internal/fieldlist/_fieldListController';
export declare class CrossTabWizardFieldListController extends FieldListController {
    isDraggable(item: TreeListItemViewModel): boolean;
    showIconsForChildItems: () => boolean;
}
export declare class CrossTabWizardDragDropHandler extends DragDropHandler {
    private _addHandler;
    private _dropTarget;
    constructor(dragHelperContent: any, _addHandler: any);
    helper(draggable: any, event: any): JQuery<HTMLElement>;
    doStopDrag(ui: any, draggable: any): void;
    drag(event: JQueryEventObject, ui: any): void;
}
