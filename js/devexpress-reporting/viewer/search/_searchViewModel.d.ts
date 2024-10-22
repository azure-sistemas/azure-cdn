﻿/**
* DevExpress HTML/JS Reporting (viewer\search\_searchViewModel.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { SearchResultNavigator } from './_searchResultNavigator';
import { ReportPreview } from '../reportPreview';
import { Disposable, IAction, TabInfo } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { IActionsProvider } from '@devexpress/analytics-core/analytics-internal';
import DataSource from 'devextreme/data/data_source';
export interface IFoundText {
    pageIndex: number;
    indexes: string;
    id: number;
    text: string;
}
export interface ISearchResult {
    matches: Array<IFoundText>;
    success: boolean;
}
export interface ISearchEditorModel {
    findUp: () => void;
    findDown: () => void;
    loading: ko.Observable<boolean> | ko.Computed<boolean>;
    searchText: ko.Observable<string> | ko.Computed<string>;
    focusRequested: ko.Subscribable<boolean>;
}
export declare class SearchViewModel extends Disposable implements ISearchEditorModel, IActionsProvider {
    private _cachedRequests;
    private _cachedWholeWordRequests;
    private _cachedCaseSensitiveRequests;
    private _cachedWholeWordWithCaseRequests;
    private _resultNavigator;
    private _timeoutItemRendered;
    private _searchTimeout;
    private _searchIgnoreObs;
    static createResultNavigator: (seacrhModel: SearchViewModel, reportPreview: ReportPreview) => SearchResultNavigator;
    resetSearchResult(): void;
    findTextRequestDone(result: ISearchResult, cache: any): void;
    constructor(reportPreview: ReportPreview, enableKeyboardSupport?: boolean);
    itemClickAction: (e: any) => void;
    onItemRendered(e: any): void;
    getActions(context: any): IAction[];
    noResultText(): string;
    tabInfo: TabInfo;
    actions: IAction[];
    findUp: () => void;
    findDown: () => void;
    goToResult: (result: IFoundText) => void;
    focusRequested: ko.Observable<boolean>;
    matchWholeWord: ko.Observable<boolean>;
    matchCase: ko.Observable<boolean>;
    searchUp: ko.Observable<boolean>;
    searchText: ko.Observable<string>;
    searchResult: ko.Observable<IFoundText[]>;
    readonly disabled: boolean;
    loading: ko.Observable<boolean>;
    _renderedSearchResult: ko.Observable<{
        data: IFoundText;
    }[]>;
    searchResultDataSource: ko.Observable<DataSource> | ko.Computed<DataSource>;
    findNext: () => void;
    clean: () => void;
}
