﻿/**
* DevExpress HTML/JS Reporting (designer\controls\properties\watermark.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import { SerializableModel } from '@devexpress/analytics-core/analytics-elements';
import { IStyleContainer } from '@devexpress/analytics-core/analytics-internal';
export declare class WatermarkModel extends SerializableModel implements IStyleContainer {
    constructor(model: any, serializer?: IModelSerializer);
    shouldDrawWatermarkImage(): boolean;
    text: ko.Observable<string>;
    textDirection: ko.Observable<string>;
    foreColor: ko.Observable<string>;
    imageSource: ko.Observable<ImageSource>;
    rtl: () => undefined;
}
import { ImageSource } from '../../../common/imageSource';
