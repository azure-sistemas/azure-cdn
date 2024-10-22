﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_sizeUtils.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IElementPosition } from './_progressViewModel';
export declare function stringToPosition(position: string): IElementPosition;
export declare function getDockedElementCallback($targetElement: JQuery<Element>, $viewer: JQuery<Element>, $window: JQuery<Window>, selector: string, position?: IElementPosition): (viewer: Element) => void;
export declare function updatePreviewContentSize(previewSize: ko.Observable<number> | ko.Computed<number>, root: Element, rtl?: boolean): (tabPanelPosition?: string) => void;
export declare function updatePreviewZoomWithAutoFit(width: any, height: any, $element: JQuery<Element>, autoFitBy?: number): number;
