﻿/**
* DevExpress HTML/JS Reporting (viewer\accessibility\_searchKeyboardHelper.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ListKeyboardHelper } from '@devexpress/analytics-core/analytics-internal';
import { SearchViewModel } from '../search/_searchViewModel';
export declare class SearchKeyboardHelper extends ListKeyboardHelper {
    liveRegionId: string;
    constructor(searchModel: SearchViewModel);
}
