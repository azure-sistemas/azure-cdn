var COMPONENTES = [];
var acesso = 'True';
const dxComp = {};

function loadLookupPaginate() {
    dxComp.lkpContainerPaginate = new DevExpress.ui.dxLookup('#lkpContainerPaginate', {
        dataSource: createCustomDataSourcePaginate({
            key: 'Id',
            endpoint: '/clientesTeste',
            namePropResult: 'DataResult',
        }),
        displayExpr: 'Display',
        searchExpr: ['Id', 'Display'],
    })
}

let dataInicial = '2022-01-10 00:00:00';
let dataFinal = '2024-01-20 00:00:00';
function loadGridPaginate() {

    dxComp.gridContainerPaginate = new DevExpress.ui.dxDataGrid('#gridContainerPaginate', {
        remoteOperations: { groupPaging: true },
        dataSource: createCustomDataSourcePaginate({
            key: ['Nr_Lancamento', 'Nr_Parcela_Atual'],
            endpoint: '/financeiro/contasapagar/titulos',
            namePropResult: 'DataResult',
            optionsUser: () => {
                return {
                    dataInicial,
                    dataFinal
                }
            },
            callback: (e) => {
                console.log(e);
                return e;
            }
        }),
        rowAlternationEnabled: true,
        syncLookupFilterValues: false,
        groupPanel: {
            visible: true,
            emptyPanelText: "Agrupamento"
        },
        searchPanel: {
            visible: true,
            highlightCaseSensitive: false,
            highlightSearchText: true,
            placeholder: "Procurar...",
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
            enabled: true,
            allowSearch: true,
        },
    });

    dataInicial = '2024-01-10 00:00:00';
    dataFinal = '2024-01-20 00:00:00';

    //dxComp.gridContainerPaginate = new DevExpress.ui.dxDataGrid('#gridContainerPaginate', {
    //    remoteOperations: { groupPaging: true },
    //    dataSource: createCustomDataSourcePaginate({
    //        key: 'CD_PESQUISA',
    //        endpoint: '/formasPagamentoTeste',
    //        namePropResult: 'DataResult',
    //        optionsUser: {
    //            dataInicial: '2024-01-10 00:00:00',
    //            dataFinal: '2024-01-20 00:00:00',
    //        }
    //    }),
    //    rowAlternationEnabled: true,
    //    syncLookupFilterValues: false,
    //    groupPanel: {
    //        visible: true,
    //        emptyPanelText: "Agrupamento"
    //    },
    //    searchPanel: {
    //        visible: true,
    //        highlightCaseSensitive: false,
    //        highlightSearchText: true,
    //        placeholder: "Procurar...",
    //    },
    //    filterRow: {
    //        visible: true,
    //        applyFilter: "auto"
    //    },
    //    headerFilter: {
    //        visible: true,
    //        allowSearch: true
    //    },
    //    filterPanel: {
    //        visible: true
    //    },
    //    columnChooser: {
    //        enabled: true,
    //        allowSearch: true,
    //    },
    //});

}

function RemoveChars(str, charsToRemove = '(){}[]', unionChar = '_') {
    if (str.indexOf(' ') !== -1) {
        str = str.split(' ').join(unionChar);
    }

    for (let i = 0; i < charsToRemove.length; i++) {
        const charToRemove = charsToRemove.charAt(i);
        str = str.split(charToRemove).join('');
    }

    return str;
}

function LoadPontosCriticosx() {
    $.ajax({
        type: 'POST',
        url: "/GestaoEstrategica/GetFormulariosCalibracao2",
        success: function (data) {

            console.log('Start Object => ', data);

            var tree = [];

            var formularios = data["CD_Formulario_Parametro"];

            if (formularios !== "undefined") {

                //Inicializa objeto tree
                $.each(formularios, function (index_f, f) {

                    let mainTab = f.Ds_Formulario;

                    $.each(data["CD_Formulario_Parametro_Campo"].filter(x => x.Cd_Formulario == f.Cd_Formulario), function (index_c, c) {

                        let tab = c.Ds_Tab;
                        let campo = c.Ds_Campo;

                        if (tab != "" && tab != null && campo != "" && campo != null) {

                            let accordion = c.Ds_Acordion;

                            if (typeof tree[mainTab] === "undefined") {
                                tree[mainTab] = { mainTab: f, subTabs: [] };
                            }

                            if (typeof tree[mainTab].subTabs[tab] === "undefined") {
                                tree[mainTab].subTabs[tab] = [];
                            }

                            if (typeof tree[mainTab].subTabs[tab][accordion] === "undefined") {
                                tree[mainTab].subTabs[tab][accordion] = [];
                            }

                            tree[mainTab].subTabs[tab][accordion][`${c.Cd_Formulario}+${c.Ds_Tabela}+${campo}`] = c;
                        }
                    });

                });

                //console.log('tree', tree);
                //Percorre objeto tree para montar html
                for (t in tree) {

                    let mainTab = tree[t].mainTab;
                    let tabs = tree[t].subTabs;
                    let firstTab = true;

                    for (tab in tabs) {

                        let accordions = tabs[tab];
                        //console.log(t,' => ',tabs[tab]);
                        let count = 0;

                        let accordionHtml = '';

                        let firstField = null;

                        for (acc in accordions) {

                            let campos = [];
                            let fields = accordions[acc];

                            //Monta campos do accordion
                            for (f in fields) {

                                let field = fields[f];

                                if (firstField == null)
                                    firstField = field;

                                campos.push(`<div class="col-lg-${field.Qt_Colunas_Posicionamento} mb-3">
                                                         <div class="form-group">
                                                             <div class="row mb-0">
                                                                 <div class="col-lg-12 mb-1 mt-0">
                                                                     <h5 class="text-left mb-0 mt-0">${field.Ds_Label_Titulo == null ? '' : field.Ds_Label_Titulo}</h5>
                                                                 </div>
                                                             </div>
                                                             <div class="row mb-0">
                                                                 <div class="col-lg-12 mb-1 mt-0">
                                                                     <h5 class="text-left mb-0 mt-0">${field.Ds_Label == null ? '' : field.Ds_Label}</h5>
                                                                 </div>
                                                             </div>
                                                             <div id="${c}">${firstField.Ds_Componente}</div>
                                                         </div>
                                                     </div>`);

                            }

                            //console.log('campos', campos);

                            count++;

                            //TODO: FAZER FUNÇÂO QUE REMOVE TODOS CARACTRES
                            let idParent = `${mainTab.Cd_Formulario}_${RemoveChars(tab, '(){}[]', '_')}_${count}`;
                            let accName = `${mainTab.Cd_Formulario}_accordion_${RemoveChars(tab, '(){}[]', '_')}`;

                            //console.log('accName', accName);

                            //Monta accordion c/ os campos
                            accordionHtml =
                                `<div class="accordion" id="${accName}">
                                                <div class="card card-default">
                                                   <div class="card-header">
                                                       <h4 class="card-title m-0">
                                                           <a class="accordion-toggle collapsed" data-toggle="collapse" data-parent="#${accName}" href="#${idParent}" aria-expanded="false">
                                                               ${firstField.Ds_Acordion == null ? '' : firstField.Ds_Acordion}
                                                           </a>
                                                       </h4>
                                                   </div>

                                                   <div id="${idParent}" class="collapse">
                                                       <div class="card-body">
                                                           <div class="row mb-0">
                                                               <div class="col-lg-12 mb-0 mt-0">
                                                                  <h5 class="text-left mb-0 mt-0">${firstField.Ds_Acordion_Sub_Titulo == null ? '' : firstField.Ds_Acordion_Sub_Titulo}</h5>
                                                               </div>
                                                           </div>

                                                           <hr class="dotted short mb-3">

                                                           <div class="row">
                                                                   ${campos.join(" ")}
                                                           </div>

                                                           <hr class="dotted short mb-3">

                                                           <div class="row" style="display:block">
                                                               <div class="col-lg-12 text-right">
                                                                   <button type="button" class="btn btn-default"><i class="fa fa-refresh"></i>&nbsp;&nbsp;Restaurar Padrão</button>
                                                               </div>
                                                           </div>
                                                       </div>
                                                   </div>
                                                </div>
                                             </div>`;

                        }

                        let tabName = `${mainTab.Cd_Formulario}_${RemoveChars(tab, '(){}[]', '_')}`;

                        if (typeof mainTab.Html === "undefined") {
                            mainTab.Html = [];
                            mainTab.Html['navs'] = [];
                            mainTab.Html['contents'] = [];
                        }

                        //console.log(accordionHtml);

                        mainTab.Html['navs'].push(`<li class="nav-item">
                                                               <a class="nav-link${firstTab == true ? ' active' : ''}" href="#${tabName}" data-toggle="tab"><i class="fa ${firstField.Ds_Tab_Icone}"></i>&nbsp;&nbsp;${tab}</a>
                                                           </li>`);

                        mainTab.Html['contents'].push(`<div id="${tabName}" class="tab-pane${firstTab == true ? ' active' : ''}">${accordionHtml}</div>`);

                        firstTab = false;
                        //console.log(firstTab);
                    }
                }



                let tabs = [];
                tabs['navs'] = [];
                tabs['contents'] = [];
                tabs['first'] = true;

                for (t in tree) {
                    //console.log('tree', tree);
                    let formulario = tree[t].mainTab;

                    //console.log('tree[t]', tree[t]);

                    tabs['navs'].push(
                        `<li class="nav-item">
                                        <a id="tab${RemoveChars(formulario.Ds_Formulario)}" class="nav-link${tabs['first'] == true ? ' active' : ''}" href="#aba${RemoveChars(formulario.Ds_Formulario)}" data-toggle="tab" style="font-size: 12px${tabs['first'] == true ? '' : '; display: block'}"><i class="fa ${formulario.Ds_Formulario_Icone} mr-2"></i>${formulario.Ds_Formulario}</a>
                                     </li>`);

                    //console.log(formulario.Cd_Dependencia);

                    //${formulario.Cd_Dependencia == 'F' ? 'display:none': ''}
                    if (formulario.Cd_Dependencia == 'F') {
                        tabs['contents'].push(
                            `<div>
                                    <div class="alert alert-info nomargin mt-0 mb-2">
                                         <div class="row mt-0 mb-1">
                                             <div class="col-lg-12 mt-0 mb-0">
                                                <h6 class="mb-0 mt-0 ml-1"><b>INFORME UMA FILIAL PARA CONFIGURAÇÃO DOS PARÂMETROS</b></h6>
                                             </div>
                                         </div>
                                     <div class="row mt-0 mb-0">
                                         <div class="col-lg-12 mt-0 mb-0 text-left">
                                             <div id="trosso">
                                                admskadsasd
                                             </div>
                                         </div>
                                    </div>
                                 </div>
                                 <div>
                                        <div id="aba${RemoveChars(formulario.Ds_Formulario)}" class="tab-pane${tabs['first'] == true ? ' active' : ''}">
                                                    <ul class="nav nav-tabs">
                                                        ${formulario.Html['navs'].join('')}
                                                    </ul>
                                                    <div class="tab-content">
                                                        ${formulario.Html['contents'].join('')}
                                                    </div>
                                                 </div>
                                 </div>`);
                    }
                    else {

                        tabs['contents'].push(
                            `<div id="aba${RemoveChars(formulario.Ds_Formulario)}" class="tab-pane${tabs['first'] == true ? ' active' : ''}">
                                        <ul class="nav nav-tabs">
                                            ${formulario.Html['navs'].join('')}
                                        </ul>
                                        <div class="tab-content">
                                            ${formulario.Html['contents'].join('')}
                                        </div>
                                     </div>`);
                    }

                    tabs['first'] = false;
                    //`<ul class="nav nav-tabs">
                    //     </ul>
                    //     <div class="tab-content">
                    //     </div>`
                }

                $('#mainTab').empty();

                $('#mainTab').append(`<ul class="nav nav-tabs">
                                                     ${tabs['navs'].join('')}
                                                  </ul>
                                                  <div class="tab-content">
                                                     ${tabs['contents'].join('')}
                                                  </div>`);

            }
            else {
                //Reporta erro
            }
            //                componentes[`${comp.DS_TABELA}_${comp.DS_CAMPO}`] =
            //                {
            //                    TipoConteudo: comp.CD_TIPO,
            //                    Tipo: "NumberBox",
            //                    Comp: $(`#${comp.DS_TABELA}_${comp.DS_CAMPO}`).dxNumberBox({
            //                        value: tempVal == '' ? null : Number(tempVal.replace(',', '.')) / 100,
            //                        showSpinButtons: true,
            //                        format: comp.DS_MASCARA,
            //                        showClearButton: true,
            //                        disabled: acesso == 'True' ? false : true,
            //                        step: Number(comp.NR_INCREMENTO.replace(',', '.'))
            //                    }).dxNumberBox("instance")
            //                }
            //            }
            //            else {
            //                componentes[`${comp.DS_TABELA}_${comp.DS_CAMPO}`] =
            //                {
            //                    TipoConteudo: comp.CD_TIPO,
            //                    Tipo: "NumberBox",
            //                    Comp: $(`#${comp.DS_TABELA}_${comp.DS_CAMPO}`).dxNumberBox({
            //                        value: tempVal == '' ? null : Number(tempVal.replace(',', '.')),
            //                        showSpinButtons: true,
            //                        format: comp.DS_MASCARA,
            //                        showClearButton: true,
            //                        disabled: acesso == 'True' ? false : true,
            //                        step: Number(comp.NR_INCREMENTO.replace(',', '.'))
            //                    }).dxNumberBox("instance")
            //                }
            //            }
            //        }
            //        else if (comp.DS_COMPONENTE == "Lookup") {

            //            componentes[`${comp.DS_TABELA}_${comp.DS_CAMPO}`] =
            //            {
            //                TipoConteudo: comp.CD_TIPO,
            //                Tipo: "Lookup",
            //                Comp: $(`#${comp.DS_TABELA}_${comp.DS_CAMPO}`).dxLookup({
            //                    dropDownOptions: {
            //                        showTitle: false
            //                    },
            //                    dataSource: new DevExpress.data.DataSource({
            //                        store: JSON.parse(comp.DS_LISTA_VALORES),
            //                        key: "ID"
            //                    }),
            //                    disabled: acesso == 'True' ? false : true,
            //                    valueExpr: 'ID',
            //                    displayExpr: 'LABEL',
            //                    placeholder: comp.DS_PLACE_HOLDER,
            //                    title: comp.DS_COMPONENTE_TITULO,
            //                    searchEnabled: true,
            //                    showPopupTitle: true,
            //                    value: comp.VALOR
            //                }).dxLookup("instance")
            //            }
            //        }
            //        else if (comp.DS_COMPONENTE == "CheckBox") {

            //            componentes[`${comp.DS_TABELA}_${comp.DS_CAMPO}`] =
            //            {
            //                TipoConteudo: comp.CD_TIPO,
            //                Tipo: "CheckBox",
            //                Comp: $(`#${comp.DS_TABELA}_${comp.DS_CAMPO}`).dxCheckBox({
            //                    value: comp.VALOR,
            //                    disabled: acesso == 'True' ? false : true,
            //                    text: comp.DS_COMPONENTE_TITULO,
            //                }).dxCheckBox("instance")
            //            }
            //        }
            //    }
            //}
        }
    });
}


$(async () => {
    $('[href="#accordionFirst"]').click();
    loadLookupPaginate();
    loadGridPaginate();
    //await GetAzureDataSource(3, 4, ['{}',]).then((result) => {
    //    console.log(result.data);
    //});

    //await GetAzureDataSource(36).then((result) => {
    //    console.log(result.data);
    //});


    //const dataGrid = $('#gridContainer').dxDataGrid({
    //    dataSource: orders,
    //    keyExpr: 'ID',
    //    allowColumnReordering: true,
    //    allowColumnResizing: true,
    //    showBorders: true,
    //    selection: {
    //        mode: 'single',
    //    },
    //    filterRow: {
    //        visible: true,
    //    },
    //    groupPanel: {
    //        visible: true,
    //    },
    //    stateStoring: AutoLoad('gridContainer'),
    //    onToolbarPreparing: AutoResetState([]),
    //    pager: {
    //        showPageSizeSelector: true,
    //        allowedPageSizes: [5, 10, 20],
    //    },
    //    columns: [{
    //        dataField: 'OrderNumber',
    //        width: 130,
    //        caption: 'Invoice Number',
    //    },
    //    {
    //        dataField: 'OrderDate',
    //        dataType: 'date',
    //        sortOrder: 'desc',
    //    },
    //    {
    //        dataField: 'SaleAmount',
    //        alignment: 'right',
    //        format: 'currency',
    //    },
    //        'Employee', {
    //        caption: 'City',
    //        dataField: 'CustomerStoreCity',
    //    },
    //    {
    //        caption: 'State',
    //        dataField: 'CustomerStoreState',
    //        groupIndex: 0,
    //    }
    //    ],
    //}).dxDataGrid('instance');
    LoadPontosCriticosx();
});

function exibirPopupClose(id) {
    let $div = $(`<div id="${id}">`);
    $('.content-body').append($div);
    new DevExpress.ui.dxPopup($($div), {
        visible: true,
        width: "80vw",
        height: "30vh",
        position: { my: 'center', at: 'center', of: window },
        contentTemplate: () => {
            return ` <section class="card card-default">
                <header class="card-header mb-0">
                    <h2 class="card-title">Confirmação</h2>
                </header>
                <div class="card-body">

                    <div class="modal-wrapper">
                        <div class="modal-icon">
                            <i class="fa fa-question-circle"></i>
                        </div>
                        <div class="modal-text mb-3">
                            <h4>Deseja realmente fechar a tela de Transferência de Mercadorias</h4>
                            <h4>e voltar para o Painel Central?</h4>
                        </div>
                    </div>

                </div>
                <footer class="card-footer">
                    <div class="row">
                        <div class="col-lg-12 text-right">
                            <button type="button" class="btn btn-xs btn-primary" onclick="window.open('../Home/InicioRapido','_parent')">Sair</button>
                            <button type="button" class="btn btn-xs btn-danger" data-dismiss="modal">Abortar</button>
                        </div>
                    </div>
                </footer>
            </section>`
        },
    })
}