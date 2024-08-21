//#region VARIÁVEIS

var COMPONENTES = [];

Load_Azr_Lookup_Almoxarifado(COMPONENTES, 'almoxarifadoAtivos', 1, 'Selecione um almoxarifado para movimentação', 'Almoxarifado *')
Load_Azr_Lookup_Almoxarifado(COMPONENTES, 'lkp_almoxarifado_Ativos_substituir', 1, 'Selecione um almoxarifado para movimentação', 'Almoxarifado *')

Load_Azr_Lookup_Filial2(COMPONENTES, 'filial_ApenasAtivasPorUsuario', 1, 1, 'Selecione uma filial para verificar os parâmetros de movimentação', 'Filial *')
Load_Azr_Lookup_Filial2(COMPONENTES, 'lkp_filiais_Ativas_Parans', 1, 0, 'Selecione uma filial para verificar os parâmetros de movimentação', 'Filial ')

Load_Azr_Lookup_Almoxarifado(COMPONENTES, 'almoxarifadoAtivosOrigem', 1, 'Selecione o almoxarifado de Origem', 'Almoxarifado de Origem *')
Load_Azr_Lookup_Almoxarifado(COMPONENTES, 'almoxarifadoAtivosDestino', 1, 'Selecione o almoxarifado de Destino', 'Almoxarifado de Destino *')
Load_Azr_Lookup_Produto('lkp_Produtos_Filtro_Grid', COMPONENTES)
Load_Azr_Lookup_Produto('lkp_Produtos_Filtro_Grid_Pendentes', COMPONENTES)



var dataSourceTipoTransacao = [
    { CD_TIPO_LANCAMENTO: 4, DS_TIPO_LANCAMENTO: "Devolução", },
    { CD_TIPO_LANCAMENTO: 5, DS_TIPO_LANCAMENTO: "Ajuste", }, //Inventário
    { CD_TIPO_LANCAMENTO: 6, DS_TIPO_LANCAMENTO: "Produção", },
    { CD_TIPO_LANCAMENTO: 7, DS_TIPO_LANCAMENTO: "Consumo", },
];

var dataSourceTipoMovimento = [
    { CD_TIPO_MOVIMENTO: 'AS', DS_TIPO_MOVIMENTO: "Adicionar quantidades no estoque do produto", },
    { CD_TIPO_MOVIMENTO: 'SU', DS_TIPO_MOVIMENTO: "Subtrair quantidades do estoque do produto", },
];

var dataSourceConsultaGeralLegenda = [
    {
        DS_COLOR_STATUS_1: "#0088CC",
        DS_STATUS_1: "",
        DS_LEGENDA_1: "Em Elaboração",

        DS_COLOR_STATUS_2: "#47A447",
        DS_STATUS_2: "",
        DS_LEGENDA_2: "Concluído",

        DS_COLOR_STATUS_3: "#D2322D",
        DS_STATUS_3: "",
        DS_LEGENDA_3: "Cancelado",

    },
];

var gridProdutosMovimentacao;
var gridConsultaGeral;
var gridConsultaPendentes;
var lkpProdutosFiltroGrid;
var dataSourceProdutos;
var gridBoxProdutos;
var numeroProcesso;
var almoxarifadoOr;
var almoxarifadoDe;
var dataSourcePendentes;
var dataSourceProdutosGeral;
var nrDias;
var prod;
var produtoSelecionado;
var itenSelecionadoPendente = [];
var itenSelecionadoGeral = [];
var itenPendenteCancel;
var itenPendenteGeral;
var cancelarGeral;
var cancelarPendente;
const listConcluido = [];
var listProdutoSelecionado;
var almox;
var tipoTransacao;
var loaPanel;
var ProgressButtonClick;
var filialSelecionada;
var dataSourceGeral;
var entrega;
var retiraFutura;
var tipoWindowOpen = false;
var loginPremissoes;
var dataPermissoesUsuario;
var dataUsuarioLog;
var dataItensPendenteSelec = [];
var dataItensGeralSelec;
var novoUsuario = false;
var nrProcessoCancel;
var verificaClonar = false;
var pendenteSemFiltro;
var geralSemFiltro;

//#endregion VARIÁVEIS

//#region FUNÇÕES
//CARREGA PERMISSÕES USUÁRIO LOGADO
CarregaPermissoesUsuarioAjusteEstoqueParametros();
function CarregaPermissoesUsuarioAjusteEstoqueParametros() {

    new Promise(function (resolve, reject) {

        $.ajax({
            type: 'POST',
            url: "/Estoque/CarregaPermissoesUsuarioAjusteEstoqueParametros",
            success: function (response) {
                resolve(response);
            },
            error: function (x) {
                // Rejeita a Promise em caso de erro

                reject();
            }
        });

    }).then(function (response) {
        
        if (response.length == 0) {

            SalvarPermissoesUsuarioAjusteEstoque(null);
            novoUsuario = true;

        } else {
            CarregaPermissaoModuloAjuste()
            dataUsuarioLog = response[0]

            if (dataUsuarioLog.NR_NIVEL_ACESSO == 0) {
                ExibirEsconderPaineis('confGerais', 'none');
                ExibirEsconderPaineis('confUsuario', 'none');
            }
            //} else {
            //    ExibirEsconderPaineis('confGerais', 'block');
            //    ExibirEsconderPaineis('confUsuario', 'block');
            //}
        }

    });
}

var collapseAjusteEstoque = false;
function CarregaPermissaoModuloAjuste(x) {

    new Promise(function (resolve, reject) {

        $.ajax({
            type: 'POST',
            url: "/Estoque/CarregaPermissaoModuloAjuste",
            data: { cdLogin: x },
            success: function (response) {
                resolve(response);
            },
            error: function () {
                // Rejeita a Promise em caso de erro
                reject();
            }
        });

    }).then(function (response) {
        ExibirEsconderPaineis('cardMenu', 'block');
        
        if (response.filter(obj => obj.DS_NOME_OBJETO == "collapseAjusteEstoque").length != 0) {
            collapseAjusteEstoque = true;
        } else {
            collapseAjusteEstoque = false;
        }

    })
}
var mostrarParans = false;

function CarregaPermissaoModuloAjusteUsuario(x) {

    new Promise(function (resolve, reject) {

        $.ajax({
            type: 'POST',
            url: "/Estoque/CarregaPermissaoModuloAjusteUsuario",
            data: { cdLogin: x },
            success: function (response) {
                resolve(response);
            },
            error: function () {
                // Rejeita a Promise em caso de erro
                reject();
            }
        });

    }).then(function (response) {

        CarregaPermissoesUsuarioAjusteEstoque(loginPremissoes)
        
        if (response.filter(obj => obj.DS_NOME_OBJETO == "collapseAjusteEstoque").length != 0) {
            mostrarParans = true;
        } else {
            mostrarParans = false;
        }

    })
}

//POPUP ACESSO NEGADO
function PopupAcessoNegado() {

    popupAcesso = $('#popupAcessoNegado').dxPopup({
        maxWidth: 500,
        maxHeight: 530,
        showTitle: false,
        visible: true,
        hideOnOutsideClick: false,
        onHidden: () => {
            $.post("/Home/SetExibeAcessoNegadoFalse", {
                apenasDados: false
            });
        },
        contentTemplate: () => {
            const scrollView = $('<div class="moldura" />');
            scrollView.append($('<div id="textBlock" class="mt-3 mb-3" /div>').html(`<div class='col-lg-12 mb-0 mt-0 ml-0 mr-0' style='justify-content: center; display: flex'>
                     <div class='col-lg-12 mb-0 mt-0 ml-0' style='max-width: 400px; display: block'>
                         <div class='row mb-2 mt-0 alert-transparent'>
                             <div class='col-lg-12 mb-0 mt-0'>
                                 <div class='row mb-2 mt-4 ml-0 mr-0'>
                                     <div class='col-lg-12 mb-0 mt-0 text-center'><img id='acessoNegado' src='/img/acesso-negado.png'
                                             class='img-fluid moldura-img' style='max-height: 240px;'></div>
                                 </div>
                                 <div class='row mt-2 mb-0'>
                                     <div class='col-lg-12 mt-0 mb-0'>
                                         <h4 class='mb-1 mt-3 text-center' style='color: #9b2226'><b>ACESSO NÃO AUTORIZADO</b></h4>
                                     </div>
                                 </div>
                                 <div class='row mt-2 mb-3'>
                                     <div class='col-lg-12 mt-0 mb-0'>
                                         <h4 class='mb-1 mt-0 text-center'>Por favor, entre em contato com o Administrador do Sistema e
                                                     solicite a liberação desta funcionalidade.</h4>
                                     </div>
                                 </div>
                                 <div class='row mt-0 mb-4'>
                                     <div class='col-lg-12 text-center'><button type='button' class='btn btn-xs btn-secondary'
                                        onclick='FecharPopupAjusteEstoque();'><i class='fa fa-reply mr-2'></i>Voltar</button></div>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>`)
            );
            scrollView.dxScrollView({
                width: '100%',
                height: '100%',
            });
            return scrollView;
        },
    }).dxPopup('instance');
}

//FECHAR POPUP ACESSO NEGADO
function FecharPopupAjusteEstoque() {

    if (!tipoWindowOpen) {
        popupAcesso.hide();

    } else {
        window.open('../Home/InicioRapido', '_parent');
    }

}

//BARRA DE PROGRESSO
let inProgress = false;
const progressBarStatus = $('#progressBarStatus').dxProgressBar({
    min: 0,
    max: 100,
    width: '90%',
    statusFormat(ratio) {
        return `Processando: ${Math.trunc(ratio * 100)}%`;
    },
    onComplete(e) {
        inProgress = false;
        e.element.addClass('complete');

    },
}).dxProgressBar('instance');

//BOTÃO BARRA DE PROGRESSO
const progressButton = $('#progress-button').dxButton({
    text: 'Iniciar Ajuste Estoque',
    type: 'default',
    width: 200,
    onClick(e) {

        ExibirEsconderPaineis('progress-button', 'none');
        ExibirEsconderPaineis('btnSair', 'none');

    },

}).dxButton('instance');

//FECHAR MODAIS
function FecharModal() {

    progressBarStatus.option('value', 0);
    progressButton.option('text', 'Iniciar Ajuste Estoque');
    progressButton.option('type', 'default');
    $('#progressBarStatus').removeClass('complete');
    $("#produtoAtualizando").text("");
    $("#processoConcluindo").text("");

    document.getElementById("progress-button").style.display = 'inline-block';

    ExibirEsconderPaineis('btnFecharReajuste', 'none');
    ExibirEsconderPaineis('labelProcessamentoConcluido', 'none');
    ExibirEsconderPaineis('btnSair', 'block');
    ExibirEsconderPaineis('textoErro', 'none');
    ExibirEsconderPaineis('gridErro', 'none');

    gridProdutosErroReajuste.option('dataSource', null);
    $("#qtErro").text("");

}

//INICIA ADICIONAR/SUBTRAIR
function iniciaParametrosAdicionarSubtrair() {

    if (dataUsuarioLog.NR_NIVEL_ACESSO == 1) {
        desabilitaTodosPanels();
        ExibirEsconderPaineis('cardParametrosProcesso', 'block');
        ExibirEsconderPaineis('cardMenu', 'block');

    } else if (dataUsuarioLog.NR_NIVEL_ACESSO == 0 && collapseAjusteEstoque && dataUsuarioLog.Lg_Inclui_Processo_Adicionar_Subtrair) {

        desabilitaTodosPanels();
        ExibirEsconderPaineis('cardParametrosProcesso', 'block');
        ExibirEsconderPaineis('cardMenu', 'block');

    } else {
        PopupAcessoNegado();
    }

}

//INICIA INVENTARIO SUBSTITUIR
function iniciaParametrosSubstituir() {

    if (dataUsuarioLog.NR_NIVEL_ACESSO == 1) {
        desabilitaTodosPanels();
        ExibirEsconderPaineis('cardParametrosProcessoInventario', 'block');
        ExibirEsconderPaineis('cardMenu', 'block');

    } else if (dataUsuarioLog.NR_NIVEL_ACESSO == 0 && collapseAjusteEstoque && dataUsuarioLog.Lg_Inclui_Processo_Inventario) {

        desabilitaTodosPanels();
        ExibirEsconderPaineis('cardParametrosProcessoInventario', 'block');
        ExibirEsconderPaineis('cardMenu', 'block');

    } else {
        PopupAcessoNegado();
    }

}

//INICIA TRANSFERENCIAS
function iniciaParametrosTransferencia() {

    if (dataUsuarioLog.NR_NIVEL_ACESSO == 1) {
        desabilitaTodosPanels();
        ExibirEsconderPaineis('cardParametrosProcessoTransferencia', 'block');
        ExibirEsconderPaineis('cardMenu', 'block');

    } else if (dataUsuarioLog.NR_NIVEL_ACESSO == 0 && collapseAjusteEstoque && dataUsuarioLog.Lg_Inclui_Processo_Transferencia) {

        desabilitaTodosPanels();
        ExibirEsconderPaineis('cardParametrosProcessoTransferencia', 'block');
        ExibirEsconderPaineis('cardMenu', 'block');

    } else {
        PopupAcessoNegado();
    }

}

//COLOCAR CABEÇALHO
function iniciaMovimentacao() {

    desabilitaTodosPanels();
    ExibirEsconderPaineis('cardMovimentacaoHeader', 'block');
    ExibirEsconderPaineis('cardMovimentacao', 'block');
}

//INICIA CONSULTA PENDENTE
function iniciaProcessosPendentes() {
    lkpProdutosFiltroGridPendentes.option('value', null)
    if (dataUsuarioLog.NR_NIVEL_ACESSO == 1) {
        CarregaConsultaPendentes();
        desabilitaTodosPanels();
        ExibirEsconderPaineis('cardProcessosPendentes', 'block');

    } else if (dataUsuarioLog.NR_NIVEL_ACESSO == 0 && collapseAjusteEstoque && (dataUsuarioLog.Lg_Consulta_Processo_Adicionar_Subtrair || dataUsuarioLog.Lg_Consulta_Processo_Inventario || dataUsuarioLog.Lg_Consulta_Processo_Transferencia)) {
        CarregaConsultaPendentes();
        desabilitaTodosPanels();
        ExibirEsconderPaineis('cardProcessosPendentes', 'block');

    } else {
        PopupAcessoNegado();
    }

}

//INICIA CONSULTA GERAL
function iniciaConsultaGeral() {
    lkpProdutosFiltroGrid.option('value', null)
    nbxDiasFiltroGrid.option('value', 30)
    prod = null;
    nrDias = 30;

    if (dataUsuarioLog.NR_NIVEL_ACESSO == 1) {
        CarregaProcessosAjusteEstoqueGeral();

        desabilitaTodosPanels();
        ExibirEsconderPaineis('cardConsultaGeral', 'block');

    } else if (dataUsuarioLog.NR_NIVEL_ACESSO == 0 && collapseAjusteEstoque && (dataUsuarioLog.Lg_Consulta_Processo_Adicionar_Subtrair || dataUsuarioLog.Lg_Consulta_Processo_Inventario || dataUsuarioLog.Lg_Consulta_Processo_Transferencia)) {
        CarregaProcessosAjusteEstoqueGeral();

        desabilitaTodosPanels();
        ExibirEsconderPaineis('cardConsultaGeral', 'block');

    } else {
        PopupAcessoNegado();
    }

}

//RETORNA MENU PRINCIPAL
function retornaMenuPrincipal() {
    CarregaPermissoesUsuarioAjusteEstoqueParametros();
    gridConsultaGeral.selectRows(null);
    gridConsultaPendentes.selectRows(null);
    gridProdutosMovimentacao.selectRows(null);

    gridProdutosMovimentacao.option('dataSource', []);
    ExibirEsconderPaineis('labelProcesso', 'none');
    desabilitaTodosPanels();

    ExibirEsconderPaineis('cardMenu', 'block');
}

//INICIA CONFIGURAÇÕES GERAIS
function iniciaConfiguracoesGerais() {

    if (dataUsuarioLog.NR_NIVEL_ACESSO == 1) {
        desabilitaTodosPanels();

        ExibirEsconderPaineis('cardCabecalho', 'block');
        ExibirEsconderPaineis('cardMenu', 'block');
        ExibirEsconderPaineis('configuracoesGerais', 'block');

    } else {
        PopupAcessoNegado()
    }

}

//INICIA CONFIGURAÇÕES USUARIO
function iniciaConfiguracoesUsuario() {

    if (dataUsuarioLog.NR_NIVEL_ACESSO == 1) {

        desabilitaTodosPanels();

        ExibirEsconderPaineis('cardCabecalho', 'block');
        ExibirEsconderPaineis('cardMenu', 'block');
        ExibirEsconderPaineis('configuracoesUsuario', 'block');

    } else {

        PopupAcessoNegado()
    }

}

function carregaConfiguracoesUsuario(foto) {

    let fotoAtual = foto + '?' + new Date().getTime();

    var img = document.querySelector("#fotoUsuarioConfiguracoes");
    img.setAttribute('src', fotoAtual);

};

//DESABILITA TODOS OS PAINEIS 
function desabilitaTodosPanels() {

    ExibirEsconderPaineis('cardMenu', 'none');
    ExibirEsconderPaineis('cardParametrosProcesso', 'none');
    ExibirEsconderPaineis('cardParametrosProcessoTransferencia', 'none');
    ExibirEsconderPaineis('cardMovimentacaoHeader', 'none');
    ExibirEsconderPaineis('cardMovimentacao', 'none');
    ExibirEsconderPaineis('cardConsultaGeral', 'none');
    ExibirEsconderPaineis('cardProcessosPendentes', 'none');
    ExibirEsconderPaineis('cardParametrosProcessoInventario', 'none');
    ExibirEsconderPaineis('configuracoesGerais', 'none');
    ExibirEsconderPaineis('configuracoesUsuario', 'none');
    //ExibirEsconderPaineis('confGerais', 'none');
    //ExibirEsconderPaineis('confUsuario', 'none');

}

//FUNÇAO DESABILITAR PAINEIS
function ExibirEsconderPaineis(el, paramDisplay) {

    var display;

    if (paramDisplay === 'block' || paramDisplay === 'none') {
        display = paramDisplay;
    } else {
        if (document.getElementById(el).style.display === "none") {
            display = 'block';
        } else {
            display = 'none';
        };
    };

    document.getElementById(el).style.display = display;
}

//MEXER A TELA ATÉ O ELEMENTO 
function rolar_para(elemento) {

    $('html, body').animate({ scrollTop: $(elemento).offset().top }, 600);
}

//ABRIR MODALS
function AbrirModal(e) {

    $(e).modal('toggle');
}

//EXIBIR INFORMACOES PROCESSO
function HabilitarInfoProcesso(numeroProcesso) {

    document.getElementById("btnConcluirProcesso").style.display = 'inline-block';
    document.getElementById("btnCancelarProcesso").style.display = 'inline-block';
    document.getElementById("btnMaisOpcoes").style.display = 'inline-block';

    ExibirEsconderPaineis('labelProcesso', 'block');
    ExibirEsconderPaineis('infoProcessoElaboracao', 'block');
    ExibirEsconderPaineis('infoProcessoConcluido', 'none');
    ExibirEsconderPaineis('infoProcessoCancelado', 'none');

    $("#txtNrProcesso").text('# ' + numeroProcesso);
}

function AbortarCancel() {
    itenPendenteCancel = false;
    itenPendenteGeral = false;
}

//CARREGA DROPDOWNBOX PRODUTOS GERAL/TRANSFERENCIA
function CarregaDropDownBoxProdutos(dataSourceProdutos) {
    let dataGrid;

    gridBoxProdutos = $('#gridBoxProdutos').dxDropDownBox({
        valueExpr: 'Cd_Produto',
        displayExpr: 'Cd_Produto',
        labelMode: 'floating',
        label: '',
        placeholder: 'Clique para selecionar produtos',
        showClearButton: true,
        dataSource: new DevExpress.data.CustomStore({
            loadMode: "raw",
            key: ['Cd_Produto', 'Nr_Lote_Origem'],
            load: function () {
                return dataSourceProdutos;
            }
        }),
        dropDownOptions: {
            animation: {
                show: {
                    type: "slide",
                    from: { opacity: 0, top: 100 },
                    to: {
                        opacity: 1,
                    }
                },
                hide: {
                    type: "slide",
                    from: { opacity: 1, top: 100 },
                    to: {
                        opacity: 0,
                    }
                }
            },
            //onShowing: async function (e) {
            //    e.component._$wrapper.css('z-index', 998);
            //    await this.fnPromise;
            //    e.component.repaint();
            //},
            onShowing: async (e) => {
                e.component._$wrapper.css('z-index', 998);
                await this.fnPromise;
                /*e.component.repaint();*/
            },
            //onOptionChanged: function (e) {
            //    if (e.name != 'visible') return;
            //    if (!e.value) return;
            //    const diffTop = $('.page-header')[0].getBoundingClientRect().bottom + 50 - $('#cardMovimentacao')[0].getBoundingClientRect().top;
            //    this.fnPromise = $('#cardMovimentacao').animate({ top: diffTop }, {
            //        complete: () => e.component.refreshPosition(),
            //    }).promise();
            //},
            onOptionChanged: (e) => {
                if (e.name != 'visible') return;
                if (!e.value) return;
                const diffTop = $('.page-header')[0].getBoundingClientRect().bottom + 50 - $('#cardMovimentacao')[0].getBoundingClientRect().top;
                this.fnPromise = $('#cardMovimentacao').animate({ top: diffTop }, {
                    complete: () => e.component.refreshPosition(),
                }).promise();
            },
            onHiding: (e) => $('#cardMovimentacao').animate({ top: 0 }),

        },
        contentTemplate(e) {
            const value = e.component.option('value');
            const $dataGrid = $('<div>').dxDataGrid({
                dataSource: e.component.getDataSource(),
                searchExpr: ['Ds_Produto'],
                displayExpr: 'Ds_Produto',
                valueExpr: 'Cd_Produto',
                wordWrapEnabled: true,
                showRowLines: true,
                rowAlternationEnabled: true,
                searchPanel: {
                    visible: true,
                    highlightCaseSensitive: false,
                    highlightSearchText: true,
                    placeholder: "Procurar...",
                },
                editing: {
                    mode: 'batch',
                    allowUpdating: true,
                    startEditAction: 'click',
                    allowAdding: false,
                    allowDeleting: false,
                    useIcons: false,
                },
                loadPanel: { enabled: true, },
                sorting: { mode: "multiple" },
                allowColumnResizing: true,
                columnResizingMode: "widget",
                allowColumnReordering: true,
                groupPanel: { visible: true, emptyPanelText: "Agrupar" },
                selection: {
                    mode: 'multiple',
                    showCheckBoxesMode: 'always',
                },
                keyboardNavigation: {
                    enterKeyAction: 'moveFocus',
                    enterKeyDirection: 'column',
                    editOnKeyPress: true,
                },
                focusedRowEnabled: false,
                hoverStateEnabled: true,
                paging: { pageSize: 25 },
                filterRow: { visible: true, applyFilter: "auto" },
                headerFilter: {
                    visible: true,
                    allowSearch: true
                },
                filterPanel: { visible: true },
                columnChooser: { enabled: true, allowSearch: true, height: 450, width: 300 },
                columnsAutoWidth: true,
                cellHintEnabled: true,
                keyExpr: ['Cd_Produto', 'Nr_Lote_Origem'],
                columns: [
                    {
                        type: "selection",
                        width: 30,
                    },
                    {
                        dataField: "Lg_Fora_Linha",
                        caption: "Fora Linha",
                        width: 40,
                        allowEditing: false,
                        allowSorting: true,
                        alignment: 'center',
                        allowHeaderFiltering: false,
                        visible: false,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "Cd_Produto",
                        caption: "Código Interno",
                        width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "Ds_Produto",
                        caption: "Descrição Produto",
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "Cd_Fabricante",
                        caption: "Código Fabricante",
                        width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "Ds_Status",
                        caption: "Status",
                        width: 70,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        alignment: 'center',
                        visible: false,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "Cd_EAN_Produto",
                        caption: "EAN",
                        width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "Cd_Original",
                        caption: "Código Original",
                        width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "Cd_Opcional",
                        caption: "Código Opcional",
                        width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "Cd_CEST",
                        caption: "CEST",
                        width: 80,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "Cd_Produto_Ecommerce",
                        caption: "Código e-Commerce",
                        width: 100,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "Ds_Marca",
                        caption: "Marca",
                        width: 80,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "Cd_Fornecedor",
                        caption: "Código Fornec.",
                        width: 90,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        alignment: 'center',
                        visible: false,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "Ds_Razao_Social_Fornecedor",
                        caption: "Fornecedor Padrão (Razão Social)",
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        visible: true,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "Ds_Fantasia_Fornecedor",
                        caption: "Fornecedor Padrão (Fantasia)",
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        visible: false,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "Cd_Curva_ABC",
                        caption: "A B C",
                        width: 55,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "Ds_Familia",
                        caption: "Família",
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        visible: false,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "Ds_Texto_Explicativo",
                        caption: "Aplicação",
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        visible: false,
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "Lg_Kit_Producao",
                        caption: "Produto Produzido",
                        width: 100,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "Lg_Movimenta_Estoque_Producao_Kit",
                        caption: "Apontamento Produção",
                        width: 100,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "Lg_Encomenda",
                        caption: "Encomenda",
                        width: 100,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "Lg_Produto_Tintometrico",
                        caption: "Produto Tintométrico",
                        width: 100,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "Nr_FCI",
                        caption: "Ficha FCI",
                        width: 100,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "Nr_Lote_Origem",
                        caption: "L o t e",
                        width: 55,
                        allowEditing: true,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "NR_LOTE_DESTINO",
                        caption: "Lote Destino",
                        width: 55,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        visible: false,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "Cd_Unidade_Medida_Venda",
                        caption: "U N",
                        width: 53,
                        allowEditing: false,
                        allowHeaderFiltering: true,
                        allowSorting: true,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "Qt_Estoque_Origem",
                        caption: "Estoque Atual",
                        width: 60,
                        allowEditing: false,
                        allowHeaderFiltering: false,
                        allowSorting: true,
                        visible: true,
                        format: "###,###,###,###,##0.#####",
                        alignment: 'center',
                        cssClass: "column-data-grid-bold",
                    },
                    {
                        dataField: "Qt_Estoque_Destino",
                        caption: "Estoque Destino",
                        width: 60,
                        allowEditing: false,
                        allowHeaderFiltering: false,
                        allowSorting: true,
                        visible: false,
                        format: "###,###,###,###,##0.#####",
                        alignment: 'center',
                        cssClass: "column-data-grid-bold",
                    },
                    {
                        dataField: "Qt_Movimento",
                        caption: "Qtde. Movimento",
                        width: 75,
                        allowEditing: true,
                        allowHeaderFiltering: false,
                        allowSorting: true,
                        visible: true,
                        alignment: 'center',
                        format: "###,###,###,###,##0.#####",
                        cssClass: "column-data-grid",
                        setCellValue: function (newData, value, currentRowData) {
                            let y;
                            let z;

                            if (pendenteSemFiltro) {
                                y = pendenteSemFiltro;
                            } else {
                                y = geralSemFiltro
                            }

                            let x = y.filter(obj => obj.Nr_Processo === numeroProcesso);

                            if (x[0].Cd_Tipo_Lancamento == 3 && value < 0) {
                                newData.Qt_Movimento = '';
                                z = null;
                            } else {
                                newData.Qt_Movimento = value;
                                z = value;
                            }

                            var produto = listProdutoSelecionado;

                            listConcluido.push({ Cd_Produto: currentRowData.Cd_Produto, Qt_Informada_Usuario: z, Nr_Lote: currentRowData.Nr_Lote_Origem });

                            if (!produto) {
                                produto = listConcluido.map((obj) => ({ Cd_Produto: obj.Cd_Produto, Nr_Lote_Origem: obj.Nr_Lote }));
                            }

                            function itemExistsInList(list, newItem) {
                                return list.some(item =>
                                    item.Cd_Produto === newItem.Cd_Produto && item.Nr_Lote_Origem === newItem.Nr_Lote_Origem
                                );
                            }

                            listConcluido.map((obj) => ({ Cd_Produto: obj.Cd_Produto, Nr_Lote_Origem: obj.Nr_Lote })).forEach(item => {
                                if (!itemExistsInList(produto, item)) {
                                    produto.push(item);
                                }
                            });

                            if (produto.length === 0) {
                                produto = listConcluido.slice();
                            }
                            dataGrid.selectRows(produto);

                        }
                    },

                ],
                toolbar: {
                    items: [
                        {
                            location: 'after',
                            widget: 'dxButton',
                            options: {
                                text: 'Adicionar Produtos',
                                hint: "Adicionar produtos selecionados",
                                width: 150,
                                icon: 'save',
                                onClick(e) {

                                    let FuncaoSalvarProdutos;

                                    FuncaoSalvarProdutos = function () {

                                        if (listProdutoSelecionado) {
                                            listProdutoSelecionado.forEach(itemCompleta => {
                                                var itemConcluido = listConcluido.reverse().find(itemConcl =>
                                                    itemCompleta.Cd_Produto === itemConcl.Cd_Produto &&
                                                    itemCompleta.Nr_Lote_Origem === itemConcl.Nr_Lote
                                                );

                                                if (itemConcluido) {
                                                    itemCompleta.Qt_Informada_Usuario = itemConcluido.Qt_Informada_Usuario;
                                                } else {
                                                    itemCompleta.Qt_Informada_Usuario = 0;
                                                }
                                            });

                                            var testeLista = listProdutoSelecionado.map((obj) => ({ Cd_Produto: obj.Cd_Produto, Nr_Lote: obj.Nr_Lote_Origem, Qt_Informada_Usuario: obj.Qt_Informada_Usuario.toString().replace(',', '.') }));

                                            loaPanel.show();

                                            new Promise(function (resolve, reject) {

                                                $.ajax({
                                                    type: 'POST',
                                                    url: "/Estoque/SalvaAjusteProduto",
                                                    data: {
                                                        nrProcesso: numeroProcesso,
                                                        insereProdutoJson: JSON.stringify(testeLista)
                                                    },
                                                    success: function (response) {
                                                        resolve(response);

                                                    },
                                                    error: function () {
                                                        // Rejeita a Promise em caso de erro
                                                        reject();
                                                    }
                                                });

                                            }).then(function (response) {

                                                if (response.Tipo == "Erro") {

                                                    new PNotify({
                                                        title: 'Ocorreu um erro ao Adicionar os Produtos!',
                                                        text: response.Mensagem,
                                                        type: 'error',
                                                        width: "50%"
                                                    });

                                                } else {

                                                    loaPanel.hide();
                                                    gridBoxProdutos.close();
                                                    gridBoxProdutos.option("value", null);
                                                    listConcluido.length = 0;
                                                    listProdutoSelecionado.length = 0;

                                                    if (tipoTransacao) {
                                                        CarregaProdutosTranferencia(almoxarifadoOr, almoxarifadoDe);

                                                    } else {
                                                        CarregaProdutosMovimentacao(almox);
                                                    }

                                                    CarregaProdutosAdicionados(numeroProcesso);

                                                    new PNotify({
                                                        title: 'Concluído',
                                                        text: 'Produtos adicionados com sucesso!',
                                                        type: 'success'
                                                    });

                                                }

                                            });


                                        } else {
                                            new PNotify({
                                                title: 'Adicionar Produtos!',
                                                text: 'Nenhum Produto foi selecionado para adicionar ao grid!',
                                                type: 'alert'
                                            });
                                        }
                                    }

                                    FuncaoSalvarProdutos();

                                },

                            },
                        },
                        'groupPanel',
                        'revertButton',
                        'columnChooserButton',
                        'searchPanel',
                    ],
                },
                showBorders: true,
                onCellPrepared: function (e) {
                    if (e.rowType === "data") {

                        if (e.column.dataField === "Lg_Fora_Linha") {
                            e.cellElement.css("background-color", e.data.Ds_Color_Fora_Linha);
                            e.cellElement.css("color", "white");
                        };

                        if (e.column.dataField === "Ds_Status") {
                            if (e.value === "Inativo") {
                                e.cellElement.css("color", "#d00000");
                                e.cellElement.css("font-weight", "bold");
                            };
                        };

                        if (e.column.dataField === "Qt_Movimento") {
                            e.cellElement.css("background-color", "#EDF3F8");
                            e.cellElement.css("font-weight", "bold");

                            if (e.value < 0) {
                                e.cellElement.css("color", "#d00000");
                            };
                        }
                    }
                },
                paging: { enabled: true, pageSize: 10 },
                scrolling: { mode: 'virtual' },
                height: '100%',
                onSelectionChanged(selectedItems) {
                    listProdutoSelecionado = selectedItems.selectedRowKeys;
                    gridBoxProdutos.option("value", listProdutoSelecionado.map((obj) => obj.Cd_Produto))

                },
                stateStoring: AutoLoad("gridBoxProdutos", false),

                onToolbarPreparing: AutoResetState([]),
            });
            dataGrid = $dataGrid.dxDataGrid('instance');

            return $dataGrid;
        },
    }).dxDropDownBox('instance');
    /*loaPanel.hide();*/
}

//CARREGA PRODUTOS MOVIMENTAÇÃO
function CarregaProdutosMovimentacao(almox) {
    /*console.log('CarregaProdutosMovimentacao')*/
    loaPanel.show();

    new Promise(function (resolve, reject) {

        $.ajax({
            type: 'POST',
            url: "/Estoque/CarregaAjusteEstoqueProdutos",
            data: { cdAlmoxarifado: almox },
            success: function (response) {
                resolve(response);

            },
            error: function (x) {
                // Rejeita a Promise em caso de erro

                reject();
            }
        });

    }).then(function (response) {
        
        /*console.log('response', response)*/
        dataSourceProdutos = response;
        CarregaDropDownBoxProdutos(dataSourceProdutos);
        loaPanel.hide();
    });
}

//CARREGA CONSULTA GERAL/PENDENTE
function CarregaConsultaPendentes(x) {

    return new Promise(function (resolve, reject) {

        $.ajax({
            type: 'POST',
            url: "/Estoque/CarregaConsultaPendentes",
            data: { cdProduto: x },
            success: function (response) {
                resolve(response);

            },
            error: function () {
                // Rejeita a Promise em caso de erro
                reject();
            }
        });

    }).then(function (response) {

        dataSourcePendentes = response;
        pendenteSemFiltro = response;
        gridConsultaPendentes.selectRows(null);

        if (dataUsuarioLog.NR_NIVEL_ACESSO == 1) {

            gridConsultaPendentes.option('dataSource', dataSourcePendentes);

            if (verificaClonar) {
                ProcessoEmElaboracao(false);

            }

        } else if (collapseAjusteEstoque && dataUsuarioLog.Lg_Consulta_Processo_Adicionar_Subtrair &&
            dataUsuarioLog.Lg_Consulta_Processo_Inventario && dataUsuarioLog.Lg_Consulta_Processo_Transferencia &&
            dataUsuarioLog.Lg_Consulta_Processos_Outros_Usuarios_Transferencia && dataUsuarioLog.Lg_Consulta_Processos_Outros_Usuarios_Inventario &&
            dataUsuarioLog.Lg_Consulta_Processos_Outros_Usuarios_Adicionar_Subtrair) {

            gridConsultaPendentes.option('dataSource', dataSourcePendentes);

            if (verificaClonar) {
                ProcessoEmElaboracao(false);

            }

        } else {

            var transferencia = dataSourcePendentes.filter(item => item.Cd_Tipo_Lancamento === 3).map((obj) => obj.Nr_Processo);
            var inventario = dataSourcePendentes.filter(item => item.Cd_Tipo_Lancamento === 5 && item.Cd_Tipo_Operacao === 'SU').map((obj) => obj.Nr_Processo);
            var adicionarSubtrair = dataSourcePendentes.filter(item => item.Cd_Tipo_Lancamento !== 3 && (item.Cd_Tipo_Lancamento !== 5 || item.Cd_Tipo_Operacao !== 'SU')).map((obj) => obj.Nr_Processo);

            dataSourcePendentes = dataSourcePendentes.filter(item => {
                if (transferencia.includes(item.Nr_Processo) && !dataUsuarioLog.Lg_Consulta_Processo_Transferencia) {
                    return false;
                }
                if (inventario.includes(item.Nr_Processo) && !dataUsuarioLog.Lg_Consulta_Processo_Inventario) {
                    return false;
                }
                if (adicionarSubtrair.includes(item.Nr_Processo) && !dataUsuarioLog.Lg_Consulta_Processo_Adicionar_Subtrair) {
                    return false;
                }
                return true;
            });

            var comparaLogin = dataSourcePendentes.filter(item => $.trim(item.Cd_Login_Emissao).toLowerCase() !== $.trim(dataUsuarioLog.Cd_Login).toLowerCase());

            const Nr_ProcessoArray = comparaLogin.map(item => item.Nr_Processo);
            var itenFilter = dataSourcePendentes.filter(item => Nr_ProcessoArray.includes(item.Nr_Processo));

            var itenFilterProcesso = itenFilter.filter(item => {
                if (transferencia.includes(item.Nr_Processo) && dataUsuarioLog.Lg_Consulta_Processos_Outros_Usuarios_Transferencia) {
                    return false; // Não corresponde à condição, remova
                }
                if (inventario.includes(item.Nr_Processo) && dataUsuarioLog.Lg_Consulta_Processos_Outros_Usuarios_Inventario) {
                    return false; // Não corresponde à condição, remova
                }
                if (adicionarSubtrair.includes(item.Nr_Processo) && dataUsuarioLog.Lg_Consulta_Processos_Outros_Usuarios_Adicionar_Subtrair) {
                    return false; // Não corresponde à condição, remova
                }
                return true; // Não corresponde a nenhuma das condições, mantenha
            });

            const itenMapNrProcesso = itenFilterProcesso.map(item => item.Nr_Processo);
            const processoValidadoFilter = dataSourcePendentes.filter(item => !itenMapNrProcesso.includes(item.Nr_Processo));

            gridConsultaPendentes.option('dataSource', processoValidadoFilter);

            if (verificaClonar) {
                ProcessoEmElaboracao(false);

            }
        }

        return response;
    });
}

//INICIA MOVIMENTAÇÃO ADICIONAR/SUBTRAIR
function IniciaMovimentacaoAdicionarSubtrair(e) {

    almox = almoxarifadoAtivos.option('value');
    tipoTransacao = false;

    if (almoxarifadoAtivos.option('value') && lkpTipoTransacao.option('value') && txtHistorico.option('value')) {

        CarregaProdutosMovimentacao(almox);

        new Promise(function (resolve, reject) {

            $.ajax({
                type: 'POST',
                url: "/Estoque/SalvaAjusteEstoque",
                data: {
                    Cd_Tipo_Lancamento: lkpTipoTransacao.option('value'),
                    Cd_Tipo_Operacao: 'AS',
                    Cd_Almoxarifado_Origem: almox,
                    Ds_Historico: txtHistorico.option('value'),
                    Cd_Situacao_Processo: 1,
                },
                success: function (response) {
                    resolve(response);

                },
                error: function () {
                    //Rejeita a Promise em caso de erro
                    reject();
                }
            });

        }).then(function (response) {

            if (response.Tipo == "Erro") {

                new PNotify({
                    title: 'Ocorreu um erro ao Salvar os registros!',
                    text: response.Mensagem,
                    type: 'error',
                    width: "30%"
                });

            } else {

                numeroProcesso = response.Nr_Processo;
                CarregaProdutosAdicionados(numeroProcesso);
                txt_Historico_Alteracao.option('value', txtHistorico.option('value'));
                $("#txtTitulo").text('ADICIONAR OU SUBTRAIR (Adicionar/Subtrair)');
                $("#txtAlmoOrigem").text('Almoxarifado: ' + almoxarifadoAtivos.option('value'));

                HabilitarInfoProcesso(numeroProcesso);

                ProcessoEmElaboracao(true);
                verificaClonar = false;
                CarregaProcessosAjusteEstoqueGeral(prod, nrDias);
                CarregaConsultaPendentes();
                iniciaMovimentacao();

            }

        });

    } else {

        new PNotify({
            title: 'Campos Obrigatórios!',
            text: 'Tipo de Operação, Almoxarifado e Histórico são de Preenchimento Obrigatórios!',
            type: 'alert',
            width: "25%"
        });
    }

}

//INICIA MOVIMENTAÇÃO SUBSTITUIR
function IniciaMovimentacaoSubstituir() {

    almox = almoxarifadoAtivoSubstituir.option('value');
    tipoTransacao = false;

    if (almoxarifadoAtivoSubstituir.option('value') && lkpTipoTransacaosubstituir.option('value') && txtHistoricoSubstituir.option('value') && filiaisAtivasSubstituir.option('value')) {

        CarregaProdutosMovimentacao(almox);

        new Promise(function (resolve, reject) {

            $.ajax({
                type: 'POST',
                url: "/Estoque/SalvaAjusteEstoque",
                data: {
                    Cd_Tipo_Lancamento: lkpTipoTransacaosubstituir.option('value'),
                    Cd_Tipo_Operacao: 'SU',
                    Cd_Almoxarifado_Origem: almox,
                    Ds_Historico: txtHistoricoSubstituir.option('value'),
                    Cd_Filial: filiaisAtivasSubstituir.option('value'),
                },
                success: function (response) {
                    resolve(response);

                },
                error: function () {
                    /* Rejeita a Promise em caso de erro*/

                    reject();
                }
            });

        }).then(function (response) {

            if (response.Tipo == "Erro") {

                new PNotify({
                    title: 'Ocorreu um erro ao Salvar os registros!',
                    text: response.Mensagem,
                    type: 'error',
                    width: "30%"
                });

            } else {

                ExibirEsconderPaineis('labelProcesso', 'block');

                numeroProcesso = response.Nr_Processo;
                CarregaProdutosAdicionados(numeroProcesso);

                txt_Historico_Alteracao.option('value', txtHistoricoSubstituir.option('value'))
                $("#txtAlmoOrigem").text('Almoxarifado ' + almox);
                $("#txtTitulo").text('SUBSTITUIR (Substituir quantidade de produtos em estoque)');
                $("#txtNrProcesso").text('# ' + numeroProcesso);

                ProcessoEmElaboracao(true);
                verificaClonar = false;
                CarregaProcessosAjusteEstoqueGeral(prod, nrDias);
                CarregaConsultaPendentes();
                iniciaMovimentacao();

            }

        });

    } else {

        new PNotify({
            title: 'Campos Obrigatórios!',
            text: 'Tipo de Operação, Almoxarifado e Histórico são de Preenchimento Obrigatórios!',
            type: 'alert',
            width: "25%"
        });

    }

}

//INICIA MOVIMENTAÇÃO TRANSFERENCIA
function IniciaMovimentacaoTransferencia() {

    let tipoLancamento = 3;
    tipoTransacao = true;

    almoxarifadoOr = almoxarifadoAtivosOrigem.option('value');
    almoxarifadoDe = almoxarifadoAtivosDestino.option('value');

    if (almoxarifadoOr && almoxarifadoDe && txtHistoricoTransferencia.option('value')) {

        CarregaProdutosTranferencia(almoxarifadoOr, almoxarifadoDe);

        new Promise(function (resolve, reject) {

            $.ajax({
                type: 'POST',
                url: "/Estoque/SalvaAjusteEstoque",
                data: {
                    Cd_Tipo_Lancamento: tipoLancamento,
                    Cd_Tipo_Operacao: 'AS',
                    Cd_Almoxarifado_Origem: almoxarifadoOr,
                    Cd_Almoxarifado_Destino: almoxarifadoDe,
                    Ds_Historico: txtHistoricoTransferencia.option('value'),
                    Cd_Situacao_Processo: 1,

                },
                success: function (response) {
                    resolve(response);

                },
                error: function () {
                    // Rejeita a Promise em caso de erro
                    reject();
                }
            });

        }).then(function (response) {

            if (response.Tipo == "Erro") {

                new PNotify({
                    title: 'Ocorreu um erro ao Salvar os registros!',
                    text: response.Mensagem,
                    type: 'error',
                    width: "30%"
                });

            } else {
                LimparCamposTxt();

                ExibirEsconderPaineis('labelProcesso', 'block');

                numeroProcesso = response.Nr_Processo;
                CarregaProdutosAdicionados(numeroProcesso);

                txt_Historico_Alteracao.option('value', txtHistoricoTransferencia.option('value'));
                $("#txtAlmoOrigem").text('Almoxarifado ' + almoxarifadoAtivosOrigem.option('value'));
                $("#txtAlDestino").text('Almoxarifado ' + almoxarifadoAtivosDestino.option('value'));
                $("#txtTitulo").text('TRANSFERÊNCIA (Transferência entre Almoxarifados)');

                HabilitarInfoProcesso(numeroProcesso);

                ExibirEsconderPaineis('txtAlmoxDestino', 'block');

                ProcessoEmElaboracao(true);
                verificaClonar = false;
                CarregaProcessosAjusteEstoqueGeral(prod, nrDias);
                CarregaConsultaPendentes();
                iniciaMovimentacao();
            }

        });

    }

}

//CARREGA PRODUTOS JÁ ADICIONADOS NO GRID
function CarregaProdutosAdicionados(numeroProcesso) {

    new Promise(function (resolve, reject) {

        $.ajax({
            type: 'POST',
            url: "/Estoque/CarregaProdutosAdicionados",
            data: { nrProcesso: numeroProcesso },
            success: function (response) {
                resolve(response);

            },
            error: function () {
                // Rejeita a Promise em caso de erro
                reject();
            }
        });

    }).then(function (response) {
        dataSourceProdutosGeral = response;
        gridProdutosMovimentacao.selectRows(null);
        gridProdutosMovimentacao.option('dataSource', response);

        /*loaPanel.hide();*/
    });
}

//CARREGA PRODUTOS TRANSFERENCIA
function CarregaProdutosTranferencia(almoxarifadoOr, almoxarifadoDe) {
    /*console.log('CarregaProdutosTranferencia')*/
    loaPanel.show();
    new Promise(function (resolve, reject) {

        $.ajax({
            type: 'POST',
            url: "/Estoque/CarregaProdutosTranferencia",
            data:
            {
                almoxOrigem: almoxarifadoOr,
                almoxDestino: almoxarifadoDe,
            },
            success: function (response) {
                resolve(response);

            },
            error: function () {
                // Rejeita a Promise em caso de erro

                reject();
            }
        });

    }).then(function (response) {

        if (response.Tipo == "Erro") {
            new PNotify({
                title: 'Erro ao carregar os Produtos!',
                text: response.Mensagem,
                type: 'error',
                width: "30%"
            });
        }
        dataSourceProdutos = response;
        /*console.log('dataSourceProdutos', dataSourceProdutos)*/
        CarregaDropDownBoxProdutos(dataSourceProdutos);
        loaPanel.hide();
    });
}

//CARREGA CONSULTA GERAL
function CarregaProcessosAjusteEstoqueGeral(prod, nrDias) {

    if (lkpProdutosFiltroGrid.option('value')) {
        nrDias = null;

    } else {
        nrDias = nbxDiasFiltroGrid.option('value')
    }

    new Promise(function (resolve, reject) {

        $.ajax({
            type: 'POST',
            url: "/Estoque/CarregaProcessosAjusteEstoqueGeral",
            data:
            {
                cdProduto: prod,
                nrDiasFiltro: nrDias,
            },
            success: function (response) {
                resolve(response);

            },
            error: function () {
                // Rejeita a Promise em caso de erro
                reject();
            }
        });

    }).then(function (response) {
        if (response.Tipo == "Erro") {
            new PNotify({
                title: 'Erro ao carregar consulta geral!',
                text: response.Mensagem,
                type: 'error',
                width: "30%"
            });
        }
        gridConsultaGeral.selectRows(null);

        dataSourceGeral = response;
        geralSemFiltro = response;

        if (dataUsuarioLog.NR_NIVEL_ACESSO == 1) {
            gridConsultaGeral.option('dataSource', dataSourceGeral);

        } else if (collapseAjusteEstoque && dataUsuarioLog.Lg_Consulta_Processo_Adicionar_Subtrair &&
            dataUsuarioLog.Lg_Consulta_Processo_Inventario && dataUsuarioLog.Lg_Consulta_Processo_Transferencia &&
            dataUsuarioLog.Lg_Consulta_Processos_Outros_Usuarios_Transferencia && dataUsuarioLog.Lg_Consulta_Processos_Outros_Usuarios_Inventario &&
            dataUsuarioLog.Lg_Consulta_Processos_Outros_Usuarios_Adicionar_Subtrair) {


            gridConsultaGeral.option('dataSource', dataSourceGeral);
        } else {

            const transferencia = dataSourceGeral.filter(item => item.Cd_Tipo_Lancamento === 3).map((obj) => obj.Nr_Processo);
            const inventario = dataSourceGeral.filter(item => item.Cd_Tipo_Lancamento === 5 && item.Cd_Tipo_Operacao === 'SU').map((obj) => obj.Nr_Processo);
            const adicionarSubtrair = dataSourceGeral.filter(item => item.Cd_Tipo_Lancamento !== 3 && (item.Cd_Tipo_Lancamento !== 5 || item.Cd_Tipo_Operacao !== 'SU')).map((obj) => obj.Nr_Processo);

            dataSourceGeral = dataSourceGeral.filter(item => {
                if (transferencia.includes(item.Nr_Processo) && !dataUsuarioLog.Lg_Consulta_Processo_Transferencia) {
                    return false;
                }
                if (inventario.includes(item.Nr_Processo) && !dataUsuarioLog.Lg_Consulta_Processo_Inventario) {
                    return false;
                }
                if (adicionarSubtrair.includes(item.Nr_Processo) && !dataUsuarioLog.Lg_Consulta_Processo_Adicionar_Subtrair) {
                    return false;
                }
                return true;
            });

            gridConsultaGeral.option('dataSource', dataSourceGeral);

            /*var comparaLogin = dataSourceGeral.filter(item => item.Cd_Login_Emissao !== dataUsuarioLog.Cd_Login);*/

            var comparaLogin = dataSourceGeral.filter(item => $.trim(item.Cd_Login_Emissao).toLowerCase() !== $.trim(dataUsuarioLog.Cd_Login).toLowerCase());


            const Nr_ProcessoArray = comparaLogin.map(item => item.Nr_Processo);
            var itenFilter = dataSourceGeral.filter(item => Nr_ProcessoArray.includes(item.Nr_Processo));

            var itenFilterProcesso = itenFilter.filter(item => {
                if (transferencia.includes(item.Nr_Processo) && dataUsuarioLog.Lg_Consulta_Processos_Outros_Usuarios_Transferencia) {
                    return false; // Não corresponde à condição, remova
                }
                if (inventario.includes(item.Nr_Processo) && dataUsuarioLog.Lg_Consulta_Processos_Outros_Usuarios_Inventario) {
                    return false; // Não corresponde à condição, remova
                }
                if (adicionarSubtrair.includes(item.Nr_Processo) && dataUsuarioLog.Lg_Consulta_Processos_Outros_Usuarios_Adicionar_Subtrair) {
                    return false; // Não corresponde à condição, remova
                }
                return true; // Não corresponde a nenhuma das condições, mantenha
            });

            const itenMapNrProcesso = itenFilterProcesso.map(item => item.Nr_Processo);
            const processoValidadoFilter = dataSourceGeral.filter(item => !itenMapNrProcesso.includes(item.Nr_Processo));

            gridConsultaGeral.option('dataSource', processoValidadoFilter);

        }

    });
}

//CANCELA PROCESSO INDIVIDUAL
function ValidarCancelaProcesso() {

    var validarCancelamento = dataSourceProdutosGeral.filter(y => y.Lg_Processado == "Sim");

    if (validarCancelamento.length > 0) {
        new PNotify({
            title: 'Processo não pode ser cancelado!',
            text: 'Existem Produtos que já foram processados, processo não poder cancelado!',
            type: 'alert',
            width: "28%"
        });

    } else {

        let dataCancel;
        let transf = false;
        let invent = false;
        let adcSub = false;

        if (dataSourcePendentes) {
            dataCancel = dataSourcePendentes;

        } else {
            dataCancel = gridConsultaGeral.option('dataSource')
        }

        dataCancel = dataCancel.filter(obj => obj.Nr_Processo === numeroProcesso);

        if (dataUsuarioLog.NR_NIVEL_ACESSO == 1) {
            AbrirModal('#ModalRegistrarJustificativaCancelamento')
            nrProcessoCancel = dataCancel;

        } else {

            if (dataCancel[0].Cd_Tipo_Lancamento == 3) {
                //TRANSFERÊNCIA
                transf = true;

            } else if (dataCancel[0].Cd_Tipo_Lancamento == 5 && dataCancel[0].Cd_Tipo_Operacao == 'SU') {
                //INVENTÁRIO 

                invent = true;

            } else {
                //ADICIONAR/SUBTRAIR

                adcSub = true;
            }

            if ($.trim(dataUsuarioLog.Cd_Login).toLowerCase() === $.trim(dataCancel[0].Cd_Login_Emissao).toLowerCase()) {

                if (transf && dataUsuarioLog.Lg_Exclui_Processo_Transferencia) {
                    //PODE EXCLUIR TRANSFERENCIAS
                    nrProcessoCancel = dataCancel;
                    AbrirModal('#ModalRegistrarJustificativaCancelamento')

                } else if (invent && dataUsuarioLog.Lg_Exclui_Processo_Inventario) {
                    //PODE EXCLUIR INVENTARIO
                    nrProcessoCancel = dataCancel;
                    AbrirModal('#ModalRegistrarJustificativaCancelamento')

                } else if (adcSub && dataUsuarioLog.Lg_Exclui_Processo_Adicionar_Subtrair) {
                    //PODE EXCLUIR ADICIONAR/SUBTRAIR
                    nrProcessoCancel = dataCancel;
                    AbrirModal('#ModalRegistrarJustificativaCancelamento')

                } else {
                    nrProcessoCancel = null;
                    PopupAcessoNegado();
                }

            } else {

                if (transf && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Transferencia && dataUsuarioLog.Lg_Exclui_Processo_Transferencia) {
                    //PODE EXCLUIR TRANSFERENCIAS
                    nrProcessoCancel = dataCancel;
                    AbrirModal('#ModalRegistrarJustificativaCancelamento')

                } else if (invent && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Inventario && dataUsuarioLog.Lg_Exclui_Processo_Inventario) {
                    //PODE EXCLUIR INVENTARIO
                    nrProcessoCancel = dataCancel;
                    AbrirModal('#ModalRegistrarJustificativaCancelamento')

                } else if (adcSub && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Adicionar_Subtrair && dataUsuarioLog.Lg_Exclui_Processo_Adicionar_Subtrair) {
                    //PODE EXCLUIR ADICIONAR/SUBTRAIR
                    nrProcessoCancel = dataCancel;
                    AbrirModal('#ModalRegistrarJustificativaCancelamento')

                } else {
                    nrProcessoCancel = null;
                    PopupAcessoNegado();
                }

            }
        }

    }
}

//CANCELAR PROCESSOS DEPOIS DAS VALIDAÇÕES (FINAL)
function CancelarProcesso() {

    if (justificativaCancelamento.option('value')) {

        nrProcessoCancel = itenPendenteCancel ? cancelarPendente : nrProcessoCancel;
        nrProcessoCancel = itenPendenteGeral ? cancelarGeral : nrProcessoCancel;

        new Promise(function (resolve, reject) {

            $.ajax({
                type: 'POST',
                url: "/Estoque/CancelarVariosProcessos",
                data: {
                    nrProcesso: nrProcessoCancel.map((obj) => obj.Nr_Processo),
                    dsMotivo: justificativaCancelamento.option('value'),

                },
                success: function (response) {

                    resolve(response);

                },
                error: function () {
                    // Rejeita a Promise em caso de erro
                    reject();

                }
            });

        }).then(function (response) {

            if (response.Tipo == "Erro") {
                new PNotify({
                    title: 'Erro ao Cancelar o Processo!',
                    text: response.Mensagem,
                    type: 'error',
                    width: "28%"
                });

            } else {
                CarregaProcessosAjusteEstoqueGeral(prod, nrDias);
                CarregaConsultaPendentes();

                gridConsultaGeral.selectRows(null);
                gridConsultaPendentes.selectRows(null);
                CarregaProdutosAdicionados(numeroProcesso);

                ProcessoCancelado();
                $("#ModalRegistrarJustificativaCancelamento").modal('hide');

                new PNotify({
                    title: 'Cancelar Processo!',
                    text: 'Processo cancelado com sucesso!',
                    type: 'success',
                    width: "20%"
                });
            }


        });

    } else {

        new PNotify({
            title: 'Justificativa de cancelamento Nula!',
            text: 'Justificativa de cancelamento não pode ser nula!',
            type: 'alert',
            width: "28%"
        });
    }

}

//CANCELAR PROCESSOS GRID PENDENTE
function CancelarProcessoPendente() {

    itenSelecionadoPendente = dataItensPendenteSelec;

    if (itenSelecionadoPendente.length > 0) {

        var permissaoOutro = dataItensPendenteSelec.filter(item => $.trim(item.Cd_Login_Emissao).toLowerCase() !== $.trim(dataUsuarioLog.Cd_Login).toLowerCase());

        if (dataUsuarioLog.NR_NIVEL_ACESSO == 1) {
            cancelarPendente = itenSelecionadoPendente;
            AbrirModal('#ModalRegistrarJustificativaCancelamento')
            itenPendenteCancel = true;

        } else {

            const transferencia = itenSelecionadoPendente.filter(item => item.Cd_Tipo_Lancamento === 3).map((obj) => obj.Nr_Processo)
            const inventario = itenSelecionadoPendente.filter(item => item.Cd_Tipo_Lancamento === 5 && item.Cd_Tipo_Operacao === 'SU').map((obj) => obj.Nr_Processo)
            const adicionarSubtrair = itenSelecionadoPendente.filter(item => item.Cd_Tipo_Lancamento !== 3 && (item.Cd_Tipo_Lancamento !== 5 || item.Cd_Tipo_Operacao !== 'SU')).map((obj) => obj.Nr_Processo)

            //VERIFICA SE O USUARIO TEM PERMISSAO PARA CANCELAR TODOS 
            if (dataUsuarioLog.Lg_Exclui_Processo_Transferencia && dataUsuarioLog.Lg_Exclui_Processo_Adicionar_Subtrair && dataUsuarioLog.Lg_Exclui_Processo_Inventario) {

                //VERIFICA SE O USUARIO TEM PERMISSAO PARA CANCELAR TODOS DE OUTROS USUARIOS
                if (permissaoOutro.length > 0 && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Adicionar_Subtrair && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Inventario
                    && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Transferencia) {
                    cancelarPendente = itenSelecionadoPendente;
                    AbrirModal('#ModalRegistrarJustificativaCancelamento')
                    itenPendenteCancel = true;

                } else if (permissaoOutro.length > 0) {

                    const Nr_ProcessoArray = permissaoOutro.map(item => item.Nr_Processo);
                    var itenFilter = itenSelecionadoPendente.filter(item => Nr_ProcessoArray.includes(item.Nr_Processo));

                    var itenFilterProcesso = itenFilter.filter(item => {
                        if (transferencia.includes(item.Nr_Processo) && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Transferencia) {
                            return false; // Não corresponde à condição, remova
                        }
                        if (inventario.includes(item.Nr_Processo) && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Inventario) {
                            return false; // Não corresponde à condição, remova
                        }
                        if (adicionarSubtrair.includes(item.Nr_Processo) && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Adicionar_Subtrair) {
                            return false; // Não corresponde à condição, remova
                        }
                        return true; // Não corresponde a nenhuma das condições, mantenha
                    });

                    const mapNrProcesso = itenFilterProcesso.map(item => item.Nr_Processo);
                    const processoValido = itenSelecionadoPendente.filter(item => !mapNrProcesso.includes(item.Nr_Processo));

                    if (processoValido.length == 0) {

                        itenPendenteCancel = false;
                        PopupAcessoNegado();

                        new PNotify({
                            title: 'Você não tem permissão para cancelar os processos selecionados!',
                            text: 'Você não tem permissão para cancelar os processos criados por outros usuários!',
                            type: 'alert',
                            width: "28%"
                        });

                    } else if (processoValido.length != dataItensPendenteSelec.length) {
                        cancelarPendente = processoValido;
                        AbrirModal('#ModalRegistrarJustificativaCancelamento')
                        itenPendenteCancel = true;

                        new PNotify({
                            title: 'Você não tem permissão para cancelar todos os processos!',
                            text: 'Somente os tipos de processos liberados para o seu usuário e criados por seu login serão cancelados!',
                            type: 'alert',
                            width: "28%"
                        });

                    } else {
                        cancelarPendente = itenSelecionadoPendente;
                        AbrirModal('#ModalRegistrarJustificativaCancelamento')
                        itenPendenteCancel = true;

                    }

                } else {
                    cancelarPendente = itenSelecionadoPendente;
                    AbrirModal('#ModalRegistrarJustificativaCancelamento')
                    itenPendenteCancel = true;
                }


            } else {
                //NÃO TEM PERMISSÃO A TODOS OS CANCELAR 

                itenSelecionadoPendente = itenSelecionadoPendente.filter(item => {
                    if (transferencia.includes(item.Nr_Processo) && !dataUsuarioLog.Lg_Exclui_Processo_Transferencia) {
                        return false; // Não corresponde à condição, remova
                    }
                    if (inventario.includes(item.Nr_Processo) && !dataUsuarioLog.Lg_Exclui_Processo_Inventario) {
                        return false; // Não corresponde à condição, remova
                    }
                    if (adicionarSubtrair.includes(item.Nr_Processo) && !dataUsuarioLog.Lg_Exclui_Processo_Adicionar_Subtrair) {
                        return false; // Não corresponde à condição, remova
                    }
                    return true; // Não corresponde a nenhuma das condições, mantenha
                });

                /*var comparaLogin = itenSelecionadoPendente.filter(item => item.Cd_Login_Emissao !== dataUsuarioLog.Cd_Login);*/

                var comparaLogin = itenSelecionadoPendente.filter(item => $.trim(item.Cd_Login_Emissao).toLowerCase() !== $.trim(dataUsuarioLog.Cd_Login).toLowerCase());


                if (itenSelecionadoPendente.length == 0) {
                    itenPendenteCancel = false;
                    PopupAcessoNegado();

                } else if (itenSelecionadoPendente.length != dataItensPendenteSelec.length) {

                    if (comparaLogin.length > 0) {

                        const Nr_ProcessoArray = comparaLogin.map(item => item.Nr_Processo);
                        var itenFilter = itenSelecionadoPendente.filter(item => Nr_ProcessoArray.includes(item.Nr_Processo));

                        var itenFilterProcesso = itenFilter.filter(item => {
                            if (transferencia.includes(item.Nr_Processo) && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Transferencia) {
                                return false; // Não corresponde à condição, remova
                            }
                            if (inventario.includes(item.Nr_Processo) && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Inventario) {
                                return false; // Não corresponde à condição, remova
                            }
                            if (adicionarSubtrair.includes(item.Nr_Processo) && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Adicionar_Subtrair) {
                                return false; // Não corresponde à condição, remova
                            }
                            return true; // Não corresponde a nenhuma das condições, mantenha
                        });

                        const itenMapNrProcesso = itenFilterProcesso.map(item => item.Nr_Processo);
                        const processoValidadoFilter = itenSelecionadoPendente.filter(item => !itenMapNrProcesso.includes(item.Nr_Processo));

                        if (processoValidadoFilter.length == 0) {

                            itenPendenteCancel = false;
                            PopupAcessoNegado();

                            new PNotify({
                                title: 'Você não tem permissão para cancelar os processos selecionados!',
                                text: 'Você não tem permissão para cancelar os processos criados por outros usuários!',
                                type: 'alert',
                                width: "28%"
                            });

                        } else if (processoValidadoFilter.length != dataItensPendenteSelec.length) {

                            cancelarPendente = processoValidadoFilter;
                            AbrirModal('#ModalRegistrarJustificativaCancelamento')
                            itenPendenteCancel = true;

                            new PNotify({
                                title: 'Você não tem permissão para cancelar todos os processos!',
                                text: 'Somente os tipos de processos liberados para o seu usuário e criados por seu login serão cancelados!',
                                type: 'alert',
                                width: "28%"
                            });

                        } else {

                            cancelarPendente = processoValidadoFilter;
                            AbrirModal('#ModalRegistrarJustificativaCancelamento')
                            itenPendenteCancel = true;

                        }

                    } else {

                        new PNotify({
                            title: 'Você não tem permissão para cancelar todos os processos!',
                            text: 'Somente os tipos de processos liberados para o seu usuário serão cancelados!',
                            type: 'alert',
                            width: "28%"
                        });

                        cancelarPendente = itenSelecionadoPendente;
                        AbrirModal('#ModalRegistrarJustificativaCancelamento')
                        itenPendenteCancel = true;
                    }


                } else {

                    if (comparaLogin.length > 0) {

                        const Nr_ProcessoArray = comparaLogin.map(item => item.Nr_Processo);
                        var itenFilter = itenSelecionadoPendente.filter(item => Nr_ProcessoArray.includes(item.Nr_Processo));

                        var itenFilterProcesso = itenFilter.filter(item => {
                            if (transferencia.includes(item.Nr_Processo) && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Transferencia) {
                                return false; // Não corresponde à condição, remova
                            }
                            if (inventario.includes(item.Nr_Processo) && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Inventario) {
                                return false; // Não corresponde à condição, remova
                            }
                            if (adicionarSubtrair.includes(item.Nr_Processo) && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Adicionar_Subtrair) {
                                return false; // Não corresponde à condição, remova
                            }
                            return true; // Não corresponde a nenhuma das condições, mantenha
                        });

                        const nrProcessoMap = itenFilterProcesso.map(item => item.Nr_Processo);
                        const itenMapProcesso = itenSelecionadoPendente.filter(item => !nrProcessoMap.includes(item.Nr_Processo));

                        if (itenMapProcesso.length == 0) {

                            itenPendenteCancel = false;
                            PopupAcessoNegado();

                            new PNotify({
                                title: 'Você não tem permissão para cancelar os processos selecionados!',
                                text: 'Você não tem permissão para cancelar os processos criados por outros usuários!',
                                type: 'alert',
                                width: "28%"
                            });

                        } else if (itenMapProcesso.length != dataItensPendenteSelec.length) {

                            cancelarPendente = itenMapProcesso;
                            AbrirModal('#ModalRegistrarJustificativaCancelamento')
                            itenPendenteCancel = true;

                            new PNotify({
                                title: 'Você não tem permissão para cancelar todos os processos!',
                                text: 'Somente os tipos de processos liberados para o seu usuário e criados por seu login serão cancelados!',
                                type: 'alert',
                                width: "28%"
                            });

                        } else {

                            cancelarPendente = itenMapProcesso;
                            AbrirModal('#ModalRegistrarJustificativaCancelamento')
                            itenPendenteCancel = true;

                        }

                    } else {

                        cancelarPendente = itenSelecionadoPendente;
                        AbrirModal('#ModalRegistrarJustificativaCancelamento')
                        itenPendenteCancel = true;
                    }

                }

            }
        }


    } else {

        itenPendenteCancel = false;
        new PNotify({
            title: 'Não é possivel Cancelar!',
            text: 'Selecione ao menos um processo para cancelar!',
            type: 'alert',
            width: "28%"
        });
    }

}

//CANCELAR PROCESSOS GRID GERAL
function CancelarProcessoGeral() {

    itenSelecionadoGeral = dataItensGeralSelec;

    if (itenSelecionadoGeral.length > 0) {

        const processosElaboracao = itenSelecionadoGeral.filter(item => item.Cd_Situacao_Processo === 1);
        const processosConcluidos = itenSelecionadoGeral.filter(item => item.Cd_Situacao_Processo !== 1);
        var permissaoOutro = dataItensGeralSelec.filter(item => $.trim(item.Cd_Login_Emissao).toLowerCase() !== $.trim(dataUsuarioLog.Cd_Login).toLowerCase());
        const transferencia = processosElaboracao.filter(item => item.Cd_Tipo_Lancamento === 3).map(obj => obj.Nr_Processo);
        const inventario = processosElaboracao.filter(item => item.Cd_Tipo_Lancamento === 5 && item.Cd_Tipo_Operacao === 'SU').map(obj => obj.Nr_Processo);
        const adicionarSubtrair = processosElaboracao.filter(item => item.Cd_Tipo_Lancamento !== 3 && (item.Cd_Tipo_Lancamento !== 5 || item.Cd_Tipo_Operacao !== 'SU')).map(obj => obj.Nr_Processo);

        if (processosElaboracao.length === 0) {

            new PNotify({
                title: 'Não é possível Cancelar!',
                text: 'Só é possível cancelar processos em elaboração!',
                type: 'alert',
                width: "28%"
            });

        } else if (dataUsuarioLog.NR_NIVEL_ACESSO === 1) {

            if (processosConcluidos.length > 0) {

                cancelarGeral = processosElaboracao;
                AbrirModal('#ModalRegistrarJustificativaCancelamento');
                itenPendenteGeral = true;

                new PNotify({
                    title: 'Só é possível cancelar processos em elaboração!',
                    text: 'Processos concluidos ou que já foram cancelados não podem ser alterados!',
                    type: 'alert',
                    width: "28%"
                });
            }
            else {
                cancelarGeral = processosElaboracao;
                AbrirModal('#ModalRegistrarJustificativaCancelamento');
                itenPendenteGeral = true;
            }

        } else if (dataUsuarioLog.Lg_Exclui_Processo_Transferencia && dataUsuarioLog.Lg_Exclui_Processo_Adicionar_Subtrair && dataUsuarioLog.Lg_Exclui_Processo_Inventario) {

            if (permissaoOutro.length > 0 && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Adicionar_Subtrair && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Inventario &&
                dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Transferencia) {

                if (processosConcluidos.length > 0) {

                    cancelarGeral = processosElaboracao;
                    AbrirModal('#ModalRegistrarJustificativaCancelamento');
                    itenPendenteGeral = true;

                    new PNotify({
                        title: 'Só é possível cancelar processos em elaboração!',
                        text: 'Somente processos em elaboração podem ser cancelados!',
                        type: 'alert',
                        width: "28%"
                    });

                } else {

                    cancelarGeral = processosElaboracao;
                    AbrirModal('#ModalRegistrarJustificativaCancelamento');
                    itenPendenteGeral = true;
                }

            } else if (permissaoOutro.length > 0) {

                const Nr_ProcessoArray = permissaoOutro.map(item => item.Nr_Processo);
                var itenFilter = processosElaboracao.filter(item => Nr_ProcessoArray.includes(item.Nr_Processo));

                var itenFilterProcesso = itenFilter.filter(item => {
                    if (transferencia.includes(item.Nr_Processo) && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Transferencia) {
                        return false; // Não corresponde à condição, remova
                    }
                    if (inventario.includes(item.Nr_Processo) && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Inventario) {
                        return false; // Não corresponde à condição, remova
                    }
                    if (adicionarSubtrair.includes(item.Nr_Processo) && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Adicionar_Subtrair) {
                        return false; // Não corresponde à condição, remova
                    }
                    return true; // Não corresponde a nenhuma das condições, mantenha
                });

                const mapNrProcesso = itenFilterProcesso.map(item => item.Nr_Processo);
                const processoValido = processosElaboracao.filter(item => !mapNrProcesso.includes(item.Nr_Processo));

                if (processoValido.length == 0) {

                    itenPendenteGeral = false;
                    PopupAcessoNegado();

                    new PNotify({
                        title: 'Você não tem permissão para cancelar os processos selecionados!',
                        text: 'Somente processos em elaboração, e que o seu usuário tem permissão podem ser cancelados!',
                        type: 'alert',
                        width: "28%"
                    });

                } else if (processoValido.length != processosElaboracao.length) {

                    if (processosConcluidos.length > 0) {

                        cancelarGeral = processoValido;
                        AbrirModal('#ModalRegistrarJustificativaCancelamento');
                        itenPendenteGeral = true;

                        new PNotify({
                            title: 'Só é possível cancelar processos em elaboração!',
                            text: 'Somente processos em elaboração, e que o seu usuário tem permissão podem ser cancelados!',
                            type: 'alert',
                            width: "28%"
                        });

                    } else {

                        cancelarGeral = processoValido;
                        AbrirModal('#ModalRegistrarJustificativaCancelamento');
                        itenPendenteGeral = true;
                    }

                } else {

                    if (processosConcluidos.length > 0) {

                        cancelarGeral = processoValido;
                        AbrirModal('#ModalRegistrarJustificativaCancelamento');
                        itenPendenteGeral = true;

                        new PNotify({
                            title: 'Só é possível cancelar processos em elaboração!',
                            text: 'Somente processos em elaboração, e que o seu usuário tem permissão podem ser cancelados!',
                            type: 'alert',
                            width: "28%"
                        });

                    } else {

                        cancelarGeral = processoValido;
                        AbrirModal('#ModalRegistrarJustificativaCancelamento');
                        itenPendenteGeral = true;
                    }
                }


            } else {

                if (processosConcluidos.length > 0) {

                    cancelarGeral = processosElaboracao;
                    AbrirModal('#ModalRegistrarJustificativaCancelamento');
                    itenPendenteGeral = true;

                    new PNotify({
                        title: 'Só é possível cancelar processos em elaboração!',
                        text: 'Somente processos em elaboração, e que o seu usuário tem permissão podem ser cancelados!',
                        type: 'alert',
                        width: "28%"
                    });

                } else {

                    cancelarGeral = processosElaboracao;
                    AbrirModal('#ModalRegistrarJustificativaCancelamento');
                    itenPendenteGeral = true;
                }
            }


        } else {

            itenSelecionadoGeral = processosElaboracao.filter(item => {
                if (transferencia.includes(item.Nr_Processo) && !dataUsuarioLog.Lg_Exclui_Processo_Transferencia) {
                    return false;
                }
                if (inventario.includes(item.Nr_Processo) && !dataUsuarioLog.Lg_Exclui_Processo_Inventario) {
                    return false;
                }
                if (adicionarSubtrair.includes(item.Nr_Processo) && !dataUsuarioLog.Lg_Exclui_Processo_Adicionar_Subtrair) {
                    return false;
                }
                return true;
            });

            var comparaLogin = itenSelecionadoGeral.filter(item => $.trim(item.Cd_Login_Emissao).toLowerCase() !== $.trim(dataUsuarioLog.Cd_Login).toLowerCase());

            if (itenSelecionadoGeral.length == 0) {
                itenPendenteGeral = false;
                PopupAcessoNegado();

            } else if (itenSelecionadoGeral.length != processosElaboracao.length) {

                if (comparaLogin.length > 0) {

                    const Nr_ProcessoArray = comparaLogin.map(item => item.Nr_Processo);
                    var itenFilter = itenSelecionadoGeral.filter(item => Nr_ProcessoArray.includes(item.Nr_Processo));

                    var itenFilterProcesso = itenFilter.filter(item => {
                        if (transferencia.includes(item.Nr_Processo) && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Transferencia) {
                            return false; // Não corresponde à condição, remova
                        }
                        if (inventario.includes(item.Nr_Processo) && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Inventario) {
                            return false; // Não corresponde à condição, remova
                        }
                        if (adicionarSubtrair.includes(item.Nr_Processo) && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Adicionar_Subtrair) {
                            return false; // Não corresponde à condição, remova
                        }
                        return true; // Não corresponde a nenhuma das condições, mantenha
                    });

                    const itenMapNrProcesso = itenFilterProcesso.map(item => item.Nr_Processo);
                    const processoValidadoFilter = itenSelecionadoGeral.filter(item => !itenMapNrProcesso.includes(item.Nr_Processo));

                    if (processoValidadoFilter.length == 0) {

                        if (processosConcluidos.length > 0) {

                            itenPendenteGeral = false;
                            PopupAcessoNegado();

                            new PNotify({
                                title: 'Você não tem permissão para cancelar os processos selecionados!',
                                text: 'Você só tem permissão para cancelar processos em elaboração criados pelo seu usuário!',
                                type: 'alert',
                                width: "28%"
                            });

                        } else {
                            itenPendenteGeral = false;
                            PopupAcessoNegado();

                            new PNotify({
                                title: 'Você não tem permissão para cancelar os processos selecionados!',
                                text: 'Você não tem permissão para cancelar os processos criados por outros usuários!',
                                type: 'alert',
                                width: "28%"
                            });
                        }



                    } else if (processoValidadoFilter.length != processosElaboracao.length) {

                        if (processosConcluidos.length > 0) {

                            cancelarGeral = processoValidadoFilter;
                            AbrirModal('#ModalRegistrarJustificativaCancelamento')
                            itenPendenteGeral = true;

                            new PNotify({
                                title: 'Você não tem permissão para cancelar todos os processos!',
                                text: 'Somente os tipos de processos liberados para o seu usuário e criados por seu login serão cancelados!',
                                type: 'alert',
                                width: "28%"
                            });

                        } else {

                            cancelarGeral = processoValidadoFilter;
                            AbrirModal('#ModalRegistrarJustificativaCancelamento')
                            itenPendenteGeral = true;

                            new PNotify({
                                title: 'Você não tem permissão para cancelar todos os processos!',
                                text: 'Somente os tipos de processos liberados para o seu usuário e criados por seu login serão cancelados!',
                                type: 'alert',
                                width: "28%"
                            });
                        }



                    } else {

                        if (processosConcluidos.length > 0) {

                            cancelarGeral = processoValidadoFilter;
                            AbrirModal('#ModalRegistrarJustificativaCancelamento')
                            itenPendenteGeral = true;

                            new PNotify({
                                title: 'Você não tem permissão para cancelar todos os processos!',
                                text: 'Somente os tipos de processos liberados para o seu usuário e criados por seu login serão cancelados!',
                                type: 'alert',
                                width: "28%"
                            });

                        } else {

                            cancelarGeral = processoValidadoFilter;
                            AbrirModal('#ModalRegistrarJustificativaCancelamento')
                            itenPendenteGeral = true;
                        }

                    }

                } else {

                    new PNotify({
                        title: 'Você não tem permissão para cancelar todos os processos!',
                        text: 'Somente os tipos de processos liberados para o seu usuário serão cancelados!',
                        type: 'alert',
                        width: "28%"
                    });

                    cancelarGeral = itenSelecionadoPendente;
                    AbrirModal('#ModalRegistrarJustificativaCancelamento')
                    itenPendenteGeral = true;
                }
            } else {

                if (comparaLogin.length > 0) {

                    const Nr_ProcessoArray = comparaLogin.map(item => item.Nr_Processo);
                    var itenFilter = itenSelecionadoGeral.filter(item => Nr_ProcessoArray.includes(item.Nr_Processo));

                    var itenFilterProcesso = itenFilter.filter(item => {
                        if (transferencia.includes(item.Nr_Processo) && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Transferencia) {
                            return false; // Não corresponde à condição, remova
                        }
                        if (inventario.includes(item.Nr_Processo) && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Inventario) {
                            return false; // Não corresponde à condição, remova
                        }
                        if (adicionarSubtrair.includes(item.Nr_Processo) && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Adicionar_Subtrair) {
                            return false; // Não corresponde à condição, remova
                        }
                        return true; // Não corresponde a nenhuma das condições, mantenha
                    });

                    const itenMapNrProcesso = itenFilterProcesso.map(item => item.Nr_Processo);
                    const processoValidadoFilter = itenSelecionadoGeral.filter(item => !itenMapNrProcesso.includes(item.Nr_Processo));

                    if (processoValidadoFilter.length == 0) {

                        if (processosConcluidos.length > 0) {

                            itenPendenteGeral = false;
                            PopupAcessoNegado();

                            new PNotify({
                                title: 'Você não tem permissão para cancelar os processos selecionados!',
                                text: 'Você só tem permissão para cancelar processos em elaboração criados pelo seu usuário!',
                                type: 'alert',
                                width: "28%"
                            });

                        } else {
                            itenPendenteGeral = false;
                            PopupAcessoNegado();

                            new PNotify({
                                title: 'Você não tem permissão para cancelar os processos selecionados!',
                                text: 'Você não tem permissão para cancelar os processos criados por outros usuários!',
                                type: 'alert',
                                width: "28%"
                            });
                        }

                    } else if (processoValidadoFilter.length != processosElaboracao.length) {

                        if (processosConcluidos.length > 0) {

                            cancelarGeral = processoValidadoFilter;
                            AbrirModal('#ModalRegistrarJustificativaCancelamento')
                            itenPendenteGeral = true;

                            new PNotify({
                                title: 'Você não tem permissão para cancelar todos os processos!',
                                text: 'Somente os tipos de processos liberados para o seu usuário, e em elaboração serão cancelados!',
                                type: 'alert',
                                width: "28%"
                            });

                        } else {

                            cancelarGeral = processoValidadoFilter;
                            AbrirModal('#ModalRegistrarJustificativaCancelamento')
                            itenPendenteGeral = true;

                            new PNotify({
                                title: 'Você não tem permissão para cancelar todos os processos!',
                                text: 'Somente os tipos de processos liberados para o seu usuário e criados por seu login serão cancelados!',
                                type: 'alert',
                                width: "28%"
                            });
                        }

                    } else {

                        if (processosConcluidos.length > 0) {

                            cancelarGeral = processoValidadoFilter;
                            AbrirModal('#ModalRegistrarJustificativaCancelamento')
                            itenPendenteGeral = true;

                            new PNotify({
                                title: 'Somente os tipos de processo em elaboração serão cancelados!',
                                text: 'Processos conluídos e cancelados não podem ser alterados!',
                                type: 'alert',
                                width: "28%"
                            });

                        } else {

                            cancelarGeral = processoValidadoFilter;
                            AbrirModal('#ModalRegistrarJustificativaCancelamento')
                            itenPendenteCancel = true;
                        }

                    }

                } else {

                    new PNotify({
                        title: 'Você não tem permissão para cancelar todos os processos!',
                        text: 'Somente os tipos de processos liberados para o seu usuário serão cancelados!',
                        type: 'alert',
                        width: "28%"
                    });

                    cancelarGeral = itenSelecionadoPendente;
                    AbrirModal('#ModalRegistrarJustificativaCancelamento')
                    itenPendenteGeral = true;
                }
            }

        }
    } else {

        itenPendenteGeral = false;
        new PNotify({
            title: 'Não é possível Cancelar!',
            text: 'Selecione ao menos um processo para cancelar!',
            type: 'alert',
            width: "28%"
        });
    }
}

//VERIFICA CONCLUIR 
function ConcluirProcessoButtonClicked() {
    let FuncaoSalvar;
    let dataSourceProcesso;
    let transf = false;
    let invent = false;
    let adcSub = false;


    if (dataSourcePendentes) {
        dataSourceProcesso = dataSourcePendentes;
    } else {
        dataSourceProcesso = gridConsultaGeral.option('dataSource')
    }

    dataSourceProcesso = dataSourceProcesso.filter(obj => obj.Nr_Processo === numeroProcesso);

    if (dataSourceProcesso[0].Cd_Tipo_Lancamento == 3) {
        //TRANSFERÊNCIA
        transf = true;

    } else if (dataSourceProcesso[0].Cd_Tipo_Lancamento == 5 && dataSourceProcesso[0].Cd_Tipo_Operacao == 'SU') {
        //INVENTÁRIO 5
        invent = true;

    } else {
        //ADICIONAR E SUBTRAIR
        adcSub = true;
    }

    FuncaoSalvar = function () {

        if (gridProdutosMovimentacao.hasEditData()) {

            //VERIFICAR AQUI O SAVE DO GRID
            gridProdutosMovimentacao.saveEditData()
                .then(() => {

                    ConcluirProcessoProdutos();
                });

        } else {

            ConcluirProcessoProdutos();
        }

    }

    if (dataUsuarioLog.NR_NIVEL_ACESSO == 0 && collapseAjusteEstoque) {

        if ($.trim(dataUsuarioLog.Cd_Login).toLowerCase() == $.trim(dataSourceProcesso[0].Cd_Login_Emissao).toLowerCase()) {
           
            if (transf && dataUsuarioLog.Lg_Conclui_Processo_Transferencia) {
                //PODE CONCLUIR TRANSFERENCIAS

                FuncaoSalvar();

            } else if (invent && dataUsuarioLog.Lg_Conclui_Processo_Inventario) {
                //PODE CONCLUIR INVENTARIO

                FuncaoSalvar();

            } else if (adcSub && dataUsuarioLog.Lg_Conclui_Processo_Adicionar_Subtrair) {
                //PODE CONCLUIR ADICIONAR/SUBTRAIR

                FuncaoSalvar();

            } else {
                
                PopupAcessoNegado();
            }

        } else {

            if (transf && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Transferencia && dataUsuarioLog.Lg_Conclui_Processo_Transferencia) {
                //PODE CONCLUIR TRANSFERENCIAS

                FuncaoSalvar();

            } else if (invent && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Inventario && dataUsuarioLog.Lg_Conclui_Processo_Inventario) {
                //PODE CONCLUIR INVENTARIO

                FuncaoSalvar();

            } else if (adcSub && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Adicionar_Subtrair && dataUsuarioLog.Lg_Conclui_Processo_Adicionar_Subtrair) {
                //PODE CONCLUIR ADICIONAR/SUBTRAIR

                FuncaoSalvar();

            } else {
                
                PopupAcessoNegado();
            }

        }

    } else if (dataUsuarioLog.NR_NIVEL_ACESSO == 1) {

        FuncaoSalvar();
    } else {

        PopupAcessoNegado();
    }

}

//CONCLUIR PROCESSO PRODUTOS
function ConcluirProcessoProdutos() {

    let produtoOperacao;
    var qtdProd = 0;
    var pcProdutoConcluido = 0;
    var requests = [];
    var erroCdProduto = 0;
    let limitador;
    const listaConcluido = [];
    const listErros = [];
    let dataSourceProcesso;
    let transferencia = false;
    let adcionarSubtrair = false;
    let inventario = false;

    if (dataSourcePendentes) {
        dataSourceProcesso = dataSourcePendentes;
    } else {
        dataSourceProcesso = gridConsultaGeral.option('dataSource')
    }

    dataSourceProcesso = dataSourceProcesso.filter(obj => obj.Nr_Processo === numeroProcesso);
    let filtroProcessado = dataSourceProdutosGeral.filter(obj => obj.Lg_Processado === "Sim");

    // 3 TRANSFERÊNCIA
    if (dataSourceProcesso[0].Cd_Tipo_Lancamento == 3) {
        produtoOperacao = dataSourceProdutosGeral.filter(item => parseFloat(item.Qt_Informada_Usuario) > 0 && item.Lg_Processado != "Sim");
        transferencia = true;

    } else if (dataSourceProcesso[0].Cd_Tipo_Lancamento == 5 && dataSourceProcesso[0].Cd_Tipo_Operacao == 'SU') {
        //INVENTÁRIO 5
        produtoOperacao = dataSourceProdutosGeral.filter(item => item.Lg_Processado != "Sim");
        inventario = true;

    } else {
        //ADICIONAR E SUBTRAIR
        produtoOperacao = dataSourceProdutosGeral.filter(item => parseFloat(item.Qt_Informada_Usuario) != 0 && item.Lg_Processado != "Sim");
        adcionarSubtrair = true;
    }

    if (produtoOperacao.length > 0) {

        if (inventario) {

            ExibirEsconderPaineis('qtd_contada', 'block');
            ExibirEsconderPaineis('saldo_entregar', 'block');
            ExibirEsconderPaineis('saldo_futura', 'block');
            ExibirEsconderPaineis('qtd_final', 'block');

            AbrirModal('#ModalReajustePrecoVenda');
            $("#processoConcluindo").text(`${dataSourceProcesso[0].Nr_Processo}`);

        } else {

            ExibirEsconderPaineis('qtd_contada', 'none');
            ExibirEsconderPaineis('saldo_entregar', 'none');
            ExibirEsconderPaineis('saldo_futura', 'none');
            ExibirEsconderPaineis('qtd_final', 'none');

            AbrirModal('#ModalReajustePrecoVenda');
            $("#processoConcluindo").text(`${dataSourceProcesso[0].Nr_Processo}`);
        }

        const somaMap = new Map();

        produtoOperacao.forEach(item => {
            const chave = `${item.Cd_Produto}-${item.Nr_Lote_Origem}`;
            const quantidade = parseFloat(item.Qt_Informada_Usuario);

            if (!isNaN(quantidade)) {
                if (somaMap.has(chave)) {
                    somaMap.set(chave, {
                        ...somaMap.get(chave),
                        Qt_Informada_Usuario: somaMap.get(chave).Qt_Informada_Usuario + quantidade
                    });
                } else {
                    somaMap.set(chave, {
                        Cd_Produto: item.Cd_Produto,
                        Nr_Lote: item.Nr_Lote_Origem,
                        Nr_Sequencia_Produto: item.Nr_Sequencia_Produto,
                        Cd_Unidade_Medida_Venda: item.Cd_Unidade_Medida_Venda,
                        Qt_Informada_Usuario: quantidade
                    });
                }
            }
        });

        if (inventario) {

            produtoOperacao = produtoOperacao.map((obj) => ({
                Cd_Produto: obj.Cd_Produto,
                Nr_Lote: obj.Nr_Lote_Origem,
                Nr_Sequencia_Produto: obj.Nr_Sequencia_Produto,
                Cd_Unidade_Medida_Venda: obj.Cd_Unidade_Medida_Venda,
                Qt_Informada_Usuario: obj.Qt_Informada_Usuario
            }));

        } else {

            produtoOperacao = Array.from(somaMap.values());
        }

        const sequenciasProdutoOperacao = new Set(produtoOperacao.map(item => item.Nr_Sequencia_Produto));
        const listaDelete = dataSourceProdutosGeral.filter(item => !sequenciasProdutoOperacao.has(item.Nr_Sequencia_Produto));

        if (dataSourceProdutosGeral.filter(item => parseFloat(item.Qt_Informada_Usuario) == 0).length > 0 && (transferencia || adcionarSubtrair)) {

            new PNotify({
                title: 'Produtos com quantidade zero!',
                text: 'Existem produtos com quantidade zero que serão excluidos do processo!',
                type: 'alert',
                width: "28%"
            });

        }

        var pcProduto = 100 / produtoOperacao.length;
        $("#timer").text(produtoOperacao.length);
        ProgressButtonClick = function () {

            produtoOperacao = produtoOperacao.map((obj) => ({
                Cd_Produto: obj.Cd_Produto,
                Cd_Unidade_Medida_Venda: obj.Cd_Unidade_Medida_Venda,
                Nr_Lote: obj.Nr_Lote,
                Qt_Informada_Usuario_String: obj.Qt_Informada_Usuario.toString().replace('.', ',')
            }));

            for (i in produtoOperacao) {
                const idProduto = produtoOperacao[i];

                let promise = () => new Promise((resolve, reject) => {

                    $.ajax({
                        type: 'POST',
                        url: `/Estoque/ConcluirProcessoAjusteEstoque`,
                        data: {
                            processo: dataSourceProcesso[0],
                            produto: idProduto
                        },
                        success: function (response) {

                            if (response.result == 'Erro') {
                                reject(response);
                            } else {
                                resolve(response);
                            }

                        },
                        error: function () {
                            reject();
                        }
                    });

                });
                requests.push(promise);
            }

            function limitarExecucoes(arrayDePromises, limite) {

                let index = 0;
                let executando = 0;

                const resultados = new Array(arrayDePromises.length);

                function proxima(resolve = () => { }, reject = () => { }, resultadosParciais = []) {

                    while (executando < limite && index < arrayDePromises.length) {

                        executando++;

                        const i = index++;

                        arrayDePromises[i]()

                            .then((resultado) => {

                                qtdProd = qtdProd + 1;
                                pcProdutoConcluido = pcProdutoConcluido + pcProduto;

                                progressBarStatus.option("value", pcProdutoConcluido);

                                $("#produtoAtualizando").text(`${resultado.Cd_Produto} - ${dataSourceProdutosGeral.filter(obj => obj.Cd_Produto == resultado.Cd_Produto)[0].Ds_Produto}`);

                                if (inventario) {

                                    const Qt_Entregar = resultado.processoProduto.Qt_Entregar_Nao_Programado + resultado.processoProduto.Qt_Entregar_Programado;
                                    const Qt_Retira_Futura = resultado.processoProduto.Qt_Retira_Futura_Nao_Programado + resultado.processoProduto.Qt_Retira_Futura_Programado;
                                    const Qt_Total = Qt_Entregar + Qt_Retira_Futura;
                                    const resultadoFinal = resultado.processoProduto.Qt_Informada_Usuario - Qt_Total;

                                    $("#contada").text(`${resultado.processoProduto.Qt_Informada_Usuario}`);
                                    $("#entregar").text(`${Qt_Entregar}`);
                                    $("#futura").text(`${Qt_Retira_Futura}`);
                                    $("#final").text(`${resultadoFinal}`);
                                }

                                $("#timer").text(produtoOperacao.length - qtdProd);
                                listaConcluido.push(resultado);

                                resultados[i] = resultado;

                            })

                            .catch((erro) => {
                                //TRATA O ERRO AQUI

                                ExibirEsconderPaineis('textoErro', 'block');
                                ExibirEsconderPaineis('gridErro', 'block');

                                erroCdProduto = erroCdProduto + 1;
                                qtdProd = qtdProd + 1;
                                pcProdutoConcluido = pcProdutoConcluido + pcProduto;

                                listErros.push(erro);

                                const listErrosComDsProduto = listErros.map(erro => {
                                    const produtoCorrespondente = dataSourceProdutosGeral.find(
                                        produto => produto.Cd_Produto === erro.Cd_Produto
                                    );

                                    if (produtoCorrespondente) {
                                        erro.Ds_Produto = produtoCorrespondente.Ds_Produto;
                                    }

                                    return erro;
                                });

                                gridProdutosErroReajuste.option('dataSource', listErrosComDsProduto);

                                progressBarStatus.option("value", pcProdutoConcluido);
                                $("#qtErro").text(erroCdProduto);
                                $("#timer").text(produtoOperacao.length - qtdProd);

                                resultados[i] = `Erro: ${erro}`

                            })

                            .finally(() => {

                                executando--;

                                proxima(resolve, reject, resultados.slice());

                            });

                    }

                    if (executando === 0) {

                        progressButton.option('text', 'Fechar');
                        progressButton.option('type', 'success');

                        ExibirEsconderPaineis('labelProcessamentoConcluido', 'block');
                        ExibirEsconderPaineis('btnFecharReajuste', 'block');
                        ExibirEsconderPaineis('progress-button', 'none');

                        progressBarStatus.option("value", 100);

                        if (dataSourceProcesso[0].Cd_Tipo_Lancamento == 3) {
                            if (listaDelete.length > 0 && filtroProcessado.length == 0) {
                                ExcluirProdutos(numeroProcesso, listaDelete.map((obj) => obj.Nr_Sequencia_Produto))

                            } else {
                                let deletar = dataSourceProdutosGeral.filter(item => parseFloat(item.Qt_Informada_Usuario) == 0).map(obj => obj.Nr_Sequencia_Produto);

                                if (deletar.length > 0) {
                                    ExcluirProdutos(numeroProcesso, deletar)
                                }
                            }
                        } else if (adcionarSubtrair) {
                            let zzz = dataSourceProdutosGeral.filter(item => parseFloat(item.Qt_Informada_Usuario) == 0).map(obj => obj.Nr_Sequencia_Produto);

                            if (zzz.length > 0 && filtroProcessado.length == 0) {
                                ExcluirProdutos(numeroProcesso, zzz)
                            }
                        }

                        resolve(resultados);

                        ConcluirProcessoFinal(dataSourceProcesso[0]);

                    }

                }

                return {

                    iniciar: () => {

                        return new Promise((resolve, reject) => {

                            proxima(resolve, reject, []);

                        });

                    },

                };

            }

            limitador = limitarExecucoes(requests, 5);

            limitador.iniciar().then((resultados) => {

                //aqui é quando finalizar

            }).catch((erro) => {

            });


        }

    } else {

        if (filtroProcessado.length > 0) {
            let deletar = dataSourceProdutosGeral.filter(item => parseFloat(item.Qt_Informada_Usuario) == 0).map(obj => obj.Nr_Sequencia_Produto);

            if (deletar.length > 0) {
                ExcluirProdutos(numeroProcesso, deletar)
            }

            ConcluirProcessoFinal(dataSourceProcesso[0]);

        } else {
            new PNotify({
                title: 'Concluir Processo!',
                text: 'Para concluir a operação é necessário ao menos um produto com quantidade!',
                type: 'alert',
            });
        }

    }

}

//CONCLUIR PROCESSO (STATUS)
function ConcluirProcessoFinal(x) {

    new Promise(function (resolve, reject) {

        $.ajax({
            type: 'POST',
            url: `/Estoque/ConcluirProcessoAjusteEstoqueFinal`,
            data: { processo: x },
            success: function (response) {
                resolve(response);

            },
            error: function () {
                // Rejeita a Promise em caso de erro
                reject();
            }
        });

    }).then(function (response) {

        if (response.Tipo == "Erro") {
            new PNotify({
                title: 'Erro ao Concluir o Processo!',
                text: response.Mensagem,
                type: 'error',
                width: "28%"
            });

        } else {
            
            ProcessoConcluido();

            new PNotify({
                title: 'Concluído!',
                text: 'Ajuste de Estoque Concluído com Sucesso!',
                type: 'success',
            });
        }

    });
}

//EXCLUIR PRODUTOS
function ExcluirProdutos(numeroProcesso, produtoSelecionado) {

    new Promise(function (resolve, reject) {

        $.ajax({
            type: 'POST',
            url: "/Estoque/DeletaProdutoAjusteEstoque",
            data: { cdProcesso: numeroProcesso, produtos: produtoSelecionado },
            success: function (response) {
                resolve(response);

            },
            error: function (x) {

                reject();
            }
        });

    }).then(function (response) {
        CarregaProdutosAdicionados(numeroProcesso);

        if (response.Tipo == "Erro") {

            new PNotify({
                title: 'Ocorreu um erro ao Excluir os produtos selecionados!',
                text: response.Mensagem,
                type: 'error',
                width: "50%"
            });

        } else {

            new PNotify({
                title: 'Exclusão!',
                text: 'Produtos Selecionados ou Com Quantidade Zero Excluídos!',
                type: 'success',
                width: "25%"
            });

        }

    });
}

//CLONAR PROCESSOS
function ClonarAjusteEstoque() {

    let FuncaoClonarProcessos;


    let dataSourceProcesso;

    if (dataSourceGeral) {
        dataSourceProcesso = dataSourceGeral;
    } else {
        dataSourceProcesso = dataSourcePendentes;
    }

    dataSourceProcesso = dataSourceProcesso.filter(obj => obj.Nr_Processo === numeroProcesso);

    if (dataSourceProcesso.length == 0) {
        dataSourceProcesso = dataSourcePendentes;
        dataSourceProcesso = dataSourceProcesso.filter(obj => obj.Nr_Processo === numeroProcesso);
    }

    FuncaoClonarProcessos = function (x) {
        loaPanel.show();
        verificaClonar = true;

        new Promise(function (resolve, reject) {

            $.ajax({
                type: 'POST',
                url: "/Estoque/SalvaAjusteEstoque",
                data: {
                    estoque: x,

                },
                success: function (response) {
                    resolve(response);

                },
                error: function () {
                    // Rejeita a Promise em caso de erro
                    reject();
                }
            });

        }).then(function (response) {
            numeroProcesso = response.Nr_Processo;

            if (response.Tipo == "Erro") {

                new PNotify({
                    title: 'Ocorreu um erro ao Clonar o Processo!',
                    text: response.Mensagem,
                    type: 'error',
                    width: "30%"
                });

            } else {
                CarregaConsultaPendentes();

                if (response.estoque) {

                    $("#txtNrProcesso").text('# ' + numeroProcesso);
                    $("#txtDtProcesso").text(new Date(Date.parse(response.estoque.Dt_Emissao)).toLocaleDateString("pt-BR"));
                    ExibirEsconderPaineis('labelProcesso', 'block');

                    if (dataSourceProcesso[0].Cd_Tipo_Lancamento == 3) {

                        CarregaProdutosTranferencia(response.estoque.Cd_Almoxarifado_Origem, response.estoque.Cd_Almoxarifado_Destino);

                        txt_Historico_Alteracao.option('value', response.estoque.Ds_Historico);
                        $("#txtAlmoOrigem").text('Almoxarifado ' + response.estoque.Cd_Almoxarifado_Origem);
                        $("#txtAlDestino").text('Almoxarifado ' + response.estoque.Cd_Almoxarifado_Destino);
                        $("#txtTitulo").text('TRANSFERÊNCIA (Transferência entre Almoxarifados)');

                        ExibirEsconderPaineis('txtAlmoxDestino', 'block');

                    } else if (dataSourceProcesso[0].Cd_Tipo_Lancamento == 5 && dataSourceProcesso[0].Cd_Tipo_Operacao == 'SU') {
                        //INVENTÁRIO 5

                        CarregaProdutosMovimentacao(response.estoque.Cd_Almoxarifado_Origem);
                        txt_Historico_Alteracao.option('value', response.estoque.Ds_Historico)
                        $("#txtAlmoOrigem").text('Almoxarifado ' + response.estoque.Cd_Almoxarifado_Origem);
                        $("#txtTitulo").text('SUBSTITUIR (Substituir quantidade de produtos em estoque)');
                        $("#txtNrProcesso").text('# ' + numeroProcesso);

                    } else {
                        //ADICIONAR E SUBTRAIR

                        CarregaProdutosMovimentacao(response.estoque.Cd_Almoxarifado_Origem);
                        txt_Historico_Alteracao.option('value', response.estoque.Ds_Historico);
                        $("#txtTitulo").text('ADICIONAR OU SUBTRAIR (Adicionar/Subtrair)');
                        $("#txtAlmoOrigem").text('Almoxarifado: ' + response.estoque.Cd_Almoxarifado_Origem);
                    }
                }

                iniciaMovimentacao();

                if (dataSourceProdutosGeral.length > 0) {

                    var testeLista = dataSourceProdutosGeral.map((obj) => ({
                        Cd_Produto: obj.Cd_Produto,
                        Nr_Lote: obj.Nr_Lote_Origem,
                        Qt_Informada_Usuario: obj.Qt_Informada_Usuario
                    }));

                    new Promise(function (resolve, reject) {

                        $.ajax({
                            type: 'POST',
                            url: "/Estoque/SalvaAjusteProduto",
                            data: {
                                nrProcesso: response.Nr_Processo,
                                insereProdutoJson: JSON.stringify(testeLista)
                            },
                            success: function (x) {
                                resolve(x);

                            },
                            error: function () {
                                // Rejeita a Promise em caso de erro
                                reject();
                            }
                        });

                    }).then(function (x) {

                        CarregaProdutosAdicionados(numeroProcesso);

                        if (x.Tipo == "Erro") {
                            new PNotify({
                                title: 'Ocorreu um erro ao Clonar os Produtos do Processo!',
                                text: response.Mensagem,
                                type: 'error',
                                width: "30%"
                            });

                        } else {

                            new PNotify({
                                title: 'Concluído!',
                                text: 'Processo Clonado com Sucesso!',
                                type: 'success',
                            });
                        }
                    })

                } else {

                    CarregaProdutosAdicionados(numeroProcesso);

                    new PNotify({
                        title: 'Concluído!',
                        text: 'Processo Clonado com Sucesso!',
                        type: 'success',
                    });

                }

            }

        });
    }

    if (dataUsuarioLog.NR_NIVEL_ACESSO === 0 && collapseAjusteEstoque) {

        let transf = false;
        let invent = false;
        let adcSub = false;

        if (dataSourceProcesso[0].Cd_Tipo_Lancamento == 3) {
            //TRANSFERÊNCIA
            transf = true;

        } else if (dataSourceProcesso[0].Cd_Tipo_Lancamento == 5 && dataSourceProcesso[0].Cd_Tipo_Operacao == 'SU') {
            //INVENTÁRIO 5
            invent = true;

        } else {
            //ADICIONAR E SUBTRAIR
            adcSub = true;
        }

        if ($.trim(dataUsuarioLog.Cd_Login).toLowerCase() == $.trim(dataSourceProcesso[0].Cd_Login_Emissao).toLowerCase()) {
            //CONCLUIR PROPRIO PROCESSO

            if (transf && dataUsuarioLog.Lg_Clona_Processo_Transferencia) {
                //PODE CONCLUIR TRANSFERENCIAS

                FuncaoClonarProcessos(dataSourceProcesso[0]);


            } else if (invent && dataUsuarioLog.Lg_Clona_Processo_Inventario) {
                //PODE CONCLUIR INVENTARIO

                FuncaoClonarProcessos(dataSourceProcesso[0]);

            } else if (adcSub && dataUsuarioLog.Lg_Clona_Processo_Adicionar_Subtrair) {
                //PODE CONCLUIR ADICIONAR/SUBTRAIR

                FuncaoClonarProcessos(dataSourceProcesso[0]);

            } else {

                PopupAcessoNegado();
            }

        } else {

            //CONCLUIR PROCESSO OUTRO USUARIO
            if (transf && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Transferencia && dataUsuarioLog.Lg_Clona_Processo_Transferencia) {
                //PODE CONCLUIR TRANSFERENCIAS

                FuncaoClonarProcessos(dataSourceProcesso[0]);

            } else if (invent && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Inventario && dataUsuarioLog.Lg_Clona_Processo_Inventario) {
                //PODE CONCLUIR INVENTARIO

                FuncaoClonarProcessos(dataSourceProcesso[0]);

            } else if (adcSub && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Adicionar_Subtrair && dataUsuarioLog.Lg_Clona_Processo_Adicionar_Subtrair) {
                //PODE CONCLUIR ADICIONAR/SUBTRAIR

                FuncaoClonarProcessos(dataSourceProcesso[0]);

            } else {

                PopupAcessoNegado();
            }

        }
    } else if (dataUsuarioLog.NR_NIVEL_ACESSO === 1) {
        FuncaoClonarProcessos(dataSourceProcesso[0]);

    } else {

        PopupAcessoNegado();
    }

}

//PROCESSO CANCELADO 3
function ProcessoCancelado() {
    let cancelado;

    if (gridProdutosMovimentacao) {
        gridProdutosMovimentacao.option('editing.allowUpdating', false);
        cancelado = gridProdutosMovimentacao.option("columns");
    }
    if (cancelado) {
        cancelado.forEach(function (column, index) {
            if (column.type === "buttons" || column.type === "selection") {
                gridProdutosMovimentacao.columnOption(index, "visible", false);
            }
        });
    }

    ExibirEsconderPaineis('gridBoxProdutos', 'none');
    ExibirEsconderPaineis('txtCampoAbaixo', 'none');
    ExibirEsconderPaineis('btnConcluirProcesso', 'none');
    ExibirEsconderPaineis('btnCancelarProcesso', 'none');
    ExibirEsconderPaineis('btnMaisOpcoes', 'none');
    ExibirEsconderPaineis('infoProcessoElaboracao', 'none');
    ExibirEsconderPaineis('infoProcessoCancelado', 'block');
    ExibirEsconderPaineis('infoProcessoConcluido', 'none');

}

//PROCESSO CONCLUIDO 2
function ProcessoConcluido() {

    let concluido;

    if (gridProdutosMovimentacao) {
        gridProdutosMovimentacao.option('editing.allowUpdating', false);
        concluido = gridProdutosMovimentacao.option("columns");

        if (concluido) {

            concluido.forEach(function (column, index) {
                if (column.type === "buttons" || column.type === "selection") {
                    gridProdutosMovimentacao.columnOption(index, "visible", false);
                }
            });
        }
    }

    ExibirEsconderPaineis('gridBoxProdutos', 'none');
    ExibirEsconderPaineis('txtCampoAbaixo', 'none');
    ExibirEsconderPaineis('btnConcluirProcesso', 'none');
    ExibirEsconderPaineis('btnCancelarProcesso', 'none');
    ExibirEsconderPaineis('btnMaisOpcoes', 'none');
    ExibirEsconderPaineis('infoProcessoElaboracao', 'none');
    ExibirEsconderPaineis('infoProcessoCancelado', 'none');
    ExibirEsconderPaineis('infoProcessoConcluido', 'block');

}

//PROCESSO EM ELABORAÇÃO 1
function ProcessoEmElaboracao(x) {

    let elaboracao;
    let dataSourceProcesso;
    let PodeMovimentar;
    let NaoMovimentar;

    PodeMovimentar = function () {
        if (gridProdutosMovimentacao) {
            gridProdutosMovimentacao.option('editing.allowUpdating', true)
            elaboracao = gridProdutosMovimentacao.option("columns");

            if (elaboracao) {

                elaboracao.forEach(function (column, index) {
                    if (column.type === "buttons" || column.type === "selection") {
                        gridProdutosMovimentacao.columnOption(index, "visible", true);
                    }
                });
            }
        }
        document.getElementById("btnMaisOpcoes").style.display = 'inline-block';
        ExibirEsconderPaineis('gridBoxProdutos', 'block');
        ExibirEsconderPaineis('txtCampoAbaixo', 'block');
    }

    NaoMovimentar = function () {
        if (gridProdutosMovimentacao) {
            gridProdutosMovimentacao.option('editing.allowUpdating', false);
            elaboracao = gridProdutosMovimentacao.option("columns");

            if (elaboracao) {

                elaboracao.forEach(function (column, index) {
                    if (column.type === "buttons" || column.type === "selection") {
                        gridProdutosMovimentacao.columnOption(index, "visible", false);
                    }
                });
            }
        }
        document.getElementById("btnMaisOpcoes").style.display = 'none';
        ExibirEsconderPaineis('gridBoxProdutos', 'none');
        ExibirEsconderPaineis('txtCampoAbaixo', 'none');
    }

    if (!x) {

        if (verificaClonar) {
            dataSourceProcesso = dataSourcePendentes;

            dataSourceProcesso = dataSourceProcesso.filter(obj => obj.Nr_Processo === numeroProcesso);
        } else {

            if (dataSourceGeral) {
                dataSourceProcesso = dataSourceGeral;

            } else {
                dataSourceProcesso = dataSourcePendentes;
            }

            dataSourceProcesso = dataSourceProcesso.filter(obj => obj.Nr_Processo === numeroProcesso);

            if (dataSourceProcesso.length == 0) {
                dataSourceProcesso = dataSourcePendentes;
                dataSourceProcesso = dataSourceProcesso.filter(obj => obj.Nr_Processo === numeroProcesso);
            }
        }

        if (dataUsuarioLog.NR_NIVEL_ACESSO === 0 && collapseAjusteEstoque) {

            let transf = false;
            let invent = false;
            let adcSub = false;

            if (dataSourceProcesso[0].Cd_Tipo_Lancamento == 3) {
                //TRANSFERÊNCIA
                transf = true;

            } else if (dataSourceProcesso[0].Cd_Tipo_Lancamento == 5 && dataSourceProcesso[0].Cd_Tipo_Operacao == 'SU') {
                //INVENTÁRIO 5
                invent = true;

            } else {
                //ADICIONAR E SUBTRAIR
                adcSub = true;
            }

            if ($.trim(dataUsuarioLog.Cd_Login).toLowerCase() == $.trim(dataSourceProcesso[0].Cd_Login_Emissao).toLowerCase()) {
                //CONCLUIR PROPRIO PROCESSO

                if (transf && dataUsuarioLog.Lg_Inclui_Processo_Transferencia) {
                    //PODE CONCLUIR TRANSFERENCIAS

                    PodeMovimentar();

                } else if (invent && dataUsuarioLog.Lg_Inclui_Processo_Inventario) {
                    //PODE CONCLUIR INVENTARIO
                    PodeMovimentar();


                } else if (adcSub && dataUsuarioLog.Lg_Inclui_Processo_Adicionar_Subtrair) {
                    //PODE CONCLUIR ADICIONAR/SUBTRAIR
                    PodeMovimentar();

                } else {

                    NaoMovimentar();
                }

            } else {

                //CONCLUIR PROCESSO OUTRO USUARIO
                if (transf && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Transferencia && dataUsuarioLog.Lg_Inclui_Processo_Transferencia) {
                    //PODE CONCLUIR TRANSFERENCIAS
                    PodeMovimentar();

                } else if (invent && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Inventario && dataUsuarioLog.Lg_Inclui_Processo_Inventario) {
                    //PODE CONCLUIR INVENTARIO
                    PodeMovimentar();

                } else if (adcSub && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Adicionar_Subtrair && dataUsuarioLog.Lg_Inclui_Processo_Adicionar_Subtrair) {
                    //PODE CONCLUIR ADICIONAR/SUBTRAIR
                    PodeMovimentar();

                } else {

                    NaoMovimentar();
                }

            }
        } else if (dataUsuarioLog.NR_NIVEL_ACESSO === 1) {

            PodeMovimentar();

        } else {

            NaoMovimentar();
        }

    } else {
        PodeMovimentar();
    }

    document.getElementById("btnConcluirProcesso").style.display = 'inline-block';
    document.getElementById("btnCancelarProcesso").style.display = 'inline-block';

    ExibirEsconderPaineis('infoProcessoElaboracao', 'block');
    ExibirEsconderPaineis('infoProcessoCancelado', 'none');
    ExibirEsconderPaineis('infoProcessoConcluido', 'none');

}

//LIMPAR OS CAMPOS DE TEXTO
function LimparCamposTxt() {

    txtHistorico.option('value', '');
    txtHistoricoTransferencia.option('value', '');
    txtHistoricoSubstituir.option('value', '');

}

//CARREGA FILIAL SELECIONADA
function VerificaFilial(filialSelecionada) {

    new Promise(function (resolve, reject) {

        $.ajax({
            type: 'POST',
            url: "/Estoque/VerificaParametroFilial",
            data: {
                filial: filialSelecionada,

            },
            success: function (response) {
                resolve(response);

            },
            error: function () {
                // Rejeita a Promise em caso de erro
                reject();

            }
        });

    }).then(function (response) {
        loaPanel.hide();

        ExibirEsconderPaineis('cx_texto_parans_filial', 'block');
        ExibirEsconderPaineis('chk_Abater_Quantidade_Pendente_Entrega', 'block');
        ExibirEsconderPaineis('chk_Abater_Quantidade_Pendente_Retira_Futura', 'block');

        entrega = response[0].LG_CONSIDERAR_ENTREGA_INVENTARIO !== null ? response[0].LG_CONSIDERAR_ENTREGA_INVENTARIO : false;
        retiraFutura = response[0].LG_CONSIDERAR_RETIRA_FUTURA_INVENTARIO !== null ? response[0].LG_CONSIDERAR_RETIRA_FUTURA_INVENTARIO : false;

        abaterQuantidadePendenteEntrega.option('value', entrega);
        abaterQuantidadePendenteRetiraFutura.option('value', retiraFutura);
    });
}

//SALVAR PARAMETROS FILIAIS
function SalvarParansFilial(x, y) {

    new Promise(function (resolve, reject) {

        $.ajax({
            type: 'POST',
            url: "/Estoque/SalvarParansFilial",
            data: {
                filial: filialSelecionada,
                paranEntrega: x,
                paranRetira: y,

            },
            success: function (response) {
                resolve(response);

            },
            error: function () {
                // Rejeita a Promise em caso de erro
                reject();

            }
        });

    }).then(function (response) {
        VerificaFilial(filialSelecionada);

        if (response.Tipo == "Erro") {

            new PNotify({
                title: 'Erro ao salvar o Parâmetro!',
                text: response.Mensagem,
                type: 'error',
                width: "28%"
            });

        } else {

            new PNotify({
                title: 'Parâmetro salvo com sucesso',
                text: 'Dados gravados com sucesso!',
                type: 'success',
                width: "20%"
            });

        }

    });

}

//CARREGA PARAMETROS FILIAIS
function VerificaParametroFilial(filialSelecionada) {

    new Promise(function (resolve, reject) {

        $.ajax({
            type: 'POST',
            url: "/Estoque/VerificaParametroFilial",
            data: {
                filial: filialSelecionada,

            },
            success: function (response) {
                resolve(response);

            },
            error: function () {
                // Rejeita a Promise em caso de erro
                reject();

            }
        });

    }).then(function (response) {

        const tasks = [
            {
                subject: 'Parâmetro ativo para abater da quantidade contada o saldo devido a entregar dos produtos',
                priority: 0,
            },
            {
                subject: 'Parâmetro ativo para abater da quantidade contada o saldo devido para retira futura dos produtos',
                priority: 1,
            },

        ];

        $('#list').children().remove();

        if (response[0].LG_CONSIDERAR_ENTREGA_INVENTARIO && response[0].LG_CONSIDERAR_RETIRA_FUTURA_INVENTARIO) {

            ExibirEsconderPaineis('alertaFiltroProdutos', 'block');

            $('#list').append($('<li/>').text(tasks[0].subject));
            $('#list').append($('<li/>').text(tasks[1].subject));

        } else if (response[0].LG_CONSIDERAR_ENTREGA_INVENTARIO) {

            ExibirEsconderPaineis('alertaFiltroProdutos', 'block');
            $('#list').append($('<li/>').text(tasks[0].subject));

        } else if (response[0].LG_CONSIDERAR_RETIRA_FUTURA_INVENTARIO) {

            ExibirEsconderPaineis('alertaFiltroProdutos', 'block');
            $('#list').append($('<li/>').text(tasks[1].subject));

        } else {

            ExibirEsconderPaineis('alertaFiltroProdutos', 'none');
        }

    });
}

//CARREGA PERMISSOES USUARIO SELECIONADO
function CarregaPermissoesUsuarioAjusteEstoque(loginPremissoes) {

    new Promise(function (resolve, reject) {

        $.ajax({
            type: 'POST',
            url: "/Estoque/CarregaPermissoesUsuarioAjusteEstoque",
            data: {
                usuario: loginPremissoes,

            },
            success: function (response) {
                resolve(response);

            },
            error: function () {
                // Rejeita a Promise em caso de erro
                reject();

            }
        });

    }).then(function (response) {

        if (response.Tipo == "Erro") {

            new PNotify({
                title: 'Erro ao carregar as permissões do usuário',
                text: response.Mensagem,
                type: 'error',
                width: "28%"
            });

        } else {

            if (response.length > 0) {
                dataPermissoesUsuario = response;
                
                if (response[0].NR_NIVEL_ACESSO == 1) {
                    ExibirEsconderPaineis('accParametrosUsuario', 'none');
                    ExibirEsconderPaineis('mensagemUsuarioAdministrador', 'block');
                    ExibirEsconderPaineis('mensagemUsuarioSemAcessoModuloAjuste', 'none');
                    

                } else if (mostrarParans) {
                    ExibirEsconderPaineis('accParametrosUsuario', 'block');
                    ExibirEsconderPaineis('mensagemUsuarioAdministrador', 'none');
                    ExibirEsconderPaineis('mensagemUsuarioSemAcessoModuloAjuste', 'none');
                    


                    adicionarSubtrairConsultar.option('value', response[0].Lg_Consulta_Processo_Adicionar_Subtrair);
                    adicionarSubtrairCriar.option('value', response[0].Lg_Inclui_Processo_Adicionar_Subtrair);
                    adicionarSubtrairConcluir.option('value', response[0].Lg_Conclui_Processo_Adicionar_Subtrair);
                    adicionarSubtrairExcluir.option('value', response[0].Lg_Exclui_Processo_Adicionar_Subtrair);
                    adicionarSubtrairClonar.option('value', response[0].Lg_Clona_Processo_Adicionar_Subtrair);
                    adicionarSubtrairConsultarProcessoOutroUsuario.option('value', response[0].Lg_Consulta_Processos_Outros_Usuarios_Adicionar_Subtrair);
                    adicionarSubtrairAplicarPermissoesProcessoOutroUsuario.option('value', response[0].Lg_Movimenta_Processos_Outros_Usuarios_Adicionar_Subtrair);
                    inventarioConsultar.option('value', response[0].Lg_Consulta_Processo_Inventario);
                    inventarioCriar.option('value', response[0].Lg_Inclui_Processo_Inventario);
                    inventarioConcluir.option('value', response[0].Lg_Conclui_Processo_Inventario);
                    inventarioExcluir.option('value', response[0].Lg_Exclui_Processo_Inventario);
                    inventarioClonar.option('value', response[0].Lg_Clona_Processo_Inventario);
                    inventarioConsultarProcessoOutroUsuario.option('value', response[0].Lg_Consulta_Processos_Outros_Usuarios_Inventario);
                    inventarioAplicarPermissoesProcessoOutroUsuario.option('value', response[0].Lg_Movimenta_Processos_Outros_Usuarios_Inventario);
                    transferenciaConsultar.option('value', response[0].Lg_Consulta_Processo_Transferencia);
                    transferenciaCriar.option('value', response[0].Lg_Inclui_Processo_Transferencia);
                    transferenciaConcluir.option('value', response[0].Lg_Conclui_Processo_Transferencia);
                    transferenciaExcluir.option('value', response[0].Lg_Exclui_Processo_Transferencia);
                    transferenciaClonar.option('value', response[0].Lg_Clona_Processo_Transferencia);
                    transferenciaConsultarProcessoOutroUsuario.option('value', response[0].Lg_Consulta_Processos_Outros_Usuarios_Transferencia);
                    transferenciaAplicarPermissoesProcessoOutroUsuario.option('value', response[0].Lg_Movimenta_Processos_Outros_Usuarios_Transferencia);

                } else {

                    ExibirEsconderPaineis('accParametrosUsuario', 'none');
                    ExibirEsconderPaineis('mensagemUsuarioAdministrador', 'none');
                    ExibirEsconderPaineis('mensagemUsuarioSemAcessoModuloAjuste', 'block');
                }

            } else {

                SalvarPermissoesUsuarioAjusteEstoque(loginPremissoes)
            }

        }

    });
}

//SALVAR PERMISSOES USUARIO
function SalvarPermissoesUsuarioAjusteEstoque(loginPremissoes) {

    new Promise(function (resolve, reject) {

        $.ajax({
            type: 'POST',
            url: "/Estoque/SalvarPermissoesUsuarioAjusteEstoque",
            data: {
                Cd_Login: loginPremissoes,
                Lg_Consulta_Processo_Adicionar_Subtrair: adicionarSubtrairConsultar.option('value'),
                Lg_Inclui_Processo_Adicionar_Subtrair: adicionarSubtrairCriar.option('value'),
                Lg_Conclui_Processo_Adicionar_Subtrair: adicionarSubtrairConcluir.option('value'),
                Lg_Exclui_Processo_Adicionar_Subtrair: adicionarSubtrairExcluir.option('value'),
                Lg_Clona_Processo_Adicionar_Subtrair: adicionarSubtrairClonar.option('value'),
                Lg_Consulta_Processos_Outros_Usuarios_Adicionar_Subtrair: adicionarSubtrairConsultarProcessoOutroUsuario.option('value'),
                Lg_Movimenta_Processos_Outros_Usuarios_Adicionar_Subtrair: adicionarSubtrairAplicarPermissoesProcessoOutroUsuario.option('value'),
                Lg_Consulta_Processo_Inventario: inventarioConsultar.option('value'),
                Lg_Inclui_Processo_Inventario: inventarioCriar.option('value'),
                Lg_Conclui_Processo_Inventario: inventarioConcluir.option('value'),
                Lg_Exclui_Processo_Inventario: inventarioExcluir.option('value'),
                Lg_Clona_Processo_Inventario: inventarioClonar.option('value'),
                Lg_Consulta_Processos_Outros_Usuarios_Inventario: inventarioConsultarProcessoOutroUsuario.option('value'),
                Lg_Movimenta_Processos_Outros_Usuarios_Inventario: inventarioAplicarPermissoesProcessoOutroUsuario.option('value'),
                Lg_Consulta_Processo_Transferencia: transferenciaConsultar.option('value'),
                Lg_Inclui_Processo_Transferencia: transferenciaCriar.option('value'),
                Lg_Conclui_Processo_Transferencia: transferenciaConcluir.option('value'),
                Lg_Exclui_Processo_Transferencia: transferenciaExcluir.option('value'),
                Lg_Clona_Processo_Transferencia: transferenciaClonar.option('value'),
                Lg_Consulta_Processos_Outros_Usuarios_Transferencia: transferenciaConsultarProcessoOutroUsuario.option('value'),
                Lg_Movimenta_Processos_Outros_Usuarios_Transferencia: transferenciaAplicarPermissoesProcessoOutroUsuario.option('value'),
            },
            success: function (response) {
                resolve(response);

            },
            error: function () {
                // Rejeita a Promise em caso de erro
                reject();

            }
        });

    }).then(function (response) {

        if (novoUsuario) {
            CarregaPermissoesUsuarioAjusteEstoqueParametros();

        } else {
            CarregaPermissoesUsuarioAjusteEstoque(loginPremissoes)
        }


    });
}

//ALTERA PERMISSOES USUARIO
function AlteraPermissoesUsuarioAjusteEstoque(loginPremissoes) {

    if (loginPremissoes) {

        new Promise(function (resolve, reject) {

            $.ajax({
                type: 'POST',
                url: "/Estoque/AlteraPermissoesUsuarioAjusteEstoque",
                data: {
                    Cd_Login: loginPremissoes,
                    Lg_Consulta_Processo_Adicionar_Subtrair: adicionarSubtrairConsultar.option('value'),
                    Lg_Inclui_Processo_Adicionar_Subtrair: adicionarSubtrairCriar.option('value'),
                    Lg_Conclui_Processo_Adicionar_Subtrair: adicionarSubtrairConcluir.option('value'),
                    Lg_Exclui_Processo_Adicionar_Subtrair: adicionarSubtrairExcluir.option('value'),
                    Lg_Clona_Processo_Adicionar_Subtrair: adicionarSubtrairClonar.option('value'),
                    Lg_Consulta_Processos_Outros_Usuarios_Adicionar_Subtrair: adicionarSubtrairConsultarProcessoOutroUsuario.option('value'),
                    Lg_Movimenta_Processos_Outros_Usuarios_Adicionar_Subtrair: adicionarSubtrairAplicarPermissoesProcessoOutroUsuario.option('value'),
                    Lg_Consulta_Processo_Inventario: inventarioConsultar.option('value'),
                    Lg_Inclui_Processo_Inventario: inventarioCriar.option('value'),
                    Lg_Conclui_Processo_Inventario: inventarioConcluir.option('value'),
                    Lg_Exclui_Processo_Inventario: inventarioExcluir.option('value'),
                    Lg_Clona_Processo_Inventario: inventarioClonar.option('value'),
                    Lg_Consulta_Processos_Outros_Usuarios_Inventario: inventarioConsultarProcessoOutroUsuario.option('value'),
                    Lg_Movimenta_Processos_Outros_Usuarios_Inventario: inventarioAplicarPermissoesProcessoOutroUsuario.option('value'),
                    Lg_Consulta_Processo_Transferencia: transferenciaConsultar.option('value'),
                    Lg_Inclui_Processo_Transferencia: transferenciaCriar.option('value'),
                    Lg_Conclui_Processo_Transferencia: transferenciaConcluir.option('value'),
                    Lg_Exclui_Processo_Transferencia: transferenciaExcluir.option('value'),
                    Lg_Clona_Processo_Transferencia: transferenciaClonar.option('value'),
                    Lg_Consulta_Processos_Outros_Usuarios_Transferencia: transferenciaConsultarProcessoOutroUsuario.option('value'),
                    Lg_Movimenta_Processos_Outros_Usuarios_Transferencia: transferenciaAplicarPermissoesProcessoOutroUsuario.option('value'),

                },
                success: function (response) {
                    resolve(response);

                },
                error: function () {
                    // Rejeita a Promise em caso de erro
                    reject();

                }
            });

        }).then(function (response) {

            CarregaPermissaoModuloAjusteUsuario(loginPremissoes)
            CarregaPermissoesUsuarioAjusteEstoqueParametros();

            if (response.Tipo == "Erro") {

                new PNotify({
                    title: 'Erro ao salvar permissões do usuário!',
                    text: response.Mensagem,
                    type: 'error',
                    width: "28%"
                });

            } else {

                new PNotify({
                    title: 'Permissões do usuário habilitada',
                    text: 'Dados gravados com sucesso!',
                    type: 'success',
                    width: "20%"
                });

            }


        });
    }

}

function RecarregarUsuario() {
    CarregaLkpusuario()
    CarregaPermissoesUsuarioAjusteEstoqueParametros();

    if (loginPremissoes) {

        CarregaPermissaoModuloAjusteUsuario(loginPremissoes)
    }

}

function CarregaLkpusuario() {
    GetAzureDataSource(34).then((result) => {

        if (result.success) {

            lkpUsuarioConfiguracoes = $('#lkp_Usuario_Configuracoes').dxLookup({
                dataSource: result.data,
                searchExpr: ['DS_PESQUISA'],
                displayExpr: 'DS_PESQUISA',
                valueExpr: 'CD_LOGIN',
                dropDownOptions: {
                    closeOnOutsideClick: true,
                    showTitle: false,
                    title: 'Usuário',
                },
                placeholder: 'Clique para selecionar um usuário',
                showClearButton: true,
                itemTemplate(data) {
                    return getTemplateFoto(data, 'custom-item');

                },
                onSelectionChanged(data) {

                    if (data.selectedItem === null) {
                        carregaConfiguracoesUsuario('/img/fotos-usuarios/sem-foto-pesquisa.jpg');
                        loginPremissoes = null;
                        ExibirEsconderPaineis('accParametrosUsuario', 'none');

                    } else {

                        loginPremissoes = data.selectedItem.CD_LOGIN;
                        carregaConfiguracoesUsuario(data.selectedItem.DS_URL_FOTO);

                        CarregaPermissaoModuloAjusteUsuario(loginPremissoes)

                    }
                }
            }).dxLookup('instance');

        }
        else {
            DevExpress.ui.notify({
                message: `${result.name}: ${result.error}`,
                type: 'error',
                displayTime: 5000,
            });
            console.error(`${result.name}: ${result.error}`);
        }
    });
}

function getTemplateFoto(data, containerClass) {

    let fotoAtual = data.DS_URL_FOTO + '?' + new Date().getTime();

    return `<div class='${containerClass}'><img src='${fotoAtual}' /><div> ${data.DS_PESQUISA}</div></div>`;
}


//#endregion FUNÇOES

//INICIO CARREGAMENTO DA TELA
$(() => {

    CarregaLkpusuario();
    //POPUP DE LOAD
    loaPanel = $('#load_Panel').dxLoadPanel({
        shadingColor: 'rgba(0,0,0,0.4)',
        message: 'Carregando, Aguarde...',
        visible: false,
        showIndicator: true,
        showPane: true,
        shading: true,
        hideOnOutsideClick: false,

    }).dxLoadPanel('instance');

    //GRID PRODUTOS COM ERRO
    gridProdutosErroReajuste = $("#gridProdutosErroReajuste").dxDataGrid({
        hoverStateEnabled: true,
        showBorders: true,
        showRowLines: true,
        rowAlternationEnabled: true,
        wordWrapEnabled: true,
        editing: {
            mode: 'batch',
            allowUpdating: false,
            startEditAction: 'click',
            allowAdding: false,
            allowDeleting: false,
            useIcons: true,
        },
        keyboardNavigation: {
            enterKeyAction: 'moveFocus',
            enterKeyDirection: 'column',
            editOnKeyPress: true,
        },
        searchPanel: {
            visible: true,
            highlightCaseSensitive: false,
            highlightSearchText: true,
            placeholder: "Procurar...",
        },
        sorting: { mode: "multiple" },
        allowColumnResizing: true,
        columnResizingMode: "widget",
        allowColumnReordering: true,
        groupPanel: { visible: false, emptyPanelText: "Agrupar" },
        paging: { pageSize: 15 },
        pager: {
            visible: true,
            allowedPageSizes: [15, 20, 50, 100],
            showPageSizeSelector: true,
            showNavigationButtons: true
        },
        export: {
            enabled: true,
            allowExportSelectedData: false
        },
        onExporting: function (e) {
            var workbook = new ExcelJS.Workbook();
            var worksheet = workbook.addWorksheet('Produtos do Fornecedor');

            DevExpress.excelExporter.exportDataGrid({
                component: e.component,
                worksheet: worksheet,
                autoFilterEnabled: true
            }).then(function () {
                workbook.xlsx.writeBuffer().then(function (buffer) {
                    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'ProdutoFornecedor.xlsx');
                });
            });
            e.cancel = true;
        },
        filterRow: { visible: true, applyFilter: "auto" },
        headerFilter: {
            visible: true,
            allowSearch: true
        },
        filterPanel: { visible: true },
        columnChooser: { enabled: true, allowSearch: true, height: 450, width: 300 },
        columnsAutoWidth: true,
        keyExpr: 'Nr_Sequencia_Produto',
        columns: [
            {
                dataField: "Cd_Produto",
                caption: "Código",
                width: 100,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "Ds_Produto",
                caption: "Produto",
                width: 250,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                alignment: 'left',
                cssClass: "column-data-grid",
            },
            {
                dataField: "Nr_Lote",
                caption: "LOTE",
                width: 100,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                alignment: 'left',
                cssClass: "column-data-grid",
            },
            {
                dataField: "msg",
                caption: "Mensagem de Erro",
                allowEditing: true,
                allowHeaderFiltering: true,
                allowSorting: true,
                visible: true,
                alignment: 'left',
                cssClass: "column-data-grid",
            },
        ],

        showBorders: true,
        onCellPrepared: function (e) {

            if (e.rowType === "data") {
                if (e.column.dataField === "msg") {
                    e.cellElement.css("color", "#d00000");
                    e.cellElement.css("font-weight", "bold");

                }
            }
        },

    }).dxDataGrid('instance');

    lkpTipoTransacao = $('#lkp_Tipo_Transacao').dxLookup({
        items: dataSourceTipoTransacao,
        searchExpr: ['DS_TIPO_LANCAMENTO'],
        displayExpr: 'DS_TIPO_LANCAMENTO',
        valueExpr: 'CD_TIPO_LANCAMENTO',
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Tipo de Transação',
        },
        labelMode: 'floating',
        label: 'Tipo de Transação *',
        placeholder: 'Selecionar um tipo de transação',
        showClearButton: true,
        onSelectionChanged(data) {
        }
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Tipo de Transação Obrigatório', }], }).dxLookup('instance');

    lkpTipoTransacaosubstituir = $('#lkp_Tipo_Transacao_substituir').dxLookup({
        items: dataSourceTipoTransacao,
        searchExpr: ['DS_TIPO_LANCAMENTO'],
        displayExpr: 'DS_TIPO_LANCAMENTO',
        valueExpr: 'CD_TIPO_LANCAMENTO',
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Tipo de Transação',
        },
        value: 5,
        readOnly: true,
        labelMode: 'floating',
        label: 'Tipo de Transação *',
        placeholder: 'Selecionar um tipo de transação',
        showClearButton: true,
        onSelectionChanged(data) {

        }
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Tipo de Transação Obrigatório', }], }).dxLookup('instance');

    almoxarifadoAtivos = $('#almoxarifadoAtivos').dxLookup().dxValidator({ validationRules: [{ type: 'required', message: 'Almoxarifado é Obrigatório', }], }).dxLookup('instance');

    almoxarifadoAtivoSubstituir = $('#lkp_almoxarifado_Ativos_substituir').dxLookup({

    }).dxValidator({ validationRules: [{ type: 'required', message: 'Almoxarifado é Obrigatório', }], }).dxLookup('instance');

    filiaisAtivasSubstituir = $('#filial_ApenasAtivasPorUsuario').dxLookup({
        onValueChanged: function (e) {
            if (e.component.option('selectedItem') !== null) {

                filialSelecionada = e.component.option('selectedItem').CD_PESQUISA

                VerificaParametroFilial(filialSelecionada)
            }


        }
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Filial é Obrigatório', }], }).dxLookup('instance');

    lkpfiliaisAtivasParans = $('#lkp_filiais_Ativas_Parans').dxLookup({
        onValueChanged: function (e) {

            ExibirEsconderPaineis('cx_texto_parans_filial', 'block');
            ExibirEsconderPaineis('chk_Abater_Quantidade_Pendente_Entrega', 'none');
            ExibirEsconderPaineis('chk_Abater_Quantidade_Pendente_Retira_Futura', 'none');

            if (e.component.option('selectedItem') !== null) {

                filialSelecionada = e.component.option('selectedItem').CD_PESQUISA

                VerificaFilial(filialSelecionada);

            }

        }
    }).dxLookup('instance');

    almoxarifadoAtivosOrigem = $('#almoxarifadoAtivosOrigem').dxLookup().dxValidator({ validationRules: [{ type: 'required', message: 'Almoxarifado Origem é Obrigatório', }], }).dxLookup('instance');

    almoxarifadoAtivosDestino = $('#almoxarifadoAtivosDestino').dxLookup().dxValidator({ validationRules: [{ type: 'required', message: 'Almoxarifado Destino é Obrigatório', }], }).dxLookup('instance');

    txtHistorico = $('#txt_Historico').dxTextBox({
        labelMode: 'floating',
        label: 'Histórico *',
        maxLength: 250,
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Histórico é Obrigatório', }], }).dxTextBox('instance');

    txtHistoricoTransferencia = $('#txt_Historico_Transferencia').dxTextBox({
        labelMode: 'floating',
        label: 'Histórico *',
        maxLength: 250,
    }).dxValidator({ validationRules: [{ type: 'required', message: 'Histórico é Obrigatório', }], }).dxTextBox('instance');

    txtHistoricoSubstituir = $('#txt_Historico_Substituir').dxTextBox({
        labelMode: 'floating',
        label: 'Histórico *',
        maxLength: 250,
    }).dxTextBox('instance');

    txt_Historico_Alteracao = $('#txt_Historico_Alteracao').dxTextBox({
        readOnly: true,
        labelMode: 'floating',
        label: 'Histórico',
        maxLength: 250,
    }).dxTextBox('instance');

    //GRID PRODUTOS MOVIMENTAÇÃO 
    gridProdutosMovimentacao = $("#gridProdutosMovimentacao").dxDataGrid({
        hoverStateEnabled: true,
        showBorders: true,
        showRowLines: true,
        rowAlternationEnabled: true,
        wordWrapEnabled: true,
        editing: {
            mode: 'batch',
            allowUpdating: true,
            startEditAction: 'click',
            allowAdding: false,
            allowDeleting: true,
            useIcons: true,
        },
        keyboardNavigation: {
            enterKeyAction: 'moveFocus',
            enterKeyDirection: 'column',
            editOnKeyPress: true,
        },
        searchPanel: {
            visible: true,
            highlightCaseSensitive: false,
            highlightSearchText: true,
            placeholder: "Procurar...",
        },
        sorting: { mode: "multiple" },
        selection: {
            mode: 'multiple',
            showCheckBoxesMode: 'always',
        },
        allowColumnResizing: true,
        columnResizingMode: "widget",
        allowColumnReordering: true,
        groupPanel: { visible: true, emptyPanelText: "Agrupar" },
        paging: { pageSize: 15 },
        pager: {
            visible: true,
            allowedPageSizes: [15, 20, 50, 100],
            showPageSizeSelector: true,
            showNavigationButtons: true
        },
        export: {
            enabled: true,
            allowExportSelectedData: false
        },
        onExporting: function (e) {
            var workbook = new ExcelJS.Workbook();
            var worksheet = workbook.addWorksheet('Produtos');

            DevExpress.excelExporter.exportDataGrid({
                component: e.component,
                worksheet: worksheet,
                autoFilterEnabled: true
            }).then(function () {
                workbook.xlsx.writeBuffer().then(function (buffer) {
                    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Produtos_Transferencia.xlsx');
                });
            });
            e.cancel = true;
        },
        filterRow: { visible: true, applyFilter: "auto" },
        headerFilter: {
            visible: true,
            allowSearch: true
        },
        filterPanel: { visible: true },
        columnChooser: { enabled: true, allowSearch: true, height: 450, width: 300 },
        columnsAutoWidth: true,
        keyExpr: 'Nr_Sequencia_Produto',
        columns: [
            {
                type: "selection",
                width: 30,
            },
            {
                dataField: "Cd_Produto",
                caption: "Código Interno",
                width: 100,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "Lg_Fora_Linha",
                caption: "Fora Linha",
                width: 40,
                allowEditing: false,
                allowSorting: true,
                alignment: 'center',
                allowHeaderFiltering: false,
                visible: true,
                cssClass: "column-data-grid",
            },
            {
                dataField: "Ds_Produto",
                caption: "Descrição Produto",
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                cssClass: "column-data-grid",
            },
            {
                dataField: "Cd_Fabricante",
                caption: "Código Fabricante",
                width: 100,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "Ds_Status",
                caption: "Status",
                width: 70,
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                alignment: 'center',
                visible: false,
                cssClass: "column-data-grid",
            },
            {
                dataField: "Cd_EAN_Produto",
                caption: "EAN",
                width: 100,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: false,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "Cd_Original",
                caption: "Código Original",
                width: 100,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: false,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "Cd_Opcional",
                caption: "Código Opcional",
                width: 100,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: false,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "Cd_CEST",
                caption: "CEST",
                width: 80,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: false,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "Cd_Produto_Ecommerce",
                caption: "Código e-Commerce",
                width: 100,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: false,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "Ds_Marca",
                caption: "Marca",
                width: 80,
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "Cd_Fornecedor",
                caption: "Código Fornec.",
                width: 90,
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                alignment: 'center',
                visible: false,
                cssClass: "column-data-grid",
            },
            {
                dataField: "Ds_Razao_Social_Fornecedor",
                caption: "Fornecedor Padrão (Razão Social)",
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                visible: true,
                cssClass: "column-data-grid",
            },
            {
                dataField: "Ds_Fantasia_Fornecedor",
                caption: "Fornecedor Padrão (Fantasia)",
                allowEditing: false,
                allowHeaderFiltering: true,
                visible: false,
                cssClass: "column-data-grid",
            },
            {
                dataField: "Cd_Curva_ABC",
                caption: "A B C",
                width: 55,
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                visible: false,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "Ds_Familia",
                caption: "Família",
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                visible: false,
                cssClass: "column-data-grid",
            },
            {
                dataField: "Ds_Texto_Explicativo",
                caption: "Aplicação",
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                visible: false,
                cssClass: "column-data-grid",
            },
            {
                dataField: "Lg_Kit_Producao",
                caption: "Produto Produzido",
                width: 100,
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                visible: false,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "Lg_Movimenta_Estoque_Producao_Kit",
                caption: "Apontamento Produção",
                width: 100,
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                visible: false,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "Lg_Encomenda",
                caption: "Encomenda",
                width: 100,
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                visible: false,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "Lg_Produto_Tintometrico",
                caption: "Produto Tintométrico",
                width: 100,
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                visible: false,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "Nr_FCI",
                caption: "Ficha FCI",
                width: 100,
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                visible: false,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "Nr_Lote_Origem",
                caption: "L o t e",
                width: 55,
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                visible: true,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "Cd_Unidade_Medida_Venda",
                caption: "U N",
                width: 53,
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                visible: true,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "Lg_Processado",
                caption: "Processado",
                width: 75,
                allowEditing: false,
                allowHeaderFiltering: true,
                allowSorting: true,
                visible: true,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "Qt_Informada_Usuario",
                caption: "Qtde. Movimento",
                width: 75,
                allowEditing: true,
                allowHeaderFiltering: false,
                allowSorting: true,
                visible: true,
                alignment: 'center',
                format: "###,###,###,###,##0.#####",
                cssClass: "column-data-grid",
                setCellValue: function (newData, value, currentRowData) {

                    let y;

                    if (pendenteSemFiltro) {
                        y = pendenteSemFiltro;
                    } else {
                        y = geralSemFiltro;
                    }

                    let x = y.filter(obj => obj.Nr_Processo === numeroProcesso);

                    if (x[0].Cd_Tipo_Lancamento == 3 && value < 0) {
                        newData.Qt_Informada_Usuario = 0;

                    } else {
                        newData.Qt_Informada_Usuario = value;
                    }

                }
            },
            {
                type: "buttons",
                width: 30,
            },
        ],

        summary: {
            totalItems: [{
                column: 'Cd_Produto',
                summaryType: 'count',
                displayFormat: "{0} Produtos",
            },],
        },
        showBorders: true,

        onToolbarPreparing: function (e) {

            var revertButton = e.toolbarOptions.items.filter(function (i) {
                return i.name === "revertButton"
            })[0];

            var origClick = revertButton.options.onClick;

            revertButton.options.onClick = function () {
                var result = DevExpress.ui.dialog.confirm("Você deseja desfazer as alteraões?", "Desfazer");
                result.done(function (dialogResult) {
                    if (dialogResult) {
                        origClick.apply(arguments);
                    }
                });
            }

            var saveButton = e.toolbarOptions.items.filter(function (i) {
                return i.name === "saveButton"
            })[0];

            var origClickSave = saveButton.options.onClick;

            saveButton.options.onClick = function () {
                var result = DevExpress.ui.dialog.confirm("Você deseja gravar as alterações?", "Gravar");
                result.done(function (dialogResult) {
                    if (dialogResult) {
                        origClickSave.apply(arguments);
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
                            var size = $("#gridProdutosMovimentacao").css('font-size').split('px')[0];
                            $("#gridProdutosMovimentacao").css('font-size', --size + 'px')
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
                            var size = $("#gridProdutosMovimentacao").css('font-size').split('px')[0];
                            $("#gridProdutosMovimentacao").css('font-size', ++size + 'px')
                        }
                    }
                }
            );
        },
        onCellPrepared: function (e) {
            if (e.rowType === "data") {
                if (e.column.dataField === "Lg_Fora_Linha") {
                    e.cellElement.css("background-color", e.data.Ds_Color_Fora_Linha);
                    e.cellElement.css("color", "white");
                }
                if (e.column.dataField === "Ds_Status") {
                    if (e.value === "Inativo") {
                        e.cellElement.css("color", "#d00000");
                        e.cellElement.css("font-weight", "bold");
                    };
                }
                if (e.column.dataField === "Qt_Informada_Usuario") {
                    e.cellElement.css("background-color", "#EDF3F8");
                    e.cellElement.css("font-weight", "bold");

                    if (e.value < 0) {
                        e.cellElement.css("color", "#d00000");
                    };
                }
                if (e.row.data.Lg_Processado == "Sim") {
                    if (e.column.name == "buttons") {
                        e.cellElement.find('.dx-link-delete').remove();

                    }
                    if (e.column.name == "Qt_Informada_Usuario") {
                        e.cellElement.css("pointer-events", "none");

                    }
                }
            }
        },
        onSaving(e) {

            e.cancel = true;

            let FuncaoSalvarItensGrid;

            FuncaoSalvarItensGrid = function () {
                if (e.changes.length) {

                    e.promise = new Promise(function (resolve, reject) {

                        $.ajax({
                            type: 'POST',
                            url: "/Estoque/AlteraQuantidadeProdutosAjusteEstoque",
                            data: { alteracoes: JSON.stringify(e.changes), cdProcesso: numeroProcesso },
                            success: function (response) {

                                new PNotify({
                                    title: 'Alteração!',
                                    text: 'Alterações Concluídas com sucesso!',
                                    type: 'success',
                                });

                                CarregaProdutosAdicionados(numeroProcesso)
                                resolve(response);
                            },
                            failure: function (response) {
                                new PNotify({
                                    title: 'Ocorreu um erro ao salvar as alterações!',
                                    text: response.msg,
                                    type: 'error',
                                    addclass: 'stack-bar-top',
                                    hide: false,
                                    stack: { "dir1": "down", "dir2": "right", "push": "top", "spacing1": 0, "spacing2": 0 },
                                    width: "100%"
                                });
                            }

                        });

                    }).then(data => {
                        e.cancel = false;
                        e.component.refresh(true).done(() => {
                            e.component.cancelEditData();
                        });
                    });


                } else {

                    e.component.refresh(true).done(() => {
                        e.component.cancelEditData();
                    });

                }

            }

            let dataSourceProcesso;

            if (verificaClonar) {
                dataSourceProcesso = dataSourcePendentes;
                dataSourceProcesso = dataSourceProcesso.filter(obj => obj.Nr_Processo === numeroProcesso);

            } else {

                if (dataSourceGeral) {
                    dataSourceProcesso = geralSemFiltro;
                } else {
                    dataSourceProcesso = pendenteSemFiltro;
                }

                dataSourceProcesso = dataSourceProcesso.filter(obj => obj.Nr_Processo === numeroProcesso);

                if (dataSourceProcesso.length == 0) {
                    dataSourceProcesso = pendenteSemFiltro;
                    dataSourceProcesso = dataSourceProcesso.filter(obj => obj.Nr_Processo === numeroProcesso);
                }
            }

            if (dataUsuarioLog.NR_NIVEL_ACESSO === 0 && collapseAjusteEstoque) {

                let transf = false;
                let invent = false;
                let adcSub = false;

                if (dataSourceProcesso[0].Cd_Tipo_Lancamento == 3) {
                    //TRANSFERÊNCIA
                    transf = true;

                } else if (dataSourceProcesso[0].Cd_Tipo_Lancamento == 5 && dataSourceProcesso[0].Cd_Tipo_Operacao == 'SU') {
                    //INVENTÁRIO 5
                    invent = true;

                } else {
                    //ADICIONAR E SUBTRAIR
                    adcSub = true;
                }

                if ($.trim(dataUsuarioLog.Cd_Login).toLowerCase() == $.trim(dataSourceProcesso[0].Cd_Login_Emissao).toLowerCase()) {
                    //CONCLUIR PROPRIO PROCESSO

                    if (transf && dataUsuarioLog.Lg_Inclui_Processo_Transferencia) {
                        //PODE CONCLUIR TRANSFERENCIAS

                        FuncaoSalvarItensGrid();


                    } else if (invent && dataUsuarioLog.Lg_Inclui_Processo_Inventario) {
                        //PODE CONCLUIR INVENTARIO

                        FuncaoSalvarItensGrid();

                    } else if (adcSub && dataUsuarioLog.Lg_Inclui_Processo_Adicionar_Subtrair) {
                        //PODE CONCLUIR ADICIONAR/SUBTRAIR

                        FuncaoSalvarItensGrid();

                    } else {

                        PopupAcessoNegado();
                    }

                } else {

                    //CONCLUIR PROCESSO OUTRO USUARIO
                    if (transf && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Transferencia && dataUsuarioLog.Lg_Inclui_Processo_Transferencia) {
                        //PODE CONCLUIR TRANSFERENCIAS

                        FuncaoSalvarItensGrid();

                    } else if (invent && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Inventario && dataUsuarioLog.Lg_Inclui_Processo_Inventario) {
                        //PODE CONCLUIR INVENTARIO

                        FuncaoSalvarItensGrid();

                    } else if (adcSub && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Adicionar_Subtrair && dataUsuarioLog.Lg_Inclui_Processo_Adicionar_Subtrair) {
                        //PODE CONCLUIR ADICIONAR/SUBTRAIR

                        FuncaoSalvarItensGrid();

                    } else {

                        PopupAcessoNegado();
                    }

                }
            } else if (dataUsuarioLog.NR_NIVEL_ACESSO === 1) {

                FuncaoSalvarItensGrid();

            } else {
                PopupAcessoNegado();
            }


        },
        onSelectionChanged(selectedItems) {
            var itenSelecionado = selectedItems.selectedRowsData;
            produtoSelecionado = itenSelecionado;

        },
        stateStoring: AutoLoad('gridProdutosMovimentacao', false),
        onToolbarPreparing: AutoResetState([]),

    }).dxDataGrid('instance');

    //TOOLBAR LIMPAR QUANTIDADES PRODUTOS SELECIONADOS
    $('#toolbarAcoesProcesso').dxToolbar({
        items: [
            {
                locateInMenu: 'always',
                widget: 'dxButton',
                options: {
                    text: 'Limpar Quantidades Selecionadas',
                    icon: 'fa fa-eraser',
                    onClick() {
                        let LimparQuantidades;

                        LimparQuantidades = function () {

                            if (produtoSelecionado === undefined || produtoSelecionado.length == 0) {
                                new PNotify({
                                    title: 'Atenção!',
                                    text: ' Nenhum produto foi selecionado, para concluir a operação selecione ao menos um produto!',
                                    type: 'alert',
                                    width: "30%"
                                });
                            } else {

                                produtoSelecionado = produtoSelecionado.filter(item => item.Lg_Processado != "Sim").map((x) => x.Nr_Sequencia_Produto);

                                if (produtoSelecionado.length > 0) {

                                    new Promise(function (resolve, reject) {

                                        $.ajax({
                                            type: 'POST',
                                            url: "/Estoque/DeletaQuantidadeProdutoAjusteEstoque",
                                            data: { cdProcesso: numeroProcesso, produtos: produtoSelecionado },
                                            success: function (response) {
                                                resolve(response);

                                            },
                                            error: function (x) {

                                                reject();
                                            }
                                        });

                                    }).then(function (response) {
                                        CarregaProdutosAdicionados(numeroProcesso);
                                        gridProdutosMovimentacao.selectRows("value", false);

                                        if (response.Tipo == "Erro") {

                                            new PNotify({
                                                title: 'Ocorreu um erro ao Excluir a quantidade dos produtos selecionados!',
                                                text: response.Mensagem,
                                                type: 'error',
                                                width: "50%"
                                            });

                                        } else {

                                            new PNotify({
                                                title: 'Exclusão!',
                                                text: 'Quantidade dos produtos selecionados Excluídos!',
                                                type: 'success',
                                                width: "30%"
                                            });

                                        }

                                    });

                                } else {

                                    new PNotify({
                                        title: 'Atenção!',
                                        text: 'Produtos Processados não podem ser alterados!',
                                        type: 'alert',
                                        width: "30%"
                                    });

                                }

                            }
                        }

                        let dataSourceProcesso;

                        if (verificaClonar) {
                            dataSourceProcesso = dataSourcePendentes;
                            dataSourceProcesso = dataSourceProcesso.filter(obj => obj.Nr_Processo === numeroProcesso);

                        } else {

                            if (dataSourceGeral) {
                                dataSourceProcesso = geralSemFiltro;
                            } else {
                                dataSourceProcesso = pendenteSemFiltro;
                            }

                            dataSourceProcesso = dataSourceProcesso.filter(obj => obj.Nr_Processo === numeroProcesso);

                            if (dataSourceProcesso.length == 0) {
                                dataSourceProcesso = pendenteSemFiltro;
                                dataSourceProcesso = dataSourceProcesso.filter(obj => obj.Nr_Processo === numeroProcesso);
                            }
                        }

                        if (dataUsuarioLog.NR_NIVEL_ACESSO === 0 && collapseAjusteEstoque) {

                            let transf = false;
                            let invent = false;
                            let adcSub = false;

                            if (dataSourceProcesso[0].Cd_Tipo_Lancamento == 3) {
                                //TRANSFERÊNCIA
                                transf = true;

                            } else if (dataSourceProcesso[0].Cd_Tipo_Lancamento == 5 && dataSourceProcesso[0].Cd_Tipo_Operacao == 'SU') {
                                //INVENTÁRIO 5
                                invent = true;

                            } else {
                                //ADICIONAR E SUBTRAIR
                                adcSub = true;
                            }

                            if ($.trim(dataUsuarioLog.Cd_Login).toLowerCase() == $.trim(dataSourceProcesso[0].Cd_Login_Emissao).toLowerCase()) {
                                //CONCLUIR PROPRIO PROCESSO

                                if (transf && dataUsuarioLog.Lg_Inclui_Processo_Transferencia) {
                                    //PODE CONCLUIR TRANSFERENCIAS

                                    LimparQuantidades();


                                } else if (invent && dataUsuarioLog.Lg_Inclui_Processo_Inventario) {
                                    //PODE CONCLUIR INVENTARIO

                                    LimparQuantidades();

                                } else if (adcSub && dataUsuarioLog.Lg_Inclui_Processo_Adicionar_Subtrair) {
                                    //PODE CONCLUIR ADICIONAR/SUBTRAIR

                                    LimparQuantidades();

                                } else {

                                    PopupAcessoNegado();
                                }

                            } else {

                                //CONCLUIR PROCESSO OUTRO USUARIO
                                if (transf && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Transferencia && dataUsuarioLog.Lg_Inclui_Processo_Transferencia) {
                                    //PODE CONCLUIR TRANSFERENCIAS

                                    LimparQuantidades();

                                } else if (invent && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Inventario && dataUsuarioLog.Lg_Inclui_Processo_Inventario) {
                                    //PODE CONCLUIR INVENTARIO

                                    LimparQuantidades();

                                } else if (adcSub && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Adicionar_Subtrair && dataUsuarioLog.Lg_Inclui_Processo_Adicionar_Subtrair) {
                                    //PODE CONCLUIR ADICIONAR/SUBTRAIR

                                    LimparQuantidades();

                                } else {

                                    PopupAcessoNegado();
                                }

                            }

                        } else if (dataUsuarioLog.NR_NIVEL_ACESSO === 1) {

                            LimparQuantidades();

                        } else {
                            PopupAcessoNegado();
                        }
                    },
                },
            },
            {
                locateInMenu: 'always',
                widget: 'dxButton',
                options: {
                    text: 'Excluir Produtos Selecionados',
                    icon: 'close',
                    onClick() {

                        let FuncaoSalvarProdutos;

                        FuncaoSalvarProdutos = function () {

                            if (produtoSelecionado === undefined || produtoSelecionado.length == 0) {
                                new PNotify({
                                    title: 'Atenção!',
                                    text: ' Nenhum produto foi selecionado, para concluir a operação selecione ao menos um produto!',
                                    type: 'alert',
                                    width: "30%"
                                });
                            } else {
                                produtoSelecionado = produtoSelecionado.filter(item => item.Lg_Processado != "Sim").map((x) => x.Nr_Sequencia_Produto);

                                if (produtoSelecionado.length > 0) {
                                    ExcluirProdutos(numeroProcesso, produtoSelecionado);

                                } else {

                                    new PNotify({
                                        title: 'Atenção!',
                                        text: 'Produtos Processados não podem ser alterados!',
                                        type: 'alert',
                                        width: "30%"
                                    });
                                }

                            }

                        }

                        let dataSourceProcesso;

                        if (verificaClonar) {
                            dataSourceProcesso = dataSourcePendentes;
                            verificaClonar = false;
                            dataSourceProcesso = dataSourceProcesso.filter(obj => obj.Nr_Processo === numeroProcesso);

                        } else {

                            if (dataSourceGeral) {
                                dataSourceProcesso = geralSemFiltro;
                            } else {
                                dataSourceProcesso = pendenteSemFiltro;
                            }
                            dataSourceProcesso = dataSourceProcesso.filter(obj => obj.Nr_Processo === numeroProcesso);

                            if (dataSourceProcesso.length == 0) {
                                dataSourceProcesso = pendenteSemFiltro;
                                dataSourceProcesso = dataSourceProcesso.filter(obj => obj.Nr_Processo === numeroProcesso);
                            }
                        }

                        if (dataUsuarioLog.NR_NIVEL_ACESSO === 0 && collapseAjusteEstoque) {

                            let transf = false;
                            let invent = false;
                            let adcSub = false;

                            if (dataSourceProcesso[0].Cd_Tipo_Lancamento == 3) {
                                //TRANSFERÊNCIA
                                transf = true;

                            } else if (dataSourceProcesso[0].Cd_Tipo_Lancamento == 5 && dataSourceProcesso[0].Cd_Tipo_Operacao == 'SU') {
                                //INVENTÁRIO 5
                                invent = true;

                            } else {
                                //ADICIONAR E SUBTRAIR
                                adcSub = true;
                            }

                            if ($.trim(dataUsuarioLog.Cd_Login).toLowerCase() == $.trim(dataSourceProcesso[0].Cd_Login_Emissao).toLowerCase()) {
                                //CONCLUIR PROPRIO PROCESSO

                                if (transf && dataUsuarioLog.Lg_Inclui_Processo_Transferencia) {
                                    //PODE CONCLUIR TRANSFERENCIAS

                                    FuncaoSalvarProdutos();


                                } else if (invent && dataUsuarioLog.Lg_Inclui_Processo_Inventario) {
                                    //PODE CONCLUIR INVENTARIO

                                    FuncaoSalvarProdutos();

                                } else if (adcSub && dataUsuarioLog.Lg_Inclui_Processo_Adicionar_Subtrair) {
                                    //PODE CONCLUIR ADICIONAR/SUBTRAIR

                                    FuncaoSalvarProdutos();

                                } else {

                                    PopupAcessoNegado();
                                }

                            } else {

                                //CONCLUIR PROCESSO OUTRO USUARIO
                                if (transf && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Transferencia && dataUsuarioLog.Lg_Inclui_Processo_Transferencia) {
                                    //PODE CONCLUIR TRANSFERENCIAS

                                    FuncaoSalvarProdutos();

                                } else if (invent && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Inventario && dataUsuarioLog.Lg_Inclui_Processo_Inventario) {
                                    //PODE CONCLUIR INVENTARIO

                                    FuncaoSalvarProdutos();

                                } else if (adcSub && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Adicionar_Subtrair && dataUsuarioLog.Lg_Inclui_Processo_Adicionar_Subtrair) {
                                    //PODE CONCLUIR ADICIONAR/SUBTRAIR

                                    FuncaoSalvarProdutos();

                                } else {

                                    PopupAcessoNegado();
                                }

                            }
                        } else if (dataUsuarioLog.NR_NIVEL_ACESSO === 1) {

                            FuncaoSalvarProdutos();

                        } else {
                            PopupAcessoNegado();
                        }

                    },
                },
            },
        ],
    });

    nbxDiasFiltroGrid = $('#nbx_Dias_Filtro_Grid').dxNumberBox({
        value: 30,
        format: '###,### dias',
        showClearButton: true,
        showSpinButtons: true,
        readOnly: false,
        step: 10,
        labelMode: 'floating',
        label: 'Registros dos últimos',
        buttons: [{
            name: 'OK',
            location: 'after',
            options: {
                text: 'Aplicar',
                stylingMode: 'text',
                width: 60,
                elementAttr: {
                    class: 'botao-aplicar-number-box',
                },
                onClick(e) {
                    CarregaProcessosAjusteEstoqueGeral(prod, nbxDiasFiltroGrid.option('value'))
                },
            },
        }, 'clear', 'spins'],

    }).dxNumberBox('instance');

    //PRODUTOS FILTRO GRID GERAL
    lkpProdutosFiltroGrid = $('#lkp_Produtos_Filtro_Grid').dxLookup({
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Produtos',
        },
        labelMode: 'floating',
        label: 'Pesquisar transferências que contenham um produto específico (esta opção não considera o filtro por período)',
        placeholder: 'Pesquisar transferências que contenham um produto específico',
        showClearButton: true,
        
        onInitialized: function (e) {
            e.component.option("onItemClick", function (e) {

                nrDias = null;
                CarregaProcessosAjusteEstoqueGeral(lkpProdutosFiltroGrid.option('value'), nrDias)
            });
        }
    }).dxLookup('instance');

    // PRODUTOS FILTRO PENDENTES 
    lkpProdutosFiltroGridPendentes = $('#lkp_Produtos_Filtro_Grid_Pendentes').dxLookup({
        dropDownOptions: {
            closeOnOutsideClick: true,
            showTitle: false,
            title: 'Produtos',
        },
        labelMode: 'floating',
        label: 'Pesquisar transferências que contenham um produto específico',
        placeholder: 'Pesquisar transferências que contenham um produto específico',
        showClearButton: true,
        onValueChanged(e) {

            CarregaConsultaPendentes(e.value);

        },
        
    }).dxLookup('instance');

    $(function () {
        $("#gridConsultaGeralLegenda").dxDataGrid({
            dataSource: dataSourceConsultaGeralLegenda,
            wordWrapEnabled: false,
            showColumnHeaders: false,
            showRowLines: false,
            showColumnLines: false,
            rowAlternationEnabled: false,
            searchPanel: {
                visible: false,
            },
            allowColumnResizing: false,
            allowColumnReordering: false,
            groupPanel: { visible: false },
            pager: {
                visible: false,
                showPageSizeSelector: false,
                showNavigationButtons: false
            },
            cellHintEnabled: true,
            keyExpr: 'DS_FL',
            columns: [
                {
                    dataField: "DS_STATUS_1",
                    caption: "",
                    width: 25,
                    allowEditing: false,
                    allowSorting: false,
                    alignment: 'center',
                    allowHeaderFiltering: false,
                }, {
                    dataField: "DS_LEGENDA_1",
                    caption: "",
                    width: 92,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                },
                {
                    dataField: "DS_STATUS_2",
                    caption: "",
                    width: 25,
                    allowEditing: false,
                    allowSorting: false,
                    alignment: 'center',
                    allowHeaderFiltering: false,
                },
                {
                    dataField: "DS_LEGENDA_2",
                    caption: "",
                    width: 68,
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                },
                {
                    dataField: "DS_STATUS_3",
                    caption: "",
                    width: 25,
                    allowEditing: false,
                    allowSorting: false,
                    alignment: 'center',
                    allowHeaderFiltering: false,
                },
                {
                    dataField: "DS_LEGENDA_3",
                    caption: "",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                },


            ],
            showBorders: false,

            onCellPrepared: function (e) {
                if (e.rowType === "data") {
                    if (e.column.dataField === "DS_STATUS_1") {
                        e.cellElement.css("background-color", e.data.DS_COLOR_STATUS_1),
                            e.cellElement.css("color", 'white')
                    };
                    if (e.column.dataField === "DS_STATUS_2") {
                        e.cellElement.css("background-color", e.data.DS_COLOR_STATUS_2),
                            e.cellElement.css("color", 'white')
                    };
                    if (e.column.dataField === "DS_STATUS_3") {
                        e.cellElement.css("background-color", e.data.DS_COLOR_STATUS_3),
                            e.cellElement.css("color", 'white')
                    };
                    if (e.column.dataField === "DS_STATUS_4") {
                        e.cellElement.css("background-color", e.data.DS_COLOR_STATUS_4),
                            e.cellElement.css("color", 'white')
                    };
                    if (e.column.dataField === "DS_STATUS_5") {
                        e.cellElement.css("background-color", e.data.DS_COLOR_STATUS_5),
                            e.cellElement.css("color", 'white')
                    };
                    if (e.column.dataField === "DS_STATUS_6") {
                        e.cellElement.css("background-color", e.data.DS_COLOR_STATUS_6),
                            e.cellElement.css("color", 'white')
                    };
                }
            },
        });
    });

    //GRID CONSULTA GERAL
    gridConsultaGeral = $("#gridConsultaGeral").dxDataGrid({
        hoverStateEnabled: true,
        showBorders: true,
        showRowLines: true,
        rowAlternationEnabled: true,
        wordWrapEnabled: true,
        searchPanel: {
            visible: true,
            highlightCaseSensitive: false,
            highlightSearchText: true,
            placeholder: "Procurar...",
        },
        sorting: { mode: "multiple" },
        selection: {
            mode: 'multiple',
            showCheckBoxesMode: 'always',
        },
        allowColumnResizing: true,
        columnResizingMode: "widget",
        allowColumnReordering: true,
        groupPanel: { visible: true, emptyPanelText: "Agrupar" },
        paging: { pageSize: 10 },
        pager: {
            visible: true,
            allowedPageSizes: [10, 15, 20, 50, 100],
            showPageSizeSelector: true,
            showNavigationButtons: true
        },
        export: {
            enabled: true,
            allowExportSelectedData: false
        },
        onExporting: function (e) {
            var workbook = new ExcelJS.Workbook();
            var worksheet = workbook.addWorksheet('Processos');

            DevExpress.excelExporter.exportDataGrid({
                component: e.component,
                worksheet: worksheet,
                autoFilterEnabled: true
            }).then(function () {
                workbook.xlsx.writeBuffer().then(function (buffer) {
                    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Processos_Ajuste_Estoque.xlsx');
                });
            });
            e.cancel = true;
        },
        filterRow: { visible: true, applyFilter: "auto" },
        headerFilter: {
            visible: true,
            allowSearch: true
        },
        filterPanel: { visible: true },
        columnChooser: { enabled: true, allowSearch: true, width: 300, height: 500 },
        columnsAutoWidth: true,
        focusedRowEnabled: true,
        keyExpr: 'Nr_Processo',
        columns: [
            {
                type: "selection",
                width: 30,
            },
            {
                dataField: "Nr_Processo",
                caption: "Processo",
                width: 70,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: false,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "DS_COLUMN_STATUS",
                caption: "",
                width: 7,
                allowEditing: false,
                allowSorting: false,
                alignment: 'center',
                allowHeaderFiltering: false,
                allowFiltering: false,
            },
            {
                dataField: "Cd_Situacao_Processo",
                caption: "Código Situação",
                width: 80,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: false,
                cssClass: "column-data-grid",

            },
            {
                dataField: "Ds_Situacao_Transferencia",
                caption: "Situação",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                alignment: 'center',
                cssClass: "column-data-grid",

            },
            {
                dataField: "Cd_Tipo_Lancamento",
                caption: "Código Transação",
                width: 80,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: false,
                cssClass: "column-data-grid",
            },
            {
                dataField: "Ds_Tipo_Lancamento",
                caption: "Transação",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "Cd_Tipo_Operacao",
                caption: "Código Operação",
                width: 80,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: false,
                cssClass: "column-data-grid",
            },
            {
                dataField: "Ds_Tipo_Operacao",
                caption: "Operação",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "Cd_Almoxarifado_Origem",
                caption: "Almox. Origem",
                width: 80,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                alignment: 'center',
                cssClass: "column-data-grid",

            },
            {
                dataField: "Cd_Almoxarifado_Destino",
                caption: "Almox. Destino",
                width: 80,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                alignment: 'center',
                cssClass: "column-data-grid",

            },
            {
                dataField: "Dt_Emissao",
                caption: "Dt. Emissão",
                dataType: "date",
                format: "dd/MM/yyyy",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "Dt_Conclusao",
                caption: "Dt. Conclusão",
                dataType: "date",
                format: "dd/MM/yyyy",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "Qt_Produtos",
                caption: "Qtde. Produtos",
                format: "###,###,###",
                width: 75,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: false,
                visible: true,
                alignment: 'center',
                cssClass: "column-data-grid",

            },
            {
                dataField: "Cd_Login_Cancelamento",
                caption: "Login Cancelamento",
                width: 95,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: false,
                alignment: 'center',
                cssClass: "column-data-grid",

            },
            {
                dataField: "Dt_Cancelamento",
                caption: "Dt. Cancelamento",
                dataType: "date",
                format: "dd/MM/yyyy",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: false,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "Ds_Motivo_Cancelamento",
                caption: "Motivo do Cancelamento",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: false,
                cssClass: "column-data-grid",

            },
            {
                dataField: "Ds_Historico",
                caption: "Histórico",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: false,
                cssClass: "column-data-grid",

            },
            {
                dataField: "GRP_EMISSOR",
                caption: "EMISSÃO",
                alignment: 'center',
                cssClass: "column-data-grid",
                columns: [
                    {
                        dataField: "Ds_Foto_Usuario_Emissao",
                        caption: "Foto",
                        width: 50,
                        height: 50,
                        allowEditing: false,
                        allowSorting: false,
                        allowHeaderFiltering: false,
                        allowFiltering: false,
                        alignment: "center",
                        cellTemplate: function (e, x) {

                            e.append(`<figure class="image rounded mb-0">
                                          <img src="${x.data.Ds_Foto_Usuario_Emissao}?${new Date()}" style="width: 40px; height: 40px;" class="rounded-circle">
                                      </figure>`);

                        },
                    },
                    {
                        dataField: "Cd_Login_Emissao",
                        caption: "Usuário",
                        width: 80,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",

                    },
                ],
            },
            {
                dataField: "GRP_CONCLUSAO",
                caption: "CONCLUSÃO",
                alignment: 'center',
                cssClass: "column-data-grid",
                columns: [
                    {
                        dataField: "Ds_Foto_Usuario_Conclusao",
                        caption: "Foto",
                        width: 50,
                        height: 50,
                        allowEditing: false,
                        allowSorting: false,
                        allowHeaderFiltering: false,
                        allowFiltering: false,
                        alignment: "center",
                        cellTemplate: function (e, x) {

                            if (x.data.Ds_Foto_Usuario_Conclusao) {
                                e.append(`<figure class="image rounded mb-0">
                                          <img src="${x.data.Ds_Foto_Usuario_Conclusao}?${new Date()}" style="width: 40px; height: 40px;" class="rounded-circle">
                                      </figure>`);
                            } else {
                                e.append(`<figure class="image rounded mb-0">
                                          <img src="${'/img/fotos-usuarios/sem-foto-pesquisa.jpg'}?${new Date()}" style="width: 40px; height: 40px;" class="rounded-circle">
                                      </figure>`);
                            }


                        },
                    },
                    {
                        dataField: "Cd_Login_Conclusao",
                        caption: "Usuário",
                        width: 80,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",

                    },
                ],
            },
        ],
        summary: {
            totalItems: [{
                column: 'Nr_Processo',
                summaryType: 'count',
                displayFormat: "{0} proc.",
            },],
        },
        showBorders: true,
        onCellDblClick: function (e) {
            //****CONSULTA GERAL****//////
            /*loaPanel.show();*/

            if (e.rowType === "data" && e.column.type !== "adaptive") {

                numeroProcesso = e.data.Nr_Processo;
                almoxarifadoOr = e.data.Cd_Almoxarifado_Origem;
                almoxarifadoDe = e.data.Cd_Almoxarifado_Destino;
                almox = e.data.Cd_Almoxarifado_Origem;
                txt_Historico_Alteracao.option('value', e.data.Ds_Historico);

                CarregaProdutosAdicionados(numeroProcesso);

                if (e.data.Cd_Situacao_Processo == 1) {

                    ProcessoEmElaboracao(false);
                    verificaClonar = false;
                    //ProcessoConcluido(); //TESTE
                    if (e.data.Cd_Tipo_Lancamento == 3) {
                        CarregaProdutosTranferencia(almoxarifadoOr, almoxarifadoDe);
                    }
                    else {
                        CarregaProdutosMovimentacao(almox);
                    }
                }

                if (e.data.Cd_Situacao_Processo == 2) {
                    ProcessoConcluido();
                    //ProcessoEmElaboracao(); //TESTE
                    /*loaPanel.show();*/
                }

                if (e.data.Cd_Situacao_Processo == 3) {
                    ProcessoCancelado();
                    /*loaPanel.show();*/
                }

                if (e.data.Cd_Tipo_Lancamento == 3) {

                    tipoTransacao = true;
                    /*CarregaProdutosTranferencia(almoxarifadoOr, almoxarifadoDe);*/

                    $("#txtAlDestino").text(`Almoxarifado ${e.data.Cd_Almoxarifado_Destino}`);

                    ExibirEsconderPaineis('txtAlmoxDestino', 'block');

                    $("#txtTitulo").text(`Transferência Expressa (${e.data.Ds_Tipo_Operacao})`);

                } else {

                    ExibirEsconderPaineis('txtAlmoxDestino', 'none');

                    tipoTransacao = false;
                    /*CarregaProdutosMovimentacao(almox);*/
                    if (e.data.Cd_Tipo_Operacao == 'SU') {
                        $("#txtTitulo").text(`Inventário Expresso (${e.data.Ds_Tipo_Operacao})`);
                    }

                    if (e.data.Cd_Tipo_Operacao == 'AS') { $("#txtTitulo").text(`Adicionar ou Subtrair (${e.data.Ds_Tipo_Operacao})`) };
                }

                $("#txtAlmoOrigem").text(`Almoxarifado ${e.data.Cd_Almoxarifado_Origem}`);
                $("#txtNrProcesso").text(`# ${e.data.Nr_Processo}`);
                $("#txtDtProcesso").text(new Date(Date.parse(e.data.Dt_Emissao)).toLocaleDateString("pt-BR"));

                ExibirEsconderPaineis('labelProcesso', 'block');

                iniciaMovimentacao();

            }
        },
        onCellPrepared: function (e) {
            if (e.rowType === "data") {
                if (e.column.dataField === "DS_COLUMN_STATUS") {
                    e.cellElement.css("background-color", e.data.Ds_Color_Status);

                }
            };
            if (e.rowType === "group") {
                e.cellElement.css("color", "#f05b41");
                e.cellElement.css("background-color", "white");
            };
            if (e.rowType === "header") {
                if (e.column.dataField === "GRP_EMISSOR" || e.column.dataField === "GRP_CONCLUSAO") {
                    e.cellElement.css("color", "#f05b41");
                    e.cellElement.css("font-weight", "bold");
                    e.cellElement.css("background-color", "#f8f9fa");

                }
            }
        },
        onSelectionChanged(selectedItems) {

            dataItensGeralSelec = selectedItems.selectedRowsData;

        },
        stateStoring: AutoLoad('gridConsultaGeral', false),
        onToolbarPreparing: AutoResetState([]),

    }).dxDataGrid('instance');

    $(function () {
        $("#gridConsultaPendentesLegenda").dxDataGrid({
            dataSource: dataSourceConsultaGeralLegenda,
            wordWrapEnabled: false,
            showColumnHeaders: false,
            showRowLines: false,
            showColumnLines: false,
            rowAlternationEnabled: false,
            searchPanel: {
                visible: false,
            },
            allowColumnResizing: false,
            allowColumnReordering: false,
            groupPanel: { visible: false },
            pager: {
                visible: false,
                showPageSizeSelector: false,
                showNavigationButtons: false
            },
            cellHintEnabled: true,
            keyExpr: 'DS_FL',
            columns: [
                {
                    dataField: "DS_STATUS_1",
                    caption: "",
                    width: 25,
                    allowEditing: false,
                    allowSorting: false,
                    alignment: 'center',
                    allowHeaderFiltering: false,
                },
                {
                    dataField: "DS_LEGENDA_1",
                    caption: "",
                    allowEditing: false,
                    allowSorting: true,
                    allowHeaderFiltering: false,
                },

            ],
            showBorders: false,

            onCellPrepared: function (e) {
                if (e.rowType === "data") {
                    if (e.column.dataField === "DS_STATUS_1") {
                        e.cellElement.css("background-color", e.data.DS_COLOR_STATUS_1),
                            e.cellElement.css("color", 'white')
                    };
                    if (e.column.dataField === "DS_STATUS_2") {
                        e.cellElement.css("background-color", e.data.DS_COLOR_STATUS_2),
                            e.cellElement.css("color", 'white')
                    };
                    if (e.column.dataField === "DS_STATUS_3") {
                        e.cellElement.css("background-color", e.data.DS_COLOR_STATUS_3),
                            e.cellElement.css("color", 'white')
                    };
                    if (e.column.dataField === "DS_STATUS_4") {
                        e.cellElement.css("background-color", e.data.DS_COLOR_STATUS_4),
                            e.cellElement.css("color", 'white')
                    };
                    if (e.column.dataField === "DS_STATUS_5") {
                        e.cellElement.css("background-color", e.data.DS_COLOR_STATUS_5),
                            e.cellElement.css("color", 'white')
                    };
                    if (e.column.dataField === "DS_STATUS_6") {
                        e.cellElement.css("background-color", e.data.DS_COLOR_STATUS_6),
                            e.cellElement.css("color", 'white')
                    };
                }
            },

        });
    });

    //GRID CONSULTAS PENDENTES
    gridConsultaPendentes = $("#gridConsultaPendentes").dxDataGrid({
        filterValue: [['Cd_Situacao_Processo', '=', 1], "or", ['Cd_Situacao_Processo', '=', 5]],
        hoverStateEnabled: true,
        showBorders: true,
        showRowLines: true,
        rowAlternationEnabled: true,
        wordWrapEnabled: true,
        searchPanel: {
            visible: true,
            highlightCaseSensitive: false,
            highlightSearchText: true,
            placeholder: "Procurar...",
        },
        sorting: { mode: "multiple" },
        selection: {
            mode: 'multiple',
            showCheckBoxesMode: 'always',
        },
        allowColumnResizing: true,
        columnResizingMode: "widget",
        allowColumnReordering: true,
        groupPanel: { visible: true, emptyPanelText: "Agrupar" },
        paging: { pageSize: 10 },
        pager: {
            visible: true,
            allowedPageSizes: [10, 15, 20, 50, 100],
            showPageSizeSelector: true,
            showNavigationButtons: true
        },
        export: {
            enabled: true,
            allowExportSelectedData: false
        },
        onExporting: function (e) {
            var workbook = new ExcelJS.Workbook();
            var worksheet = workbook.addWorksheet('Processos');

            DevExpress.excelExporter.exportDataGrid({
                component: e.component,
                worksheet: worksheet,
                autoFilterEnabled: true
            }).then(function () {
                workbook.xlsx.writeBuffer().then(function (buffer) {
                    saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Processos_Ajuste_Estoque.xlsx');
                });
            });
            e.cancel = true;
        },
        filterRow: { visible: true, applyFilter: "auto" },
        headerFilter: {
            visible: true,
            allowSearch: true
        },
        filterPanel: { visible: true },
        columnChooser: { enabled: true, allowSearch: true, width: 300, height: 500 },
        columnsAutoWidth: true,
        focusedRowEnabled: true,
        keyExpr: 'Nr_Processo',
        columns: [
            {
                type: "selection",
                width: 30,
            },
            {
                dataField: "Nr_Processo",
                caption: "Processo",
                width: 70,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: false,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "DS_COLUMN_STATUS",
                caption: "",
                width: 7,
                allowEditing: false,
                allowSorting: false,
                alignment: 'center',
                allowHeaderFiltering: false,
                allowFiltering: false,
            },
            {
                dataField: "Cd_Situacao_Processo",
                caption: "Código Situação",
                width: 80,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: false,
                cssClass: "column-data-grid",

            },
            {
                dataField: "Ds_Situacao_Transferencia",
                caption: "Situação",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                alignment: 'center',
                cssClass: "column-data-grid",

            },
            {
                dataField: "Cd_Tipo_Lancamento",
                caption: "Código Transação",
                width: 80,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: false,
                cssClass: "column-data-grid",
            },
            {
                dataField: "Ds_Tipo_Lancamento",
                caption: "Transação",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "Cd_Tipo_Operacao",
                caption: "Código Operação",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: false,
                cssClass: "column-data-grid",
            },
            {
                dataField: "Ds_Tipo_Operacao",
                caption: "Operação",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "Cd_Almoxarifado_Origem",
                caption: "Almox. Origem",
                width: 80,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                alignment: 'center',
                cssClass: "column-data-grid",

            },
            {
                dataField: "Cd_Almoxarifado_Destino",
                caption: "Almox. Destino",
                width: 80,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                alignment: 'center',
                cssClass: "column-data-grid",

            },
            {
                dataField: "Dt_Emissao",
                caption: "Dt. Emissão",
                dataType: "date",
                format: "dd/MM/yyyy",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                alignment: 'center',
                cssClass: "column-data-grid",
            },
            {
                dataField: "Qt_Produtos",
                caption: "Qtde. Produtos",
                format: "###,###,###",
                width: 70,
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: false,
                visible: true,
                alignment: 'center',
                cssClass: "column-data-grid",

            },
            {
                dataField: "Ds_Historico",
                caption: "Histórico",
                allowEditing: false,
                allowSorting: true,
                allowHeaderFiltering: true,
                visible: true,
                cssClass: "column-data-grid",

            },
            {
                dataField: "GRP_EMISSOR",
                caption: "EMISSÃO",
                alignment: 'center',
                cssClass: "column-data-grid",
                columns: [
                    {
                        dataField: "Ds_Foto_Usuario_Emissao",
                        caption: "Foto",
                        width: 50,
                        height: 50,
                        allowEditing: false,
                        allowSorting: false,
                        allowHeaderFiltering: false,
                        allowFiltering: false,
                        alignment: "center",
                        cellTemplate: function (e, x) {

                            e.append(`<figure class="image rounded mb-0">
                                          <img src="${x.data.Ds_Foto_Usuario_Emissao}?${new Date()}" style="width: 40px; height: 40px;" class="rounded-circle">
                                      </figure>`);

                        },
                    },
                    {
                        dataField: "Cd_Login_Emissao",
                        caption: "Usuário",
                        width: 80,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        visible: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",

                    },
                ],
            },
        ],
        summary: {
            totalItems: [{
                column: 'Nr_Processo',
                summaryType: 'count',
                displayFormat: "{0} proc.",
            },],
        },
        showBorders: true,
        onCellPrepared: function (e) {
            if (e.rowType === "data") {
                if (e.column.dataField === "DS_COLUMN_STATUS") {
                    e.cellElement.css("background-color", e.data.Ds_Color_Status);
                }
            };
            if (e.rowType === "group") {
                e.cellElement.css("color", "#f05b41");
                e.cellElement.css("background-color", "white");
            };
            if (e.rowType === "header") {
                if (e.column.dataField === "GRP_EMISSOR") {
                    e.cellElement.css("color", "#f05b41");
                    e.cellElement.css("font-weight", "bold");
                    e.cellElement.css("background-color", "#f8f9fa");

                }
            }
        },
        onCellDblClick: function (e) {

            //****CONSULTA PENDENTES****//

            /*loaPanel.show();*/

            if (e.rowType === "data" && e.column.type !== "adaptive") {
                numeroProcesso = e.data.Nr_Processo;
                almoxarifadoOr = e.data.Cd_Almoxarifado_Origem;
                almoxarifadoDe = e.data.Cd_Almoxarifado_Destino;
                almox = e.data.Cd_Almoxarifado_Origem;

                CarregaProdutosAdicionados(numeroProcesso);

                txt_Historico_Alteracao.option('value', e.data.Ds_Historico);

                if (e.data.Cd_Situacao_Processo == 1) {
                    ProcessoEmElaboracao(false);
                    verificaClonar = false;
                }

                if (e.data.Cd_Tipo_Lancamento == 3) {

                    CarregaProdutosTranferencia(almoxarifadoOr, almoxarifadoDe);
                    tipoTransacao = true;

                    $("#txtAlDestino").text(`Almoxarifado ${e.data.Cd_Almoxarifado_Destino}`);

                    ExibirEsconderPaineis('txtAlmoxDestino', 'block');

                    $("#txtTitulo").text(`Transferência Expressa (${e.data.Ds_Tipo_Operacao})`);

                } else {

                    ExibirEsconderPaineis('txtAlmoxDestino', 'none');
                    tipoTransacao = false;
                    CarregaProdutosMovimentacao(almox);
                    if (e.data.Cd_Tipo_Operacao == 'SU') {
                        $("#txtTitulo").text(`Inventário Expresso (${e.data.Ds_Tipo_Operacao})`);
                    }

                    if (e.data.Cd_Tipo_Operacao == 'AS') { $("#txtTitulo").text(`Adicionar ou Subtrair (${e.data.Ds_Tipo_Operacao})`) };
                }

                $("#txtAlmoOrigem").text(`Almoxarifado ${e.data.Cd_Almoxarifado_Origem}`);
                $("#txtNrProcesso").text(`# ${e.data.Nr_Processo}`);
                $("#txtDtProcesso").text(new Date(Date.parse(e.data.Dt_Emissao)).toLocaleDateString("pt-BR"));

                ExibirEsconderPaineis('labelProcesso', 'block');

                iniciaMovimentacao();

            }

            var columns = gridProdutosMovimentacao.option("columns");

            let dataSourceProcesso = dataSourcePendentes;

            dataSourceProcesso = dataSourceProcesso.filter(obj => obj.Nr_Processo === numeroProcesso);

            if (dataUsuarioLog.NR_NIVEL_ACESSO === 0 && collapseAjusteEstoque) {

                let transf = false;
                let invent = false;
                let adcSub = false;

                if (dataSourceProcesso[0].Cd_Tipo_Lancamento == 3) {
                    //TRANSFERÊNCIA
                    transf = true;

                } else if (dataSourceProcesso[0].Cd_Tipo_Lancamento == 5 && dataSourceProcesso[0].Cd_Tipo_Operacao == 'SU') {
                    //INVENTÁRIO 5
                    invent = true;

                } else {
                    //ADICIONAR E SUBTRAIR
                    adcSub = true;
                }

                if ($.trim(dataUsuarioLog.Cd_Login).toLowerCase() == $.trim(dataSourceProcesso[0].Cd_Login_Emissao).toLowerCase()) {
                    //CONCLUIR PROPRIO PROCESSO

                    if (transf && dataUsuarioLog.Lg_Inclui_Processo_Transferencia) {
                        //PODE CONCLUIR TRANSFERENCIAS

                        gridProdutosMovimentacao.option('editing.allowUpdating', true)

                        columns.forEach(function (column, index) {
                            if (column.type === "buttons" || column.type === "selection") {

                                gridProdutosMovimentacao.columnOption(index, "visible", true);
                            }
                        });

                        ExibirEsconderPaineis('gridBoxProdutos', 'block');
                        ExibirEsconderPaineis('txtCampoAbaixo', 'block');


                    } else if (invent && dataUsuarioLog.Lg_Inclui_Processo_Inventario) {
                        //PODE CONCLUIR INVENTARIO
                        gridProdutosMovimentacao.option('editing.allowUpdating', true)

                        columns.forEach(function (column, index) {
                            if (column.type === "buttons" || column.type === "selection") {

                                gridProdutosMovimentacao.columnOption(index, "visible", true);
                            }
                        });

                        ExibirEsconderPaineis('gridBoxProdutos', 'block');
                        ExibirEsconderPaineis('txtCampoAbaixo', 'block');

                    } else if (adcSub && dataUsuarioLog.Lg_Inclui_Processo_Adicionar_Subtrair) {
                        //PODE CONCLUIR ADICIONAR/SUBTRAIR
                        gridProdutosMovimentacao.option('editing.allowUpdating', true)

                        columns.forEach(function (column, index) {
                            if (column.type === "buttons" || column.type === "selection") {

                                gridProdutosMovimentacao.columnOption(index, "visible", true);
                            }
                        });

                        ExibirEsconderPaineis('gridBoxProdutos', 'block');
                        ExibirEsconderPaineis('txtCampoAbaixo', 'block');


                    } else {

                        gridProdutosMovimentacao.option('editing.allowUpdating', false)

                        columns.forEach(function (column, index) {
                            if (column.type === "buttons" || column.type === "selection") {

                                gridProdutosMovimentacao.columnOption(index, "visible", false);
                            }
                        });

                        ExibirEsconderPaineis('gridBoxProdutos', 'none');
                        ExibirEsconderPaineis('txtCampoAbaixo', 'none');
                    }

                } else {

                    //CONCLUIR PROCESSO OUTRO USUARIO
                    if (transf && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Transferencia && dataUsuarioLog.Lg_Inclui_Processo_Transferencia) {
                        //PODE CONCLUIR TRANSFERENCIAS
                        gridProdutosMovimentacao.option('editing.allowUpdating', true)

                        columns.forEach(function (column, index) {
                            if (column.type === "buttons" || column.type === "selection") {

                                gridProdutosMovimentacao.columnOption(index, "visible", true);
                            }
                        });

                        ExibirEsconderPaineis('gridBoxProdutos', 'block');
                        ExibirEsconderPaineis('txtCampoAbaixo', 'block');


                    } else if (invent && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Inventario && dataUsuarioLog.Lg_Inclui_Processo_Inventario) {
                        //PODE CONCLUIR INVENTARIO
                        gridProdutosMovimentacao.option('editing.allowUpdating', true)

                        columns.forEach(function (column, index) {
                            if (column.type === "buttons" || column.type === "selection") {

                                gridProdutosMovimentacao.columnOption(index, "visible", true);
                            }
                        });

                        ExibirEsconderPaineis('gridBoxProdutos', 'block');
                        ExibirEsconderPaineis('txtCampoAbaixo', 'block');


                    } else if (adcSub && dataUsuarioLog.Lg_Movimenta_Processos_Outros_Usuarios_Adicionar_Subtrair && dataUsuarioLog.Lg_Inclui_Processo_Adicionar_Subtrair) {
                        //PODE CONCLUIR ADICIONAR/SUBTRAIR
                        gridProdutosMovimentacao.option('editing.allowUpdating', true)

                        columns.forEach(function (column, index) {
                            if (column.type === "buttons" || column.type === "selection") {

                                gridProdutosMovimentacao.columnOption(index, "visible", true);
                            }
                        });

                        ExibirEsconderPaineis('gridBoxProdutos', 'block');
                        ExibirEsconderPaineis('txtCampoAbaixo', 'block');


                    } else {

                        gridProdutosMovimentacao.option('editing.allowUpdating', false)

                        columns.forEach(function (column, index) {
                            if (column.type === "buttons" || column.type === "selection") {

                                gridProdutosMovimentacao.columnOption(index, "visible", false);
                            }
                        });

                        ExibirEsconderPaineis('gridBoxProdutos', 'none');
                        ExibirEsconderPaineis('txtCampoAbaixo', 'none');

                    }

                }
            } else if (dataUsuarioLog.NR_NIVEL_ACESSO === 1) {

                gridProdutosMovimentacao.option('editing.allowUpdating', true)

                columns.forEach(function (column, index) {
                    if (column.type === "buttons" || column.type === "selection") {

                        gridProdutosMovimentacao.columnOption(index, "visible", true);
                    }
                });

                ExibirEsconderPaineis('gridBoxProdutos', 'block');
                ExibirEsconderPaineis('txtCampoAbaixo', 'block');

            } else {

                gridProdutosMovimentacao.option('editing.allowUpdating', false)

                columns.forEach(function (column, index) {
                    if (column.type === "buttons" || column.type === "selection") {

                        gridProdutosMovimentacao.columnOption(index, "visible", false);
                    }
                });

                ExibirEsconderPaineis('gridBoxProdutos', 'none');
                ExibirEsconderPaineis('txtCampoAbaixo', 'none');
            }

        },
        onSelectionChanged(selectedItems) {

            dataItensPendenteSelec = selectedItems.selectedRowsData;

        },
        stateStoring: AutoLoad('gridConsultaPendentes', false),
        onToolbarPreparing: AutoResetState([]),

    }).dxDataGrid('instance');

    justificativaCancelamento = $('#txt_Justificativa_Cancelamento').dxTextArea({
        labelMode: 'floating',
        label: 'Justificativa de Cancelamento *',
        height: 150,
        maxLength: 5000,
    }).dxTextArea('instance');

    abaterQuantidadePendenteEntrega = $('#chk_Abater_Quantidade_Pendente_Entrega').dxCheckBox({
        onInitialized: function (e) {
            e.component.option("onContentReady", function (e) {
                e.component.$element().on("click", function () {

                    if (abaterQuantidadePendenteEntrega.option('value') !== entrega) {

                        SalvarParansFilial(abaterQuantidadePendenteEntrega.option('value'), abaterQuantidadePendenteRetiraFutura.option('value'));

                    }
                });
            });
        },
        text: "Abater o saldo a entregar da quantidade contada do produto"
    }).dxCheckBox('instance');

    abaterQuantidadePendenteRetiraFutura = $('#chk_Abater_Quantidade_Pendente_Retira_Futura').dxCheckBox({

        onInitialized: function (e) {
            e.component.option("onContentReady", function (e) {
                e.component.$element().on("click", function () {

                    if (abaterQuantidadePendenteRetiraFutura.option('value') !== retiraFutura) {

                        SalvarParansFilial(abaterQuantidadePendenteEntrega.option('value'), abaterQuantidadePendenteRetiraFutura.option('value'));
                    }
                });
            });
        },
        text: "Abater o saldo de retira futura da quantidade contada do produto",
    }).dxCheckBox('instance');

    adicionarSubtrairConsultar = $('#chk_Adicionar_Subtrair_Consultar').dxCheckBox({
        value: false,
        text: "Consultar processos",
        onInitialized: function (e) {
            e.component.option("onContentReady", function (e) {
                e.component.$element().on("click", function () {

                    function alteraCheckBoxAdicionar(adicionarSubtrairOpcoes) {
                        if (adicionarSubtrairConsultar.option('value') !== dataPermissoesUsuario[0].Lg_Consulta_Processo_Adicionar_Subtrair) {
                            if (!adicionarSubtrairConsultar.option('value')) {
                                adicionarSubtrairOpcoes.forEach(opcao => {
                                    opcao.option('value', false);
                                });

                            }
                            AlteraPermissoesUsuarioAjusteEstoque(loginPremissoes);
                        }
                    }

                    const adicionarSubtrairOpcoes = [adicionarSubtrairConcluir, adicionarSubtrairExcluir, adicionarSubtrairClonar,
                        adicionarSubtrairConsultarProcessoOutroUsuario, adicionarSubtrairAplicarPermissoesProcessoOutroUsuario];

                    alteraCheckBoxAdicionar(adicionarSubtrairOpcoes);

                });
            });
        },
    }).dxCheckBox('instance');

    adicionarSubtrairCriar = $('#chk_Adicionar_Subtrair_Criar').dxCheckBox({

        text: "Criar novos processos",
        onInitialized: function (e) {
            e.component.option("onContentReady", function (e) {
                e.component.$element().on("click", function () {

                    if (adicionarSubtrairCriar.option('value') !== dataPermissoesUsuario[0].Lg_Inclui_Processo_Adicionar_Subtrair) {

                        AlteraPermissoesUsuarioAjusteEstoque(loginPremissoes);
                    }
                });
            });
        },
    }).dxCheckBox('instance');

    adicionarSubtrairConcluir = $('#chk_Adicionar_Subtrair_Concluir').dxCheckBox({
        text: "Concluir processos em elaboração",
        onInitialized: function (e) {
            e.component.option("onContentReady", function (e) {
                e.component.$element().on("click", function () {

                    if (adicionarSubtrairConcluir.option('value') !== dataPermissoesUsuario[0].Lg_Conclui_Processo_Adicionar_Subtrair) {


                        if (adicionarSubtrairConcluir.option('value') && !adicionarSubtrairConsultar.option('value')) {
                            adicionarSubtrairConsultar.option('value', true)
                        }

                        AlteraPermissoesUsuarioAjusteEstoque(loginPremissoes);
                    }
                });
            });
        },
    }).dxCheckBox('instance');

    adicionarSubtrairExcluir = $('#chk_Adicionar_Subtrair_Excluir').dxCheckBox({
        text: "Cancelar processos",
        onInitialized: function (e) {
            e.component.option("onContentReady", function (e) {
                e.component.$element().on("click", function () {

                    if (adicionarSubtrairExcluir.option('value') !== dataPermissoesUsuario[0].Lg_Exclui_Processo_Adicionar_Subtrair) {

                        if (adicionarSubtrairExcluir.option('value') && !adicionarSubtrairConsultar.option('value')) {
                            adicionarSubtrairConsultar.option('value', true)
                        }

                        AlteraPermissoesUsuarioAjusteEstoque(loginPremissoes);
                    }
                });
            });
        },
    }).dxCheckBox('instance');

    adicionarSubtrairClonar = $('#chk_Adicionar_Subtrair_Clonar').dxCheckBox({
        text: "Clonar processos",
        onInitialized: function (e) {
            e.component.option("onContentReady", function (e) {
                e.component.$element().on("click", function () {

                    if (adicionarSubtrairClonar.option('value') !== dataPermissoesUsuario[0].Lg_Clona_Processo_Adicionar_Subtrair) {

                        if (adicionarSubtrairClonar.option('value') && !adicionarSubtrairConsultar.option('value')) {
                            adicionarSubtrairConsultar.option('value', true)
                        }

                        AlteraPermissoesUsuarioAjusteEstoque(loginPremissoes);
                    }
                });
            });
        },
    }).dxCheckBox('instance');

    adicionarSubtrairConsultarProcessoOutroUsuario = $('#chk_Adicionar_Subtrair_Consultar_Processo_Outro_Usuario').dxCheckBox({
        text: "Permite consultar processos criados por outros usuários",
        onInitialized: function (e) {
            e.component.option("onContentReady", function (e) {
                e.component.$element().on("click", function () {

                    if (adicionarSubtrairConsultarProcessoOutroUsuario.option('value') !== dataPermissoesUsuario[0].Lg_Consulta_Processos_Outros_Usuarios_Adicionar_Subtrair) {

                        if (!adicionarSubtrairConsultarProcessoOutroUsuario.option('value')) {
                            adicionarSubtrairAplicarPermissoesProcessoOutroUsuario.option('value', false);
                        } else {
                            adicionarSubtrairConsultar.option('value', true)
                        }
                        AlteraPermissoesUsuarioAjusteEstoque(loginPremissoes);
                    }
                });
            });
        },
    }).dxCheckBox('instance');

    adicionarSubtrairAplicarPermissoesProcessoOutroUsuario = $('#chk_Adicionar_Subtrair_Aplicar_Permissoes_Processo_Outro_Usuario').dxCheckBox({
        text: "Permite aplicar suas permissões de movimentação em processos criados por outros usuários",
        onInitialized: function (e) {
            e.component.option("onContentReady", function (e) {
                e.component.$element().on("click", function () {

                    if (adicionarSubtrairAplicarPermissoesProcessoOutroUsuario.option('value') !== dataPermissoesUsuario[0].Lg_Movimenta_Processos_Outros_Usuarios_Adicionar_Subtrair) {

                        if (adicionarSubtrairAplicarPermissoesProcessoOutroUsuario.option('value') && !adicionarSubtrairConsultarProcessoOutroUsuario.option('value')) {
                            adicionarSubtrairConsultarProcessoOutroUsuario.option('value', true);
                            if (!adicionarSubtrairConsultar.option('value')) {
                                adicionarSubtrairConsultar.option('value', true);
                            }
                        }
                        AlteraPermissoesUsuarioAjusteEstoque(loginPremissoes);
                    }
                });
            });
        },
    }).dxCheckBox('instance');


    inventarioConsultar = $('#chk_Inventario_Consultar').dxCheckBox({
        text: "Consultar processos",
        onInitialized: function (e) {
            e.component.option("onContentReady", function (e) {
                e.component.$element().on("click", function () {

                    function alteraCheckBoxInventario(inventarioOpcoes) {
                        if (inventarioConsultar.option('value') !== dataPermissoesUsuario[0].Lg_Consulta_Processo_Inventario) {
                            if (!inventarioConsultar.option('value')) {
                                inventarioOpcoes.forEach(opcao => {
                                    opcao.option('value', false);
                                });

                            }
                            AlteraPermissoesUsuarioAjusteEstoque(loginPremissoes);
                        }
                    }

                    const inventarioOpcoes = [inventarioConcluir, inventarioExcluir, inventarioClonar,
                        inventarioConsultarProcessoOutroUsuario, inventarioAplicarPermissoesProcessoOutroUsuario];

                    alteraCheckBoxInventario(inventarioOpcoes);


                });
            });
        },
    }).dxCheckBox('instance');

    inventarioCriar = $('#chk_Inventario_Criar').dxCheckBox({
        text: "Criar novos processos",
        onInitialized: function (e) {
            e.component.option("onContentReady", function (e) {
                e.component.$element().on("click", function () {

                    if (inventarioCriar.option('value') !== dataPermissoesUsuario[0].Lg_Inclui_Processo_Inventario) {

                        AlteraPermissoesUsuarioAjusteEstoque(loginPremissoes);
                    }
                });
            });
        },
    }).dxCheckBox('instance');

    inventarioConcluir = $('#chk_Inventario_Concluir').dxCheckBox({
        text: "Concluir processos em elaboração",
        onInitialized: function (e) {
            e.component.option("onContentReady", function (e) {
                e.component.$element().on("click", function () {

                    if (inventarioConcluir.option('value') !== dataPermissoesUsuario[0].Lg_Conclui_Processo_Inventario) {

                        if (inventarioConcluir.option('value') && !inventarioConsultar.option('value')) {
                            inventarioConsultar.option('value', true)
                        }

                        AlteraPermissoesUsuarioAjusteEstoque(loginPremissoes);
                    }
                });
            });
        },
    }).dxCheckBox('instance');

    inventarioExcluir = $('#chk_Inventario_Excluir').dxCheckBox({
        text: "Cancelar processos",
        onInitialized: function (e) {
            e.component.option("onContentReady", function (e) {
                e.component.$element().on("click", function () {

                    if (inventarioExcluir.option('value') !== dataPermissoesUsuario[0].Lg_Exclui_Processo_Inventario) {

                        if (inventarioExcluir.option('value') && !inventarioConsultar.option('value')) {
                            inventarioConsultar.option('value', true)
                        }

                        AlteraPermissoesUsuarioAjusteEstoque(loginPremissoes);
                    }
                });
            });
        },
    }).dxCheckBox('instance');

    inventarioClonar = $('#chk_Inventario_Clonar').dxCheckBox({
        text: "Clonar processos",
        onInitialized: function (e) {
            e.component.option("onContentReady", function (e) {
                e.component.$element().on("click", function () {

                    if (inventarioClonar.option('value') !== dataPermissoesUsuario[0].Lg_Clona_Processo_Inventario) {

                        if (inventarioClonar.option('value') && !inventarioConsultar.option('value')) {
                            inventarioConsultar.option('value', true)
                        }

                        AlteraPermissoesUsuarioAjusteEstoque(loginPremissoes);
                    }
                });
            });
        },
    }).dxCheckBox('instance');

    inventarioConsultarProcessoOutroUsuario = $('#chk_Inventario_Consultar_Processo_Outro_Usuario').dxCheckBox({
        text: "Permite consultar processos criados por outros usuários",
        onInitialized: function (e) {
            e.component.option("onContentReady", function (e) {
                e.component.$element().on("click", function () {

                    if (inventarioConsultarProcessoOutroUsuario.option('value') !== dataPermissoesUsuario[0].Lg_Consulta_Processos_Outros_Usuarios_Inventario) {

                        if (!inventarioConsultarProcessoOutroUsuario.option('value')) {
                            inventarioAplicarPermissoesProcessoOutroUsuario.option('value', false);
                        } else {
                            inventarioConsultar.option('value', true)
                        }

                        AlteraPermissoesUsuarioAjusteEstoque(loginPremissoes);
                    }

                });
            });
        },
    }).dxCheckBox('instance');

    inventarioAplicarPermissoesProcessoOutroUsuario = $('#chk_Inventario_Aplicar_Permissoes_Processo_Outro_Usuario').dxCheckBox({
        text: "Permite aplicar suas permissões de movimentação em processos criados por outros usuários",
        onInitialized: function (e) {
            e.component.option("onContentReady", function (e) {
                e.component.$element().on("click", function () {

                    if (inventarioAplicarPermissoesProcessoOutroUsuario.option('value') !== dataPermissoesUsuario[0].Lg_Movimenta_Processos_Outros_Usuarios_Inventario) {

                        if (inventarioAplicarPermissoesProcessoOutroUsuario.option('value') && !inventarioConsultarProcessoOutroUsuario.option('value')) {
                            inventarioConsultarProcessoOutroUsuario.option('value', true);
                            if (!inventarioConsultar.option('value')) {
                                inventarioConsultar.option('value', true);
                            }
                        }

                        AlteraPermissoesUsuarioAjusteEstoque(loginPremissoes);
                    }

                });
            });
        },
    }).dxCheckBox('instance');


    transferenciaConsultar = $('#chk_Transferencia_Consultar').dxCheckBox({
        text: "Consultar processos",
        onInitialized: function (e) {
            e.component.option("onContentReady", function (e) {
                e.component.$element().on("click", function () {

                    function alteraCheckBoxTransferencia(transferenciaOpcoes) {
                        if (transferenciaConsultar.option('value') !== dataPermissoesUsuario[0].Lg_Consulta_Processo_Transferencia) {
                            if (!transferenciaConsultar.option('value')) {
                                transferenciaOpcoes.forEach(opcao => {
                                    opcao.option('value', false);
                                });

                            }
                            AlteraPermissoesUsuarioAjusteEstoque(loginPremissoes);
                        }
                    }

                    const transferenciaOpcoes = [transferenciaConcluir, transferenciaExcluir, transferenciaClonar,
                        transferenciaConsultarProcessoOutroUsuario, transferenciaAplicarPermissoesProcessoOutroUsuario];

                    alteraCheckBoxTransferencia(transferenciaOpcoes);

                });
            });
        },
    }).dxCheckBox('instance');

    transferenciaCriar = $('#chk_Transferencia_Criar').dxCheckBox({
        text: "Criar novos processos",
        onInitialized: function (e) {
            e.component.option("onContentReady", function (e) {
                e.component.$element().on("click", function () {

                    if (transferenciaCriar.option('value') !== dataPermissoesUsuario[0].Lg_Inclui_Processo_Transferencia) {

                        AlteraPermissoesUsuarioAjusteEstoque(loginPremissoes);
                    }
                });
            });
        },
    }).dxCheckBox('instance');

    transferenciaConcluir = $('#chk_Transferencia_Concluir').dxCheckBox({
        text: "Concluir processos em elaboração",
        onInitialized: function (e) {
            e.component.option("onContentReady", function (e) {
                e.component.$element().on("click", function () {

                    if (transferenciaConcluir.option('value') !== dataPermissoesUsuario[0].Lg_Conclui_Processo_Transferencia) {

                        if (transferenciaConcluir.option('value') && !transferenciaConsultar.option('value')) {
                            transferenciaConsultar.option('value', true)
                        }

                        AlteraPermissoesUsuarioAjusteEstoque(loginPremissoes);
                    }
                });
            });
        },
    }).dxCheckBox('instance');

    transferenciaExcluir = $('#chk_Transferencia_Excluir').dxCheckBox({
        text: "Cancelar processos",
        onInitialized: function (e) {
            e.component.option("onContentReady", function (e) {
                e.component.$element().on("click", function () {

                    if (transferenciaExcluir.option('value') !== dataPermissoesUsuario[0].Lg_Exclui_Processo_Transferencia) {

                        if (transferenciaExcluir.option('value') && !transferenciaConsultar.option('value')) {
                            transferenciaConsultar.option('value', true)
                        }

                        AlteraPermissoesUsuarioAjusteEstoque(loginPremissoes);
                    }
                });
            });
        },
    }).dxCheckBox('instance');

    transferenciaClonar = $('#chk_Transferencia_Clonar').dxCheckBox({
        text: "Clonar processos",
        onInitialized: function (e) {
            e.component.option("onContentReady", function (e) {
                e.component.$element().on("click", function () {

                    if (transferenciaClonar.option('value') !== dataPermissoesUsuario[0].Lg_Clona_Processo_Transferencia) {

                        if (transferenciaClonar.option('value') && !transferenciaConsultar.option('value')) {
                            transferenciaConsultar.option('value', true)
                        }

                        AlteraPermissoesUsuarioAjusteEstoque(loginPremissoes);
                    }
                });
            });
        },
    }).dxCheckBox('instance');

    transferenciaConsultarProcessoOutroUsuario = $('#chk_Transferencia_Consultar_Processo_Outro_Usuario').dxCheckBox({
        text: "Permite consultar processos criados por outros usuários",
        onInitialized: function (e) {
            e.component.option("onContentReady", function (e) {
                e.component.$element().on("click", function () {

                    if (transferenciaConsultarProcessoOutroUsuario.option('value') !== dataPermissoesUsuario[0].Lg_Consulta_Processos_Outros_Usuarios_Transferencia) {

                        if (!transferenciaConsultarProcessoOutroUsuario.option('value')) {
                            transferenciaAplicarPermissoesProcessoOutroUsuario.option('value', false);
                        } else {
                            transferenciaConsultar.option('value', true)
                        }

                        AlteraPermissoesUsuarioAjusteEstoque(loginPremissoes);

                    }

                });
            });
        },
    }).dxCheckBox('instance');

    transferenciaAplicarPermissoesProcessoOutroUsuario = $('#chk_Transferencia_Aplicar_Permissoes_Processo_Outro_Usuario').dxCheckBox({
        text: "Permite aplicar suas permissões de movimentação em processos criados por outros usuários",
        onInitialized: function (e) {
            e.component.option("onContentReady", function (e) {
                e.component.$element().on("click", function () {

                    if (transferenciaAplicarPermissoesProcessoOutroUsuario.option('value') !== dataPermissoesUsuario[0].Lg_Movimenta_Processos_Outros_Usuarios_Transferencia) {

                        if (transferenciaAplicarPermissoesProcessoOutroUsuario.option('value') && !transferenciaConsultarProcessoOutroUsuario.option('value')) {
                            transferenciaConsultarProcessoOutroUsuario.option('value', true);
                            if (!transferenciaConsultar.option('value')) {
                                transferenciaConsultar.option('value', true);
                            }
                        }

                        AlteraPermissoesUsuarioAjusteEstoque(loginPremissoes);
                    }

                });
            });
        },
    }).dxCheckBox('instance');

});
//FIM DO CARREGAMENTO TELA



