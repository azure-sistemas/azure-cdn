﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\internal\_mobilePreviewModel.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { PreviewDisposableModel } from '../../internal/_previewModel';
import { ISlideOptions } from '../mobilePreview';
import { GalleryModel } from './gallery/_galleryModel';
import { MobilePaginator } from './_paginator';
import { IMobileDesignerModel } from '../utils/_mobileInitializer';
export declare class MobilePreviewModel extends PreviewDisposableModel {
    slideOptions: ISlideOptions;
    gallery: GalleryModel;
    brickEventsDisabled: ko.Observable<boolean> | ko.Computed<boolean>;
    paginator: MobilePaginator;
    availableFormats: ko.ObservableArray<{
        text: string;
        format: string;
    }>;
    constructor(options: IMobileDesignerModel);
}
