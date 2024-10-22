﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\internal\_mobileSearch.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SearchViewModel } from '../../search/_searchViewModel';
import { MobileReportPreview } from '../mobilePreview';
import { GalleryModel, IGalleryItemBlock } from './gallery/_galleryModel';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export interface IMobileSearchPanel {
    searchPanelVisible: ko.Observable<boolean> | ko.Computed<boolean>;
    height: ko.Observable<number> | ko.Computed<number>;
    editorVisible: ko.Observable<boolean> | ko.Computed<boolean>;
}
export declare class MobileSearchViewModel extends SearchViewModel implements IMobileSearchPanel {
    static maxHeight: number;
    focusEditor(event: any): void;
    private _killSubscription;
    private _updateBricks;
    constructor(reportPreview: MobileReportPreview, gallery: GalleryModel);
    updatePagesInBlocks(blocks: Array<IGalleryItemBlock>): void;
    stopSearching(): void;
    startSearch(): void;
    editorVisible: ko.Observable<boolean> | ko.Computed<boolean>;
    height: ko.Observable<number>;
    searchPanelVisible: ko.Observable<boolean> | ko.Computed<boolean>;
    enabled: ko.Observable<boolean> | ko.Computed<boolean>;
}
export declare class SearchBarModel extends Disposable {
    private viewModel;
    constructor(viewModel: MobileSearchViewModel, element: HTMLDivElement, $searchText: JQuery<Element>);
    dispose(): void;
}
