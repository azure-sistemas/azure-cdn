﻿/**
* DevExpress HTML/JS Reporting (viewer\utils\initializer.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IGeneratedDocumentData } from '../internal/_previewRequestWrapper';
import { IReportParametersInfo, PreviewParametersViewModel } from '../parameters/previewParametersViewModel';
import { ReportPreview } from '../reportPreview';
import { IParameterDescriptor, IParameter } from '../parameters/parameterHelper';
import { IKeyValuePair } from '../../common/types';
import { IBrickNode } from './utils';
import { EditingField } from '../editing/editingField';
import { ExportOptionsPreview } from '../exportOptions/exportOptionsPreview';
import { ISerializationInfo, IDisplayedValue, TabPanel } from '@devexpress/analytics-core/analytics-utils';
import { ILocalizationSettings, ICommonCustomizationHandler, IDesignerPart, IGlobalizeSettings } from '@devexpress/analytics-core/analytics-internal';
export interface IPreviewInitialize {
    reportId?: string;
    documentData?: IGeneratedDocumentData;
    reportUrl?: string;
    documentId?: string;
    pageSettings?: IPreviewPageInitialSettings;
    exportOptions?: string;
    parametersInfo?: IReportParametersInfo;
    rtlReport?: boolean;
    error?: any;
}
export interface IPreviewModel {
    tabPanel: TabPanel;
    reportPreview: ReportPreview;
    Close: () => void;
    ExportTo: (format?: string, inlineResult?: boolean) => void;
    GetCurrentPageIndex: () => number;
    GetParametersModel: () => PreviewParametersViewModel;
    GoToPage: (pageIndex: number) => void;
    OpenReport: (reportUrl: string) => void;
    Print: (pageIndex?: number) => JQueryPromise<boolean>;
    ResetParameters: () => void;
    StartBuild: () => void;
}
export interface IPreviewPageInitialSettings {
    height?: number;
    width?: number;
    color?: string;
}
export interface IParametersCustomizationHandler {
    customizeParameterEditors?: (parameter: IParameterDescriptor, info: ISerializationInfo) => void;
    customizeParameterLookUpSource?: (parameter: IParameterDescriptor, items: Array<IDisplayedValue>) => any;
    parametersReset?: (parametersViewModel: PreviewParametersViewModel, parameters: IParameter[]) => void;
    parametersSubmitted?: (parametersViewModel: PreviewParametersViewModel, parameters: Array<IKeyValuePair<any>>) => void;
    parametersInitialized?: (parametersModel: PreviewParametersViewModel, actualParametersInfo: any[], submit: () => void, shouldRequestParameters: boolean) => void;
}
export interface IPreviewCustomizationHandler extends IParametersCustomizationHandler, ICommonCustomizationHandler {
    _onGetBuildStatus?: (status: any) => void;
    _onGetDocumentDetails?: (respose: any) => void;
    customizeParts?: (parts: IDesignerPart[]) => void;
    previewClick?: (pageIndex: number, brick: IBrickNode, defaultHandler: () => void) => boolean;
    editingFieldChanged?: (field: EditingField, oldValue: any, newValue: any) => any;
    documentReady?: (documentId: string, reportId: string, pageCount: number) => void;
    customizeExportOptions?: (options: IPreviewExportOptionsCustomizationArgs) => void;
    onExport?: (exportResultRequestData: any) => void;
}
export interface IPreviewExportOptionsCustomizationArgs {
    exportOptions: ExportOptionsPreview;
    panelVisible: boolean;
}
export interface IMobileModeSettings {
    readerMode?: boolean;
    animationEnabled?: boolean;
}
export interface ITabPanelSettings {
    position?: string;
    width?: number | string;
}
export interface IProgressBarSettings {
    position?: string;
    keepOnVisibleArea?: boolean;
}
export interface IRemoteSettings {
    authToken?: string;
    serverUri?: string;
}
export interface IExportSettings {
    useSameTab?: boolean;
    useAsynchronousExport?: boolean;
    showPrintNotificationDialog?: boolean;
}
export interface IWebDocumentViewerSettings extends ILocalizationSettings {
    handlerUri?: string;
    allowURLsWithJSContent?: boolean;
    rtl?: boolean;
    accessibilityCompliant?: boolean;
    isMobile?: boolean;
    mobileModeSettings?: IMobileModeSettings;
    remoteSettings?: IRemoteSettings;
    tabPanelSettings?: ITabPanelSettings;
    progressBarSettings?: IProgressBarSettings;
    exportSettings?: IExportSettings;
}
export interface IWebDocumentViewerModel extends IPreviewInitialize, IWebDocumentViewerSettings, IGlobalizeSettings {
    cultureInfoList?: {
        [key: string]: string;
    };
    previewVisible?: boolean;
}
export interface IBindingSettings {
    element: Element;
    model: IWebDocumentViewerModel;
    callbacks?: IPreviewCustomizationHandler;
    applyBindings?: boolean;
}
