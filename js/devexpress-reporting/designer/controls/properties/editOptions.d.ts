﻿/**
* DevExpress HTML/JS Reporting (designer\controls\properties\editOptions.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfoArray, IModelSerializer, ISerializableModel } from '@devexpress/analytics-core/analytics-utils';
export declare class EditOptions implements ISerializableModel {
    id: ko.Observable<string> | ko.Computed<string>;
    enabled: ko.Observable<boolean> | ko.Computed<boolean>;
    constructor(model: {}, serializer?: IModelSerializer);
    getInfo(): ISerializationInfoArray;
    isEmpty(): boolean;
    isPropertyDisabled(name: string): boolean;
}
export declare class ContainerEditOptions extends EditOptions {
    parent: any;
    constructor(model: {}, parent: any, serializer?: IModelSerializer);
    isPropertyDisabled(name: string): boolean;
}
export declare class CheckEditOptions extends EditOptions {
    groupID: ko.Observable<string> | ko.Computed<string>;
    constructor(model: {}, serializer?: IModelSerializer);
    getInfo(): ISerializationInfoArray;
}
export declare class ImageEditOptions extends EditOptions {
    editorName: ko.Observable<string> | ko.Computed<string>;
    constructor(model: {}, serializer?: IModelSerializer);
    getInfo(): ISerializationInfoArray;
}
export declare class TextEditOptions extends EditOptions {
    editorName: ko.Observable<string> | ko.Computed<string>;
    constructor(model: {}, serializer?: IModelSerializer);
    getInfo(): ISerializationInfoArray;
}
