﻿/**
* DevExpress HTML/JS Reporting (designer\bands\xrVerticalDetailBand.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { VerticalBandViewModel } from './xrVerticalBand';
import { GroupFieldModel } from './groupfield';
import { ElementViewModel } from '@devexpress/analytics-core/analytics-elements';
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
export declare class VerticalDetailBandViewModel extends VerticalBandViewModel {
    dispose(): void;
    preInit(band: any, parent: ElementViewModel, serializer?: ModelSerializer): void;
    sortFields: ko.ObservableArray<GroupFieldModel>;
}
