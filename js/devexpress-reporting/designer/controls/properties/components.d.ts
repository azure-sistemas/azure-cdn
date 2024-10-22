﻿/**
* DevExpress HTML/JS Reporting (designer\controls\properties\components.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IRenameComponentStrategy } from '../../internal/fieldlist/_renameDataSourceStrategy';
import { ObjectItem } from '../../dataObjects/objectStorageItem';
import { ISerializationInfoArray, Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { IDataSourceInfo } from '@devexpress/analytics-core/analytics-internal';
export declare class ComponentsModel extends Disposable {
    renameComponentStrategy: IRenameComponentStrategy;
    getInfo(): ISerializationInfoArray;
    constructor(model: IDataSourceInfo, renameComponentStrategy: IRenameComponentStrategy);
    className: () => string;
    controlType: string;
    name: ko.Observable<string> | ko.Computed<string>;
    data: ObjectItem;
}
