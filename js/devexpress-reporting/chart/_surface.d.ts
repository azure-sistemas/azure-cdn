﻿/**
* DevExpress HTML/JS Reporting (chart\_surface.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ChartControlViewModel } from './_control';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ISize } from '@devexpress/analytics-core/analytics-elements';
export declare class ChartControlSurface extends Disposable {
    constructor(control: ChartControlViewModel, zoom?: ko.Observable<number>, size?: ISize);
    width: ko.Computed<number>;
    height: ko.Computed<number>;
    imageSrc: ko.Observable<string>;
    zoom: ko.Observable<number> | ko.Computed<number>;
    templateName: string;
}
