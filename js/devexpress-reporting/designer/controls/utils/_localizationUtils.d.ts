﻿/**
* DevExpress HTML/JS Reporting (designer\controls\utils\_localizationUtils.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { XRTableOfContentsViewModel } from '../xrTableOfContents';
import { ReportViewModel } from '../xrReport';
import { XRChartViewModel } from '../xrChart';
import { ILocalizationItemInfo } from '../../localization/_localization';
import { Disposable, ISerializationInfo } from '@devexpress/analytics-core/analytics-utils';
export declare function __createLocalizationProperties(target: any, format?: string): any;
export declare class DefaultLocalizationProvider<T extends ILocalizedControl> extends Disposable {
    _model: T;
    dispose(): void;
    _localizationInfo: LocalizedProperty[];
    constructor(_model: T);
    getLocalizationProperty(propertyName: string): LocalizedProperty;
    getLocalizationProperties(): LocalizedProperty[];
    applyLocalization(propertyName: string, propertyValue: any): void;
}
export declare class TableOfContentLocalizationProvider extends DefaultLocalizationProvider<XRTableOfContentsViewModel> {
    getLocalizationProperties(): any;
}
export declare class ReportLocalizationProvider extends DefaultLocalizationProvider<ReportViewModel> {
    getLocalizationProperties(): LocalizedProperty[];
}
export declare class ChartLocalizationProvider extends DefaultLocalizationProvider<XRChartViewModel> {
    getLocalizationProperties(): any;
}
export declare class LocalizedProperty {
    propertyName: any;
    value: any;
    info: ISerializationInfo;
    constructor(propertyName: any, value: any, info: ISerializationInfo);
    applyLocalization(value: ILocalizationItemInfo): void;
}
export interface ILocalizedControl {
    getLocalizationProperties(): LocalizedProperty[];
    applyLocalization(propertyName: string, value: any): void;
    getLocalizationProperty(propertyName: string): LocalizedProperty;
}
