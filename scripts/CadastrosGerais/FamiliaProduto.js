window.jsPDF = window.jspdf.jsPDF;
applyPlugin(window.jsPDF);

let dataSourceStatus = [{ "CD_STATUS": "A", "DS_STATUS": "Ativo" }, { "CD_STATUS": "I", "DS_STATUS": "Inativo" }];
let focusedFamilia = null;
let treeListFamilia;
let vLoading = false;
let loadPanel;
let callerShowLoadPanel = '';

$(document).ready(async function inicio () {
    vLoading = true
    showLoadPanel("Carregando...", arguments.callee.name);

    treeListFamilia = $("#treeListFamilia").dxTreeList({
        keyExpr: "CD_FAMILIA",
        parentIdExpr: 'CD_FAMILIA_PAI',
        rootValue: null,
        showBorders: true,
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
                        dataField: 'DS_FAMILIA',
                        validationRules: [{
                            type: 'required',
                            message: 'Campo obrigatório'
                        }],
                        editorOptions: { maxLength: 50 }
                    },
                        'CD_STATUS']
                }]
            }
        },
        headerFilter: { visible: true, allowSearch: true },
        filterPanel: { visible: true },
        filterRow: { visible: true, applyFilter: "auto" },
        pager: { allowedPageSizes: [10, 25, 50, 100], showPageSizeSelector: true, showNavigationButtons: true },
        paging: { enabled: true, pageSize: 10 },
        scrolling: { mode: 'standard', },
        columnHidingEnabled: true,
        autoExpandAll: true,
        focusedRowEnabled: true,
        autoNavigateToFocusedRow: true,
        allowColumnReordering: true,
        allowColumnResizing: true,
        wordWrapEnabled: true,
        rowAlternationEnabled: true,
        columnAutoWidth: true,
        searchPanel: { visible: true, placeholder: "Procurar...", highlightCaseSensitive: false, highlightSearchText: true },
        selection: { mode: 'single' },
        columnChooser: { enabled: true },
        stateStoring: AutoLoad("treeListFamilia", false),
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
                    var size = $("#treeListFamilia").css('font-size').split('px')[0];
                    $("#treeListFamilia").css('font-size', --size + 'px')
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
                    var size = $("#treeListFamilia").css('font-size').split('px')[0];
                    $("#treeListFamilia").css('font-size', ++size + 'px')
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
                        doc.save('Cadastro de Famílias de Produtos.pdf');
                    });
                }
            }
        }]),
        onInitNewRow: function (e) {
            e.data.CD_STATUS = 'A';
        },
        onRowValidating: function (e) {
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
                    url: '/CadastrosGerais/saveFamiliaProduto',
                    data: { data: JSON.stringify(data) },
                }).done(async function (response) {
                    exibeMensagem('success', 'Operação realizada!', 'Registro salvo com sucesso');
                    e.isValid = true;
                    deferred.resolve();

                    focusedFamilia = response.CD_FAMILIA;
                    await getFamiliaProduto();
                }).fail(function (response) {
                    trataErroHTTP("Ocorreu um erro ao salvar a família de produto", response);
                    e.isValid = false;
                    deferred.resolve();
                }).always(() => {
                    hideLoadPanel(arguments.callee.name);
                });
            }
        },
        dataSource: [],
        columns: [
            {
                caption: "Descrição",
                dataField: "DS_FAMILIA",
                alignment: 'left',
                allowEditing: true,
                allowSorting: true,
                allowHeaderFiltering: true,
                allowFiltering: true,
                cssClass: "column-data-grid",
                visible: true,
                allowHiding: false,
            },
            {
                caption: "Código",
                dataField: "CD_FAMILIA",
                dataType: "number",
                allowEditing: false,
                //alignment: 'left',
                width: 80,
            //    cellTemplate(container, options) {
            //        container.text(String(options.value).padStart(5, '0'));
            //    }
            },
            {
                caption: "Status",
                dataField: "CD_STATUS",
                allowEditing: true,
                alignment: 'center',
                width: 80,
                lookup: {
                    dataSource: dataSourceStatus,
                    valueExpr: "CD_STATUS",
                    displayExpr: "DS_STATUS",
                }
            }
        ]
    }).dxTreeList("instance");

    await getFamiliaProduto()

    hideLoadPanel(arguments.callee.name);

    vLoading = false;
});


async function getFamiliaProduto() {
    showLoadPanel("Carregando...", arguments.callee.name);

    await $.ajax({
        type: "POST",
        url: "/CadastrosGerais/getFamiliaProduto",
    }).done(function (response) {
        treeListFamilia.option("dataSource", response);
        treeListFamilia.columnOption("DS_FAMILIA", "sortOrder", "asc");
        if (focusedFamilia) {
            treeListFamilia.option("focusedRowKey", focusedFamilia);
        }
    }).fail(function (response) {
        trataErroHTTP("Ocorreu um erro ao carregar as famílias cadastradas", response);
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
