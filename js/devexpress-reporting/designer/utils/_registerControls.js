﻿/**
* DevExpress HTML/JS Reporting (designer\utils\_registerControls.js)
* Version:  21.2.6
* Build date: Feb 28, 2022
* Copyright (c) 2012 - 2022 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xrBand_1 = require("../bands/xrBand");
var settings_1 = require("./settings");
var controlsFactory_1 = require("../controls/utils/controlsFactory");
var metadataGroups_1 = require("../controls/metadata/properties/metadataGroups");
var _xrTodoControl_1 = require("../controls/_xrTodoControl");
var xrControl_1 = require("../controls/xrControl");
var xrTextControl_1 = require("../controls/metadata/xrTextControl");
var xrTextControl_2 = require("../controls/xrTextControl");
var xrCheckbox_1 = require("../controls/metadata/xrCheckbox");
var xrCheckbox_2 = require("../controls/xrCheckbox");
var xrRichText_1 = require("../controls/metadata/xrRichText");
var richEdit_1 = require("../controls/richEdit");
var xrRichText_2 = require("../controls/xrRichText");
var xrPicturebox_1 = require("../controls/metadata/xrPicturebox");
var xrPicturebox_2 = require("../controls/xrPicturebox");
var xrControl_2 = require("../controls/metadata/xrControl");
var xrTable_1 = require("../controls/metadata/xrTable");
var xrTable_2 = require("../controls/xrTable");
var xrCharactercomb_1 = require("../controls/metadata/xrCharactercomb");
var xrCharactercomb_2 = require("../controls/xrCharactercomb");
var xrLine_1 = require("../controls/metadata/xrLine");
var xrLine_2 = require("../controls/xrLine");
var xrShape_1 = require("../controls/metadata/xrShape");
var xrShape_2 = require("../controls/xrShape");
var xrBarcode_1 = require("../controls/metadata/xrBarcode");
var xrBarcode_2 = require("../controls/xrBarcode");
var xrZipcode_1 = require("../controls/metadata/xrZipcode");
var xrZipcode_2 = require("../controls/xrZipcode");
var xrChart_1 = require("../controls/metadata/xrChart");
var xrChart_2 = require("../controls/xrChart");
var xrGauge_1 = require("../controls/metadata/xrGauge");
var xrGauge_2 = require("../controls/xrGauge");
var xrSparkline_1 = require("../controls/metadata/xrSparkline");
var xrSparkline_2 = require("../controls/xrSparkline");
var xrPivotgrid_1 = require("../controls/metadata/xrPivotgrid");
var xrPivotgrid_2 = require("../controls/xrPivotgrid");
var xrSubreport_1 = require("../controls/metadata/xrSubreport");
var xrSubreport_2 = require("../controls/xrSubreport");
var xrPdfContent_1 = require("../controls/metadata/xrPdfContent");
var xrPdfContent_2 = require("../controls/xrPdfContent");
var utils_1 = require("./utils");
var xrTableOfContents_1 = require("../controls/metadata/xrTableOfContents");
var xrTableOfContents_2 = require("../controls/xrTableOfContents");
var _tocUtils_1 = require("../controls/utils/_tocUtils");
var xrReport_1 = require("../controls/xrReport");
var xrPageinfo_1 = require("../controls/metadata/xrPageinfo");
var xrPageinfo_2 = require("../controls/xrPageinfo");
var xrPagebreak_1 = require("../controls/metadata/xrPagebreak");
var xrPagebreak_2 = require("../controls/xrPagebreak");
var xrCrossband_1 = require("../controls/metadata/xrCrossband");
var xrCrossband_2 = require("../controls/xrCrossband");
var xrReport_2 = require("../controls/metadata/xrReport");
var xrBandMetaData_1 = require("../bands/metadata/xrBandMetaData");
var scriptMetadata_1 = require("../controls/metadata/properties/scriptMetadata");
var xrMarginBands_1 = require("../bands/xrMarginBands");
var xrDetailReportBandMetaData_1 = require("../bands/metadata/xrDetailReportBandMetaData");
var xrDetailReportBand_1 = require("../bands/xrDetailReportBand");
var xrDetailBandMetaData_1 = require("../bands/metadata/xrDetailBandMetaData");
var xrDetailBand_1 = require("../bands/xrDetailBand");
var xrSubband_1 = require("../bands/xrSubband");
var xrGroupBandMetaData_1 = require("../bands/metadata/xrGroupBandMetaData");
var xrGroupBand_1 = require("../bands/xrGroupBand");
var xrPageBandMetaData_1 = require("../bands/metadata/xrPageBandMetaData");
var xrPageBand_1 = require("../bands/xrPageBand");
var xrVerticalBandMetaData_1 = require("../bands/metadata/xrVerticalBandMetaData");
var xrVerticalBand_1 = require("../bands/xrVerticalBand");
var xrVerticalDetailBandMetaData_1 = require("../bands/metadata/xrVerticalDetailBandMetaData");
var xrVerticalDetailBand_1 = require("../bands/xrVerticalDetailBand");
var pivotgridfield_1 = require("../controls/metadata/pivotgrid/pivotgridfield");
var pivotgridfield_2 = require("../controls/pivotgrid/pivotgridfield");
var xrTableRow_1 = require("../controls/metadata/xrTableRow");
var xrTableRow_2 = require("../controls/xrTableRow");
var xrTableCell_1 = require("../controls/metadata/xrTableCell");
var xrTableCell_2 = require("../controls/xrTableCell");
var analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
var getNearestBand_1 = require("../controls/getNearestBand");
var xrPdfSignature_1 = require("../controls/metadata/xrPdfSignature");
var xrPdfSignature_2 = require("../controls/xrPdfSignature");
var xrCrossTab_1 = require("../controls/xrCrossTab");
var xrCrossTab_2 = require("../controls/metadata/xrCrossTab");
var xrCrossTabCell_1 = require("../controls/metadata/crosstab/xrCrossTabCell");
var xrCrossTabCell_2 = require("../controls/xrCrossTabCell");
var _defaultCrossTabControl_1 = require("../internal/_defaultCrossTabControl");
var canPasteInBand = function (dropTarget) {
    var model = dropTarget.getControlModel();
    return model instanceof xrBand_1.BandViewModel;
};
function registerControls(fieldListProvider) {
    settings_1.controlsFactory(new controlsFactory_1.ControlsFactory(fieldListProvider));
    settings_1.controlsFactory().registerControl('Unknown', {
        info: metadataGroups_1.unknownSerializationsInfo,
        type: _xrTodoControl_1.UnknownViewModel,
        defaultVal: {
            '@SizeF': '100,23'
        },
        nonToolboxItem: true,
        surfaceType: xrControl_1.XRControlSurface
    });
    settings_1.controlsFactory().registerControl('XRLabel', {
        info: xrTextControl_1.labelSerializationsInfo,
        toolboxIndex: 0,
        defaultVal: {
            '@Padding': '2,2,0,0,100',
            '@Multiline': 'true',
            '@SizeF': '100,23'
        },
        group: 'common',
        defaultBindingName: 'Text',
        surfaceType: xrTextControl_2.XRTextControlSurfaceBase,
        type: xrControl_1.XRControlViewModel,
        popularProperties: xrTextControl_1.popularPropertiesLabel,
        displayName: analytics_utils_1.getLocalization('Label', 'DevExpress.XtraReports.UI.XRLabel')
    });
    settings_1.controlsFactory().registerControl('XRCheckBox', {
        info: xrCheckbox_1.checkboxSerializationsInfo,
        toolboxIndex: 1,
        group: 'common',
        type: xrCheckbox_2.XRCheckBoxViewModel,
        surfaceType: xrCheckbox_2.XRCheckBoxSurface,
        defaultVal: {
            '@SizeF': '100,23',
            '@Padding': '2,2,0,0,100'
        },
        defaultBindingName: 'CheckBoxState',
        popularProperties: xrCheckbox_1.popularPropertiesCheckBox,
        displayName: analytics_utils_1.getLocalization('Check Box', 'DevExpress.XtraReports.UI.XRCheckBox')
    });
    settings_1.controlsFactory().registerControl('XRRichText', {
        info: xrRichText_1.richTextSerializationsInfo,
        toolboxIndex: 2,
        group: 'common',
        defaultVal: {
            '@SizeF': '100,23',
            '@Padding': '2,2,0,0,100'
        },
        surfaceType: richEdit_1.getRichEditSurface()(),
        type: xrRichText_2.XRRichViewModel,
        defaultBindingName: 'Rtf',
        popularProperties: xrRichText_1.popularPropertiesRichText,
        displayName: analytics_utils_1.getLocalization('Rich Text', 'DevExpress.XtraReports.UI.XRRichText')
    });
    settings_1.controlsFactory().registerControl('XRPictureBox', {
        info: xrPicturebox_1.pictureBoxSerializationsInfo,
        toolboxIndex: 3,
        group: 'common',
        defaultVal: {
            '@SizeF': '100,100',
        },
        type: xrPicturebox_2.XRPictureBoxViewModel,
        surfaceType: xrPicturebox_2.XRPictureBoxSurface,
        defaultBindingName: 'ImageSource',
        popularProperties: xrPicturebox_1.popularPropertiesPicture,
        displayName: analytics_utils_1.getLocalization('Picture Box', 'DevExpress.XtraReports.UI.XRPictureBox')
    });
    settings_1.controlsFactory().registerControl('XRPanel', {
        info: xrControl_2.panelSerializationsInfo,
        toolboxIndex: 4,
        group: 'common',
        defaultVal: {
            '@SizeF': '300,75'
        },
        surfaceType: xrControl_1.XRControlSurface,
        type: xrControl_1.XRControlViewModel,
        isContainer: true,
        displayName: analytics_utils_1.getLocalization('Panel', 'DevExpress.XtraReports.UI.XRPanel')
    });
    settings_1.controlsFactory().registerControl('XRTable', {
        info: xrTable_1.tableSerializationsInfo,
        group: 'common',
        type: xrTable_2.XRTableControlViewModel,
        toolboxIndex: 5,
        defaultVal: {
            '@SizeF': '300,25',
            'Rows': {
                'Item1': {
                    '@ControlType': 'XRTableRow',
                    '@Weight': '1',
                    'Cells': {
                        'Item1': {
                            '@ControlType': 'XRTableCell',
                            '@Weight': '1',
                            '@Multiline': 'true',
                            '@Padding': '2,2,0,0,100'
                        },
                        'Item2': {
                            '@ControlType': 'XRTableCell',
                            '@Weight': '1',
                            '@Multiline': 'true',
                            '@Padding': '2,2,0,0,100'
                        },
                        'Item3': {
                            '@ControlType': 'XRTableCell',
                            '@Weight': '1',
                            '@Multiline': 'true',
                            '@Padding': '2,2,0,0,100'
                        }
                    }
                }
            }
        },
        surfaceType: xrTable_2.XRTableSurface,
        popularProperties: xrTable_1.popularPropertiesTable,
        isContainer: true,
        isPasteDeny: true,
        canDrop: function (dropTarget) { return dropTarget.getControlModel().controlType !== 'XRTableRow'; },
        displayName: analytics_utils_1.getLocalization('Table', 'DevExpress.XtraReports.UI.XRTable')
    });
    settings_1.controlsFactory().registerControl('XRCharacterComb', {
        info: xrCharactercomb_1.characterCombSerializationsInfo,
        toolboxIndex: 6,
        group: 'common',
        defaultVal: {
            '@SizeF': '200,80',
            '@Multiline': 'true'
        },
        defaultBindingName: 'Text',
        surfaceType: xrCharactercomb_2.XRCharacterCombSurface,
        type: xrCharactercomb_2.XRCharacterComb,
        popularProperties: xrTextControl_1.popularPropertiesLabel,
        displayName: analytics_utils_1.getLocalization('Character Comb', 'DevExpress.XtraReports.UI.XRCharacterComb')
    });
    settings_1.controlsFactory().registerControl('XRLine', {
        info: xrLine_1.lineSerializationsInfo,
        group: 'graphics',
        toolboxIndex: 7,
        type: xrControl_1.XRControlViewModel,
        surfaceType: xrLine_2.XRLineSurface,
        defaultVal: {
            '@SizeF': '100,23',
        },
        popularProperties: xrLine_1.popularPropertiesLine,
        displayName: analytics_utils_1.getLocalization('Line', 'DevExpress.XtraReports.UI.XRLine')
    });
    settings_1.controlsFactory().registerControl('XRShape', {
        info: xrShape_1.shapeSerializationsInfo,
        toolboxIndex: 8,
        group: 'graphics',
        defaultVal: {
            '@SizeF': '100,100'
        },
        defaultBindingName: 'Tag',
        type: xrShape_2.XRShapeViewModel,
        surfaceType: xrShape_2.XRShapeControlSurface,
        popularProperties: xrShape_1.popularPropertiesShape,
        displayName: analytics_utils_1.getLocalization('Shape', 'DevExpress.XtraReports.UI.XRShape')
    });
    settings_1.controlsFactory().registerControl('XRBarCode', {
        info: xrBarcode_1.barcodeSerializationsInfo,
        toolboxIndex: 9,
        group: 'graphics',
        defaultVal: {
            '@SizeF': '200,75',
            '@Padding': '10,10,0,0,100',
            'Symbology': {
                '@Name': 'Code128'
            },
            '@Text': ''
        },
        defaultBindingName: 'Text',
        surfaceType: xrBarcode_2.XRBarcodeSurface,
        type: xrBarcode_2.XRBarCodeViewModel,
        popularProperties: xrBarcode_1.popularPropertiesBarCode,
        displayName: analytics_utils_1.getLocalization('Bar Code', 'DevExpress.XtraReports.UI.XRBarCode')
    });
    settings_1.controlsFactory().registerControl('XRZipCode', {
        info: xrZipcode_1.zipCodeSerializationInfo,
        type: xrControl_1.XRControlViewModel,
        nonToolboxItem: true,
        group: 'graphics',
        surfaceType: xrZipcode_2.XRZipCodeSurface,
        toolboxIndex: 10,
        defaultVal: {
            '@SizeF': '100,23'
        },
        popularProperties: xrZipcode_1.popularPropertiesZipCode,
        displayName: analytics_utils_1.getLocalization('Zip Code', 'DevExpress.XtraReports.UI.XRZipCode')
    });
    settings_1.controlsFactory().registerControl('XRChart', {
        info: xrChart_1.xrChartSerializationInfo,
        group: 'complex',
        toolboxIndex: 11,
        defaultVal: {
            '@SizeF': '400,300',
            'Chart': {
                'Diagram': {
                    '@TypeNameSerializable': 'XYDiagram',
                    'AxisY': {
                        '@VisibleInPanesSerializable': '-1'
                    },
                    'AxisX': {
                        '@VisibleInPanesSerializable': '-1'
                    }
                },
                'DataContainer': {}
            }
        },
        defaultBindingName: 'Tag',
        type: xrChart_2.XRChartViewModel,
        surfaceType: xrChart_2.XRChartSurface,
        popularProperties: ['name'],
        displayName: analytics_utils_1.getLocalization('Chart', 'DevExpress.XtraReports.UI.XRChart')
    });
    settings_1.controlsFactory().registerControl('XRGauge', {
        info: xrGauge_1.xrGaugeSerializationInfo,
        surfaceType: _xrTodoControl_1.TodoControlSurface,
        type: xrGauge_2.XRGaugeViewModel,
        group: 'complex',
        toolboxIndex: 12,
        defaultVal: {
            '@SizeF': '220,120'
        },
        defaultBindingName: 'Tag',
        popularProperties: xrGauge_1.popularPropertiesGauge,
        displayName: analytics_utils_1.getLocalization('Gauge', 'DevExpress.XtraReports.UI.XRGauge')
    });
    settings_1.controlsFactory().registerControl('XRSparkline', {
        info: xrSparkline_1.sparklineSerializationsInfo,
        toolboxIndex: 13,
        group: 'complex',
        defaultVal: {
            '@SizeF': '150,80',
            'View': {
                '@Type': 'Line'
            },
        },
        surfaceType: xrSparkline_2.XRSparkLineSurface,
        defaultBindingName: 'Tag',
        type: xrSparkline_2.XRSparklineViewModel,
        popularProperties: xrSparkline_1.popularPropertiesSparkline,
        displayName: analytics_utils_1.getLocalization('Sparkline', 'DevExpress.XtraReports.UI.XRSparkline')
    });
    settings_1.controlsFactory().registerControl('XRPivotGrid', {
        info: xrPivotgrid_1.pivotGridSerializationsInfo,
        toolboxIndex: 14,
        group: 'complex',
        defaultVal: {
            '@ControlType': 'XRPivotGrid',
            '@SizeF': '250,120',
            'OptionsChartDataSource': {},
            'Prefilter': {},
            'OptionsPrint': {
                '@FilterSeparatorBarPadding': '3',
                '@UsePrintAppearance': 'true',
                '@PrintFilterHeaders': 'False'
            },
            'OptionsView': {}
        },
        canPaste: canPasteInBand,
        defaultBindingName: 'Tag',
        type: xrPivotgrid_2.XRPivotGridViewModel,
        surfaceType: xrPivotgrid_2.XRPivotGridSurface,
        nonToolboxItem: settings_1.DefaultCrossTabControl() == _defaultCrossTabControl_1.DefaultCrossTabControlEnum.XRCrossTab,
        popularProperties: ['dataSource', 'dataMember'],
        displayName: analytics_utils_1.getLocalization('Pivot Grid', 'DevExpress.XtraReports.UI.XRPivotGrid')
    });
    settings_1.controlsFactory().registerControl('XRCrossTab', {
        info: xrCrossTab_2.crossTabSerializationInfo,
        toolboxIndex: 14,
        type: xrCrossTab_1.XRCrossTabViewModel,
        group: 'complex',
        defaultVal: {
            '@ControlType': 'XRCrossTab',
            '@SizeF': '200,50',
            'ColumnDefinitions': {
                'Item1': {},
                'Item2': {}
            },
            'RowDefinitions': {
                'Item1': {},
                'Item2': {}
            },
            'Cells': {
                'Item1': { '@ControlType': 'XRCrossTabCell', '@ColumnIndex': '0', '@RowIndex': '0', '@Text': null },
                'Item2': { '@ControlType': 'XRCrossTabCell', '@ColumnIndex': '1', '@RowIndex': '1', '@Text': null },
                'Item3': { '@ControlType': 'XRCrossTabCell', '@ColumnIndex': '1', '@RowIndex': '0', '@Text': null },
                'Item4': { '@ControlType': 'XRCrossTabCell', '@ColumnIndex': '0', '@RowIndex': '1', '@Text': null }
            }
        },
        surfaceType: xrCrossTab_1.XRCrossTabSurface,
        displayName: analytics_utils_1.getLocalization('Cross Tab', 'DevExpress.XtraReports.UI.XRCrossTab'),
        nonToolboxItem: settings_1.DefaultCrossTabControl() == _defaultCrossTabControl_1.DefaultCrossTabControlEnum.XRPivotGrid,
        popularProperties: ['dataSource', 'dataMember', 'layoutOptions', 'printOptions', 'controlParameters', 'filterString']
    });
    settings_1.controlsFactory().registerControl('XRCrossTabCell', {
        info: xrCrossTabCell_1.cellserializtionInfo,
        type: xrCrossTabCell_2.XRCrossTabCellViewModel,
        nonToolboxItem: true,
        isDeleteDeny: true,
        group: 'complex',
        defaultVal: {
            '@ControlType': 'XRCrossTabCell',
            '@Text': null,
            '@TextFormatString': null
        },
        surfaceType: xrCrossTabCell_2.XRCellsurface,
        displayName: analytics_utils_1.getLocalization('Cross Tab Cell', 'DevExpress.XtraReports.UI.CrossTab.XRCrossTabCell')
    });
    settings_1.controlsFactory().registerControl('XRSubreport', {
        info: xrSubreport_1.subreportSerializationsInfo,
        toolboxIndex: 15,
        group: 'complex',
        defaultVal: {
            '@SizeF': '100,23',
            'ReportSource': xrSubreport_2.SubreportViewModel.defaultReport
        },
        surfaceType: xrSubreport_2.XRSubreportSurface,
        type: xrSubreport_2.XRSubreportViewModel,
        canPaste: canPasteInBand,
        popularProperties: ['name', 'reportSourceUrl'],
        displayName: analytics_utils_1.getLocalization('Sub-Report', 'DevExpress.XtraReports.UI.XRSubreport')
    });
    settings_1.controlsFactory().registerControl('XRPdfContent', {
        info: xrPdfContent_1.pdfContentSerializationInfo,
        toolboxIndex: 16,
        group: 'complex',
        defaultVal: {
            '@HeightF': '23'
        },
        defaultBindingName: 'SourceUrl',
        surfaceType: xrPdfContent_2.XRPdfContentSurface,
        type: xrPdfContent_2.XRPdfContentViewModel,
        popularProperties: xrPdfContent_1.popularPropertiesPdfContent,
        displayName: analytics_utils_1.getLocalization('PDF Content', 'DevExpress.XtraReports.UI.XRPdfContent'),
        canDrop: function (dropTarget, dragFrom) {
            var bandModel = getNearestBand_1.getNearestBand(dropTarget.getControlModel());
            return bandModel && !utils_1._isMarginBand(bandModel) && !utils_1._isPageBand(bandModel);
        },
        canPaste: canPasteInBand
    });
    settings_1.controlsFactory().registerControl('XRPdfSignature', {
        info: xrPdfSignature_1.pdfSignatureInfo,
        type: xrPdfSignature_2.XRPdfSignatureModel,
        toolboxIndex: 17,
        group: 'complex',
        defaultVal: {
            '@SizeF': '200,100',
            'SignatureOptions': {
                '@DisplayDocumentSignature': 'false'
            }
        },
        surfaceType: xrPdfSignature_2.XRPdfSignatureSurface,
        popularProperties: ['signatureOptions'],
        displayName: analytics_utils_1.getLocalization('PDF Signature', 'DevExpress.XtraReports.UI.XRPdfSignature')
    });
    settings_1.controlsFactory().registerControl('XRTableOfContents', {
        toolboxIndex: 18,
        info: xrTableOfContents_1.tocSerializationsInfo,
        group: 'misc',
        surfaceType: xrTableOfContents_2.XRTableOfContentsSurface,
        type: xrTableOfContents_2.XRTableOfContentsViewModel,
        defaultVal: {
            '@ControlType': 'XRTableOfContents',
            'LevelTitle': {
                '@Text': 'Title',
                '@Height': '23',
                '@Padding': '0,0,0,0,100'
            },
            'LevelDefault': {
                '@Height': '23',
                '@Padding': '0,0,0,0,100'
            }
        },
        canDrop: function (dropTarget, dragFrom) {
            var bandModel = getNearestBand_1.getNearestBand(dropTarget.getControlModel());
            if (!bandModel)
                return false;
            if (!dragFrom) {
                var reportModel = bandModel.root;
                return reportModel.canAddToC();
            }
            else if (_tocUtils_1.isHeaderOrFooterBandType(bandModel)) {
                var toc = _tocUtils_1.getExistTableOfContents(bandModel);
                return !toc || toc === dragFrom;
            }
            return false;
        },
        displayName: analytics_utils_1.getLocalization('Table of Contents', 'DevExpress.XtraReports.UI.XRTableOfContents')
    });
    settings_1.controlsFactory().registerControl('XRPageInfo', {
        info: xrPageinfo_1.pageInfoSerializationsInfo,
        type: xrPageinfo_2.XRPageInfoViewModel,
        surfaceType: xrPageinfo_2.XRPageInfoSurface,
        toolboxIndex: 19,
        group: 'misc',
        defaultVal: {
            '@SizeF': '100,23',
            '@Padding': '2,2,0,0,100'
        },
        popularProperties: xrPageinfo_1.popularPropertiesPageInfo,
        displayName: analytics_utils_1.getLocalization('Page Info', 'DevExpress.XtraReports.UI.XRPageInfo')
    });
    settings_1.controlsFactory().registerControl('XRPageBreak', {
        info: xrPagebreak_1.pageBreakSerializationsInfo,
        type: xrControl_1.XRControlViewModel,
        surfaceType: xrPagebreak_2.XRPageBreakSurface,
        toolboxIndex: 20,
        group: 'misc',
        defaultVal: {
            '@SizeF': '30,2'
        },
        canPaste: canPasteInBand,
        displayName: analytics_utils_1.getLocalization('Page Break', 'DevExpress.XtraReports.UI.XRPageBreak')
    });
    settings_1.controlsFactory().registerControl('XRCrossBandLine', {
        info: xrCrossband_1.crossBandLineControlSerializationsInfo,
        type: xrCrossband_2.XRCrossBandControlViewModel,
        toolboxIndex: 21,
        group: 'misc',
        defaultVal: {
            '@WidthF': '9.38',
            '@StartPointFloat': '0,0',
            '@EndPointFloat': '0,50'
        },
        size: '9.38, 50',
        surfaceType: xrCrossband_2.XRCrossBandSurface,
        popularProperties: xrCrossband_1.popularPropertiesCrossLine,
        displayName: analytics_utils_1.getLocalization('Cross-band Line', 'DevExpress.XtraReports.UI.XRCrossBandLine')
    });
    settings_1.controlsFactory().registerControl('XRCrossBandBox', {
        info: xrCrossband_1.crossBandBoxControlSerializationsInfo,
        type: xrCrossband_2.XRCrossBandControlViewModel,
        toolboxIndex: 22,
        group: 'misc',
        defaultVal: {
            '@WidthF': '50',
            '@StartPointFloat': '0,0',
            '@EndPointFloat': '0,50'
        },
        size: '50,50',
        surfaceType: xrCrossband_2.XRCrossBandSurface,
        displayName: analytics_utils_1.getLocalization('Cross-band Box', 'DevExpress.XtraReports.UI.XRCrossBandBox')
    });
    settings_1.controlsFactory().registerControl('DevExpress.XtraReports.UI.XtraReport', {
        info: xrReport_2.reportSerializationInfo,
        nonToolboxItem: true,
        surfaceType: xrReport_1.ReportSurface,
        popularProperties: xrReport_2.popularPropertiesReport,
        isCopyDeny: true,
        isDeleteDeny: true,
        displayName: analytics_utils_1.getLocalization('Report', 'DevExpress.XtraReports.UI.XtraReport')
    });
    settings_1.controlsFactory().registerControl('TopMarginBand', {
        info: xrBandMetaData_1.bandSerializationInfo.concat(scriptMetadata_1.commonBandScripts),
        type: xrMarginBands_1.TopMarginBand,
        nonToolboxItem: true,
        surfaceType: xrBand_1.BandSurface,
        isContainer: true,
        isCopyDeny: true,
        isDeleteDeny: true,
        displayName: analytics_utils_1.getLocalization('Top Margin', 'DevExpress.XtraReports.UI.TopMarginBand')
    });
    settings_1.controlsFactory().registerControl('BottomMarginBand', {
        info: xrBandMetaData_1.bandSerializationInfo.concat(scriptMetadata_1.commonBandScripts),
        type: xrMarginBands_1.BottomMarginBand,
        nonToolboxItem: true,
        surfaceType: xrMarginBands_1.BottomMarginSurface,
        isContainer: true,
        isCopyDeny: true,
        isDeleteDeny: true,
        displayName: analytics_utils_1.getLocalization('Bottom Margin', 'DevExpress.XtraReports.UI.BottomMarginBand')
    });
    settings_1.controlsFactory().registerControl('DetailReportBand', {
        info: xrDetailReportBandMetaData_1.detailReportBandSerializationInfo,
        type: xrDetailReportBand_1.DetailReportBand,
        nonToolboxItem: true,
        surfaceType: xrDetailReportBand_1.DetailReportBandSurface,
        popularProperties: xrDetailReportBandMetaData_1.popularPropertiesDetailReport,
        isContainer: true,
        isCopyDeny: true,
        canDrop: function (dropTarget, draggableModel) {
            var dropTargetModel = dropTarget.getControlModel();
            return (dropTargetModel.controlType === 'DevExpress.XtraReports.UI.XtraReport' || dropTargetModel.controlType === 'DetailReportBand');
        },
        displayName: analytics_utils_1.getLocalization('Detail Report', 'DevExpress.XtraReports.UI.DetailReportBand')
    });
    settings_1.controlsFactory().registerControl('DetailBand', {
        info: xrDetailBandMetaData_1.detailBandSerializationInfo,
        type: xrDetailBand_1.DetailBand,
        nonToolboxItem: true,
        surfaceType: xrDetailBand_1.DetailBandSurface,
        popularProperties: xrDetailBandMetaData_1.popularPropertiesDetail,
        isContainer: true,
        isCopyDeny: true,
        isDeleteDeny: true,
        displayName: analytics_utils_1.getLocalization('Detail', 'DevExpress.XtraReports.UI.DetailBand')
    });
    settings_1.controlsFactory().registerControl('SubBand', {
        info: xrDetailBandMetaData_1.subBandSerializationInfo,
        type: xrSubband_1.SubBandViewModel,
        nonToolboxItem: true,
        surfaceType: xrSubband_1.SubBandSurface,
        popularProperties: xrDetailBandMetaData_1.generalBandPopularProperties,
        isContainer: true,
        isCopyDeny: true,
        canDrop: function (dropTarget, draggableModel) {
            var dropTargetModel = dropTarget.getControlModel();
            return draggableModel.parentModel() === dropTargetModel.parentModel() && dropTargetModel.controlType === 'SubBand';
        },
        displayName: analytics_utils_1.getLocalization('Sub-Band', 'DevExpress.XtraReports.UI.SubBand')
    });
    settings_1.controlsFactory().registerControl('GroupHeaderBand', {
        info: xrGroupBandMetaData_1.groupHeaderBandSerializationInfo,
        type: xrGroupBand_1.GroupHeaderBand,
        nonToolboxItem: true,
        surfaceType: xrBand_1.BandSurface,
        popularProperties: xrGroupBandMetaData_1.popularPropertiesGroupHeader,
        isContainer: true,
        isCopyDeny: true,
        canDrop: utils_1._isReorderBand,
        displayName: analytics_utils_1.getLocalization('Group Header', 'DevExpress.XtraReports.UI.GroupHeaderBand')
    });
    settings_1.controlsFactory().registerControl('GroupFooterBand', {
        info: xrGroupBandMetaData_1.groupFooterBandSerializationInfo,
        type: xrBand_1.BandViewModel,
        nonToolboxItem: true,
        surfaceType: xrBand_1.BandSurface,
        popularProperties: xrGroupBandMetaData_1.popularPropertiesGroupFooter,
        isContainer: true,
        isCopyDeny: true,
        canDrop: utils_1._isReorderBand,
        displayName: analytics_utils_1.getLocalization('Group Footer', 'DevExpress.XtraReports.UI.GroupFooterBand')
    });
    settings_1.controlsFactory().registerControl('PageHeaderBand', {
        info: xrPageBandMetaData_1.pageBandSerializationInfoPageHeader,
        type: xrBand_1.BandViewModel,
        nonToolboxItem: true,
        surfaceType: xrBand_1.BandSurface,
        popularProperties: xrPageBandMetaData_1.popularPropertiesPageHeader,
        isContainer: true,
        isCopyDeny: true,
        displayName: analytics_utils_1.getLocalization('Page Header', 'DevExpress.XtraReports.UI.PageHeaderBand')
    });
    settings_1.controlsFactory().registerControl('PageFooterBand', {
        info: xrPageBandMetaData_1.pageBandSerializationInfo,
        type: xrBand_1.BandViewModel,
        nonToolboxItem: true,
        surfaceType: xrPageBand_1.PageFooterSurface,
        popularProperties: xrPageBandMetaData_1.popularPropertiesPageFooter,
        isContainer: true,
        isCopyDeny: true,
        displayName: analytics_utils_1.getLocalization('Page Footer', 'DevExpress.XtraReports.UI.PageFooterBand')
    });
    settings_1.controlsFactory().registerControl('ReportHeaderBand', {
        info: xrBandMetaData_1.reportHeaderBandSerializationInfo,
        type: xrBand_1.BandViewModel,
        nonToolboxItem: true,
        surfaceType: xrBand_1.BandSurface,
        popularProperties: xrBandMetaData_1.popularPropertiesReportHeader,
        isContainer: true,
        isCopyDeny: true,
        displayName: analytics_utils_1.getLocalization('Report Header', 'DevExpress.XtraReports.UI.ReportHeaderBand')
    });
    settings_1.controlsFactory().registerControl('ReportFooterBand', {
        info: xrBandMetaData_1.reportFooterBandSerializationInfo,
        type: xrBand_1.BandViewModel,
        nonToolboxItem: true,
        popularProperties: xrBandMetaData_1.popularPropertiesReportFooter,
        surfaceType: xrBand_1.BandSurface,
        isContainer: true,
        isCopyDeny: true,
        displayName: analytics_utils_1.getLocalization('Report Footer', 'DevExpress.XtraReports.UI.ReportFooterBand')
    });
    settings_1.controlsFactory().registerControl('VerticalHeaderBand', {
        info: xrVerticalBandMetaData_1.verticalHeaderBandSerializationInfo,
        type: xrVerticalBand_1.VerticalBandViewModel,
        nonToolboxItem: true,
        popularProperties: xrVerticalBandMetaData_1.popularPropertiesVerticalHeaderBand,
        surfaceType: xrVerticalBand_1.VerticalBandSurface,
        isContainer: true,
        isCopyDeny: true
    });
    settings_1.controlsFactory().registerControl('VerticalDetailBand', {
        info: xrVerticalDetailBandMetaData_1.verticalDetailBandSerializationInfo,
        type: xrVerticalDetailBand_1.VerticalDetailBandViewModel,
        nonToolboxItem: true,
        popularProperties: xrVerticalDetailBandMetaData_1.popularPropertiesVerticalDetailBand,
        surfaceType: xrVerticalBand_1.VerticalBandSurface,
        isContainer: true,
        isCopyDeny: true,
        isDeleteDeny: true
    });
    settings_1.controlsFactory().registerControl('VerticalTotalBand', {
        info: xrVerticalBandMetaData_1.verticalTotalBandSerializationInfo,
        type: xrVerticalBand_1.VerticalBandViewModel,
        nonToolboxItem: true,
        popularProperties: xrVerticalBandMetaData_1.popularPropertiesVerticalTotalBand,
        surfaceType: xrVerticalBand_1.VerticalBandSurface,
        isContainer: true,
        isCopyDeny: true
    });
    settings_1.controlsFactory().registerControl('PivotGridField', {
        info: pivotgridfield_1.pivotGridFieldSerializationsInfo,
        type: pivotgridfield_2.PivotGridFieldViewModel,
        surfaceType: pivotgridfield_2.PivotGridFieldSurface,
        nonToolboxItem: true,
        popularProperties: pivotgridfield_1.popularPropertiesPivotGridField,
        displayName: 'PivotGridField'
    });
    settings_1.controlsFactory().registerControl('XRTableRow', {
        info: xrTableRow_1.tableRowSerializationsInfo,
        type: xrTableRow_2.XRTableRowViewModel,
        defaultVal: {
            '@HeightF': '25',
            '@Weight': '20'
        },
        nonToolboxItem: true,
        surfaceType: xrTableRow_2.XRTableRowSurface,
        isContainer: true,
        isCopyDeny: true,
        isPasteDeny: true,
        canDrop: function (dropTarget) { return dropTarget.getControlModel().controlType === 'XRTable'; },
        displayName: analytics_utils_1.getLocalization('Table Row', 'DevExpress.XtraReports.UI.XRTableRow')
    });
    settings_1.controlsFactory().registerControl('XRTableCell', {
        info: xrTableCell_1.tableCellSerializationsInfo,
        type: xrTableCell_2.XRTableCellViewModel,
        defaultVal: {
            '@Weight': '1',
            '@WidthF': '100',
            '@Multiline': 'true',
            '@Padding': '2,2,0,0,100'
        },
        nonToolboxItem: true,
        surfaceType: xrTableCell_2.XRTableCellSurface,
        popularProperties: xrTableCell_1.popularPropertiesTableCell,
        isContainer: true,
        defaultBindingName: 'Text',
        isCopyDeny: true,
        canDrop: function (dropTarget) { return dropTarget.getControlModel().controlType === 'XRTableRow'; },
        displayName: analytics_utils_1.getLocalization('Table Cell', 'DevExpress.XtraReports.UI.XRTableCell')
    });
}
exports.registerControls = registerControls;
