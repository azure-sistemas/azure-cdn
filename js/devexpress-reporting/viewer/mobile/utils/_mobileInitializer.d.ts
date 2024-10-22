﻿/**
* DevExpress HTML/JS Reporting (viewer\mobile\utils\_mobileInitializer.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IPreviewModelBase } from '../../internal/_previewModel';
import { MobileReportPreview, ISlideOptions } from '../mobilePreview';
import { MobileSearchViewModel } from '../internal/_mobileSearch';
import { GalleryModel } from '../internal/gallery/_galleryModel';
import { MobilePaginator } from '../internal/_paginator';
import { IBindingSettings } from '../../utils/initializer';
import { MobilePreviewModel } from '../internal/_mobilePreviewModel';
import * as ko from 'knockout';
export interface IDesignerModelPart {
    id: string;
    templateName: string;
    model: any;
}
export interface IMobileDesignerModel extends IPreviewModelBase {
    reportPreview: MobileReportPreview;
    searchModel: MobileSearchViewModel;
    gallery?: GalleryModel;
    paginator?: MobilePaginator;
    brickEventsDisabled?: ko.Observable<boolean> | ko.Computed<boolean>;
    slideOptions?: ISlideOptions;
    availableFormats: ko.ObservableArray<{
        text: string;
        format: string;
    }>;
}
export declare function createMobilePreview(bindingSettings: IBindingSettings): MobilePreviewModel;
