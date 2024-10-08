﻿/**
* DevExpress HTML/JS Reporting (designer\actions\_alignmentHandler.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISelectionProvider } from '@devexpress/analytics-core/analytics-internal';
import { ISurfaceContext } from '@devexpress/analytics-core/analytics-elements';
export declare class AlignmentHandler {
    private _selectionProvider;
    private _surfaceContext;
    constructor(selectionProvider: ISelectionProvider, surfaceContext: ko.Observable<ISurfaceContext>);
    private _getFocusedItem;
    private _getFocusedParent;
    private _getPositionFromBand;
    private _visitAllSelectedItemsInSameContainerWithFocused;
    private _centerByBand;
    private _roundingValue;
    alignLeft(): void;
    alignTop(): void;
    alignRight(): void;
    alignBottom(): void;
    alignVerticalCenters(): void;
    alignHorizontalCenters(): void;
    sizeToControlWidth(): void;
    sizeToControlHeight(): void;
    sizeToControl(): void;
    centerHorizontally(): void;
    centerVertically(): void;
    alignToGrid(): void;
    sizeToGrid(): void;
    sendToBack(): void;
    bringToFront(): void;
    canChangeZOrder(): boolean;
}
