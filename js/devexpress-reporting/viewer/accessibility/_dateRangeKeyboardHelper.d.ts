﻿/**
* DevExpress HTML/JS Reporting (viewer\accessibility\_dateRangeKeyboardHelper.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { AccessibilityKeyboardHelperBase, ControlElementWithParentHighlight, ListKeyboardHelper } from '@devexpress/analytics-core/analytics-internal';
export declare class DateRangeDialogElementsKeyboardHelper extends AccessibilityKeyboardHelperBase {
    private _hide;
    private _visible;
    controlElementClassName: string;
    predefinedDateRangesKeyboardHelper: PredefinedDateRangesKeyboardHelper;
    createControlElement(element: HTMLElement, index?: number): ControlElementWithParentHighlight;
    constructor(_hide: () => void, _visible: ko.Observable<boolean>);
    itemHandleEscKey(e: any, index?: any): boolean;
    itemHandleUpArrowKey(e: any, index?: any): boolean;
    itemHandleTabKey(e: any, index: any): boolean;
    itemHandleShiftTabKey(e: any, index?: any): boolean;
}
export declare class PredefinedDateRangesKeyboardHelper extends ListKeyboardHelper {
    private owner;
    constructor(owner: DateRangeDialogElementsKeyboardHelper);
    itemHandleEscKey(e: any, index: any): boolean;
    itemHandleTabKey(e: any, index: any): boolean;
    itemHandleShiftTabKey(e: any, index?: any): boolean;
    itemHandleUpArrowKey(e: any, index: any): any;
}
