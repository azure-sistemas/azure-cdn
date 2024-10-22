﻿/**
* DevExpress HTML/JS Reporting (designer\controls\utils\_metaUtils.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfoWithBindings } from '../metadata/properties/metadata';
import { IDisplayedValue, ISerializationInfo, ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
export declare var createSinglePopularBindingInfos: (propertyName: string) => ISerializationInfoArray;
export declare var createPopularBindingInfos: (options: ISerializationInfoWithBindings) => ISerializationInfoArray;
export declare var createPopularBindingInfo: (options: ISerializationInfoWithBindings, isExpression?: boolean) => ISerializationInfoWithBindings;
export declare function valuesArrayAsEnumWithLocalizationId(info: ISerializationInfo, prefix: string): IDisplayedValue[];
