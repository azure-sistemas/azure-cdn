var acesso = 'True';

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

async function LoadPontosCriticosx() {
    $.ajax({
        type: 'POST',
        url: "/GestaoEstrategica/GetFormulariosCalibracao2",
        success: async function (data) {

            console.log('Start Object => ', data);

            var formularios = data["CD_Formulario_Parametro"];

            if (formularios !== "undefined") {

                var componenteObjectList = [];

                //TREE
                var tree = [];
                $.each(formularios, function (index_f, f) {

                    let mainTab = f.Ds_Formulario;
                    //console.log(mainTab);
                    $.each(data["CD_Formulario_Parametro_Campo"].filter(x => x.Cd_Formulario == f.Cd_Formulario), function (index_c, c) {
                        //console.log(c);
                        let tab = c.Ds_Tab;
                        let campo = c.Ds_Campo;

                        if (tab != "" && tab != null && campo != "" && campo != null) {

                            let accordion = c.Ds_Acordion;
                            //console.log(tab,'||' ,accordion);

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
                    //console.log(tree);

                });
                //TREE

                console.log('tree', tree);
                //Percorre objeto tree para montar html

                for (t in tree) {

                    let mainTab = tree[t].mainTab;
                    let internalTabs = tree[t].subTabs;
                    let firstTab = true;                    

                    for (tab in internalTabs) {
                        //console.log(tab);
                        let accordions = internalTabs[tab];
                        //console.log('accordions => ', accordions);
                        let count = 0;

                        let accordionHtml = '';

                        let firstField = null;

                        let camposV2 = [];

                        for (acc in accordions) {

                            if (typeof camposV2[acc] === "undefined") {
                                camposV2[acc] = [];
                            }

                            let campos = [];
                            let fields = accordions[acc];

                            //Monta campos do accordion
                            for (f in fields) {

                                let field = fields[f];

                                if (firstField == null)
                                    firstField = field;

                                let compIdName = `${field.Cd_Formulario}__${RemoveChars(field.Ds_Acordion, ' (){}[]', '_')}__${field.Ds_Componente}__${field.Ds_Campo}__${field.Ds_Tabela}`;

                                componenteObjectList.push({ Id: compIdName, Tipo: field.Ds_Componente, Info: field, Instancia: null, Grupo: RemoveChars(`${field.Cd_Formulario}__${field.Ds_Tab}__${field.Ds_Acordion}`, ' (){}[]', '_') });

                                //TODO: se for checkbox, textbox[se for floating] remover o Ds_Label
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
                                                     <div id="${compIdName}">${field.Ds_Componente}</div>
                                                 </div>
                                             </div>`); .0

                                camposV2[acc].push(`<div class="col-lg-${field.Qt_Colunas_Posicionamento} mb-3">
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
                                                            <div id="${compIdName}">${field.Ds_Componente}</div>
                                                        </div>
                                                    </div>`);

                            }
                            count++;

                            //TODO: FAZER FUNÇÂO QUE REMOVE TODOS CARACTRES
                            let idParent = `${mainTab.Cd_Formulario}_${RemoveChars(tab, '(){}[]', '_')}_${count}`;
                            let accName = `${mainTab.Cd_Formulario}_accordion_${RemoveChars(tab, '(){}[]', '_')}`;

                            //Monta accordion c/ os campos
                            accordionHtml += `<div class="accordion" id="${accName}">
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

                        //console.log(camposV2);

                        let tabName = `${mainTab.Cd_Formulario}_${RemoveChars(tab, '(){}[]', '_')}`;
                        console.log(tabName);

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
                    }
                }



                let tabs = [];
                tabs['navs'] = [];
                tabs['contents'] = [];
                tabs['first'] = true;

                for (t in tree) {

                    let formulario = tree[t].mainTab;

                    tabs['navs'].push(
                        `<li class="nav-item">
                            <a id="tab${RemoveChars(formulario.Ds_Formulario)}" class="nav-link${tabs['first'] == true ? ' active' : ''}" href="#aba${RemoveChars(formulario.Ds_Formulario)}" data-toggle="tab" style="font-size: 12px${tabs['first'] == true ? '' : ''}"><i class="fa ${formulario.Ds_Formulario_Icone} mr-2"></i>${formulario.Ds_Formulario}</a>
                         </li>`);
                    console.log('*****', formulario.Html['navs']);
                    if (formulario.Cd_Dependencia == 'F') {
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
                }

                $('#mainTab').empty();

                $('#mainTab').append(`<ul class="nav nav-tabs">
                                         ${tabs['navs'].join('')}
                                      </ul>
                                      <div class="tab-content">
                                         ${tabs['contents'].join('')}
                                      </div>`);

                //for (var i in componenteObjectList) {

                //    let c = componenteObjectList[i];

                //    let info = c.Info;

                //    let htmlComp = $(`#${c.Id}`);
                //    htmlComp.empty();

                //    switch (c.Tipo.toLowerCase()) {
                //        case 'checkbox':
                //            // console.log(c);
                //            c.Instancia = htmlComp.dxCheckBox({
                //                value: info.hasOwnProperty('Valor') ? info.Valor : false,
                //                //text: info.Ds_Label,
                //            }).dxCheckBox('instance');
                //            break;
                //        case 'textbox':
                //            //console.log(c);                            

                //            c.Instancia = htmlComp.dxTextBox({
                //                //labelMode: 'floating',
                //                //label: info.Ds_Label,
                //                //placeholder: info.Ds_Label,
                //                maxLength: info.Nr_Max_Length,
                //                readOnly: info.Lg_Ready_Only == null ? false : info.Lg_Ready_Only,
                //            }).dxTextBox('instance');

                //            break;

                //        case 'numberbox':
                //            //TODO: quando buscar do banco dividir por 100 e qunado salvar no banco multiplicar por 100
                //            // console.log(c);
                //            c.Instancia = htmlComp.dxNumberBox({
                //                value: info.hasOwnProperty('Valor') ? info.Valor : '',
                //                //format: 'R$ ###,###,###,##0.00',
                //                format: info.Ds_Mascara,
                //                min: info.Vl_Minimo,
                //                showClearButton: true,
                //                showSpinButtons: true,
                //                step: info.Nr_Incremento,
                //            }).dxNumberBox('instance');

                //            break;
                //        case 'treeview':
                //            console.log(c);
                //                    //console.log(ds);

                //            // console.log(ds);
                //            await GetAzureDataSource(info.Ds_Funcao_Pesquisa, info.Ds_Funcao_Pesquisa_Parametro).then((ds) => {
                //                console.log(htmlComp, ds);
                //                    c.Instancia = htmlComp.dxDropDownBox({
                //                        valueExpr: 'CD_PESQUISA',
                //                        displayExpr: 'DS_PESQUISA',
                //                        //placeholder: placeholder,
                //                        showClearButton: true,
                //                        labelMode: 'floating',
                //                        //label: label,
                //                        dataSource: ds,
                //                        contentTemplate(e) {
                //                            const value = e.component.option('value');
                //                            const $treeView = $('<div>').dxTreeView({
                //                                dataSource: response,
                //                                dataStructure: 'plain',
                //                                keyExpr: 'CD_PESQUISA',
                //                                parentIdExpr: 'CD_PESQUISA_PAI',
                //                                selectionMode: 'single',
                //                                displayExpr: 'DS_PESQUISA',
                //                                searchEnabled: true,
                //                                selectByClick: true,
                //                                onContentReady(args) {
                //                                    syncTreeViewSelection(args.component, value);
                //                                },
                //                                selectNodesRecursive: false,
                //                                onItemSelectionChanged(args) {
                //                                    const selectedKeys = args.component.getSelectedNodeKeys();
                //                                    e.component.option('value', selectedKeys);
                //                                },
                //                            });

                //                            treeView = $treeView.dxTreeView('instance');

                //                            e.component.on('valueChanged', (args) => {
                //                                syncTreeViewSelection(treeView, args.value);
                //                                e.component.close();
                //                            });

                //                            return $treeView;
                //                        },
                //                    }).dxDropDownBox("instance");
                //            });
                //            break;

                //        default:
                //            //var comp = $(id)
                //            //console.log(c);
                //            break;
                //    }
                //}
            }
            else {
                //Reporta erro
            }
        }
    });
}


$(() => {
    LoadPontosCriticosx();
});