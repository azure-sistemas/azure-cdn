﻿/**
* DevExpress HTML/JS Reporting (designer\utils\settings.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ControlsFactory } from '../controls/utils/controlsFactory';
import { XRReportElementViewModel } from '../controls/xrReportelement';
import { ISmartTag } from '../tools/smartTags/smartTagContainer';
export declare type DataBindingModeValue = 'Bindings' | 'Expressions' | 'ExpressionsAdvanced';
export declare type DefaultCrossTabControlValue = 'XRCrossTab' | 'XRPivotGrid';
export declare var controlsFactory: (newVal?: ControlsFactory) => ControlsFactory;
export declare var smartTagFactory: (newVal?: {
    [key: string]: (element: XRReportElementViewModel) => ISmartTag[];
}) => {
    [key: string]: (element: XRReportElementViewModel) => ISmartTag[];
};
export declare var DataBindingMode: (newVal?: DataBindingModeValue) => DataBindingModeValue;
export declare var HandlerUri: (newVal?: string) => string;
export declare var formatStringEditorCustomSet: (newVal?: {
    [key: string]: string[];
}) => {
    [key: string]: string[];
};
export declare var DefaultCrossTabControl: (newVal?: DefaultCrossTabControlValue) => DefaultCrossTabControlValue;
