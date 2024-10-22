﻿/**
* DevExpress HTML/JS Reporting (designer\tools\generator\_settings.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IReportDesignerCustomizationHandler, IReportDesignerInitializationData, IReportWizardSettings } from '../../utils/inititalizer';
import { IExportSettings, IPreviewCustomizationHandler, IProgressBarSettings } from '../../../viewer/utils/initializer';
import { IEnumType } from '../../../common/customTypes';
import { IReportParametersInfo } from '../../../viewer/parameters/previewParametersViewModel';
import { ReportViewModel } from '../../controls/xrReport';
import { SqlDataSourceEditor } from '../../actions/_sqlDataSourceEditor';
import { JsonDataSourceEditor } from '../../actions/_jsonDataSourceEditor';
import { ObjectDataSourceEditor } from '../../actions/_objectDataSourceEditor';
import { DataSourceActions } from '../../actions/_dataSourceActions';
import { ReportWizard } from '../../wizard/reportWizard';
import { LegacyReportWizard } from '../../wizard/legacyReportWizard';
import { FullscreenReportWizard } from '../../wizard/fullscreenReportWizard';
import { DataSourceHelper } from '../../helpers/_dataSourceHelper';
import { NavigateByReports } from '../navigation/navigateByReports';
import { SaveAsReportDialog } from '../dialogs/saveAsReportDialog';
import { SaveReportDialog } from '../dialogs/saveReportDialog';
import { OpenReportDialog } from '../dialogs/openReportDialog';
import { IKeyValuePair } from '../../../common/types';
import { ILocalizationSettings, SurfaceSelection, IDataSourceInfo, FieldListProvider } from '@devexpress/analytics-core/analytics-internal';
import { UndoEngine } from '@devexpress/analytics-core/analytics-utils';
import { PageFactory, DataSourceWizard, MultiQueryDataSourceWizard, IDataSourceWizardConnectionStrings, FullscreenDataSourceWizard } from '@devexpress/analytics-core/analytics-wizard';
import { IMultiQueryDataSourceWizardCallbacks } from '@devexpress/analytics-core/analytics-wizard-internal';
import * as ko from 'knockout';
export interface IReportDesignerGeneratorSettings {
    selection?: SurfaceSelection;
    rtl?: boolean;
    callbacks: {
        designer?: IReportDesignerCustomizationHandler;
        preview?: IPreviewCustomizationHandler;
    };
    reportStorageWebIsRegister?: boolean;
    allowMDI?: boolean;
    knownEnums?: IEnumType[];
    reportUrl?: ko.Observable<string> | ko.Computed<string>;
    availableDataSources?: IDataSourceInfo[];
    convertBindingsToExpressions?: string;
    state?: any;
    reportPreviewSettings?: IReportPreviewSettings;
}
export interface IReportPreviewSettings {
    exportSettings?: IExportSettings;
    progressBarSettings?: IProgressBarSettings;
}
export interface IReportUriSettings {
    reportDesignerUri?: string;
    previewUri?: string;
}
export interface PreviewOptions {
    element: Element;
    callbacks: IPreviewCustomizationHandler;
    localizationSettings?: ILocalizationSettings;
    parametersInfo?: IReportParametersInfo;
    handlerUri?: string;
    rtl?: boolean;
    exportSettings?: IExportSettings;
}
export declare class WizardsInitializerSettings {
    private callbacks;
    private _doFinishCallback;
    private _getParameters;
    private _getItemsProviderCallBack;
    registerReportWizardPages: (pageFactory: PageFactory) => void;
    registerMultiQueryDataSourceWizardPages: (pageFactory: PageFactory) => void;
    sqlDataSourceEditor: SqlDataSourceEditor;
    jsonDataSourceEditor: JsonDataSourceEditor;
    objectDataSourceEditor: ObjectDataSourceEditor;
    dataSourceActionProvider: DataSourceActions;
    dataSourceWizard: DataSourceWizard;
    multiQueryDataSourceWizard: MultiQueryDataSourceWizard | FullscreenDataSourceWizard;
    multipleQueriesWizardCallbacks: IMultiQueryDataSourceWizardCallbacks;
    reportWizard: ReportWizard | LegacyReportWizard | FullscreenReportWizard;
    createSqlDataSourceWizard(disableCustomSql: any, itemsProvider?: any, model?: ko.Observable<ReportViewModel>): DataSourceWizard;
    createSqlDataSourceEditor(settings: {
        dataSourceHelper: ko.Observable<DataSourceHelper> | ko.Computed<DataSourceHelper>;
        dataSourceWizard: DataSourceWizard;
        model: ko.Observable<ReportViewModel> | ko.Computed<ReportViewModel>;
        undoEngine: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>;
        fieldListProvider: ko.Observable<FieldListProvider> | ko.Computed<FieldListProvider>;
    }): void;
    createMultipleQueriesWizardCallbacks(itemsProvider?: any, model?: ko.Observable<ReportViewModel>): void;
    createMultiQueryDataSourceWizard(disableCustomSql: any, multipleQueriesWizardCallbacks?: IMultiQueryDataSourceWizardCallbacks, allowCreateNewJsonConnection?: boolean): void;
    createReportWizard(settings: {
        dataSourceHelper: ko.Observable<DataSourceHelper> | ko.Computed<DataSourceHelper>;
        navigation: NavigateByReports;
        isLoading: ko.Observable<boolean> | ko.Computed<boolean>;
        isDirty: ko.Observable<boolean> | ko.Computed<boolean>;
        state: () => any;
        model: ko.Observable<ReportViewModel> | ko.Computed<ReportViewModel>;
        undoEngine: ko.Observable<UndoEngine> | ko.Computed<UndoEngine>;
        fieldListProvider: ko.Observable<FieldListProvider> | ko.Computed<FieldListProvider>;
        data: IReportDesignerInitializationData;
    }): void;
    constructor(connectionStrings: IDataSourceWizardConnectionStrings, wizardSettings: IReportWizardSettings, callbacks: IReportDesignerCustomizationHandler, rtl: boolean);
    private reportWizardOptions;
    private multiQueryWizardOptions;
    private dataSourceWizardOptions;
}
export declare class ReportDialogSettings {
    private _designerCallbacks;
    saveReportDialog: SaveAsReportDialog;
    saveReportDialogLight: SaveReportDialog;
    openReportDialog: OpenReportDialog;
    constructor(_designerCallbacks: IReportDesignerCustomizationHandler);
    createSaveReportDialog(reportUrls: ko.ObservableArray<IKeyValuePair<string>>): void;
    createSaveReportDialogLight(saveReportDialog?: SaveAsReportDialog): void;
    createOpenReportDialog(reportUrls: any, navigation: NavigateByReports): void;
}
