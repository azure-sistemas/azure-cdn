﻿/**
* DevExpress HTML/JS Reporting (designer\controls\properties\style.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfoArray, Disposable, IModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { PaddingModel } from '@devexpress/analytics-core/analytics-elements';
export declare class StyleModel extends Disposable {
    static defaults: {
        'backColor': string;
        'foreColor': string;
        'borderColor': string;
    };
    getInfo(): ISerializationInfoArray;
    constructor(model: any, serializer?: IModelSerializer);
    isPropertyModified(name: any): boolean;
    className: () => string;
    displayType(): any;
    name: ko.Observable<string> | ko.Computed<string>;
    paddingObj: PaddingModel;
    padding: ko.Observable<any>;
    controlType: string;
}
