﻿/**
* DevExpress HTML/JS Reporting (viewer\documentMap\_documentMapItemsProvider.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IBookmarkNode, IBookmarkDataMemberInfo } from './_documentMapModel';
import { IItemsProvider } from '@devexpress/analytics-core/analytics-utils';
export declare class DocumentMapItemsProvider implements IItemsProvider {
    constructor(bookmark: IBookmarkNode);
    getItems: (IPathRequest: any) => JQueryPromise<IBookmarkDataMemberInfo[]>;
    private _selectNode;
    static fillNode(bookmark: IBookmarkNode): IBookmarkDataMemberInfo[];
    private _getRootNode;
    bookmarkDict: {};
}
