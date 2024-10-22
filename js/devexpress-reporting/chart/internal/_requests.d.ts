﻿/**
* DevExpress HTML/JS Reporting (chart\internal\_requests.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IPathRequest, IDataMemberInfo } from '@devexpress/analytics-core/analytics-utils';
export declare class ChartRequests {
    static getChartImage(uri: string, chartLayout: any, width: number, height: number): any;
    static fieldListCallback(request: IPathRequest): JQueryPromise<IDataMemberInfo[]>;
}
