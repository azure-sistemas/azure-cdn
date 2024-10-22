﻿/**
* DevExpress HTML/JS Reporting (viewer\accessibility\_previewBricksKeyboardHelper.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { AccessibilityControlElementBase, KeyboardHelperWithArrowButtonBase } from '@devexpress/analytics-core/analytics-internal';
import { ReportPreview } from '../reportPreview';
export declare class PreviewBricksKeyboardHelper extends KeyboardHelperWithArrowButtonBase {
    controlElementClassName: string;
    liveRegionId: string;
    private _needFocusNext;
    private _currentPage;
    private _firstSelectedBrickIndex;
    private _lastSelectedBrickIndex;
    private _resetBricksIndexes;
    private _resetBricks;
    private _activeBricksSubscription;
    private _bricks;
    private _getSelectedContent;
    private _usePageKeyboardNavigation;
    private _pages;
    private _goToPage;
    private _initTimeout;
    private _liveRegionTimeout;
    private _afterInitializeCallback;
    dispose(): void;
    delayedInit: () => void;
    constructor(viewModel: ReportPreview);
    reset: () => void;
    initialize(): void;
    clickHandler(): void;
    itemHandleEscKey(e: any, index: any): boolean;
    private _actionExecute;
    private _getNonEmptyBrick;
    private _pageChangeHandle;
    private _activatePage;
    itemHandleHomeKey(e: any, index: any): boolean;
    itemHandleEndKey(e: any, index: any): boolean;
    itemHandleLeftArrowKey(e: any, index: any): boolean;
    itemHandleRightArrowKey(e: any, index: any): boolean;
    itemHandleEnterKey(e: any, index: any): boolean;
    itemHandleSpaceKey(e: any, index: any): boolean;
    setFocusToPrevious(currentIndex: number): number;
    setFocusToNext(currentIndex: number): number;
    createControlElement(element: HTMLElement, index?: number): PreviewPageControlsElement;
    active: boolean;
}
declare class PreviewPageControlsElement extends AccessibilityControlElementBase {
    element: HTMLElement;
    private _keyboardHelper;
    dispose(): void;
    private _focusHandler;
    constructor(element: HTMLElement, _keyboardHelper: PreviewBricksKeyboardHelper);
}
export {};
