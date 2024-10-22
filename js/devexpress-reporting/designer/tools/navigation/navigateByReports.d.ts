﻿/**
* DevExpress HTML/JS Reporting (designer\tools\navigation\navigateByReports.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ReportViewModel } from '../../controls/xrReport';
import { IReportDesignerCustomizationHandler } from '../../utils/inititalizer';
import { IDesignerContextOptionsInitOptions } from '../generator/reportDesignerContext';
import { NavigateTab } from './navigateTab';
import { XRSubreportSurface } from '../../controls/xrSubreport';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { SurfaceSelection } from '@devexpress/analytics-core/analytics-internal';
export interface INavigationOptions {
    report?: ReportViewModel;
    reportUrl?: ko.Observable<string> | ko.Computed<string>;
    callbacks?: IReportDesignerCustomizationHandler;
    allowMDI?: boolean;
    selection: SurfaceSelection;
    initOptions: IDesignerContextOptionsInitOptions;
    knownEnums?: any;
}
export declare class NavigateByReports extends Disposable {
    private _designerReportModel;
    private _isReportLoading;
    private _removeTab;
    dispose(): void;
    private _closeTab;
    private _closeAll;
    private _getTabByControl;
    private _addTab;
    changeContext(report: ReportViewModel, reportUrl?: ko.Observable<string> | ko.Computed<string>): void;
    constructor(options: INavigationOptions);
    init(isLoading: ko.Observable<boolean>): void;
    removeTab(tab: any, force?: boolean): JQuery.Promise<any, any, any>;
    closeAll(): JQuery.Promise<any, any, any>;
    save: (tab: NavigateTab) => any;
    switch(tab: NavigateTab): void;
    _createNewTab(report: ReportViewModel, url?: ko.Observable<string> | ko.Computed<string>): void;
    goToSubreport(subreportSurface: XRSubreportSurface): void;
    addTab(report: ReportViewModel, url?: ko.Observable<string> | ko.Computed<string>, onCancel?: () => any): JQuery.Promise<any, any, any>;
    checkHeight(): void;
    currentTab: ko.Observable<NavigateTab> | ko.Computed<NavigateTab>;
    height: ko.Observable<number> | ko.Computed<number>;
    tabs: ko.ObservableArray<NavigateTab>;
    allowMDI: boolean;
    knownEnums: any;
    _callbacks: IReportDesignerCustomizationHandler;
    _selection: SurfaceSelection;
    _initializeOptions: IDesignerContextOptionsInitOptions;
    _selectedIndex: ko.Observable<number> | ko.Computed<number>;
    selectedIndex: ko.Computed<number>;
}
