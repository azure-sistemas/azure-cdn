﻿/**
* DevExpress HTML/JS Reporting (viewer\internal\_progressBarUtils.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IProgressBarSettings } from '../utils/initializer';
import { IPreviewModelBase } from './_previewModel';
import { ReportPreview } from '../reportPreview';
export declare function getUpdateProgressBarCallback(progressBarSettings: IProgressBarSettings, designerModel: IPreviewModelBase, reportPreview: ReportPreview, rootElement: Element, $window?: JQuery<Window>): () => void;
