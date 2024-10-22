﻿/**
* DevExpress HTML/JS Reporting (designer\controls\utils\_tocUtils.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ElementViewModel } from '@devexpress/analytics-core/analytics-elements';
import { BandViewModel } from '../../bands/xrBand';
import { XRControlViewModel } from '../xrControl';
export declare function isHeaderOrFooterBandType(band: ElementViewModel): any;
export declare function getExistTableOfContents(band: BandViewModel | XRControlViewModel): XRControlViewModel;
