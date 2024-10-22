﻿/**
* DevExpress HTML/JS Reporting (designer\internal\serialization\_serializer.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ReportViewModel } from '../../controls/xrReport';
import { ISerializationInfo, ISerializationInfoArray, ModelSerializer, IModelSerializer, IModelSerializerOptions, ISerializableModel, IModelSerializerRef } from '@devexpress/analytics-core/analytics-utils';
export declare class ReportModelSerializer extends ModelSerializer implements IModelSerializer {
    reportModel?: ReportViewModel;
    localizationJsonObj: any[];
    isLocalized: boolean;
    constructor(reportModel?: ReportViewModel, options?: IModelSerializerOptions);
    serialize(viewModel?: ISerializableModel, serializationsInfo?: ISerializationInfoArray, refs?: IModelSerializerRef): any;
    serializeProperty(modelPropertyInfo: ISerializationInfo, viewModel: ISerializableModel, serializationsInfo: ISerializationInfoArray, refs: IModelSerializerRef, result: any): void;
    deserialize(viewModel: ISerializableModel, model: any, serializationsInfo?: ISerializationInfoArray): void;
}
