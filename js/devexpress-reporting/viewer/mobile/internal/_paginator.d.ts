﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\internal\_paginator.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { MobileReportPreview } from '../mobilePreview';
import { GalleryModel } from './gallery/_galleryModel';
import { Disposable } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
export declare class MobilePaginator extends Disposable {
    constructor(reportPreview: MobileReportPreview, gallery: GalleryModel);
    visible: ko.Observable<boolean>;
    text: ko.Observable<string> | ko.Computed<string>;
}
