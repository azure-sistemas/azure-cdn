﻿/**
* DevExpress HTML/JS Reporting (viewer\parameters\previewParametersViewModel.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IEnumType } from '../../common/customTypes';
import { PreviewParameter } from './previewParameter';
import { ReportPreview } from '../reportPreview';
import { IKeyValuePair } from '../../common/types';
import { PreviewParameterHelper } from './previewParameterHelper';
import { TabInfo } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { IParameterPanelItemInfo, ParameterPanelItemBase as ParameterPanelItemBase } from './parameterPanelItemBase';
export interface IReportParametersInfo {
    shouldRequestParameters?: boolean;
    parameters?: Array<IPreviewParameterInfo>;
    knownEnums?: Array<IEnumType>;
    parameterPanelLayout?: IParameterPanelItemInfo;
}
export interface IPreviewParameterInfo {
    Path: string;
    Description: string;
    Name: string;
    Value: any;
    TypeName: string;
    ValueInfo?: any;
    MultiValue?: boolean;
    SelectAllValues?: boolean;
    AllowNull?: boolean;
    IsFilteredLookUpSettings?: boolean;
    LookUpValues?: Array<ILookUpValue>;
    Visible?: boolean;
    Enabled?: boolean;
    Tag?: any;
    EnabledExpression?: string;
    VisibleExpression?: string;
}
export interface IRange {
    Start: any;
    End: any;
}
export interface ILookUpValue {
    Description: string;
    Value: any;
}
export interface IUpdateParameterResponse {
    enabled: boolean;
    visible: boolean;
    lookUpValues: any;
}
export declare class PreviewParametersViewModel extends ParameterPanelItemBase {
    private readonly _visibleParameters;
    private _shouldProcessParameter;
    private _reportPreview;
    private _convertLocalDateToUTC;
    private _getParametersStateRequest;
    private _getDoneGetParametersStateHandler;
    private subscribeParameter;
    private _getFailGetParametersStateHandler;
    private _setLookUpValues;
    private _getParameterValuesContainedInLookups;
    private _filterParameterValuesContainsInLookups;
    constructor(reportPreview: ReportPreview, parameterHelper?: PreviewParameterHelper, enableKeyboardSupport?: boolean);
    initialize(originalParametersInfo: IReportParametersInfo): void;
    getPathsAfterPath(parameterPath: string): Array<string>;
    serializeParameters(): Array<IKeyValuePair<any>>;
    restore: () => void;
    getInfo: ko.Observable<any>;
    updateParameters(changedParameter: PreviewParameter): void;
    submit: () => void;
    validateAndSubmit: (params: any) => void;
    needToUpdateParameter: ko.Observable<boolean>;
    processInvisibleParameters: boolean;
    parametersLoading: ko.Observable<boolean>;
    tabInfo: TabInfo;
    popupInfo: any;
    parameterHelper: PreviewParameterHelper;
}
