﻿/**
* DevExpress HTML/JS Reporting (designer\jsReportDesignerBinding.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { IReportDesignerInitializationModel, IReportDesignerCustomizationHandler } from './utils/inititalizer';
import { IPreviewCustomizationHandler } from '../viewer/utils/initializer';
import { JSReportDesigner } from './jsReportDesigner';
import { ICommonBindingCustomizationHandler, JSDesignerBindingCommon } from '@devexpress/analytics-core/analytics-internal';
export interface IJSDesignerCallbacks extends ICommonBindingCustomizationHandler<JSReportDesigner> {
    designer?: IReportDesignerCustomizationHandler;
    preview?: IPreviewCustomizationHandler;
}
export interface IReportDesignerOptions {
    designerModel?: any;
    initializationData?: IReportDesignerInitializationModel | ko.Observable<IReportDesignerInitializationModel>;
    requestOptions?: {
        host: string;
        getDesignerModelAction: string;
        getLocalizationAction?: string;
    };
    callbacks?: IJSDesignerCallbacks;
    reportModel?: any;
    reportUrl?: any;
    parts?: any[];
    limitation?: boolean;
    undoEngine?: any;
    developmentMode?: boolean;
}
export declare class JSReportDesignerBinding extends JSDesignerBindingCommon<JSReportDesigner, IReportDesignerOptions> {
    private _initializationData;
    private _callbacks;
    private _model;
    private _deferreds;
    private _applyBindings;
    private _initializeCallbacks;
    private _createModel;
    private _showErrorInfo;
    private _getDesignerModelRequest;
    constructor(_options: IReportDesignerOptions, customEventRaiser?: any);
    dispose(): void;
    applyBindings(element: HTMLElement): void;
}
