﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\dataSourceSelectBox.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
import * as ko from 'knockout';
import DataSource from 'devextreme/data/data_source';
export declare class DataSourceSelectBox extends Editor {
    static createDataSource(values: any): DataSource;
    getValues(): ko.Computed<DataSource>;
    dataSource: ko.Computed<DataSource>;
}
