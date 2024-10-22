﻿/**
* DevExpress HTML/JS Reporting (viewer\documentMap\_documentMapTreeListController.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { TreeListItemViewModel, ITreeListController } from '@devexpress/analytics-core/analytics-widgets-internal';
import { IDataMemberInfo } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export declare class DocumentMapTreeListController implements ITreeListController {
    itemsFilter(item: IDataMemberInfo): boolean;
    hasItems(item: IDataMemberInfo): boolean;
    canSelect(value: TreeListItemViewModel): boolean;
    select(value: TreeListItemViewModel): void;
    showIconsForChildItems(): boolean;
    selectedItem: ko.Observable<TreeListItemViewModel>;
    clickHandler: (item: TreeListItemViewModel) => any;
}
