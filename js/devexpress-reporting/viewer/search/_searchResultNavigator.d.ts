﻿/**
* DevExpress HTML/JS Reporting (viewer\search\_searchResultNavigator.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IFoundText, SearchViewModel } from './_searchViewModel';
import { ReportPreview } from '../reportPreview';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export interface ISearchResultNavigator {
    next: (up: boolean) => boolean;
    getFirstMatchFromPage: (pageIndex: number, up: boolean, thisPageOnly?: boolean) => IFoundText;
    currentResult: ko.Observable<IFoundText>;
    goToResult: (resultId: number) => void;
    searchResult: ko.Observable<IFoundText[]>;
}
export declare class SearchResultNavigator extends Disposable implements ISearchResultNavigator {
    constructor(searchModel: SearchViewModel, reportPreview: ReportPreview);
    next: (up: boolean) => boolean;
    getFirstMatchFromPage: (pageIndex: number, up: boolean, thisPageOnly?: boolean) => IFoundText;
    currentResult: ko.Observable<any>;
    goToResult: (resultId: number) => void;
    searchResult: ko.Observable<IFoundText[]>;
}
