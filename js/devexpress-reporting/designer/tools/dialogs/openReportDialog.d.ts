﻿/**
* DevExpress HTML/JS Reporting (designer\tools\dialogs\openReportDialog.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IDialogModel, ReportDialogBase } from './reportDialogBase';
import { INavigateTab } from '../navigation/navigateTab';
import { NavigateByReports } from '../navigation/navigateByReports';
import { IReportDesignerCustomizationHandler } from '../../utils/inititalizer';
import * as ko from 'knockout';
export declare class OpenReportDialogModelBase implements IDialogModel {
    urls: any;
    constructor(popup: OpenReportDialog, urls: any);
    onShow(tab: INavigateTab): void;
    getUrl(): string;
    setUrl(url: any): void;
    onDblClick: (url: string) => void;
    searchValue: ko.Observable<string>;
    searchPlaceholder: () => any;
    popupButtons: any[];
    reportUrl: ko.Observable<string>;
    noDataText: any;
}
export declare class OpenReportDialog extends ReportDialogBase {
    title: string;
    open(url: string): void;
    constructor(subreports: any, navigateByReports: NavigateByReports, callbacks: IReportDesignerCustomizationHandler);
    navigateByReports: NavigateByReports;
    onOpening: (e: any) => void;
    onOpened: (e: any) => void;
}
