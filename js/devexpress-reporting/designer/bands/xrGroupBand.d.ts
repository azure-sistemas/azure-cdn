﻿/**
* DevExpress HTML/JS Reporting (designer\bands\xrGroupBand.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { BandViewModel } from './xrBand';
import { GroupFieldModel } from './groupfield';
import { ElementViewModel } from '@devexpress/analytics-core/analytics-elements';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
export interface ISortingSummary {
    enabled: boolean;
    Function: string;
    fieldName: string;
    ignoreNullValues: string;
    sortOrder: string;
    getPath: (propertyName: string) => string;
}
export declare class GroupHeaderBand extends BandViewModel {
    dispose(): void;
    constructor(band: any, parent: ElementViewModel, serializer?: ModelSerializer);
    groupFields: ko.ObservableArray<GroupFieldModel>;
    sortingSummary: ISortingSummary;
}
