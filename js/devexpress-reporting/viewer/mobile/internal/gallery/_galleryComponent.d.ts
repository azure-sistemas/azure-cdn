﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\internal\gallery\_galleryComponent.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import 'devextreme/ui/gallery';
import { _dxtInherit } from '@devexpress/analytics-core/analytics-internal';
export interface BlockItem {
    element: JQuery;
    left: number;
}
export declare class dxGalleryReportPreview extends _dxtInherit {
    getComponentName(): string;
    ctor(element: any, options: any): void;
    repaint(): void;
    _swipeStartHandler(e: any): void;
    _getNextIndex(offset: any): any;
    _setSwipeAnimation(element: BlockItem, difference: any, offset: any, right: boolean): void;
    _addAnimation(item: any): void;
    _restoreDefault(item: BlockItem): void;
    _getItem(index: any, loopTest: any): any;
    _swipeUpdateHandler(e: any): void;
    _swipeEndHandler(e: any): void;
    _endSwipe(): void;
}
