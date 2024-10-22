﻿/**
* DevExpress HTML/JS Reporting (designer\controls\properties\glyphOptions.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ImageSource } from '../../../common/imageSource';
import { ISerializationInfoArray, Disposable, IModelSerializer, ISerializableModel } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { Size } from '@devexpress/analytics-core/analytics-elements';
export interface ICheckBoxCustomGlyphs {
    Checked: ko.Observable<ImageSource>;
    Unchecked: ko.Observable<ImageSource>;
    Indeterminate: ko.Observable<ImageSource>;
}
export declare class GlyphOptions extends Disposable implements ISerializableModel {
    static unitProperties: string[];
    constructor(model: {}, serializer?: IModelSerializer);
    getInfo: ko.Observable<ISerializationInfoArray>;
    alignment: ko.Observable<string> | ko.Computed<string>;
    size: Size;
    style: ko.Observable<string> | ko.Computed<string>;
    customGlyphs: ICheckBoxCustomGlyphs;
}
