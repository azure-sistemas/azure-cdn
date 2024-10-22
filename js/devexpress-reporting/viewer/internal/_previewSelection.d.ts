﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_previewSelection.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PreviewPage } from './_page';
export declare class PreviewSelection {
    private _element;
    private _page;
    private _click;
    static started: boolean;
    static disabled: boolean;
    private _$element;
    private _$selectionContent;
    private _$selectionContainer;
    private _bodyEvents;
    private _startRect;
    private _getBodyScrollTop;
    private _getBodyScrollLeft;
    private _updateSelectionContent;
    private _mouseMove;
    private _mouseUp;
    private _mouseDown;
    constructor(_element: HTMLElement, _page: PreviewPage, _click: (pageIndex: number) => void);
    private _dispose;
    dispose: () => void;
}
