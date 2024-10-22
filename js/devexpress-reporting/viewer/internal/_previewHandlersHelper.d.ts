﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_previewHandlersHelper.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ReportPreview } from '../reportPreview';
export interface IProgressStatus {
    requestAgain: boolean;
    completed?: boolean;
    progress?: number;
    error?: string;
}
export interface IExportProgressStatus extends IProgressStatus {
    token?: string;
    uri?: string;
}
export interface IDocumentBuildStatus extends IProgressStatus {
    pageCount?: number;
}
export declare class PreviewHandlersHelper {
    private _preview;
    constructor(preview: ReportPreview);
    doneStartExportHandler(deffered: any, inlineResult: boolean, response: any, useSameTab?: boolean, printable?: boolean): void;
    errorStartExportHandler(deffered: any, error: any): void;
    doneExportStatusHandler(deffered: JQueryDeferred<any>, operationId: string, response: any): void;
    errorExportStatusHandler(deffered: JQueryDeferred<IDocumentBuildStatus>, error: any): void;
    doneStartBuildHandler(deffered: any, response: any, startBuildOperationId: string): void;
    errorStartBuildHandler(deffered: any, error?: any): void;
    errorGetBuildStatusHandler(deffered: JQueryDeferred<IDocumentBuildStatus>, error: any, ignoreError: () => boolean): void;
    doneGetBuildStatusHandler(deffered: JQueryDeferred<IDocumentBuildStatus>, documentId: string, response: any, stopProcessingPredicate: () => boolean): void;
}
