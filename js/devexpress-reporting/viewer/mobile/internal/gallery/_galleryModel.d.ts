﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\internal\gallery\_galleryModel.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PreviewPage } from '../../../internal/_page';
import { MobileReportPreview } from '../../mobilePreview';
import * as ko from 'knockout';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
export interface IGalleryItemBlock {
    repaint?: boolean;
    page: PreviewPage;
    classSet?: any;
    visible?: boolean;
    position: ko.Observable<IAbsolutePosition> | ko.Computed<IAbsolutePosition>;
}
export interface IAbsolutePosition {
    left: number;
    top: number;
    height: number;
    width: number;
}
export interface IGalleryItem {
    blocks: ko.ObservableArray<IGalleryItemBlock>;
    realIndex?: number;
}
export declare class GalleryModel extends Disposable {
    preview: MobileReportPreview;
    private previewWrapperSize;
    private _spacing;
    private _animationTimeout;
    private _createBlock;
    constructor(preview: MobileReportPreview, previewWrapperSize: ko.Observable<{
        width: number;
        height: number;
    }>);
    dispose(): void;
    updatePagesVisible(preview: MobileReportPreview): void;
    updateCurrentBlock(): void;
    updateContent(preview: MobileReportPreview, pagesCount: number): void;
    updateBlockPositions(blocks: IGalleryItemBlock[], visible: any): void;
    updateStartBlocks(galleryItem: IGalleryItem, pages: PreviewPage[]): number;
    updateLastBlocks(galleryItem: IGalleryItem, pages: PreviewPage[]): number;
    updateBlocks(galleryItem: IGalleryItem, pagesCount: number, preview: MobileReportPreview, index: any, useAnimation?: boolean): void;
    changePage(preview: MobileReportPreview): void;
    repaint: ko.Observable<{}>;
    repaintTimeout: ko.Observable<number>;
    contentSize: ko.Observable<{
        width: string;
        height: string;
    }> | ko.Computed<{
        width: string;
        height: string;
    }>;
    horizontal: ko.Observable<number> | ko.Computed<number>;
    vertical: ko.Observable<number> | ko.Computed<number>;
    pageCount: number;
    isAnimated: ko.Observable<boolean> | ko.Computed<boolean>;
    items: ko.ObservableArray<IGalleryItem>;
    currentBlockText: ko.Observable<string> | ko.Computed<string>;
    selectedIndexReal: ko.Observable<number>;
    loopEnabled: ko.Computed<boolean>;
    selectedIndex: ko.Observable<number>;
    animationEnabled: ko.Observable<boolean> | ko.Computed<boolean>;
    swipeRightEnable: ko.Computed<boolean>;
    swipeLeftEnable: ko.Computed<boolean>;
}
