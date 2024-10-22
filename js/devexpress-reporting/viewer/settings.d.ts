﻿/**
* DevExpress HTML/JS Reporting (viewer\settings.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
export interface IMessageHandler {
    processError: (message: string, showForUser?: boolean, prefix?: string) => void;
    processMessage: (message: string, showForUser?: boolean) => void;
    processWarning: (message: string, showForUser?: boolean) => void;
}
export declare var EditablePreviewEnabled: ko.Observable<boolean>;
export declare var SearchAvailable: ko.Observable<boolean>;
export declare var ReportServerInvokeUri: string;
export declare var ReportServerExportUri: string;
export declare var AsyncExportApproach: (newVal?: boolean) => boolean;
export declare var MessageHandler: (newVal?: IMessageHandler) => IMessageHandler;
export declare var HandlerUri: (newVal?: string) => string;
export declare var previewDefaultResolution: (newVal?: number) => number;
export declare var ReportServerDownloadUri: (newVal?: string) => string;
export declare var PollingDelay: (newVal?: number) => number;
export declare var TimeOut: (newVal?: number) => number;
