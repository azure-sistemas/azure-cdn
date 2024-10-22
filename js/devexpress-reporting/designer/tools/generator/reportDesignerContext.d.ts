﻿/**
* DevExpress HTML/JS Reporting (designer\tools\generator\reportDesignerContext.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { WizardRunner } from '../../internal/_wizardRunner';
import { ReportViewModel, ReportSurface } from '../../controls/xrReport';
import { NavigateByReports } from '../navigation/navigateByReports';
import { IKeyValuePair } from '../../../common/types';
import { ReportToolboxDragDropHandler } from '../../internal/dragdrop/_reportToolboxDragDropHandler';
import { CalculatedFieldsSource } from '../../internal/fieldlist/_calculatedFieldsSource';
import { ParametersViewModel } from '../../internal/fieldlist/_parametersViewModel';
import { ReportWizard } from '../../wizard/reportWizard';
import { LocalizationEditor } from '../../localization/_localizationEditor';
import { ScriptsEditor } from '../../internal/scripting/_scriptsEditor';
import { SaveAsReportDialog } from '../dialogs/saveAsReportDialog';
import { SaveReportDialog } from '../dialogs/saveReportDialog';
import { OpenReportDialog } from '../dialogs/openReportDialog';
import { StyleModel } from '../../controls/properties/style';
import { FormattingRule } from '../../controls/properties/formattingrules';
import { DisplayNameProvider } from '../../internal/_displayNameProvider';
import { ReportItemsProvider } from '../../internal/reportExplorer/_reportItemsProvider';
import { DataSourceHelper } from '../../helpers/_dataSourceHelper';
import { FieldListDragDropHandler } from '../../internal/dragdrop/_fieldListDragDropHandler';
import { XRChartSurface } from '../../controls/xrChart';
import { INavigateTab } from '../navigation/navigateTab';
import { IReportDesignerCustomizationHandler } from '../../utils/inititalizer';
import { FieldListDataSourcesHelper } from '../../internal/fieldlist/_fieldListDataSourcesHelper';
import { DesignControlsHelper } from '../../helpers/_designControlsHelper';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { SurfaceSelection, IDataSourceInfo, FieldListProvider, IActionsProvider, IDesignerModel, IItemsExtender, IDesignerPart, ObjectExplorerProvider, INamedValue } from '@devexpress/analytics-core/analytics-internal';
import { DataSourceWizard, MultiQueryDataSourceWizard, IDataSourceWizardConnectionStrings } from '@devexpress/analytics-core/analytics-wizard';
import { StylesHelper } from '../../helpers/_styleHelper';
import { ErrorPanelViewModel } from '../../internal/errorPanel/_errorPanelViewModel';
import { ControlScrollingTool } from '../../internal/_controlScrollingTool';
import { DesignerErrorProvider } from '../../internal/errorPanel/_designerErrorProvider';
import { RuntimeErrorProvider } from '../../internal/errorPanel/_runtimeErrorProvider';
export interface IReportDesignerRootContext extends IDesignerModel {
    fullScreen: ko.Computed<boolean>;
    canAddItems: ko.Computed<boolean>;
    _wizardRunner: WizardRunner;
    model: ko.Observable<ReportViewModel>;
    surface: ko.Observable<ReportSurface>;
    navigateByReports: NavigateByReports;
    reportUrls: ko.ObservableArray<IKeyValuePair<string>>;
    fieldListItemsExtenders: ko.Observable<IItemsExtender[]>;
    validationMode: ko.Computed<boolean>;
    drawCrossbandContent: ko.Observable<boolean>;
    rootStyle: string;
    toolboxDragHandler: ReportToolboxDragDropHandler;
    isDirty: ko.Computed<boolean>;
    calculatedFieldsSource: ko.Computed<CalculatedFieldsSource>;
    parameters: ko.Computed<ParametersViewModel>;
    reportPreviewModel: any;
    fieldListActionProviders: IActionsProvider[];
    wizard: ReportWizard;
    dataSourceWizard: DataSourceWizard;
    multiQueryDataSourceWizard: MultiQueryDataSourceWizard;
    localizationEditor: LocalizationEditor;
    addOns: ko.ObservableArray<IDesignerPart>;
    scriptsEditor: ScriptsEditor;
    state: any;
    events: ko.Computed<any[]>;
    gotoEvent: (functionName: any, eventName: any, model: any) => void;
    saveReportDialog: SaveAsReportDialog;
    saveReportDialogLight: SaveReportDialog;
    connections: IDataSourceWizardConnectionStrings;
    availableDataSources: IDataSourceInfo[];
    openReportDialog: OpenReportDialog;
    styles: ko.Computed<ko.ObservableArray<StyleModel>>;
    formattingRuleSheet: ko.Computed<ko.ObservableArray<FormattingRule>>;
    reportExplorerProvider: ObjectExplorerProvider;
    designMode: ko.Observable<boolean> | ko.Computed<boolean>;
    displayNameProvider: ko.Computed<DisplayNameProvider>;
    getDisplayNameByPath: (path: string, value: string) => JQueryPromise<string>;
    fieldListProvider: ko.Computed<FieldListProvider>;
    dataBindingsProvider: ko.Computed<FieldListProvider>;
    fieldListDataSources: ko.ObservableArray<IDataSourceInfo>;
    reportItemsProvider: ko.Computed<ReportItemsProvider>;
    expressionDisplayNameProvider: ko.Computed<DisplayNameProvider>;
    dataSourceHelper: ko.Computed<DataSourceHelper>;
    selectedPath: ko.Observable<string> | ko.Computed<string>;
    controls: ko.Computed<INamedValue[]>;
    bands: ko.Computed<INamedValue[]>;
    isMenuCollapsed: ko.Observable<boolean>;
    chartDataSources: ko.Computed<Array<{
        displayName: string;
        value: any;
    }>>;
    getControls: (target: any) => ko.Computed<ko.Computed<INamedValue[]>>;
    actionStorage: any;
    fieldDragHandler: FieldListDragDropHandler;
    runChartDesigner: (chart: XRChartSurface) => void;
    zoomStep: ko.Observable<number> | ko.Computed<number>;
    onViewPortScroll: (viewPort: HTMLElement) => void;
    updateSurfaceSize: () => void;
    openReport: (url: string) => void;
    showPreview: () => void;
    getTabs: () => INavigateTab[];
    closeTab: (tab: INavigateTab, force?: boolean) => void;
    localizationMode: ko.Observable<boolean>;
    errorPanelViewModel: ErrorPanelViewModel;
    controlScrollingTool: ControlScrollingTool;
    afterRender?: () => void;
}
export interface IDesignerContextOptionsInitOptions {
    availableDataSources: IDataSourceInfo[];
    state?: any;
}
export interface IDesignerContextOptions {
    initializeOptions: IDesignerContextOptionsInitOptions;
    selection: SurfaceSelection;
    report?: ReportViewModel;
    knownEnums?: any;
    url?: string | ko.Observable<string> | ko.Computed<string>;
    data?: any;
    dataSourceRefs?: any;
    designerCallbacks: IReportDesignerCustomizationHandler;
}
export interface IReportDesignerContext {
    report: ReportViewModel;
    url: ko.Observable<string> | ko.Computed<string>;
    surface: ReportSurface;
    dataSourceHelper: DataSourceHelper;
    parameters: ParametersViewModel;
    reportErrorProvider: DesignerErrorProvider;
    runtimeErrorProvider: RuntimeErrorProvider;
    fieldListDataSourceHelper: FieldListDataSourcesHelper;
    calcFieldsSource: CalculatedFieldsSource;
    fieldListItemsExtenders: IItemsExtender[];
    fieldListProvider: FieldListProvider;
    reportItemsProvider: ReportItemsProvider;
    dataBindingsProvider: FieldListProvider;
    chartValueBindingProvider: FieldListProvider;
    displayNameProvider: DisplayNameProvider;
    expressionDisplayNameProvider: DisplayNameProvider;
    controlsHelper: DesignControlsHelper;
    stylesHelper: StylesHelper;
    state: () => any;
}
export declare class ReportDesignerContext extends Disposable implements IReportDesignerContext {
    state: () => any;
    url: ko.Observable<string> | ko.Computed<string>;
    report: ReportViewModel;
    reportErrorProvider: DesignerErrorProvider;
    runtimeErrorProvider: RuntimeErrorProvider;
    surface: ReportSurface;
    dataSourceHelper: DataSourceHelper;
    parameters: ParametersViewModel;
    fieldListDataSourceHelper: FieldListDataSourcesHelper;
    calcFieldsSource: CalculatedFieldsSource;
    fieldListItemsExtenders: IItemsExtender[];
    fieldListProvider: FieldListProvider;
    reportItemsProvider: ReportItemsProvider;
    dataBindingsProvider: FieldListProvider;
    chartValueBindingProvider: FieldListProvider;
    displayNameProvider: DisplayNameProvider;
    expressionDisplayNameProvider: DisplayNameProvider;
    controlsHelper: DesignControlsHelper;
    stylesHelper: StylesHelper;
    private _getChartAvailableSources;
    getInfo(): {
        propertyName: string;
        modelName: string;
    }[];
    isModelReady(): boolean;
    dispose(): void;
    constructor(options: IDesignerContextOptions);
}
