﻿/**
* DevExpress HTML/JS Reporting (designer\internal\_utils.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IDataSourceRefInfo } from '../utils/inititalizer';
import * as ko from 'knockout';
export declare function recalculateUnit(value: any, dpi: number): number;
export declare var PromptBoolean: {
    'False': string;
    'True': string;
    'Prompt': string;
};
export declare function correctModel(model: any): any;
export declare function createReportViewModel(newReportInfo: {
    reportModel: string;
    dataSourceRefs: IDataSourceRefInfo[];
}, oldReport: ReportViewModel): ReportViewModel;
export declare function updateDataSourceRefs(report: ReportViewModel, dataSourceRefs: any): void;
export declare function isNotParameter(control: any): boolean;
export declare function isControl(control: any): boolean;
export declare function updateSurfaceContentSizeLocalizationMode(surfaceSize: ko.Observable<number> | ko.Computed<number>, root: Element, rtl?: boolean): () => void;
import { ReportViewModel } from '../controls/xrReport';
