﻿/**
* DevExpress HTML/JS Reporting (designer\utils\inititalizer.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { INavigateTab } from '../tools/navigation/navigateTab';
import { IParametersCustomizationHandler } from '../../viewer/utils/initializer';
import { ReportDialogBase } from '../tools/dialogs/reportDialogBase';
import { WizardTypeString, WizardType } from '../wizard/wizardTypes';
import { ControlsFactory } from '../controls/utils/controlsFactory';
import { DataBindingModeValue, DefaultCrossTabControlValue } from './settings';
import { IKeyValuePair } from '../../common/types';
import { IEnumType } from '../../common/customTypes';
import { IDataMemberInfo, IAction } from '@devexpress/analytics-core/analytics-utils';
import { IDataSourceInfo, ICommonCustomizationHandler, IDesignerPart, IGlobalizeSettings } from '@devexpress/analytics-core/analytics-internal';
import { DataSourceWizardSettings, IDataSourceWizardSettings, IConnectionStringDefinition } from '@devexpress/analytics-core/analytics-wizard';
import { IStandardPattern } from '@devexpress/analytics-core/analytics-widgets-internal';
import { IReportPreviewSettings } from '../tools/generator/_settings';
export interface IComponentAddedEventArgs {
    parent: any;
    model: any;
}
export interface ICultureItem {
    DisplayName: string;
    Name: string;
}
export interface IReportNavigationTabsCustomizationHandler {
    reportTabClosing?: (tab: INavigateTab, deffered: JQueryDeferred<any>) => boolean;
    reportTabClosed?: (tab: INavigateTab) => void;
    reportOpening?: (e: any) => void;
    reportOpened?: (e: any) => void;
    tabChanged?: (tab: INavigateTab) => void;
}
export interface IReportDesignerCustomizationHandler extends IParametersCustomizationHandler, ICommonCustomizationHandler, IReportNavigationTabsCustomizationHandler {
    fieldLists?: (IPathRequest: any) => JQueryPromise<IDataMemberInfo[]>;
    exitDesigner?: () => void;
    reportSaving?: (e: any) => void;
    reportSaved?: (e: any) => void;
    customizeParts?: (parts: IDesignerPart[]) => void;
    componentAdded?: (e: IComponentAddedEventArgs) => void;
    customizeSaveDialog?: (popup: ReportDialogBase) => void;
    customizeOpenDialog?: (popup: ReportDialogBase) => void;
    customizeWizard?: (wizardType: WizardTypeString, wizard: WizardType) => void;
    customizeSaveAsDialog?: (popup: ReportDialogBase) => void;
    customizeToolbox?: (controlsStore: ControlsFactory) => void;
    customizeFieldListActions?: (fieldListItem: IDataMemberInfo, actions: IAction[]) => void;
}
export interface IDataSourceRefInfo {
    ref: string;
    name: string;
    isSqlDataSource?: boolean;
    isJsonDataSource?: boolean;
    isObjectDataSource?: boolean;
    hasParams?: boolean;
    hasErrors?: boolean;
    dataSerializer?: string;
}
export interface ICultureInfoList {
    csvSeparator?: string;
    fontSet?: Array<string>;
}
export interface IReportWizardSettings extends IDataSourceWizardSettings {
    useFullscreenWizard?: boolean;
    useMasterDetailWizard?: boolean;
}
export declare class ReportWizardSettings extends DataSourceWizardSettings implements IReportWizardSettings {
    createDefault(wizardSettings?: IReportWizardSettings): IReportWizardSettings;
    useFullscreenWizard?: boolean;
    useMasterDetailWizard?: boolean;
}
export interface IWizardConnections {
    sql?: IConnectionStringDefinition[];
    json?: IConnectionStringDefinition[];
}
export interface IReportDesignerInitializationData {
    report: ko.Observable<any>;
    dataBindingMode: DataBindingModeValue;
    convertBindingsToExpressions?: string;
    allowMDI?: boolean;
    allowCreateNewJsonConnection?: boolean;
    reportUrl: ko.Observable<string> | ko.Computed<string>;
    availableDataSources: IDataSourceInfo[];
    formatStringData?: {
        standardPatterns: {
            [key: string]: IStandardPattern;
        };
        customPatterns: {
            [key: string]: Array<string>;
        };
    };
    dataSourceRefs: any[];
    state?: any;
    cultureInfoList?: ICultureInfoList;
    isReportServer?: boolean;
    disableCustomSql: boolean;
    wizardSettings?: IReportWizardSettings;
    wizardConnections?: IWizardConnections;
    isScriptsDisabled?: boolean;
    reportStorageWebIsRegister: boolean;
    subreports?: any;
    reportPreviewSettings?: IReportPreviewSettings;
    defaultCrossTabControl?: DefaultCrossTabControlValue;
}
export interface IReportDesignerInitializationModel extends IGlobalizeSettings {
    reportModel?: any;
    reportModelRootName?: string;
    dataBindingMode?: DataBindingModeValue;
    defaultCrossTabControl?: DefaultCrossTabControlValue;
    allowCreateNewJsonConnection?: boolean;
    convertBindingsToExpressions?: string;
    allowMDI?: boolean;
    formatStringData?: {
        customPatterns: Array<IKeyValuePair<any>>;
        standardPatterns: Array<IKeyValuePair<any>>;
    };
    availableCultures?: ICultureItem[];
    reportUrl?: string;
    dataSources?: IDataSourceInfo[];
    dataSourcesData?: any[];
    dataSourceRefs?: any[];
    subreports?: any;
    internalSettings?: {
        isReportServer?: boolean;
    };
    disableCustomSql: boolean;
    scriptsEnabled?: boolean;
    reportStorageWebIsRegister?: boolean;
    cultureInfoList?: ICultureInfoList;
    reportExtensions?: any;
    wizardSettings?: IReportWizardSettings;
    wizardConnections?: IWizardConnections;
    knownEnums?: Array<IEnumType>;
    localization?: any;
    fieldListMaxNestingLevelUpdate?: number;
    rtl?: boolean;
    handlerUri?: string;
    viewerHandlerUri?: string;
    limitation?: boolean;
    queryBuilderHandlerUri?: string;
    reportPreviewSettings?: IReportPreviewSettings;
}
