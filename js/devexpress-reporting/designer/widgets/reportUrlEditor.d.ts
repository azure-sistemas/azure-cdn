﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\reportUrlEditor.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IKeyValuePair } from '../../common/types';
import { INavigateTab } from '../tools/navigation/navigateTab';
import { ISerializationInfo } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { Editor } from '@devexpress/analytics-core/analytics-widgets';
import DataSource from 'devextreme/data/data_source';
export declare class ReportUrlEditor extends Editor {
    private _initUrls;
    constructor(info: ISerializationInfo, level: any, parentDisabled?: ko.Computed<boolean>, textToSearch?: any);
    getValues(urls: ko.ObservableArray<IKeyValuePair<string>>, tab: ko.Observable<INavigateTab>): ko.Computed<DataSource>;
    updateUrls(): void;
    urls: ko.Computed<IKeyValuePair<string>[]> | ko.Observable<IKeyValuePair<string>[]>;
    dataSource: ko.Computed<DataSource>;
}
