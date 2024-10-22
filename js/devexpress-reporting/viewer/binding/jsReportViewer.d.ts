﻿/**
* DevExpress HTML/JS Reporting (viewer\binding\jsReportViewer.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare class JSReportViewer {
    private _previewModel;
    previewModel: any;
    constructor(_previewModel: ko.Observable<any>);
    previewExists(): any;
    GetReportPreview(): any;
    GetPreviewModel(): any;
    GetParametersModel(): any;
    PerformCustomDocumentOperation(customData: any, hideMessageFromUser: any): any;
    OpenReport(reportName: any): any;
    Print(pageIndex: any): any;
    ExportTo(format: any, inlineResult: any): void;
    GetCurrentPageIndex(): any;
    GoToPage(pageIndex: any): void;
    Close(): void;
    ResetParameters(): void;
    StartBuild(): any;
    UpdateLocalization(localization: any): void;
    AdjustControlCore(): void;
}
