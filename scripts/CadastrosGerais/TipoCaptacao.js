const vCodigosReservados = [1, 10, 11]; //1 - Padrão | 10 - E-Commerce | 11 - Televendas

var grid = $("#gridTipoCaptacao");

window.jsPDF = window.jspdf.jsPDF;
applyPlugin(window.jsPDF);

var STATUS = [{
    "CD_STATUS": "A",
    "DS_STATUS": "Ativo",
},
{
    "CD_STATUS": "I",
    "DS_STATUS": "Inativo",
}
];

var FocusedTipoCaptacao = null;

$(document).ready(function () {
    CarregaTipoCaptacao(true)

    $('.inicio').fadeOut('fast');
    $('#resultadoGrid').fadeIn(1500);
});

function CarregaTipoCaptacao(pCarregandoTela) {
    grid.fadeOut('fast');

    $.ajax({
        type: 'POST',
        url: "/CadastrosGerais/CarregaTipoCaptacao",
        success: function (responseData) {
            if (typeof responseData == 'string') {
                ExibeMensagem('error', 'Erro ao executar a consulta de tipo de captação', responseData);
            } else {
                for (vCont in responseData) {
                    if (vCodigosReservados.indexOf(responseData[vCont].Cd_Tipo_Captacao) >= 0) {
                        responseData[vCont].Ds_Tipo_Captacao += ' (Reservado)';
                    }
                }

                if (pCarregandoTela == true) {
                    grid.dxDataGrid({
                        keyExpr: "Cd_Tipo_Captacao",
                        dataSource: responseData,
                        hoverStateEnabled: true,
                        showBorders: true,
                        showRowLines: true,
                        focusedRowEnabled: true,
                        focusedRowKey: FocusedTipoCaptacao,
                        allowColumnReordering: true,
                        allowColumnResizing: true,
                        wordWrapEnabled: true,
                        rowAlternationEnabled: true,
                        columnAutoWidth: true,
                        columns: [{
                            caption: "Código",
                            dataField: "Cd_Tipo_Captacao",
                            width: 100,
                            hidingPriority: 0,
                            alignment: 'center',
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            allowFiltering: true,
                            cssClass: "column-data-grid",
                            visible: true,
                            allowHiding: false
                        },
                        {
                            caption: "Descrição",
                            dataField: "Ds_Tipo_Captacao",
                            //width: '50%',
                            alignment: 'left',
                            allowEditing: true,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            allowFiltering: true,
                            cssClass: "column-data-grid",
                            visible: true,
                            allowHiding: false
                        },
                        {
                            caption: "Status",
                            dataField: "Cd_Status",
                            width: 100,
                            alignment: "center",
                            hidingPriority: 1,
                            allowEditing: true,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            allowFiltering: true,
                            cssClass: "column-data-grid",
                            visible: true,
                            allowHiding: false,
                            lookup: {
                                dataSource: STATUS,
                                valueExpr: "CD_STATUS",
                                displayExpr: "DS_STATUS"
                            }
                        }
                        ],
                        editing: {
                            mode: 'form',
                            allowAdding: true,
                            allowUpdating: true,
                            allowDeleting: false,
                            selectTextOnEditStart: true,
                            useIcons: true,
                            popup: {
                                showTitle: true,
                                maxWidth: 600,
                                height: 270,
                            },
                            form: {
                                labelMode: 'floating',
                                items: [{
                                    itemType: 'group',
                                    colCount: 2,
                                    colSpan: 2,
                                    items: [{
                                        dataField: 'Ds_Tipo_Captacao',
                                        validationRules: [{
                                            type: 'required',
                                            message: 'Campo obrigatório'
                                        }],
                                        editorOptions: { maxLength: 40 }
                                    },
                                    {
                                        dataField: 'Cd_Status'
                                    }]
                                }]
                            }
                        },
                        columnChooser: {
                            enabled: true
                        },
                        headerFilter: {
                            visible: true,
                            allowSearch: true
                        },
                        filterPanel: {
                            visible: true
                        },
                        filterRow: {
                            visible: true,
                            applyFilter: "auto"
                        },
                        searchPanel: {
                            visible: true,
                            placeholder: "Procurar...",
                            highlightCaseSensitive: false,
                            highlightSearchText: true
                        },
                        groupPanel: { visible: true, emptyPanelText: "Agrupar" },
                        columnHidingEnabled: true,
                        grouping: {
                            contextMenuEnabled: true
                        },
                        pager: {
                            allowedPageSizes: [10, 25, 50, 100],
                            showPageSizeSelector: true,
                            showNavigationButtons: true
                        },
                        paging: {
                            pageSize: 10
                        },
                        sorting: {
                            mode: "multiple"
                        },
                        selection: {
                            mode: 'single'
                        },
                        export: {
                            enabled: true,
                        },
                        onExporting: function (e) {
                            var workbook = new ExcelJS.Workbook();
                            var worksheet = workbook.addWorksheet('Planilha 1');

                            DevExpress.excelExporter.exportDataGrid({
                                worksheet: worksheet,
                                component: e.component,
                                customizeCell: function (options) {
                                    var excelCell = options;
                                    excelCell.font = {
                                        name: 'Arial',
                                        size: 12
                                    };
                                    excelCell.alignment = {
                                        horizontal: 'left'
                                    };
                                }
                            }).then(function () {
                                workbook.xlsx.writeBuffer().then(function (buffer) {
                                    saveAs(new Blob([buffer], {
                                        type: 'application/octet-stream'
                                    }), 'Cadastro de Tipo de Captação.xlsx');
                                });
                            });
                            e.cancel = true;
                        },
                        onToolbarPreparing: function (e) {
                            var dataGrid = e.component;

                            e.toolbarOptions.items.unshift({
                                location: "after",
                                widget: "dxButton",
                                locateInMenu: "auto",
                                showText: "inMenu",
                                options: {
                                    hint: "Diminuir tamanho da fonte",
                                    icon: "/img/FontSizeDiminuir.svg",
                                    text: "Diminuir tamanho da fonte",
                                    onClick: function () {
                                        var size = grid.css('font-size').split('px')[0];
                                        grid.css('font-size', --size + 'px')
                                    }
                                }
                            }, {
                                location: "after",
                                widget: "dxButton",
                                locateInMenu: "auto",
                                showText: "inMenu",
                                options: {
                                    hint: "Aumentar tamanho da fonte",
                                    icon: "/img/FontSizeAumentar.svg",
                                    text: "Aumentar tamanho da fonte",
                                    onClick: function () {
                                        var size = grid.css('font-size').split('px')[0];
                                        grid.css('font-size', ++size + 'px')
                                    }
                                }
                            }, {
                                location: "after",
                                widget: "dxButton",
                                locateInMenu: "auto",
                                showText: "inMenu",
                                options: {
                                    hint: "Exportar para PDF",
                                    icon: "exportpdf",
                                    text: "Exportar para PDF",
                                    onClick: function () {
                                        window.jsPDF = window.jspdf.jsPDF;
                                        applyPlugin(window.jsPDF);
                                        const doc = new jsPDF({
                                            orientation: "landscape",
                                            unit: "cm",
                                            format: [29.7, 21]
                                        });

                                        DevExpress.pdfExporter.exportDataGrid({
                                            jsPDFDocument: doc,
                                            component: dataGrid
                                        }).then(function () {
                                            doc.save('Cadastro de Tipo de Captação.pdf');
                                        });
                                    }
                                }
                            });
                        },
                        onFocusedRowChanged: function (e) {
                            if (e.row != "") {
                                FocusedTipoCaptacao = e.component.option("focusedRowKey")
                            } else {
                                FocusedTipoCaptacao = null;
                            }
                        },
                        onInitNewRow: function (e) {
                            e.data.Cd_Status = 'A';
                        },
                        onEditingStart: function (e) {
                            if (vCodigosReservados.indexOf(e.data.Cd_Tipo_Captacao) >= 0) {
                                e.cancel = true;

                                ExibeMensagem('info', 'Atenção', 'Tipo de captação reservado, não é possível editar esse item');
                            }
                        },
                        onRowValidating: function (e) {
                            e = dataTreatment(e);

                            if (e.isValid == true) {
                                $.ajax({
                                    type: 'POST',
                                    url: `/CadastrosGerais/${e.oldData === undefined ? "SalvaTipoCaptacao" : "AlteraTipoCaptacao"}`,
                                    data: e.newData,
                                    success: function (responseData) {
                                        if (responseData.result == 'Erro') {
                                            ExibeMensagem('error', 'Erro ao salvar o tipo de captação', responseData.msg);
                                        } else {
                                            ExibeMensagem('success', 'Operação realizada!', 'Registro salvo com sucesso');

                                            CarregaTipoCaptacao(false);
                                        }
                                    },
                                    failure: function (responseData) {
                                        ExibeMensagem('error', 'Erro ao salvar o tipo de captação', responseData.msg);
                                    }
                                });
                            }
                        },
                    });
                }
                else {
                    grid.dxDataGrid({
                        dataSource: responseData,
                    });
                }

                grid.css('font', '11px verdana');

                grid.fadeIn('1500');
            }
        }
    });
};

function ExibeMensagem(pTipo, pTitulo, pTexto) {

    var configuration = { title: pTitulo, text: pTexto, type: pTipo }

    if (pTipo == 'error') {
        configuration.addclass = 'stack-bar-top';
        configuration.stack = { "dir1": "down", "dir2": "right", "push": "top", "spacing1": 0, "spacing2": 0 };
        configuration.width = "100%";
        configuration.hide = false;
    }
    else if (pTipo == 'info') {
        configuration.addclass = 'notification-warning stack-bar-top';
        configuration.stack = { "dir1": "down", "dir2": "right", "push": "top", "spacing1": 0, "spacing2": 0 };
        configuration.width = "100%";
    }

    new PNotify(configuration);
};

function dataTreatment(pData) {
    if (pData.newData.Cd_Tipo_Captacao == undefined) {
        pData.newData.Cd_Tipo_Captacao = pData.oldData != undefined ? pData.oldData.Cd_Tipo_Captacao : "0";
    }

    if (pData.newData.Ds_Tipo_Captacao == undefined) {
        pData.newData.Ds_Tipo_Captacao = pData.oldData != undefined ? pData.oldData.Ds_Tipo_Captacao : "";
    }

    if (pData.newData.Cd_Status == undefined) {
        pData.newData.Cd_Status = pData.oldData != undefined ? pData.oldData.Cd_Status : "A";
    }

    pData.newData.Ds_Tipo_Captacao = $.trim(pData.newData.Ds_Tipo_Captacao);

    return pData;
}