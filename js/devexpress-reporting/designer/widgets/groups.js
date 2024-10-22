﻿/**
* DevExpress HTML/JS Reporting (designer\widgets\groups.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var style_1 = require("../controls/metadata/properties/style");
var _chart_1 = require("../../chart/internal/meta/_chart");
var xrPivotgrid_1 = require("../controls/metadata/xrPivotgrid");
var xrBarcode_1 = require("../controls/metadata/xrBarcode");
var metadata_1 = require("../controls/metadata/properties/metadata");
var xrCrossband_1 = require("../controls/metadata/xrCrossband");
var pivotgridfield_1 = require("../controls/metadata/pivotgrid/pivotgridfield");
var xrShape_1 = require("../controls/metadata/xrShape");
var xrCharactercomb_1 = require("../controls/metadata/xrCharactercomb");
var xrCheckbox_1 = require("../controls/metadata/xrCheckbox");
var xrLine_1 = require("../controls/metadata/xrLine");
var xrReport_1 = require("../controls/metadata/xrReport");
var xrSparkline_1 = require("../controls/metadata/xrSparkline");
var xrGauge_1 = require("../controls/metadata/xrGauge");
var formattingrules_1 = require("../controls/metadata/properties/formattingrules");
var anchoring_1 = require("../controls/metadata/properties/anchoring");
var bandsMetadata_1 = require("../bands/metadata/bandsMetadata");
var xrDetailBandMetaData_1 = require("../bands/metadata/xrDetailBandMetaData");
var xrSubreport_1 = require("../controls/metadata/xrSubreport");
var groupfieldMetaData_1 = require("../bands/metadata/groupfieldMetaData");
var xrGroupBandMetaData_1 = require("../bands/metadata/xrGroupBandMetaData");
var multiColumnMetaData_1 = require("../bands/metadata/multiColumnMetaData");
var xrPageinfo_1 = require("../controls/metadata/xrPageinfo");
var xrPageBandMetaData_1 = require("../bands/metadata/xrPageBandMetaData");
var _common_1 = require("../../chart/internal/meta/_common");
var xrTableCell_1 = require("../controls/metadata/xrTableCell");
var xrZipcode_1 = require("../controls/metadata/xrZipcode");
var xrPicturebox_1 = require("../controls/metadata/xrPicturebox");
var scriptMetadata_1 = require("../controls/metadata/properties/scriptMetadata");
var xrTableOfContents_1 = require("../controls/metadata/xrTableOfContents");
var editOptions_1 = require("../controls/metadata/properties/editOptions");
var sortingOptions_1 = require("../controls/metadata/properties/sortingOptions");
var xrTable_1 = require("../controls/metadata/xrTable");
var sortBySummary_1 = require("../controls/metadata/pivotgrid/sortBySummary");
var xrRichText_1 = require("../controls/metadata/xrRichText");
var xrChart_1 = require("../controls/metadata/xrChart");
var dataBinding_1 = require("../dataObjects/metadata/dataBinding");
var xrPdfContent_1 = require("../controls/metadata/xrPdfContent");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var _editorTemplates_1 = require("../../chart/internal/_editorTemplates");
var xrPdfSignature_1 = require("../controls/metadata/xrPdfSignature");
var layoutOptions_1 = require("../controls/metadata/crosstab/layoutOptions");
var printOptions_1 = require("../controls/metadata/crosstab/printOptions");
var xrCrossTabCell_1 = require("../controls/metadata/crosstab/xrCrossTabCell");
var fields_1 = require("../controls/metadata/crosstab/fields");
var metadata_2 = require("../../common/exportOptions/metadata");
exports.groups = {
    'Styles': {
        info: style_1.stylesInfo,
        displayName: function () { return analytics_utils_1.getLocalization('Styles', 'DevExpress.XtraReports.UI.XRPivotGrid.Styles'); }
    },
    'Appearance': {
        info: [
            _chart_1.appearanceName, xrPivotgrid_1.pivotGridAppearances, xrBarcode_1.alignment, metadata_1.backColor, metadata_1.borderColor,
            metadata_1.borderDashStyle, xrCrossband_1.borderDashStyleCrossband, metadata_1.borderWidth, metadata_1.borders,
            pivotgridfield_1.caption, pivotgridfield_1.cellFormat, pivotgridfield_1.columnValueLineCount,
            pivotgridfield_1.displayFolder, pivotgridfield_1.emptyCellText, pivotgridfield_1.emptyValueText,
            xrShape_1.fillColor, metadata_1.font, metadata_1.expressionableFont, xrCharactercomb_1.characterCombFont, metadata_1.foreColor,
            xrCheckbox_1.glyphOptions,
            pivotgridfield_1.grandTotalCellFormat, pivotgridfield_1.grandTotalText,
            xrLine_1.lineDirection, metadata_1.lineStyle, metadata_1.lineWidth, metadata_1.padding, xrReport_1.pageColor,
            _chart_1.paletteName, metadata_1.imageType, pivotgridfield_1.rowValueLineCount,
            xrPdfSignature_1.signatureOptions, xrSparkline_1.sparklineFake,
            style_1.stylePriority, metadata_1.textAlignment, metadata_1.textTrimming, pivotgridfield_1.totalCellFormat,
            pivotgridfield_1.totalValueFormat, pivotgridfield_1.valueFormat, xrGauge_1.viewStyle, xrGauge_1.viewTheme,
            xrGauge_1.viewType, xrReport_1.watermark, formattingrules_1.formattingRuleLinks,
            xrCrossTabCell_1.columnIndex, xrCrossTabCell_1.rowIndex
        ],
        displayName: function () { return analytics_utils_1.getLocalization('Appearance', 'DevExpress.XtraReports.UI.XRPivotGrid.Appearance'); }
    },
    'Behavior': {
        info: [
            pivotgridfield_1.allowedAreas, anchoring_1.anchorVertical, anchoring_1.anchorHorizontal, metadata_1.angle,
            pivotgridfield_1.area, pivotgridfield_1.areaIndexEditable, xrBarcode_1.autoModule, metadata_1.allowMarkupText, metadata_1.autoWidth,
            xrBarcode_1.barCodeOrientation, metadata_1.canGrow, metadata_1.canPublish, metadata_1.canShrink, formattingrules_1.conditionObj,
            bandsMetadata_1.drillDownControl, bandsMetadata_1.drillDownDetailReportExpanded, xrDetailBandMetaData_1.hierarchyPrintOptions, xrDetailBandMetaData_1.fillEmptySpace,
            xrSubreport_1.generateOwnPages, xrCrossTabCell_1.columnAutoWidthMode, xrCrossTabCell_1.rowAutoHeightMode, xrCrossTabCell_1.rowVisible, xrCrossTabCell_1.columnVisible,
            pivotgridfield_1.groupInterval, pivotgridfield_1.groupIntervalNumericRange, pivotgridfield_1.totalsVisibility,
            metadata_1.displayName, formattingrules_1.formatting, groupfieldMetaData_1.groupFields, xrGroupBandMetaData_1.groupUnion, xrGroupBandMetaData_1.groupFooterUnion,
            metadata_1.keepTogether, bandsMetadata_1.keepTogetherWithDetailReports, bandsMetadata_1.level,
            xrBarcode_1.moduleInfo, metadata_1.multiline, multiColumnMetaData_1.multiColumn,
            bandsMetadata_1.pageBreak, xrPageinfo_1.pageInfo, bandsMetadata_1.printAtBottom, xrPageBandMetaData_1.printOn, bandsMetadata_1.printAcrossBands, metadata_1.processDuplicatesMode, metadata_1.processDuplicatesTarget, metadata_1.processNullValues,
            bandsMetadata_1.repeatEveryPage, xrReport_1.measureUnit, _common_1.rotated, xrPageinfo_1.runningBand, xrReport_1.requestParameters, xrTableCell_1.rowSpan,
            xrZipcode_1.segmentWidth, xrShape_1.shapeFake, xrPicturebox_1.sizing, xrPicturebox_1.imageAlignment, xrReport_1.showPreviewMarginLines, xrBarcode_1.showText, xrPageinfo_1.startPageNumber, xrShape_1.stretch, xrBarcode_1.barcodeFake,
            metadata_1.textFitMode, xrReport_1.verticalContentSplitting, metadata_1.visible, metadata_1.wordWrap, xrReport_1.scriptLanguage,
            xrReport_1.reportExportOptionsSerializationInfo, xrReport_1.horizontalContentSplitting,
            xrReport_1.scriptReferencesString, scriptMetadata_1.allScripts, xrGroupBandMetaData_1.sortingSummary,
            xrTableOfContents_1.tocTitle, xrTableOfContents_1.tocLevelDefault, xrTableOfContents_1.tocLevels, xrTableOfContents_1.maxNestingLevel,
            editOptions_1.editOptions, editOptions_1.textEditOptions, xrCheckbox_1.checkEditOptions, xrPicturebox_1.imageEditOptions, sortingOptions_1.interactiveSorting, pivotgridfield_1.sortBySummary,
            xrTable_1.processHiddenCellMode, layoutOptions_1.crossTabLayoutOptions, printOptions_1.crossTabPrintOptions
        ],
        displayName: function () { return analytics_utils_1.getLocalization('Behavior', 'ReportStringId.CatBehavior'); }
    },
    'Data': {
        info: [
            metadata_1.accessibleDescription, xrGauge_1.actualValue, _chart_1.seriesDataMember,
            xrCheckbox_1.checkState, xrCheckbox_1.checked, _editorTemplates_1.chartDataSource,
            metadata_1.dataSource, metadata_1.dataMember, metadata_1.dataAdapter, pivotgridfield_1.expandedInFieldsGroup, _chart_1.pivotGridDataSourceOptions,
            pivotgridfield_1.fieldName, metadata_1.filterStringEditable,
            xrPicturebox_1.imageSource, xrPicturebox_1.imageUrl, xrGauge_1.tickmarkCount, xrGauge_1.maximum, xrGauge_1.minimum, metadata_1.nullValueText, xrPivotgrid_1.prefilter,
            pivotgridfield_1.runningTotal, groupfieldMetaData_1.sortFields, metadata_1.summary, pivotgridfield_1.showNewValues,
            pivotgridfield_1.sortMode, pivotgridfield_1.sortOrder, pivotgridfield_1.summaryDisplayType,
            sortBySummary_1.summaryType,
            xrGauge_1.targetValue, metadata_1.tag, metadata_1.text, metadata_1.textArea, xrRichText_1.rtf, xrRichText_1.textRtf, xrRichText_1.newDocumentData, pivotgridfield_1.topValueCount, pivotgridfield_1.topValueShowOthers, pivotgridfield_1.topValueType,
            pivotgridfield_1.unboundExpression, pivotgridfield_1.unboundExpressionMode, pivotgridfield_1.unboundFieldName, pivotgridfield_1.unboundType, pivotgridfield_1.useNativeFormat,
            metadata_1.xlsxFormatString,
            pivotgridfield_1.pivotGridFieldsSerializable,
            xrSparkline_1.valueMember, xrSparkline_1.valueRange,
            xrSubreport_1.reportSourceUrl, xrReport_1.calculatedFields, xrSubreport_1.parameterBindings, xrReport_1.parametersInfo, xrChart_1.controlParametersInfo,
            dataBinding_1.dataBindings([]), metadata_1.textFormatString,
            xrPdfContent_1.pdfSource, xrPdfContent_1.pdfSourceUrl,
            fields_1.rowFields, fields_1.columnFields, fields_1.dataFields,
            fields_1.crossTabGroupInterval, fields_1.crossTabGroupIntervalNumericRange, fields_1.crossTabSortBySummaryInfo,
            metadata_2.pageRange, xrPdfContent_1.pageCount
        ],
        displayName: function () { return analytics_utils_1.getLocalization('Data', 'ASPxReportsStringId.ReportDesigner_Wizard_ReportStyle_Data'); }
    },
    'Design': {
        info: [metadata_1.name, xrReport_1.snapGridSize, xrReport_1.drawWatermark, xrReport_1.language],
        displayName: function () { return analytics_utils_1.getLocalization('Design', 'ReportStringId.CatDesign'); }
    },
    'Layout': {
        info: [
            xrCharactercomb_1.cellHeight, xrCharactercomb_1.cellHorizontalSpacing, xrCharactercomb_1.cellSizeMode, xrCharactercomb_1.cellVerticalSpacing, xrCharactercomb_1.cellWidth,
            xrCrossband_1.startBand, xrCrossband_1.startPoint, xrCrossband_1.endBand, xrCrossband_1.endPoint, bandsMetadata_1.height,
            metadata_1.location, metadata_1.size, pivotgridfield_1.minWidth, xrCrossband_1.width
        ],
        displayName: function () { return analytics_utils_1.getLocalization('Layout', 'DevExpress.XtraReports.UI.MultiColumn.Layout'); }
    },
    'Navigation': {
        info: [
            metadata_1.bookmark, metadata_1.bookmarkParent, xrReport_1.bookmarkDuplicateSuppress, metadata_1.target, metadata_1.navigateUrl
        ],
        displayName: function () { return analytics_utils_1.getLocalization('Navigation', 'ASPxReportsStringId.DocumentViewer_RibbonNavigationGroupText'); }
    },
    'Page Settings': {
        info: [
            xrReport_1.landscape, xrReport_1.rollPaper, xrReport_1.pageWidth, xrReport_1.pageHeight, xrReport_1.paperKind, xrReport_1.margins,
        ],
        displayName: function () { return analytics_utils_1.getLocalization('Page Settings', 'DevExpress.XtraPivotGrid.Data.PivotGridOptionsPrint.PageSettings'); }
    },
    'Printing': {
        info: [metadata_1.rtl, xrReport_1.rtlReport, xrReport_1.rtlLayout, metadata_1.reportPrintOptions],
        displayName: function () { return analytics_utils_1.getLocalization('Printing', 'ReportStringId.CatPrinting'); }
    },
    'Options': {
        info: xrPivotgrid_1.pivotGridOptions.concat(pivotgridfield_1.options),
        displayName: function () { return analytics_utils_1.getLocalization('Options', 'DevExpress.XtraPivotGrid.PivotGridFieldBase.Options'); }
    },
    'KPI': {
        info: [pivotgridfield_1.KPIGraphic],
        displayName: function () { return analytics_utils_1.getLocalization('Appearance', 'DevExpress.XtraReports.UI.XRPivotGrid.Appearance'); }
    },
};
