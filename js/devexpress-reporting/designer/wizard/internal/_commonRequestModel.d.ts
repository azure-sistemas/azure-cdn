﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\_commonRequestModel.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { GraphicsUnit, IReportWizardState } from '../reportWizardState';
export interface ICustomLabelInformation {
    Height: number;
    HorizontalPitch: number;
    LeftMargin: number;
    RightMargin: number;
    PaperKindDataId: number;
    TopMargin: number;
    BottomMargin: number;
    Unit: GraphicsUnit;
    VerticalPitch: number;
    Width: number;
}
export declare class CommonRequestModel {
    CustomLabelInformation: ICustomLabelInformation;
    IgnoreNullValuesForSummary: boolean;
    LabelProductId: number;
    LabelProductDetailId: number;
    ReportTitle: string;
    ReportType: number;
    DataMemberName: {
        'DisplayName': string;
        'Name': string;
        'DataMemberType': number;
    };
    constructor(state: IReportWizardState);
}
