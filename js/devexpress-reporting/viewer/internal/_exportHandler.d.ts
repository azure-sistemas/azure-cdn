﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_exportHandler.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import { IExportProgressStatus } from './_previewHandlersHelper';
import { ReportPreview } from '../reportPreview';
import { IExportSettings } from '../utils/initializer';
export declare class ExportResultRequestData {
    RequestUrl: string;
    FormData: Object;
    QueryParameters: Object;
}
export declare class ExportHandler extends Disposable {
    private preview;
    exportActionUri: ko.Observable<string>;
    exportFormData: ko.Observable<any[]>;
    reportDisplayName: ko.Observable<string>;
    popupVisible: ko.Observable<boolean>;
    popupWidth: ko.Observable<number>;
    popupHeight: ko.Observable<number>;
    exportingFrame: HTMLIFrameElement;
    postingForm: HTMLFormElement;
    exportingFrameName: string;
    popupButtons: {
        toolbar: string;
        location: string;
        widget: string;
        options: {
            text: any;
            onClick: () => any;
        };
    }[];
    printingLinkCallback: () => void;
    printingTextPrefix: ko.Observable<string>;
    printingTextPostfix: ko.Observable<string>;
    getPopupTitle: () => string;
    onExportCustomEvent: (data: any) => void;
    private _exportResultRequestData;
    private _showPrintNotificationDialog;
    private _useSameTabExport;
    private _useAsynchronousExport;
    private _workerTicker;
    private _workerFunctionBlobUrl;
    private _workerTickerFunction;
    constructor(exportSetting: IExportSettings, preview: ReportPreview);
    private _getUrlObject;
    private _createWorker;
    private _terminateWorker;
    private _callPrint;
    private _window;
    private _clearExportingFrame;
    private _initPrintingWindow;
    private _setPrintingLinkCallback;
    private _formSubmit;
    private _doExportSync;
    private _initExportWindow;
    private _startExportAsync;
    export(args: string, actionUri: string, inlineResult?: boolean, printable?: boolean): JQuery.Promise<boolean, any, any>;
    private _isNewBrowser;
    private _showAsyncExportError;
    private _printUsingBlob;
    private _addQueryParamsToUri;
    private _replaceLocation;
    private _timeouts;
    dispose(): void;
    updateExportStatus(progress: number): void;
    getExportStatus(operationId: string): JQueryPromise<IExportProgressStatus>;
    getExportResult(operationId: string, inlineDisposition: boolean, useSameTab: boolean, token?: string, printable?: boolean, uri?: string): void;
}
