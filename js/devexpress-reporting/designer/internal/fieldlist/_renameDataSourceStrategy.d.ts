﻿/**
* DevExpress HTML/JS Reporting (designer\internal\fieldlist\_renameDataSourceStrategy.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ObjectItem } from '../../dataObjects/objectStorageItem';
import { DataSourceHelper } from '../../helpers/_dataSourceHelper';
export interface IComponentNameValidator {
    validateName: (nameCandidate: string) => boolean;
    validateUnique: (nameCandidate: string, currentName: string) => boolean;
}
export interface IRenameComponentStrategy extends IComponentNameValidator {
    tryRename: (nameCandidate: string, currentItemData: ObjectItem) => boolean;
}
export declare class RenameDataSourceStrategy implements IRenameComponentStrategy {
    dsHelper: ko.Observable<DataSourceHelper>;
    private _afterRenameCallBack?;
    private _rename;
    constructor(dsHelper: ko.Observable<DataSourceHelper>, _afterRenameCallBack?: () => void);
    validateName(nameCandidate: string): boolean;
    validateUnique(nameCandidate: any, currentName: string): boolean;
    tryRename(nameCandidate: string, currentItemData: ObjectItem): boolean;
}
