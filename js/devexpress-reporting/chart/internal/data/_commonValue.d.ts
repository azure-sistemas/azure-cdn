﻿/**
* DevExpress HTML/JS Reporting (chart\internal\data\_commonValue.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DataMemberBase } from './_dataMemberBase';
export declare class CommonValueDataMembers extends DataMemberBase {
    static from(value: any): CommonValueDataMembers;
    static toJson(value: any): any;
    getInfo(): import("@devexpress/analytics-core/analytics-utils").ISerializationInfoArray;
    readonly arrayValueDataMemberNames: string[];
}