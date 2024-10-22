﻿/**
* DevExpress HTML/JS Reporting (common\exportOptions\emailExportOptions.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializableModel, ISerializationInfoArray, IModelSerializer } from '@devexpress/analytics-core/analytics-utils';
export declare class AdditionalRecipientModel implements ISerializableModel {
    static createNew: () => AdditionalRecipientModel;
    getInfo(): ISerializationInfoArray;
    constructor(model: any, serializer?: IModelSerializer);
}
export declare var additionalRecipientSerializationsInfo: ISerializationInfoArray;
