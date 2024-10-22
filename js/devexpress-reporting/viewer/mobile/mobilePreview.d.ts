﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\mobilePreview.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IMobileSearchPanel } from './internal/_mobileSearch';
import { ReportPreview } from '../reportPreview';
import { PreviewRequestWrapper } from '../internal/_previewRequestWrapper';
import { PreviewHandlersHelper } from '../internal/_previewHandlersHelper';
import { IPreviewCustomizationHandler, IMobileModeSettings } from '../utils/initializer';
import { IBrickNode } from '../utils/utils';
import { MobilePreviewPage } from './internal/_mobilePage';
import * as ko from 'knockout';
export interface ISlideOptions {
    dispose: () => void;
    disabled: ko.Observable<boolean> | ko.Computed<boolean>;
    readerMode: boolean;
    animationSettings: IPreviewAnimationSettings;
    repaintTimeout: ko.Observable<number>;
    searchPanel: IMobileSearchPanel;
    swipeEnabled: ko.Observable<boolean> | ko.Computed<boolean>;
    reachedTop: ko.Observable<boolean> | ko.Computed<boolean>;
    reachedLeft: ko.Observable<boolean> | ko.Computed<boolean>;
    reachedRight: ko.Observable<boolean> | ko.Computed<boolean>;
    scrollAvailable: ko.Observable<boolean> | ko.Computed<boolean>;
    zoomUpdating: ko.Observable<boolean> | ko.Computed<boolean>;
    galleryIsAnimated: ko.Observable<boolean> | ko.Computed<boolean>;
    autoFitBy: ko.Observable<number> | ko.Computed<number>;
    topOffset: ko.Observable<number> | ko.Computed<number>;
    brickEventsDisabled: ko.Observable<boolean> | ko.Computed<boolean>;
}
export interface IZoomOptions {
    zoomUpdating: ko.Observable<boolean> | ko.Computed<boolean>;
    zoom: ko.Observable<number> | ko.Computed<number>;
}
export interface IPreviewAnimationSettings {
    zoomEnabled: ko.Observable<boolean> | ko.Computed<boolean>;
    swipeEnabled: ko.Observable<boolean> | ko.Computed<boolean>;
}
export declare class MobileReportPreview extends ReportPreview {
    constructor(handlerUri?: string, previewRequestWrapper?: PreviewRequestWrapper, previewHandlersHelper?: PreviewHandlersHelper, callbacks?: IPreviewCustomizationHandler, rtl?: boolean, mobileSettings?: IMobileModeSettings);
    createPage(pageIndex: number, processClick?: (target: IBrickNode) => void, loading?: ko.Observable<boolean>): MobilePreviewPage;
    createBrickClickProcessor(cyclePageIndex: number): (brick: IBrickNode) => void;
    _hasActiveEditingFields(): boolean;
    showActions(s: MobileReportPreview): void;
    onSlide(e: any): void;
    availablePages: ko.Observable<number[]>;
    visiblePages: ko.Computed<import("../internal/_page").PreviewPage[]>;
    goToPage(pageIndex: any, forcePage?: any): void;
    getScrollViewOptions(): {
        onUpdated: (e: any) => void;
        direction: string;
        pushBackValue: number;
        bounceEnabled: boolean;
        disabled: ko.Observable<boolean>;
    };
    setScrollReached(e: any): void;
    dispose(): void;
    readerMode: boolean;
    animationSettings: IPreviewAnimationSettings;
    topOffset: ko.Observable<number>;
    previewWrapperSize: ko.Observable<{
        width: number;
        height: number;
    }>;
    searchPanelVisible: ko.Observable<boolean>;
    interactionDisabled: ko.Observable<boolean> | ko.Computed<boolean>;
    actionsVisible: ko.Observable<boolean>;
    scrollReachedLeft: ko.Observable<boolean>;
    scrollReachedRight: ko.Observable<boolean>;
    scrollReachedTop: ko.Observable<boolean>;
    scrollReachedBottom: ko.Observable<boolean>;
    zoomUpdating: ko.Observable<boolean>;
    mobileZoom: ko.Computed<number>;
}
