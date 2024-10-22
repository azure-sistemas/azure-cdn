﻿/**
* DevExpress HTML/JS Reporting (chart\internal\_editorTemplates.d.ts)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { EditorTemplates } from '@devexpress/analytics-core/analytics-widgets';
import { ISerializationInfo } from '@devexpress/analytics-core/analytics-utils';
declare type ChartEditorTemplates = 'chartDataSource' | 'collection' | 'views' | 'fieldChart' | 'dataMemberChart' | 'valueDataMember' | 'comboboxPositionSeriesLabel' | 'panes' | 'axisX' | 'axisY' | 'legends' | 'summaryFunction' | 'points' | 'maxSize' | 'minSize' | 'group' | 'undoCustomColorEditor';
export declare var editorTemplates: EditorTemplates<ChartEditorTemplates>;
export declare var chartDataSource: ISerializationInfo;
export {};
