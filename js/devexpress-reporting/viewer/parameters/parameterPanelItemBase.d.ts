﻿/**
* DevExpress HTML/JS Reporting (viewer\parameters\parameterPanelItemBase.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { PreviewParameter } from './previewParameter';
import { PreviewParameterHelper } from './previewParameterHelper';
import { IReportParametersInfo } from './previewParametersViewModel';
export interface IParameterPanelItemInfo {
    type: string;
    titleVisible?: boolean;
    title?: string;
    orientation?: string;
    borderVisible?: boolean;
    expanded?: boolean;
    showExpandButton?: boolean;
    layoutItems?: Array<any>;
}
export interface IParameterItemInfo {
    path: string;
    labelOrientation: string;
    hasSeparator: boolean;
}
export declare class ParameterPanelItemBase extends Disposable {
    parameterHelper: PreviewParameterHelper;
    private layoutInfo?;
    protected _parameters: PreviewParameter[];
    protected _layoutItems: ParameterPanelItemBase[];
    constructor(parameterHelper: PreviewParameterHelper, layoutInfo?: IParameterPanelItemInfo);
    private _fixGroupPropertyName;
    private _proceedLayoutInfo;
    protected _add(parameter: PreviewParameter, parameterInfo: IParameterItemInfo): PreviewParameter;
    isPropertyDisabled(name: string): boolean;
    isPropertyVisible(name: string): boolean;
    initialize(originalParametersInfo: IReportParametersInfo, parameters?: PreviewParameter[]): void;
    isEmpty: ko.Observable<boolean>;
    getInfo: ko.Observable<any[]>;
}
