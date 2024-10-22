﻿/**
* DevExpress HTML/JS Reporting (chart\components\axis\_axis.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IAction } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export interface ICollectionItem {
    parent: ko.ObservableArray<ICollectionItem>;
    innerActions: Array<IAction>;
}
export declare function initCollectionItem(item: ICollectionItem, parent: ko.ObservableArray<ICollectionItem>): () => void;
