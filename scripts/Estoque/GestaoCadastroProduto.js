var lkpTipoAtualizacao;
var actionIndex = 0;
var FILTRO = [];
var OUTROS = [];

function ExibirEsconderFiltros(el) {

    //verifica se foi informado algum objetos. Caso contrário vamos ocultar todos os objetivos sem exibir nenhum
    if (el !== undefined) {
        var display = document.getElementById(el).style.display;
        var bloco = document.getElementById(el).id;
    }

    document.getElementById("filtroManutencaoDadosGerais").style.display = 'none';
    document.getElementById("tituloFiltroDadosGerais").style.display = 'none';
    document.getElementById("tituloFiltroPrecificacao").style.display = 'none';
    document.getElementById("btnAvancarFiltroDadosGerais").style.display = 'none';
    document.getElementById("btnAvancarFiltroPrecificacao").style.display = 'none';


    if (el !== undefined) {
        if (el === "tituloFiltroDadosGerais") {
            document.getElementById("filtroManutencaoDadosGerais").style.display = 'block';
            document.getElementById("btnAvancarFiltroDadosGerais").style.display = 'block';
        }
        if (el === "tituloFiltroPrecificacao") {
            document.getElementById("filtroManutencaoDadosGerais").style.display = 'block';
            document.getElementById("btnAvancarFiltroPrecificacao").style.display = 'block';
        }

        document.getElementById(el).style.display = 'block';
    }
}

function ExibirEsconderGridManutencao(el) {
    var display = document.getElementById(el).style.display;
    var bloco = document.getElementById(el).id;

    document.getElementById("ManutencaoDadosGerais").style.display = 'none';
    document.getElementById("menuPrincipal").style.display = 'none';

    document.getElementById(el).style.display = 'block';
    //console.log(FILTRO);
    //console.log();

    $.ajax({
        type: 'POST',
        url: "/Estoque/CarregaProdutosGestaoCadastroProduto",
        data: {
            components: GetValuesOf_AzrComponents(FILTRO)
        },
        success: function (data) {
            //console.log(data);
            $("#gridProdutosDadosGerais").dxDataGrid({
                dataSource: data,
                wordWrapEnabled: true,
                showRowLines: true,
                rowAlternationEnabled: true,
                searchPanel: {
                    visible: true,
                    highlightCaseSensitive: false,
                    highlightSearchText: true,
                    placeholder: "Procurar...",
                },
                sorting: {
                    mode: "multiple"
                },
                selection: {
                    mode: 'single',
                    //showCheckBoxesMode: 'always',
                },
                hoverStateEnabled: false,
                allowColumnResizing: true,
                columnResizingMode: "widget",
                allowColumnReordering: true,
                groupPanel: {
                    visible: true
                },
                editing: {
                    mode: 'batch',
                    allowUpdating: true,
                    startEditAction: 'click',
                    allowAdding: false,
                    allowDeleting: false,
                    useIcons: false,
                },
                keyboardNavigation: {
                    enterKeyAction: 'moveFocus',
                    enterKeyDirection: 'column',
                    editOnKeyPress: true,
                },
                onFocusedCellChanging(e) {
                    e.isHighlighted = true;
                },
                paging: {
                    pageSize: 20
                },
                pager: {
                    visible: true,
                    allowedPageSizes: [10, 20, 50, 100, 200, 300],
                    showPageSizeSelector: true,
                    showNavigationButtons: true
                },
                export: {
                    enabled: true,
                    allowExportSelectedData: false
                },
                onExporting: function (e) {
                    var workbook = new ExcelJS.Workbook();
                    var worksheet = workbook.addWorksheet('Dados gerais');

                    DevExpress.excelExporter.exportDataGrid({
                        component: e.component,
                        worksheet: worksheet,
                        autoFilterEnabled: true
                    }).then(function () {
                        workbook.xlsx.writeBuffer().then(function (buffer) {
                            saveAs(new Blob([buffer], {
                                type: 'application/octet-stream'
                            }), 'Manutenção de Produtos - Dados gerais.xlsx');
                        });
                    });
                    e.cancel = true;
                },
                onToolbarPreparing: function (e) {
                    var revertButton = e.toolbarOptions.items.filter(function (i) {
                        return i.name === "revertButton"
                    })[0];
                    var origClick = revertButton.options.onClick;
                    revertButton.options.onClick = function () {
                        actionIndex = 0;
                        var result = DevExpress.ui.dialog.confirm("Are you sure?", "Confirm undo");
                        result.done(function (dialogResult) {
                            if (dialogResult) {
                                origClick.apply(arguments);
                            }
                        });
                    }

                    e.toolbarOptions.items.unshift(
                        {
                            location: "after",
                            visible: false,
                            widget: "dxButton",
                            locateInMenu: "auto",
                            options: {
                                hint: "Diminuir tamanho da fonte",
                                icon: "/img/FontSizeDiminuir.svg",
                                onClick: function () {
                                    //var size = $("#gridAtributo").css('font-size').split('px')[0];
                                    //$("#gridAtributo").css('font-size', --size + 'px')
                                }
                            }
                        },
                        {
                            location: "after",
                            visible: false,
                            widget: "dxButton",
                            locateInMenu: "auto",
                            options: {
                                hint: "Aumentar tamanho da fonte",
                                icon: "/img/FontSizeAumentar.svg",
                                onClick: function () {
                                    //var size = $("#gridAtributo").css('font-size').split('px')[0];
                                    //$("#gridAtributo").css('font-size', ++size + 'px')
                                }
                            }
                        }
                    );
                },
                filterRow: {
                    visible: true,
                    applyFilter: "auto"
                },
                headerFilter: {
                    visible: true,
                    allowSearch: true
                },
                filterPanel: {
                    visible: true
                },
                columnChooser: {
                    enabled: true
                },
                columnsAutoWidth: true,
                cellHintEnabled: true,
                keyExpr: 'CD_PRODUTO',
                columns: [{
                    dataField: "CD_PRODUTO",
                    caption: "Código Interno",
                    width: 80,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                    alignment: 'center',
                    cssClass: "column-data-grid",
                },
                {
                    caption: "DESCRIÇÕES DO PRODUTO",
                    alignment: 'center',
                    cssClass: "column-data-grid",
                    columns: [{
                        dataField: "DS_PRODUTO",
                        caption: "Descrição Completa do Produto",
                        //width: 250,
                        allowEditing: true,
                        allowHeaderFiltering: false,
                        allowSorting: true,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "DS_PRODUTO_REDUZIDA",
                        caption: "Descrição Reduzida (Cupom Fiscal)",
                        //width: 150,
                        allowEditing: true,
                        allowHeaderFiltering: false,
                        allowSorting: true,
                        cssClass: "column-data-grid",
                    },
                    ],
                },
                {
                    dataField: "CD_STATUS",
                    caption: "Status",
                    width: 75,
                    allowEditing: true,
                    allowHeaderFiltering: false,
                    allowSorting: true,
                    alignment: 'center',
                    cssClass: "column-data-grid",
                    lookup: {
                        dataSource: ds_StatusProduto,
                        valueExpr: "CD_STATUS",
                        displayExpr: "DS_STATUS"
                    }
                },
                {
                    caption: "CÓDIGOS DO PRODUTO",
                    alignment: 'center',
                    visible: false,
                    cssClass: "column-data-grid",
                    columns: [{
                        dataField: "CD_EAN_PRODUTO",
                        caption: "EAN",
                        //width: 100,
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "CD_FABRICANTE",
                        caption: "Código Fabricante",
                        //width: 100,
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "LG_EXIBE_CODIGO_FABRICANTE_OBS_ITEM_NF",
                        caption: "Destaca Código Frabicante na NF",
                        dataType: "boolean",
                        allowEditing: true,
                        allowHeaderFiltering: false,
                        allowSorting: true,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "CD_ORIGINAL",
                        caption: "Código Original",
                        //width: 100,
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "CD_OPCIONAL",
                        caption: "Código Opcional",
                        //width: 100,
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    ],
                },

                {
                    dataField: "DS_MARCA",
                    caption: "Marca",
                    //width: 130,
                    allowEditing: true,
                    allowHeaderFiltering: true,
                    allowSorting: true,
                    visible: true,
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "CD_FAMILIA",
                    caption: "Família",
                    //width: 200,
                    allowEditing: true,
                    allowHeaderFiltering: true,
                    allowSorting: true,
                    visible: true,
                    alignment: 'left',
                    cssClass: "column-data-grid",
                    lookup: {
                        dataSource: dataSourceFamiliasGrid,
                        valueExpr: "CD_FAMILIA",
                        displayExpr: "DS_FAMILIA_COMPLETA",
                        searchExpr: ["CD_FAMILIA", "DS_FAMILIA_COMPLETA"]
                    }
                },
                {
                    dataField: "CD_FORNECEDOR",
                    caption: "Fornecedor Padrão",
                    //width: 100,
                    allowEditing: true,
                    allowHeaderFiltering: true,
                    allowSorting: true,
                    visible: true,
                    alignment: 'left',
                    cssClass: "column-data-grid",
                    lookup: {
                        dataSource: dataSourceFornecedoresGrid,
                        valueExpr: "CD_FORNECEDOR",
                        displayExpr: "DS_RAZAO_SOCIAL",
                        searchExpr: ['CD_FORNECEDOR', 'DS_RAZAO_SOCIAL', 'DS_FANTASIA'],
                    }
                },
                {
                    caption: "CLASSIFICAÇÃO FISCAL",
                    alignment: 'center',
                    visible: false,
                    cssClass: "column-data-grid",
                    columns: [{
                        dataField: "CD_ORIGEM",
                        caption: "Origem",
                        //width: 150,
                        allowEditing: true,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        visible: true,
                        alignment: 'left',
                        cssClass: "column-data-grid",
                        lookup: {
                            dataSource: dataSourceOrigemProduto,
                            valueExpr: "CD_ORIGEM",
                            displayExpr: "DS_ORIGEM_COMPLETA"
                        }
                    },
                    {
                        dataField: "CD_NCM",
                        caption: "NCM",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "CD_CEST",
                        caption: "CEST",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "PC_IVA",
                        caption: "% IVA",
                        dataType: "number",
                        format: "###,###,###,##0.####",
                        //width: 150,
                        allowEditing: true,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        visible: true,
                        alignment: 'right',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "NR_FCI",
                        caption: "FCI",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    ],
                },
                {
                    caption: "e-COMMERCE",
                    alignment: 'center',
                    visible: false,
                    cssClass: "column-data-grid",
                    columns: [{
                        dataField: "CD_PRODUTO_ECOMMERCE",
                        caption: "Código e-Commerce",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "CD_TIPO_PRECO_ATUALIZACAO_ECOMMERCE",
                        caption: "Preço e-Commerce",
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        lookup: {
                            dataSource: dataSourceTipoPrecoeCommerce,
                            valueExpr: "CD_TIPO_PRECO_ATUALIZACAO_ECOMMERCE",
                            displayExpr: "DS_TIPO_PRECO_ATUALIZACAO_ECOMMERCE"
                        }
                    },
                    ],
                },

                {
                    caption: "UNIDADES DE MEDIDA",
                    alignment: 'center',
                    visible: false,
                    cssClass: "column-data-grid",
                    columns: [{
                        dataField: "CD_UNIDADE_MEDIDA_VENDA",
                        caption: "UN Venda",
                        //width: 100,
                        allowEditing: true,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        lookup: {
                            dataSource: dataSourceUnidadeMedida,
                            valueExpr: "CD_UNIDADE_MEDIDA",
                            displayExpr: "CD_UNIDADE_MEDIDA"
                        }
                    },
                    {
                        dataField: "CD_OPERADOR_CONVERSAO",
                        caption: "Conversão",
                        //width: 100,
                        allowEditing: true,
                        allowHeaderFiltering: false,
                        allowSorting: true,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        lookup: {
                            dataSource: dataSourceOperadorConversao,
                            valueExpr: "CD_OPERADOR",
                            displayExpr: "DS_OPERADOR"
                        }
                    },
                    {
                        dataField: "VL_FATOR_CONVERSAO",
                        caption: "Fator",
                        dataType: "number",
                        format: "###,###,###,##0.#######",
                        //width: 150,
                        allowEditing: true,
                        allowHeaderFiltering: false,
                        allowSorting: true,
                        visible: true,
                        alignment: 'right',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "CD_UNIDADE_MEDIDA_COMPRA",
                        caption: "UN Compra",
                        //width: 100,
                        allowEditing: true,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        lookup: {
                            dataSource: dataSourceUnidadeMedida,
                            valueExpr: "CD_UNIDADE_MEDIDA",
                            displayExpr: "CD_UNIDADE_MEDIDA"
                        }
                    },
                    {
                        dataField: "QT_MULTIPLO_COMPRA",
                        caption: "Múltiplo Compra",
                        dataType: "number",
                        format: "###,###,###,##0.#######",
                        //width: 150,
                        allowEditing: true,
                        allowHeaderFiltering: false,
                        allowSorting: true,
                        visible: true,
                        alignment: 'right',
                        cssClass: "column-data-grid",
                    },
                    ],
                },
                {
                    caption: "CONTROLE DE LOTE",
                    alignment: 'center',
                    visible: false,
                    cssClass: "column-data-grid",
                    columns: [{
                        dataField: "LG_ESTOQUE_LOTE",
                        caption: "Controla Lote",
                        dataType: "boolean",
                        allowEditing: true,
                        allowHeaderFiltering: false,
                        allowSorting: true,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "LG_REAPROVEITA_LOTE_EXISTENTE",
                        caption: "Reaproveita Lotes",
                        dataType: "boolean",
                        allowEditing: true,
                        allowHeaderFiltering: false,
                        allowSorting: true,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "LG_INFORMA_LOTE_FABRICANTE",
                        caption: "Utiliza Lote do Fabricante",
                        dataType: "boolean",
                        allowEditing: true,
                        allowHeaderFiltering: false,
                        allowSorting: true,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "LG_IMPRIME_LOTE_ETIQUETA",
                        caption: "Destaca Lote na Etiqueta",
                        dataType: "boolean",
                        allowEditing: true,
                        allowHeaderFiltering: false,
                        allowSorting: true,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    ],
                },
                {
                    caption: "ESCRITURAÇÃO SPED",
                    alignment: 'center',
                    visible: false,
                    cssClass: "column-data-grid",
                    columns: [{
                        dataField: "LG_BLOQUEIA_ESCRITURACAO_SPED",
                        caption: "Bloqueia Escrituração SPED",
                        dataType: "boolean",
                        allowEditing: true,
                        allowHeaderFiltering: false,
                        allowSorting: true,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "CD_TIPO_PRODUTO_SPED",
                        caption: "Tipo Produto SPED",
                        allowEditing: true,
                        allowHeaderFiltering: false,
                        allowSorting: true,
                        visible: true,
                        alignment: 'left',
                        cssClass: "column-data-grid",
                        lookup: {
                            dataSource: dataSourceTipoProdutoSPED,
                            valueExpr: "CD_TIPO_PRODUTO_SPED",
                            displayExpr: "DS_TIPO_PRODUTO_SPED_COMPLETO"
                        }
                    },
                    ],
                },
                {
                    caption: "PESOS DO PRODUTO",
                    alignment: 'center',
                    visible: false,
                    cssClass: "column-data-grid",
                    columns: [{
                        dataField: "PS_PRODUTO_VENDA",
                        caption: "Peso Venda",
                        dataType: "number",
                        format: "###,###,###,##0.##",
                        //width: 150,
                        allowEditing: true,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        visible: true,
                        alignment: 'right',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "PS_PRODUTO_COMPRA",
                        caption: "Peso Compra",
                        dataType: "number",
                        format: "###,###,###,##0.##",
                        //width: 150,
                        allowEditing: true,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        visible: true,
                        alignment: 'right',
                        cssClass: "column-data-grid",
                    },
                    ],
                },
                {
                    dataField: "NR_DIAS_COBERTURA_GARANTIA",
                    caption: "Dias Garantia",
                    dataType: "number",
                    format: "###,###,###,##0",
                    //width: 150,
                    allowEditing: true,
                    allowHeaderFiltering: false,
                    allowSorting: true,
                    visible: false,
                    alignment: 'center',
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "LG_ENCOMENDA",
                    caption: "Produto de Encomenda",
                    dataType: "boolean",
                    allowEditing: true,
                    allowHeaderFiltering: false,
                    allowSorting: true,
                    visible: false,
                    alignment: 'center',
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "LG_OBRIGA_DETALHE_PRODUCAO_VENDA",
                    caption: "Exige Detalhe para Produção",
                    dataType: "boolean",
                    allowEditing: true,
                    allowHeaderFiltering: false,
                    allowSorting: true,
                    visible: false,
                    alignment: 'center',
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "LG_EXIGE_PEDIDO_VENDA_DEVOLUCAO",
                    caption: "Identificar Pedido na Devolução",
                    dataType: "boolean",
                    allowEditing: true,
                    allowHeaderFiltering: false,
                    allowSorting: true,
                    visible: false,
                    alignment: 'center',
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "LG_FORA_LINHA",
                    caption: "Fora Linha",
                    dataType: "boolean",
                    allowEditing: true,
                    allowHeaderFiltering: false,
                    allowSorting: true,
                    visible: false,
                    alignment: 'center',
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "LG_PERMITE_QUANTIDADE_CONFERENCIA_VENDA",
                    caption: "Informa Qtde. na Conferência",
                    dataType: "boolean",
                    allowEditing: true,
                    allowHeaderFiltering: false,
                    allowSorting: true,
                    visible: false,
                    alignment: 'center',
                    cssClass: "column-data-grid",
                },
                {
                    dataField: "DS_TEXTO_EXPLICATIVO",
                    caption: "Aplicação",
                    allowEditing: true,
                    allowHeaderFiltering: true,
                    allowSorting: true,
                    visible: false,
                    cssClass: "column-data-grid",
                },
                ],

                showBorders: true,
                onEditorPreparing: function (e) {
                    if (e.parentType != "dataRow") return;

                    var count = 0;
                    actionIndex++;

                    var oldOnValueChanged = e.editorOptions.onValueChanged;

                    e.editorOptions.onValueChanged = function (args) {
                        //console.log(e.component.getDataSource().items());

                        oldOnValueChanged.apply(this, arguments);

                        var freezedFields = ['DS_PRODUTO', 'DS_PRODUTO_REDUZIDA', 'CD_EAN_PRODUTO', 'NR_FCI', 'CD_FABRICANTE', 'CD_ORIGINAL', 'CD_OPCIONAL', 'CD_PRODUTO_ECOMMERCE']

                        let changes = e.component.option('editing.changes');

                        if (lkpTipoAtualizacao.option('value') == 'REPLICAR' && freezedFields.includes(e.dataField) == false) {

                            e.component.getDataSource().store().load().done((res) => {
                                for (var i in res) {

                                    var obj = changes.find((obj) => obj.key == res[i]["CD_PRODUTO"]);

                                    if (typeof obj === 'undefined') {

                                        var change = { "data": {}, "key": res[i]["CD_PRODUTO"], "type": "update", "origin": [] };

                                        change.origin.push({ from: e.row.key, oldValue: res[i][e.dataField], action: actionIndex, field: e.dataField });
                                        change.data[e.dataField] = args.value;

                                        changes.push(change);
                                    }
                                    else {

                                        if (typeof obj.origin === 'undefined') {
                                            obj.origin = [];
                                        }

                                        obj.origin.push({ from: e.row.key, oldValue: res[i][e.dataField], action: actionIndex, field: e.dataField });

                                        obj.data[e.dataField] = args.value;
                                    }
                                }
                            });

                        }
                        else {

                            var obj = changes.find((obj) => obj.key == e.row.key);

                            if (typeof obj.origin === 'undefined') {
                                obj.origin = [];
                            }

                            obj.origin.push({ from: e.row.key, oldValue: args.previousValue, action: actionIndex, field: e.dataField });

                            //console.log(obj);
                            //console.log(JSON.stringify(obj));
                        }

                        //var allSeries = $("#chartContainer").dxChart("getAllSeries");
                        //var wqwe  =  ("#gridProdutosDadosGerais").dxDataGrid("beginUpdate");
                        //console.log(this);
                        //console.log(arguments);
                        //console.log(args);
                        //console.log(e);

                        e.component.option('editing.changes', changes);

                        //        $.ajax({
                        //        type: 'POST',
                        //        url: "/Estoque/UpdateProdutosz",
                        //        data: { changes: JSON.stringify(changes) },
                        //        //url: "/Estoque/UpdateProdutos",
                        //        //data: { changes: changes },
                        //        success: function(data) {
                        //            console.log('ok');
                        //            //console.log(e.changes); // "Done!"
                        //            //console.log(JSON.stringify(e.changes));
                        //            //setTimeout(() => {
                        //            //}, 2000);

                        //        }
                        //    });
                    }
                },
                onSaving(e) {
                    console.log('asdasdasd');
                    //console.log(e.changes.length);
                    //console.log(e.changes);
                    e.cancel = false;

                    //if (e.changes.length) {
                    //    //e.promise = sendBatchRequest(`${URL}/Batch`, e.changes).done(() => {
                    //    e.promise = new Promise(function(resolve, reject) {


                    //        //console.log(e.changes);

                    //        //$.ajax({
                    //        //    type: 'POST',
                    //        //    url: "/Estoque/UpdateProdutosz",
                    //        //    data: { changes: JSON.stringify(e.changes) },
                    //        //    //url: "/Estoque/UpdateProdutos",
                    //        //    //data: { changes: e.changes },
                    //        //    success: function(data) {

                    //        //        //console.log(e.changes); // "Done!"
                    //        //        //console.log(JSON.stringify(e.changes));
                    //        //        //setTimeout(() => {
                    //        //        //}, 2000);

                    //        //    }
                    //        //});
                    //                resolve('OK');




                    //    }).then(data => {
                    //        e.cancel = false;
                    //        console.log(data); // "Done!"
                    //        actionIndex = 0;
                    //        e.component.refresh(true).done(() => {
                    //            e.component.cancelEditData();
                    //        });
                    //    });

                    //    //e.component.refresh(true).done(() => {
                    //    //    actionIndex = 0;
                    //    //    e.component.cancelEditData();
                    //    //});
                    //}
                },
                onCellPrepared: function (e) {
                    //console.log(e);
                    if (e.rowType === "data") {
                        if (e.column.dataField === "CD_STATUS" && e.data.CD_STATUS === 'I') {
                            //e.cellElement.css("background-color", '#f26419');
                            e.cellElement.css("color", '#d00000');
                            e.cellElement.css("font-weight", 'bold');
                        }
                    }
                },
            });
        }
    })
}

$(() => {

});

var ds_StatusProduto = [{
    "CD_STATUS": "A",
    "DS_STATUS": "ATIVO",
},
{
    "CD_STATUS": "I",
    "DS_STATUS": "INATIVO",
}
];
var dataSourceOperadorConversao = [{
    "CD_OPERADOR": "*",
    "DS_OPERADOR": "MULTIPLICAR",
},
{
    "CD_OPERADOR": "/",
    "DS_OPERADOR": "DIVIDIR",
},
{
    "CD_OPERADOR": "+",
    "DS_OPERADOR": "ADICIONAR",
},
{
    "CD_OPERADOR": "-",
    "DS_OPERADOR": "SUBTRAIR",
},
];
var dataSourceTipoPrecoeCommerce = [{
    CD_TIPO_PRECO_ATUALIZACAO_ECOMMERCE: "V",
    DS_TIPO_PRECO_ATUALIZACAO_ECOMMERCE: "VENDA",
},
{
    CD_TIPO_PRECO_ATUALIZACAO_ECOMMERCE: "C",
    DS_TIPO_PRECO_ATUALIZACAO_ECOMMERCE: "CUSTO",
},
];
var dataSourceUnidadeMedida = [];
var dataSourceFamiliasGrid = [];
var dataSourceOrigemProduto = [];
var dataSourceTipoProdutoSPED = [];
var dataSourceFornecedoresGrid = [];
var dataSourceProdutosDadosGerais = [{
    CD_EMPRESA: 180,
    CD_PRODUTO: "1471901",
    DS_PRODUTO: "ACAB REG HIDROFIX  3/4 C110 fl",
    DS_PRODUTO_REDUZIDA: "ACAB REG 3/4 C110",
    CD_ORIGEM: 0,
    DS_TEXTO_EXPLICATIVO: null,
    CD_FAMILIA: 169,
    CD_FORNECEDOR: "666",
    CD_UNIDADE_MEDIDA_VENDA: "UN ",
    PS_PRODUTO_VENDA: 0.20000,
    CD_UNIDADE_MEDIDA_COMPRA: "UN ",
    CD_OPERADOR_CONVERSAO: "*",
    VL_FATOR_CONVERSAO: 1.00000,
    PS_PRODUTO_COMPRA: 0.20000,
    QT_MULTIPLO_COMPRA: 1.0000,
    DS_MARCA: null,
    CD_EAN_PRODUTO: "0000000004459",
    NR_FCI: null,
    CD_FABRICANTE: "10909",
    CD_ORIGINAL: null,
    CD_OPCIONAL: "000000004459",
    CD_NCM: "84818019",
    CD_CEST: "1007900",
    CD_PRODUTO_ECOMMERCE: "7640",
    CD_TIPO_PRECO_ATUALIZACAO_ECOMMERCE: "VENDA",
    NR_DIAS_COBERTURA_GARANTIA: null,
    PC_IVA: 0.0000,
    LG_ESTOQUE_LOTE: 0,
    LG_REAPROVEITA_LOTE_EXISTENTE: 0,
    LG_INFORMA_LOTE_FABRICANTE: 0,
    LG_IMPRIME_LOTE_ETIQUETA: 0,
    LG_ENCOMENDA: 0,
    LG_OBRIGA_DETALHE_PRODUCAO_VENDA: 0,
    LG_EXIGE_PEDIDO_VENDA_DEVOLUCAO: 0,
    LG_BLOQUEIA_ESCRITURACAO_SPED: 0,
    CD_TIPO_PRODUTO_SPED: null,
    LG_EXIBE_CODIGO_FABRICANTE_OBS_ITEM_NF: 0,
    LG_FORA_LINHA: 1,
    LG_PERMITE_QUANTIDADE_CONFERENCIA_VENDA: 0,
    CD_STATUS: "I"
}];

var dataSourceCurvaProdutos = [{
    "CD_CURVA": "A",
    "DS_CURVA": "Curva A",
},
{
    "CD_CURVA": "B",
    "DS_CURVA": "Curva B",
},
{
    "CD_CURVA": "C",
    "DS_CURVA": "Curva C",
},
{
    "CD_CURVA": "D",
    "DS_CURVA": "Curva D",
}
];
var dataSourceMarcas = [];
var dataSourceMetodoAtualizacaoDadosGerais = [{
    "CD_METODO": "INDIVIDUAL",
    "DS_METODO": "Aplicar as alterações apenas para o produto editado",
},
{
    "CD_METODO": "REPLICAR",
    "DS_METODO": "Replicar alterações realizadas em uma coluna para todos os produtos do grid",
},
];

$(() => {
    FILTRO['DS_LISTA_STATUS'] = {
        Type: 'dxTagBox',
        Component: $('#DS_LISTA_STATUS').dxTagBox({
            dataSource: ds_StatusProduto,
            searchEnabled: true,
            searchExpr: ['DS_STATUS'],
            cleanSearchOnOpening: true,
            displayExpr: 'DS_STATUS',
            valueExpr: 'CD_STATUS',
            dropDownOptions: {
                closeOnOutsideClick: true,
                showTitle: false,
                title: 'Status Produtos',
            },
            labelMode: 'floating',
            label: 'Status Produtos',
            placeholder: '',
            showClearButton: true,
            applyValueMode: 'instantly',
            showSelectionControls: true,
            value: ['A', 'I'],
        }).dxTagBox('instance')
    };

    OUTROS['lkp_Marcas_Filtro_Selecionado'] = {
        Type: 'dxTagBox',
        Component: $('#lkp_Marcas_Filtro_Selecionado').dxTagBox({
            dataSource: dataSourceMarcas,
            searchEnabled: true,
            searchExpr: ['DS_MARCA'],
            cleanSearchOnOpening: true,
            displayExpr: 'DS_MARCA',
            valueExpr: 'DS_MARCA',
            dropDownOptions: {
                closeOnOutsideClick: true,
                showTitle: false,
                title: 'Marcas (contém)',
            },
            labelMode: 'floating',
            label: 'Marcas (contém)',
            placeholder: '',
            showClearButton: true,
            //applyValueMode: 'useButtons',
            applyValueMode: 'instantly',
            showSelectionControls: true,
            //disabled: true,
            readOnly: true,
            //value: ['AMANCO','TIGRE']
        }).dxTagBox('instance')
    };

    FILTRO['DS_LISTA_CURVA_PRODUTOS'] = {
        Type: 'dxTagBox',
        Component: $('#DS_LISTA_CURVA_PRODUTOS').dxTagBox({
            dataSource: dataSourceCurvaProdutos,
            searchEnabled: true,
            searchExpr: ['DS_CURVA'],
            cleanSearchOnOpening: true,
            displayExpr: 'DS_CURVA',
            valueExpr: 'CD_CURVA',
            dropDownOptions: {
                closeOnOutsideClick: true,
                showTitle: false,
                title: 'Curva de Produtos',
            },
            labelMode: 'floating',
            label: 'Curva de Produtos',
            placeholder: '',
            showClearButton: true,
            //applyValueMode: 'useButtons',
            showSelectionControls: true,
        }).dxTagBox("instance")
    };

    FILTRO['LG_SOMENTE_FORNECEDOR_PADRAO'] = {
        Type: 'dxCheckBox',
        Component: $('#LG_SOMENTE_FORNECEDOR_PADRAO').dxCheckBox({
            value: false,
            text: "Somente produtos que tenha o fornecedor acima como padrão",
        }).dxCheckBox('instance')
    };
});

$(() => {
    Azr_DataSource_Familias((ds) => {

        dataSourceFamiliasGrid = ds;

    });

    Azr_DataSource_OrigemProduto((ds) => {

        dataSourceOrigemProduto = ds;

    });

    Azr_DataSource_TipoProdutoSPED((ds) => {

        dataSourceTipoProdutoSPED = ds;

    });

    Azr_DataSource_FornecedoresGrid((ds) => {

        dataSourceFornecedoresGrid = ds;

    });


    Load_Azr_DropDownBox_FamiliaProduto(FILTRO, 'CD_FAMILIA', 'Família', 1);

    Load_Azr_Lookup_Fornecedor('CD_FORNECEDOR', FILTRO);

    Load_Azr_Lookup_Filial2(FILTRO, "CD_FILIAL", 1, 0, 'Selecione uma filial...', 'Filial', (id, ds, comp) => {
        //** COMO CARREGAR EVENTOS **
        //$(id).dxLookup({
        //    onValueChanged: function(e) {
        //        alert(e.value);
        //    }
        //});
        //** COMO CARREGAR EVENTOS **
    });

    Load_Azr_Lookup_Marca(FILTRO, 'DS_LISTA_MARCAS', 'Selecione uma marca...', 'Marca', (id, ds, comp) => {

        dataSourceMarcas = ds;

    });

    Load_Azr_Lookup_Almoxarifado(FILTRO, 'CD_ALMOXARIFADO', 1, 'Selecione um almoxarifado...', 'Almoxarifado');

    Load_Azr_TagBox_Almoxarifado(OUTROS, 'lkp_Almoxarifados_Selecionado', '1', 'Almoxarifado', 'Almoxarifado');

    Load_Azr_Lookup_UnidadeMedida(FILTRO, '', '', '', '', (id, ds) => {

        dataSourceUnidadeMedida = ds;

    });

    lkpTipoAtualizacao = $('#lkp_Metodo_Atualizacao_Dados_Gerais').dxLookup({
        items: dataSourceMetodoAtualizacaoDadosGerais,
        searchExpr: ['DS_METODO'],
        displayExpr: 'DS_METODO',
        valueExpr: 'CD_METODO',
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Atualização do Grid',
        },
        labelMode: 'floating',
        label: 'Atualização do Grid',
        placeholder: '',
        showClearButton: false,
        value: "INDIVIDUAL",
        //onValueChanged(e) {

        //    if (e.value == "REPLICAR"){
        //        document.getElementById("MetodoReplicacao").style.display = 'block';
        //    }
        //    else if (e.value == "INDIVIDUAL"){
        //        document.getElementById("MetodoReplicacao").style.display = 'none';
        //    }

        //},

    }).dxLookup('instance');


});
