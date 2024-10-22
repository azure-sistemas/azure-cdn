﻿/**
* DevExpress HTML/JS Reporting (viewer\binding\jsReportViewerBinding.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IPreviewCustomizationHandler } from '../utils/initializer';
import { JSReportViewer } from './jsReportViewer';
import { ICommonBindingCustomizationHandler, IJSDesignerBindingCommonOptions, JSDesignerBindingCommon } from '@devexpress/analytics-core/analytics-internal';
export interface IJSReportViewerCallbacks extends IPreviewCustomizationHandler, ICommonBindingCustomizationHandler<JSReportViewer> {
}
export interface IReportViewerOptions extends IJSDesignerBindingCommonOptions {
    viewerModel?: any;
    reportPreview?: any;
    callbacks?: IJSReportViewerCallbacks;
    parts?: any[];
    handlerUri?: string;
    requestOptions?: {
        host?: string;
        invokeAction: string;
        getLocalizationAction?: string;
    };
    documentId?: string;
    reportId?: string;
    reportUrl?: any;
    keepReportOnComponentDisposal?: boolean;
}
export declare class JSReportViewerBinding extends JSDesignerBindingCommon<JSReportViewer, IReportViewerOptions> {
    private _callbacks;
    private _deferreds;
    private _closeReportOnDisposing;
    dispose(): void;
    private _initializeEvents;
    private _initializeCallbacks;
    private _applyBindings;
    constructor(_options: IReportViewerOptions, customEventRaiser?: any);
    _createModel(element: any): JQueryDeferred<import("../internal/_previewModel").PreviewDisposableModel>;
    applyBindings(element: any): void;
}
