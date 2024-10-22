﻿/**
* DevExpress HTML/JS Reporting (designer\wizard\internal\_masterDetailRequestModel.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CommonRequestModel } from './_commonRequestModel';
import { PaperKind } from '../../utils/paperKind';
import { GraphicsUnit, IReportWizardState } from '../reportWizardState';
export declare class MasterDetailRequestModel extends CommonRequestModel {
    private _masterRelationMap;
    private _collectionByPath;
    DataSourceName: string;
    MasterDetailInfo: any;
    MasterDetailGroupsInfo: {
        [key: string]: any;
    };
    MasterDetailSummariesInfo: {
        [key: string]: any;
    };
    CrossTabFieldInfo: any;
    Portrait: boolean;
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
    UseMasterDetailBuilder: boolean;
    DataMemberName: {
        'DisplayName': string;
        'Name': string;
        'DataMemberType': number;
    };
    constructor(state: IReportWizardState);
}
