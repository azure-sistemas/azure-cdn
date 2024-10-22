﻿/**
* DevExpress HTML/JS Reporting (designer\jsReportDesigner.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IReportDesignerRootContext } from './tools/generator/reportDesignerContext';
import { WizardRunType } from './wizard/wizardTypes';
export declare class JSReportDesigner {
    private _designerModel;
    designerModel: IReportDesignerRootContext;
    constructor(_designerModel: ko.Observable<IReportDesignerRootContext>);
    UpdateLocalization(localization: any): void;
    GetDesignerModel(): IReportDesignerRootContext;
    GetPreviewModel(): any;
    GetPropertyInfo(controlType: any, path: any): any;
    GetButtonStorage(): any;
    RunWizard(wizardType: WizardRunType): void;
    GetJsonReportModel(): any;
    IsModified(): boolean;
    ResetIsModified(): void;
    AddToPropertyGrid(groupName: any, property: any): void;
    AddParameterType(parameterInfo: any, editorInfo: any): void;
    RemoveParameterType(parameterType: any): void;
    GetParameterInfo(parameterType: any): import("../dx-reportdesigner").IParameterTypeValue;
    GetParameterEditor(valueType: any): import("@devexpress/analytics-core/analytics-utils").IEditorInfo;
    ReportStorageGetData(url: any): any;
    ReportStorageSetData(reportLayout: any, url: any): any;
    ReportStorageSetNewData(reportLayout: any, url: any): JQueryPromise<any>;
    SaveReport(): any;
    GetTabs(): import("../dx-reportdesigner").INavigateTab[];
    GetCurrentTab(): import("../dx-reportdesigner").NavigateTab;
    CloseTab(tab: any, force?: boolean): void;
    CloseCurrentTab(): void;
    AdjustControlCore(): void;
    SaveNewReport(reportName: any): JQueryPromise<any>;
    ReportStorageGetUrls(): any;
    OpenReport(url: any): void;
    ShowPreview(): void;
}
