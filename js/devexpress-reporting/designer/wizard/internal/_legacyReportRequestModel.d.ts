﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\_legacyReportRequestModel.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CommonRequestModel } from './_commonRequestModel';
import { ReportLayout } from './layoutPageUtils';
import { ReportStyle } from './reportStylePageUtils';
import { PaperKind } from '../../utils/paperKind';
import { GraphicsUnit, ILegacyReportWizardState } from '../reportWizardState';
export declare class LegacyReportRequestModel extends CommonRequestModel {
    AdjustFieldWidth: boolean;
    Columns: Array<string>;
    ColumnInfo: {
        Name: string;
        DisplayName: string;
        TypeSpecifics: number;
    }[];
    DataSourceName: string;
    GroupingLevels: string[][];
    Layout: ReportLayout;
    Portrait: boolean;
    ReportStyleId: ReportStyle;
    SummaryOptions: {
        ColumnName: string;
        Flags: number;
    }[];
    UseMasterDetailBuilder: boolean;
    PaperKind: PaperKind;
    PaperSize: {
        width: number;
        height: number;
    };
    Margins: {
        Top: number;
        Right: number;
        Bottom: number;
        Left: number;
    };
    Unit: GraphicsUnit;
    constructor(state: ILegacyReportWizardState);
}
