window.jsPDF = window.jspdf.jsPDF;
applyPlugin(window.jsPDF);

let dataSourceStatus = [{ "CD_STATUS": "A", "DS_STATUS": "Ativo" }, { "CD_STATUS": "I", "DS_STATUS": "Inativo" }];
let focusedOrigemProduto = null;
let gridOrigemProduto;
let vLoading = false;
let loadPanel;
let callerShowLoadPanel = '';

$(document).ready(async function inicio () {
    vLoading = true
    showLoadPanel("Carregando...", arguments.callee.name);

    gridOrigemProduto = $("#gridOrigemProduto").dxDataGrid({
        keyExpr: "CD_ORIGEM",
        dataSource: [],
        repaintChangesOnly: true,
        hoverStateEnabled: true,
        showBorders: true,
        showRowLines: true,
        focusedRowEnabled: true,
        focusedRowKey: focusedOrigemProduto,
        allowColumnReordering: true,
        allowColumnResizing: true,
        wordWrapEnabled: true,
        rowAlternationEnabled: true,
        columnAutoWidth: true,
        columns: [{
            caption: "Código",
            dataField: "CD_ORIGEM",
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
            dataField: "DS_ORIGEM",
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
            dataField: "CD_STATUS",
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
                dataSource: dataSourceStatus,
                valueExpr: "CD_STATUS",
                displayExpr: "DS_STATUS"
            }
        }],
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
                        dataField: 'DS_ORIGEM',
                        validationRules: [{
                            type: 'required',
                            message: 'Campo obrigatório'
                        }],
                        editorOptions: { maxLength: 250 }
                    },
                    {
                        dataField: 'CD_STATUS'
                    }]
                }]
            }
        },
        columnChooser: { enabled: true },
        headerFilter: { visible: true, allowSearch: true },
        filterPanel: { visible: true },
        filterRow: { visible: true, applyFilter: "auto" },
        searchPanel: { visible: true, placeholder: "Procurar...", highlightCaseSensitive: false, highlightSearchText: true },
        groupPanel: { visible: true, emptyPanelText: "Agrupar" },
        columnHidingEnabled: true,
        grouping: { contextMenuEnabled: true },
        pager: { allowedPageSizes: [10, 25, 50, 100], showPageSizeSelector: true, showNavigationButtons: true },
        paging: { pageSize: 10 },
        sorting: { mode: "multiple" },
        selection: { mode: 'single' },
        export: { enabled: true, },
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
        stateStoring: AutoLoad("gridOrigemProduto", false),
        onToolbarPreparing: AutoResetState([{
            location: "after",
            widget: "dxButton",
            locateInMenu: "auto",
            showText: "inMenu",
            options: {
                hint: "Diminuir tamanho da fonte",
                icon: "/img/FontSizeDiminuir.svg",
                text: "Diminuir tamanho da fonte",
                onClick: function () {
                    var size = $("#gridOrigemProduto").css('font-size').split('px')[0];
                    $("#gridOrigemProduto").css('font-size', --size + 'px')
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
                    var size = $("#gridOrigemProduto").css('font-size').split('px')[0];
                    $("#gridOrigemProduto").css('font-size', ++size + 'px')
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
                        component: e.component
                    }).then(function () {
                        doc.save('Cadastro de Origem de Produto.pdf');
                    });
                }
            }
        }]),
        onInitNewRow: function (e) {
            e.data.CD_STATUS = 'A';
        },
        onRowValidating: async function (e) {
            if (e.isValid) {
                showLoadPanel("Salvando...", arguments.callee.name);

                var data;
                if (e.oldData) {
                    //CRIA UM OBJETO COM OS DADOS ANTIGOS
                    data = JSON.parse(JSON.stringify(e.oldData));
                    //ATUALIZA O OBJETO COM OS DADOS ATUAIS
                    Object.keys(e.newData).forEach(key => {
                        data[key] = e.newData[key];
                    });
                    data.OPERACAO = "A";
                } else {
                    data = e.newData;
                    data.OPERACAO = "I";
                }

                var deferred = new $.Deferred;
                e.promise = deferred.promise();

                $.ajax({
                    type: 'POST',
                    url: '/CadastrosGerais/saveOrigemProduto',
                    data: { data: JSON.stringify(data) },
                }).done(async function (response) {
                    exibeMensagem('success', 'Operação realizada!', 'Registro salvo com sucesso');
                    e.isValid = true;
                    deferred.resolve();

                    focusedOrigemProduto = response.CD_ORIGEM;
                    await getOrigemProduto();
                }).fail(function (response) {
                    trataErroHTTP("Ocorreu um erro ao salvar a origem de produto", response);
                    e.isValid = false;
                    deferred.resolve();
                }).always(() => {
                    hideLoadPanel(arguments.callee.name);
                });
            }
        },
    }).dxDataGrid("instance");

    await getOrigemProduto()

    hideLoadPanel(arguments.callee.name);

    vLoading = false;
});

async function getOrigemProduto() {
    showLoadPanel("Carregando...", arguments.callee.name);

    await $.ajax({
        type: "POST",
        url: "/CadastrosGerais/getOrigemProduto",
    }).done(function (response) {
        gridOrigemProduto.option("dataSource", response);
        if (focusedOrigemProduto) {
            gridOrigemProduto.option("focusedRowKey", focusedOrigemProduto);
        }
    }).fail(function (response) {
        trataErroHTTP("Ocorreu um erro ao carregar as origens cadastradas", response);
    }).always(() => {
        hideLoadPanel(arguments.callee.name);
    });
};

function showLoadPanel(pMessage, pCaller) {
    if (!callerShowLoadPanel) {
        loadPanel = $("#loadPanel").dxLoadPanel({
            shadingColor: "rgba(0,0,0,0.4)",
            message: pMessage,
            visible: false,
            showIndicator: true,
            showPane: true,
            shading: true,
            hideOnOutsideClick: false,
        }).dxLoadPanel("instance");

        loadPanel.show();

        callerShowLoadPanel = pCaller;
    }
}

function hideLoadPanel(pCaller) {
    if (callerShowLoadPanel == pCaller) {
        loadPanel.hide();
        callerShowLoadPanel = null;
    }
}

function trataErroHTTP(pMensagemOperacao, pResponse) {
    var vMsgErroHTTP = "Erro desconhecido";

    if (pResponse) {
        if (pResponse.responseJSON) {
            vMsgErroHTTP = pResponse.status + ": " + pResponse.responseJSON.detail;
        } else if (pResponse.responseText) {
            vMsgErroHTTP = pResponse.status + ": " + pResponse.responseText;
        } else {
            vMsgErroHTTP = pResponse.status + ": " + pResponse.statusText;
        }
    }

    exibeMensagem("error", pMensagemOperacao, vMsgErroHTTP);
}

function exibeMensagem(pTipo, pTitulo, pTexto) {

    var configuration = { title: pTitulo, text: pTexto, type: pTipo }

    if (pTipo == "error") {
        configuration.addclass = "stack-bar-top";
        configuration.stack = { "dir1": "down", "dir2": "right", "push": "top", "spacing1": 0, "spacing2": 0 };
        configuration.width = "100%";
        configuration.hide = false;
    }
    else if (pTipo == "info") {
        configuration.addclass = "notification-warning stack-bar-top";
        configuration.stack = { "dir1": "down", "dir2": "right", "push": "top", "spacing1": 0, "spacing2": 0 };
        configuration.width = "100%";
    }

    new PNotify(configuration)
}
