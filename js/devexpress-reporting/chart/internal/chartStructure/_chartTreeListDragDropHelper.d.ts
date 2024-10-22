﻿/**
* DevExpress HTML/JS Reporting (chart\internal\chartStructure\_chartTreeListDragDropHelper.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ReorderTreeListDragDropHelper } from '@devexpress/analytics-core/analytics-widgets-internal';
import { ObservableArray } from 'knockout';
export declare class ChartTreeListDragDropHelper extends ReorderTreeListDragDropHelper {
    getSiblings(): ObservableArray<any>;
    stop(): void;
}
