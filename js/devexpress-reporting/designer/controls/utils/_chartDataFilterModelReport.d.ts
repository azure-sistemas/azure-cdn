﻿/**
* DevExpress HTML/JS Reporting (designer\controls\utils\_chartDataFilterModelReport.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DataFilterModel } from '../../../chart/components/models/_dataFilter';
export declare class DataFilterModelReport extends DataFilterModel {
    getInfo(): any[];
    private _createReportDataProperty;
    private _mapObject;
    constructor(model: any, serializer?: any);
    dataMember: ko.Observable<string> | ko.Computed<string>;
    dataSource: ko.Observable<any>;
    misc: any;
    report: any;
}
