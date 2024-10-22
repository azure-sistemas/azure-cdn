﻿/**
* DevExpress HTML/JS Reporting (designer\dataObjects\calculatedField.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ObjectStorageItem } from './objectStorageItem';
import { ISerializationInfoArray, Disposable, IPathRequest, IDataMemberInfo, IModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ObjectProperties, IExpressionOptions } from '@devexpress/analytics-core/analytics-widgets';
import { IScriptingControl } from '../internal/scripting/_scriptsEditor';
export declare class CalculatedField extends Disposable implements IDataMemberInfo, IScriptingControl {
    getInfo(): ISerializationInfoArray;
    constructor(model: any, serializer?: IModelSerializer);
    scripts: any;
    isSelected?: boolean;
    dataType?: string;
    innerActions?: any;
    relationPath?: string;
    noDragable?: any;
    dragData?: any;
    icon?: string;
    items?: IDataMemberInfo[];
    readonly displayName: any;
    readonly name: string;
    readonly specifics: string;
    readonly type: string;
    lockedInUserDesigner(): boolean;
    templateName: string;
    contenttemplate: string;
    isList: boolean;
    isCalculated: boolean;
    calculatedFieldName: ko.Observable<string> | ko.Computed<string>;
    nameEditable: ko.Computed<string>;
    dataMember: ko.Observable<string> | ko.Computed<string>;
    dataSource: ko.Observable<ObjectStorageItem>;
    fieldType: ko.Observable<string> | ko.Computed<string>;
    expressionObj: IExpressionOptions;
    propertyGrid: ObjectProperties;
    pathRequest: IPathRequest;
}
