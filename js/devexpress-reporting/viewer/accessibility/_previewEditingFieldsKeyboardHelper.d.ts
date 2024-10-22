﻿/**
* DevExpress HTML/JS Reporting (viewer\accessibility\_previewEditingFieldsKeyboardHelper.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { AccessibilityControlElementBase, AccessibilityKeyboardHelperBase } from '@devexpress/analytics-core/analytics-internal';
import { IEditingFieldViewModel } from '../editing/editingField';
export declare class PreviewEditingFieldsKeyboardHelper extends AccessibilityKeyboardHelperBase {
    controlElementClassName: string;
    accessibilityCompliantEnabled: boolean;
    initialize(): void;
    clickHandler(): void;
    itemHandleEnterKey(e: any, index: any): boolean;
    itemHandleSpaceKey(e: any, index: any): boolean;
    createControlElement(element: HTMLElement, index?: number): PreviewEditingFieldsElement;
}
declare class PreviewEditingFieldsElement extends AccessibilityControlElementBase {
    element: HTMLElement;
    private model;
    private _processFocus;
    dispose(): void;
    actionExecute(e: any): void;
    private _activateHandler;
    private _blur;
    constructor(element: HTMLElement, model: IEditingFieldViewModel);
}
export {};
