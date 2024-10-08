﻿/**
* DevExpress HTML/JS Reporting (chart\widgets\_chartDataSourceEditor.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
export declare class ChartDataSourceEditor extends Editor {
    generateOptions(dataSources: ko.Computed<Array<{
        displayName: string;
        value: any;
    }>>, popupContainer: string): any;
    options: any;
}
