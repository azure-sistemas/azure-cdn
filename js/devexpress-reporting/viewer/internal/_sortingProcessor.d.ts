﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_sortingProcessor.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IKeyValuePair } from '../../common/types';
import { ISortingFieldInfo } from './_previewRequestWrapper';
import { ISortingData } from '../utils/utils';
export declare class SortingProcessor {
    private _getSortingStage;
    constructor(_getSortingStage: () => Array<IKeyValuePair<Array<ISortingFieldInfo>>>);
    doSorting(sortData: ISortingData, shiftKey?: boolean, ctrlKey?: boolean): boolean;
    private _applySorting;
    private _appendSorting;
    private _detachSorting;
    private _changeSortOrder;
}
