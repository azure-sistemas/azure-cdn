﻿/**
* DevExpress HTML/JS Reporting (viewer\documentMap\_documentMapModel.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ReportPreview } from '../reportPreview';
import { Disposable, IDataMemberInfo, TabInfo } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ITreeListOptions } from '@devexpress/analytics-core/analytics-widgets-internal';
export interface IBookmarkNode {
    text: string;
    pageIndex: number;
    indexes: string;
    nodes?: Array<IBookmarkNode>;
}
export interface IBookmarkDataMemberInfo extends IDataMemberInfo {
    bookmark: IBookmarkNode;
}
export declare class DocumentMapModel extends Disposable {
    private _selectedPath;
    private _setSelectedPathByNavigationNode;
    constructor(reportPreview: ReportPreview);
    dispose(): void;
    tabInfo: TabInfo;
    isEmpty: ko.Computed<boolean>;
    documentMapOptions: ko.Computed<ITreeListOptions>;
}
