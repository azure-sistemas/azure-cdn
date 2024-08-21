//#region [ Clone Functions MeuPerfil.cshtml ]

$(document).on('click', '.modal-dismiss', function (e) {
    e.preventDefault();
    $.magnificPopup.close();
});




function AlterarSenha(obj) {
    var actualPassword = $('#actualPassword').val();
    var newPassword = $('#newPassword').val();
    var newPasswordConfirm = $('#newPasswordConfirm').val();

    if (actualPassword.length == 0) {
        $('#msgAviso').html('Favor informar a senha atual.');
        $.magnificPopup.open({
            items: {
                src: '#modalHeaderColorWarning'
            },
            type: 'inline',
            modal: true,
        });
    }
    else if (newPassword != newPasswordConfirm) {
        $('#msgAviso').html('A nova senha e a confirmação estão divergentes.');
        $.magnificPopup.open({
            items: {
                src: '#modalHeaderColorWarning'
            },
            type: 'inline',
            modal: true,
        });
    }
    else if (newPassword.length > 0) {
        $.ajax({
            type: 'POST',
            url: "/Usuario/AlterarSenha",
            data: { senhaAtual: actualPassword, novaSenha: newPassword, novaSenhaConfirmacao: newPasswordConfirm },
            success: function (data) {
                var ret = data.split('|');
                switch (ret[0]) {
                    case 'W':
                        $('#msgAviso').html(ret[1]);
                        $.magnificPopup.open({
                            items: {
                                src: '#modalHeaderColorWarning'
                            },
                            type: 'inline',
                            modal: true,
                        });
                        break;
                    case 'I':
                        LimparSenha();
                        new PNotify({
                            title: 'Operação Realizada!',
                            text: ret[1],
                            type: 'success'
                        });
                        break;
                    case 'E':
                        $('#msgErro').html(ret[1]);
                        $.magnificPopup.open({
                            items: {
                                src: '#modalFullColorDanger'
                            },
                            type: 'inline',
                            modal: true,
                        });
                        break;
                }
            }
        });
    }

    return false;
}

function ApagarImagem() {
    //alert(new Date().getTime());
    $.ajax({
        type: 'POST',
        url: "/Usuario/DeleteImage",
        data: { data: $('#imagem').attr('src') },
        success: function (data) {
            //result = $"/img/sem-foto.jpg?{DateTime.Now.ToLongTimeString()}";
            ///img/userAzure2.png
            $('#imagem').attr('src', '/img/sem-foto.jpg?' + new Date().getTime());
            $('#imgUsuario').attr('src', '/img/userAzure2.png?' + new Date().getTime());
        }
    });
}

function LimparSenha() {
    $('.password').val('');
}

function ToggleDashboard(obj) {

    var check = $(obj).prop('checked');

    $.ajax({
        type: 'POST',
        url: "/Usuario/ToggleDashboard",
        data: { check: check },
        success: function (data) {

            if (data) {
                var txt = '';
                if (check) {
                    txt = "ativado";
                }
                else {
                    txt = "desativado";
                }
                //console.log('Dashboard ' + txt);

                new PNotify({
                    title: 'Operação Realizada!',
                    text: 'Dashboard ' + txt,
                    type: 'success'
                });
            }
            else {
                new PNotify({
                    title: 'Erro',
                    text: 'Erro ao atualizar Dashboard...',
                    type: 'error'
                });
            }
        }
    });
}

function ToggleSinalSonoro(obj) {

    var check = $(obj).prop('checked');

    $.ajax({
        type: 'POST',
        url: "/Usuario/ToggleSinalSonoro",
        data: { check: check },
        success: function (data) {

            if (data) {
                var txt = '';
                if (check) {
                    txt = "ativado";
                }
                else {
                    txt = "desativado";
                }
                //console.log('Dashboard ' + txt);

                new PNotify({
                    title: 'Operação Realizada!',
                    text: 'Sinal sonoro ' + txt,
                    type: 'success'
                });
            }
            else {
                new PNotify({
                    title: 'Erro',
                    text: 'Erro ao atualizar Sinal sonoro...',
                    type: 'error'
                });
            }
        }
    });
}

function ClearModal() {
    pc.clear();
    $('#fileUploader').attr('class', 'fileupload fileupload-new')
    $('.fileupload-preview').empty();
}

function CloseModalUploader() {
    ClearModal();
    $.magnificPopup.close({
        items: {
            src: '#modalForm'
        },
        type: 'inline',
        modal: true,
    });
}

function OpenModalUploader() {
    $.magnificPopup.open({
        items: {
            src: '#modalForm'
        },
        type: 'inline',
        modal: true,
    });
}

//#endregion

//#region [ Functions ]
var collapseGroup = [];

function ExtrairValorAgrupamento(texto) {
    return texto.slice(texto.indexOf('>') + 1, texto.indexOf('</div>'));
}

/*console.log(ExtrairValorAgrupamento("<div ordem=000 class='grupo-menu'>Favoritos</div>"));*/

setTimeout(function () {
    //console.log(collapseGroup);
}, 7000);

function onGroupRendered(e) {
    e.groupElement.click(function () {

        let key = `${e.groupData.items[0].DS_GRUPO_MENU}`;
        //let index = `${e.groupIndex}_${e.groupData.items[0].DS_AGRUPAMENTO}`;
        let index = `${e.groupData.items[0].DS_AGRUPAMENTO}`;
        if (!e.groupElement.hasClass("dx-list-group-collapsed")) {
            collapseGroup[key].push(index);
        } else {
            collapseGroup[key].splice(collapseGroup[key].indexOf(index), 1);
        }
        //console.log(collapseGroup);
    });
}

function LoadDashboardData() {

    $('.resultIndicadores').fadeOut('slow', function () {
        $('.loadingIndicadores').fadeIn();
    });

    if (administrador) {
        $('#saldoContas').fadeOut('slow');
    }

    let p1 = GetDashboardInformationV2()
    let p2 = GetIndicadorFinanceiroDoisPainelCentral()

    let promises = [p1, p2];

    p1.then(function (obj) {
        for (var i in obj) {
            switch (i) {
                case '1':
                    let rentaHoje = obj[i][0].PC_RENTABILIDADE_HOJE;

                    $('#rentaHoje').createWaterBall('updateRange2', rentaHoje, [1, 70, 100]);
                    $('#rentaHoje_val').text(`${rentaHoje.toFixed(2).replace('.', ',')} %`);

                    break;
                case '2':
                    let rentaMercadoHoje = obj[i][0].PC_RENTABILIDADE_MERCADO;
                    $('#rentaMercado').createWaterBall('updateRange2', rentaMercadoHoje, [1, 70, 100]);
                    $('#rentaMercado_val').text(`${rentaMercadoHoje.toFixed(2).replace('.', ',')} %`);
                    break;
                case '3':
                    $('#4').text(obj[i][0].VL_FATURAMENTO_HOJE.toLocaleString('pt-BR', { style: "currency", currency: "BRL", minimumFractionDigits: 0, maximumFractionDigits: 0, }));
                    break;
                case '4':
                    $('#5_Dia_Extenso').text(obj[i][0].DIA_SEMANA_EXTENSO);
                    $('#VL_FATURAMENTO_MEDIO_HISTORICO').text(obj[i][0].VL_FATURAMENTO_MEDIO_HISTORICO.toLocaleString('pt-BR', { style: "currency", currency: "BRL", minimumFractionDigits: 0, maximumFractionDigits: 0, }));
                    $('#VL_FATURAMENTO_PREVISTO_HOJE').text(obj[i][0].VL_FATURAMENTO_PREVISTO_HOJE.toLocaleString('pt-BR', { style: "currency", currency: "BRL", minimumFractionDigits: 0, maximumFractionDigits: 0, }));
                    obj[i][0].LG_DENTRO_DA_META_DIARIA == "True" ? $("#5").attr('class', 'card-body bg-tertiary') : $("#5").attr('class', 'card-body bg-secondary');
                    break;
                case '5':
                    $('#6').text(obj[i][0].VL_FATURAMENTO_CUMULADO_MES.toLocaleString('pt-BR', { style: "currency", currency: "BRL", minimumFractionDigits: 0, maximumFractionDigits: 0, }));
                    $('#6_1').text(obj[i][0].DS_MES_EXTENSO);
                    break;
                case '6':
                    $('#7_V_P').text(obj[i][0].VL_FATURAMENTO_PREVISTO_MES.toLocaleString('pt-BR', { style: "currency", currency: "BRL", minimumFractionDigits: 0, maximumFractionDigits: 0, }));
                    $('#7_V_M').text(obj[i][0].VL_FATURAMENTO_MEDIO_HISTORICO.toLocaleString('pt-BR', { style: "currency", currency: "BRL", minimumFractionDigits: 0, maximumFractionDigits: 0, }));
                    $('#7_M_M').text(obj[i][0].DS_MES_EXTENSO);
                    $('#7_M_M_1').text(`Previsão deste mês`);
                    obj[i][0].LG_DENTRO_DA_META_MENSAL === true ? $("#7_LG").attr('class', 'card-body bg-tertiary') : $("#7_LG").attr('class', 'card-body bg-secondary');
                    break;
                case '19':

                    $('#20_vlReceber').text(obj[i][0].VL_RECEBER_VENCENDO.toLocaleString('pt-BR', { style: "currency", currency: "BRL", minimumFractionDigits: 2, maximumFractionDigits: 2, }));
                    $('#20_vlPagar').text(obj[i][0].VL_PAGAR_VENCENDO.toLocaleString('pt-BR', { style: "currency", currency: "BRL", minimumFractionDigits: 2, maximumFractionDigits: 2, }));
                    break;
            }
        }

    });

    p2.then(function (dataSource) {

        if (dataSource.length > 0) {

            let indicador = dataSource[0];
            $('#val_indicador_receber').text(indicador.VL_RECEBER_EM_ATRASO.toLocaleString('pt-BR', { style: "currency", currency: "BRL", minimumFractionDigits: 0, maximumFractionDigits: 0, }));
            $('#val_indicador_pagar').text(indicador.VL_PAGAR_EM_ATRASO.toLocaleString('pt-BR', { style: "currency", currency: "BRL", minimumFractionDigits: 0, maximumFractionDigits: 0, }));

            $("#rel_receber").attr("onclick", `window.open('../relatorio/dinamico?id=${indicador.CD_RELATORIO_RECEBER}', '_blank')`);
            $("#rel_pagar").attr("onclick", `window.open('../relatorio/dinamico?id=${indicador.CD_RELATORIO_PAGAR}', '_blank')`);
        }
    });

    if (administrador) {
        let p3 = GetIndicadorFinanceiroUmPainelCentral();

        promises.push(p3);

        p3.then(function (dataSource) {

            var soma = dataSource.reduce(function (acumulador, obj) {
                return acumulador + obj.VL_SALDO;
            }, 0);

            $('#saldo').text(soma.toLocaleString('pt-BR', { style: "currency", currency: "BRL", minimumFractionDigits: 2, maximumFractionDigits: 2, }));

            $("#gridSaldosContas").dxDataGrid({
                dataSource: new DevExpress.data.DataSource({
                    store: dataSource,
                    key: 'DS_CHAVE',
                    //group: 'DS_MODULO',
                }),

                keyExpr: "DS_CONTA",
                //scrolling: { mode: 'virtual' },

                showBorders: true,
                showRowLines: false,

                hoverStateEnabled: true,
                showBorders: true,
                showRowLines: true,
                rowAlternationEnabled: true,
                wordWrapEnabled: true,
                columnHidingEnabled: true,
                columnsAutoWidth: false,
                allowColumnResizing: true,
                allowColumnReordering: true,
                stateStoring: AutoLoad('gridSaldosContas'),
                onToolbarPreparing: AutoResetState([]),
                searchPanel: {
                    visible: false,
                    highlightCaseSensitive: false,
                    highlightSearchText: true,
                    placeholder: "Procurar...",
                },
                groupPanel: {
                    visible: true,
                    emptyPanelText: "Agrupar"
                },
                export: {
                    enabled: true,
                    allowExportSelectedData: false
                },
                onExporting: function (e) {
                    var workbook = new ExcelJS.Workbook();
                    var worksheet = workbook.addWorksheet('Saldos');

                    DevExpress.excelExporter.exportDataGrid({
                        component: e.component,
                        worksheet: worksheet,
                        autoFilterEnabled: true
                    }).then(function () {
                        workbook.xlsx.writeBuffer().then(function (buffer) {
                            saveAs(new Blob([buffer], {
                                type: 'application/octet-stream'
                            }), 'Saldos_Contas.xlsx');
                        });
                    });
                    e.cancel = true;
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
                    enabled: false,
                    allowSearch: true,
                    //height: 350, 
                    //width: 300,
                },

                paging: {
                    pageSize: 15
                },
                pager: {
                    visible: false,
                    allowedPageSizes: [5, 15, 20, 50, 100],
                    showPageSizeSelector: true,
                    showNavigationButtons: true
                },

                columnsAutoWidth: true,

                columns: [
                    {
                        dataField: "DS_CONTA",
                        caption: "NOME",
                        width: 180,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: 'left',
                        cssClass: "column-data-grid",
                        allowGrouping: true,
                        priority: 0,
                        //allowHiding: false,
                    },
                    {
                        dataField: "VL_SALDO",
                        caption: "SALDO",
                        width: 90,
                        allowEditing: true,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        dataType: "number",
                        format: "###,###,###,##0.00",
                        alignment: 'right',
                        cssClass: "column-data-grid",
                        priority: 1,
                        //allowHiding: false,
                    },
                    {
                        dataField: "CD_BANCO",
                        caption: "BANCO",
                        //width: 80,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        allowGrouping: true,
                    },
                    {
                        dataField: "CD_AGENCIA",
                        caption: "AGÊNCIA",
                        //width: 80,
                        allowEditing: false,
                        allowSorting: false,
                        allowHeaderFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        allowGrouping: true,
                    },
                    {
                        dataField: "CD_CONTA_CORRENTE",
                        caption: "CONTA",
                        //width: 80,
                        allowEditing: false,
                        allowSorting: false,
                        allowHeaderFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        allowGrouping: true,
                    },
                ],

                summary: {
                    totalItems: [
                        {
                            column: 'VL_SALDO',
                            summaryType: 'sum',
                            valueFormat: "###,###,###,##0.00",
                            displayFormat: "{0}",
                        },
                    ],
                },
            });
        });
    }

    Promise.all(promises)
        .then(function (results) {
            //console.log(results);

            $('.loadingIndicadores').fadeOut('slow', function () {
                $('.resultIndicadores').fadeIn();
                if (administrador) {
                    $('#saldoContas').fadeIn();
                }
            });

        })
        .catch(function (error) {
            console.error('Erro ao aguardar as promessas:', error);
        });
}

function ajustaLayoutTabs() {
    if (window.innerWidth < 820) {
        $('#menuPrincipalTabs').removeClass('tabs-vertical');
        $('.abaHide').hide();
        if (administrador || dashboardAccess) {
            $('#navAbaDashboard').hide();
        }
        if (administrador || gerenciamentoAccess) {
            $('#navAbaGerenciamento').hide();
        }

    } else {
        $('#menuPrincipalTabs').addClass('tabs-vertical');
        $('.abaHide').show();
        if (administrador || dashboardAccess) {
            $('#navAbaDashboard').show();
        }
        if (administrador || gerenciamentoAccess) {
            $('#navAbaGerenciamento').show();
        }
    }

    if (window.innerWidth < 1082) {
        $('#cardQuadroAvisosAzure').hide();
    } else {
        if (currentStyle == 'P') {
            $('#cardQuadroAvisosAzure').show();
        } else {
            $('#cardQuadroAvisosAzure').hide();

        }
    }
}

function ajustaLayoutGrids() {

    let grid1 = $('#gridHistoricoImplementacoes').dxDataGrid("instance");
    grid1.collapseAll();
    grid1.expandAll();

    let grid2 = $('#gridSaldosContas');
    if (grid2.data("dxDataGrid") !== undefined) {

        grid2 = grid2.dxDataGrid("instance");
        grid2.collapseAll();
        grid2.expandAll();
    }
}

function ChangeStyle(tab) {
    currentStyle = tab;

    let menuP = $('#menuPrincipal');
    let menuI = $('#menuIndicadores');
    let indicadores = $('.indicadores');
    let novidades = $('.novidades');
    let quadro = $('#cardQuadroAvisosAzure');

    if (tab == 'F') {
        menuP.removeClass('col-lg-8');
        menuP.addClass('col-lg-12');
        menuI.removeClass('col-lg-4 pl-0 pr-3');
        menuI.addClass('col-lg-12');
        if (quadro.length) {
            quadro.hide();
        }

        if (administrador || dashboardAccess) {
            indicadores.hide();
        }

        novidades.hide();
    }
    else {
        menuP.removeClass('col-lg-12');
        menuP.addClass('col-lg-8');
        menuI.removeClass('col-lg-12');
        menuI.addClass('col-lg-4 pl-0 pr-3');
        if (quadro.length) {
            if (window.innerWidth < 1082) {
                quadro.hide();
            } else {
                quadro.show();
            }
        }
        if (administrador || dashboardAccess) {
            indicadores.show();
        }

        novidades.show();
    }

    //if (window.innerWidth < 1082) {
    //    quadro.hide();
    //} else {
    //    quadro.show();
    //}

    if (gallery != null) {
        gallery.repaint();
    }
}

//function GetItensFixadosBarra() {
//    return new Promise(function (resolve, reject) {
//        $.ajax({
//            type: 'POST',
//            url: "/Home/GetItensFixadosBarra",
//            success: function (dataSource) {
//                resolve(dataSource);
//            },
//            error: function (jqXHR, textStatus, errorThrown) {
//                reject({
//                    status: textStatus,
//                    error: errorThrown
//                });
//            },
//            //complete: function () {
//            // console.log('Requisição finalizada');
//            //}
//        });
//    });
//}

function GetDashboardInformationV2() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: 'POST',
            url: "/Home/GetDashboardInformationV2",
            success: function (dataSource) {
                resolve(dataSource);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                reject({
                    status: textStatus,
                    error: errorThrown
                });
            }
        });
    });
}

function GetEstruturaMenu() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: 'POST',
            url: "/Home/GetEstruturaMenu",
            success: function (dataSource) {
                resolve(dataSource);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                reject({
                    status: textStatus,
                    error: errorThrown
                });
            }
        });
    });
}

function GetNovasFuncionalidades() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: 'POST',
            url: "/Home/GetNovasFuncionalidades",
            success: function (dataSource) {
                resolve(dataSource);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                reject({
                    status: textStatus,
                    error: errorThrown
                });
            }
        });
    });
}

function GetImagesMenuCentral() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: 'POST',
            url: "/Home/GetImagesMenuCentral",
            success: function (dataSource) {
                resolve(dataSource);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                reject({
                    status: textStatus,
                    error: errorThrown
                });
            },
        });
    });
}

function GetIndicadorFinanceiroUmPainelCentral() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: 'POST',
            url: "/Home/GetIndicadorFinanceiroUmPainelCentral",
            success: function (dataSource) {
                resolve(dataSource);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                reject({
                    status: textStatus,
                    error: errorThrown
                });
            },
        });
    });
}

function GetIndicadorFinanceiroDoisPainelCentral() {
    return new Promise(function (resolve, reject) {
        $.ajax({
            type: 'POST',
            url: "/Home/GetIndicadorFinanceiroDoisPainelCentral",
            success: function (dataSource) {
                resolve(dataSource);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                reject({
                    status: textStatus,
                    error: errorThrown
                });
            },
        });
    });
}

function Favoritar(idIco) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: "/Home/Favoritar?Id=" + idIco,
            contentType: "application/json",
            dataType: "json",
            success: function (response) {
                resolve(response);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
}

function Fixar(idIco) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: "/Home/Fixar?Id=" + idIco,
            contentType: "application/json",
            dataType: "json",
            success: function (response) {
                resolve(response);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
}

function BuildMenuItem(barra, objeto) {

    //console.log(objeto);
    const link = objeto.DS_ROTA_AZURE == null ? `window.open('${urlLegado}${objeto.DS_CAMINHO_CMSYS}', '_blank')` : `window.location.href='${objeto.DS_ROTA_AZURE}'`;
    const descricaoMenu = objeto.DS_ITEM_MENU;
    const idGrupoMenu = objeto.CD_GRUPO_MENU;
    const idMenu = objeto.CD_ITEM_MENU_RELATORIO;
    //console.log(descricaoMenu, idGrupoMenu, idMenu);

    barra.append(`<div id="menuFixado_${objeto.CD_ITEM_MENU_RELATORIO}" onclick="${link}" class="col-sm-6 col-md-4 col-lg-3 col-xl-2 mb-0 mt-0 menu-barra-inicial-primeira" style="cursor:pointer; min-height: 33px; height: 33px;">
                          <p class="card-subtitle" mb-0 mt-0" style="font-size: 11px; color: #337AB7;">
                              <i class="fa fa-thumb-tack mr-2" style="font-size: 12px"></i>${descricaoMenu}
                          </p>
                          <div id="contextMenu_${objeto.CD_ITEM_MENU_RELATORIO}"></div>
                      </div>`);

    const menuTarget = `#menuFixado_${objeto.CD_ITEM_MENU_RELATORIO}`;

    $(`#contextMenu_${objeto.CD_ITEM_MENU_RELATORIO}`).dxContextMenu({
        dataSource: [{
            text: 'Retirar da barra de acesso rápido',
            icon: 'dx-icon-unpin'
        }],
        target: menuTarget,
        itemTemplate(itemData) {
            const template = $('<div style="margin-top: 5px; margin-left: 10px; height: 20px; width: 210px;"></div>');
            if (itemData.icon) {
                template.append(`<span class="${itemData.icon}"><span>`);
            }
            if (itemData.items) {
                template.append('<span class="dx-icon-spinright"><span>');
            }
            template.append(itemData.text);
            return template;
        },
        onItemClick(e) {
            if (!e.itemData.items) {

                Fixar(idMenu)
                    .then((ret) => {

                        GetEstruturaMenu().then((ds) => {

                            var dataGridInstance = $(`#lst_Itens_Menu_Grupo_${idGrupoMenu}`).dxList("instance");

                            dataGridInstance.option("dataSource", new DevExpress.data.DataSource({
                                store: ds.filter(item => item.CD_GRUPO_MENU === idGrupoMenu),
                                key: "CD_ITEM_MENU",
                                group: "DS_AGRUPAMENTO"
                            }));

                            //#region [Controle Accordions]
                            let items = dataGridInstance.option("items");
                            let grupo = collapseGroup[currentItemData.DS_GRUPO_MENU].map(function (obj) { return ExtrairValorAgrupamento(obj) });
                            collapseGroup[currentItemData.DS_GRUPO_MENU] = [];

                            for (var i = 0; i < items.length; i++) {
                                if (grupo.includes(ExtrairValorAgrupamento(items[i].key))) {
                                    dataGridInstance.collapseGroup(i);
                                    collapseGroup[currentItemData.DS_GRUPO_MENU].push(items[i].key);
                                }
                            }
                            //#endregion

                            let itensFixados = ds.reduce((res, obj) => {

                                //somente os itens fixados sem duplicata.
                                if (!res.itensMenu[obj.DS_ITEM_MENU] && obj.LG_FIXADO) {

                                    res.itensMenu[obj.DS_ITEM_MENU] = true;
                                    res.itensSemDuplicata.push(obj);
                                }
                                return res;
                            }, { itensMenu: {}, itensSemDuplicata: [] }).itensSemDuplicata;

                            barra.find(menuTarget).slideUp("fast", function () {
                                $(this).remove();
                                DevExpress.ui.notify(`O item de menu "${descricaoMenu}" foi retirado com sucesso!`, 'success', 2000);

                                if (itensFixados.length == 0) {
                                    $('#tutorialBarraAcessoRapido').slideDown(`fast`);

                                    setTimeout(function () {
                                        var elemento = $('#accMenusFixados0');
                                        elemento.slideUp('slow', function () {
                                            elemento.removeClass('show');
                                            elemento.attr('style', ''); // Mostra o elemento novamente, se necessário
                                        });
                                    }, 1500);
                                }
                            });
                        });

                    }).catch(function (error) {
                        // aqui você trata o erro, caso a promessa seja rejeitada
                    });
            }
        },
    });
}

//#endregion

//#region [ Variaveis ]

var currentItemData = null;
var currentComponent = null;
var gallery = null;
var interval = null;


//#endregion

$(() => {

    $('.waterBall').createWaterBall({
        csv_config: {
            width: 140,
            height: 140
        },
        wave_config: {
            waveWidth: 0.02,
            waveHeight: 5
        },
        data_range: [36, 50, 100],
        targetRange: 0,
        textColorRange: ['#000000', '#000000', '#000000'],
        circle_line_color: ['#cc5750', '#0077b3', '#0077b3'],
        main_backcolor_range: [['#e36159', '#e9827c'], ['#0088cc', '#80d4ff'], ['#0088cc', '#80d4ff']],
        backcolor_range: [['#e9827c', '#e36159'], ['#080857', '#0088cc'], ['#80d4ff', '#0088cc']]

    });

    var pc = new PhotoClip('#clipArea', {
        size: [250, 250],
        outputSize: 640,
        //adaptive: ['60%', '80%'],
        file: '#file',
        //view: '#view',
        ok: '#clipBtn',
        //img: 'img/mm.jpg',
        loadStart: function () {
            //console.log('开始读取照片');
        },
        loadComplete: function () {
            //console.log('照片读取完成');
        },
        done: function (dataURL) {

            $.ajax({
                type: 'POST',
                //contentType: "application/json",
                url: "/Usuario/SaveImage",
                //dataType: 'json',
                data: { data: dataURL },
                success: function (data) {
                    $('#imagem').attr('src', data + '?' + new Date().getTime());
                    $('#imgUsuario').attr('src', data + '?' + new Date().getTime());
                    CloseModalUploader();
                }
            });
        },
        fail: function (msg) {
            alert(msg);
        }
    });

    $('#popoverFixarItemMenu').dxPopover({
        target: '#linkFixarItemMenu',
        showEvent: 'mouseenter',
        hideEvent: 'mouseleave',
        position: 'top',
        width: 300,
        animation: {
            show: {
                type: 'pop',
                from: {
                    scale: 0
                },
                to: {
                    scale: 1
                },
            },
            hide: {
                type: 'fade',
                from: 1,
                to: 0,
            },
        },
    });

    GetEstruturaMenu()
        .then(function (dataSource) {
            currentItemData = dataSource[0];

            //#region [ Barra de acesso rápido ]
            let barra = $('#acessoRapidoBar');

            barra.empty();

            let itensFixados = dataSource.reduce((res, obj) => {

                //somente os itens fixados sem duplicata.
                if (!res.itensMenu[obj.DS_ITEM_MENU] && obj.LG_FIXADO) {

                    res.itensMenu[obj.DS_ITEM_MENU] = true;
                    res.itensSemDuplicata.push(obj);
                }
                return res;
            }, { itensMenu: {}, itensSemDuplicata: [] }).itensSemDuplicata;

            if (itensFixados.length > 0) {
                for (var i in itensFixados) {
                    BuildMenuItem(barra, itensFixados[i]);
                }

                $('#tutorialBarraAcessoRapido').hide();
                $('#accMenusFixados0').addClass('show');
            }
            else {
                $('#tutorialBarraAcessoRapido').show();
            }

            //#endregion

            let accordions = $('#accMenuPrincipal');
            accordions.empty();

            let favoritos = $('#favoritos');
            favoritos.empty();

            let dsGrupos = [...new Set(dataSource.map((i) => i.CD_GRUPO_MENU))];

            for (var i = 0; i < dsGrupos.length; i++) {

                let grupo = dataSource.filter((f) => f.CD_GRUPO_MENU == dsGrupos[i]);


                //#region [ Favoritos ]

                let grupoFiltradoFavoritos = dataSource.reduce((res, obj) => {
                    if (!res.itensMenu[obj.DS_ITEM_MENU] && obj.CD_GRUPO_MENU == dsGrupos[i] && obj.LG_FAVORITO) {

                        res.itensMenu[obj.DS_ITEM_MENU] = true;
                        res.itensSemDuplicata.push(obj);
                    }
                    return res;
                }, { itensMenu: {}, itensSemDuplicata: [] }).itensSemDuplicata;

                let linksFavoritos = grupoFiltradoFavoritos.map((obj) => `<a href="#" ${obj.DS_GRUPO_MENU.startsWith('Novas F') ? 'style="color: #e36159;" ' : ''} onclick="window.open('${obj.DS_ROTA_AZURE == null ? `${urlLegado}${obj.DS_CAMINHO_CMSYS}` : obj.DS_ROTA_AZURE}', '${obj.DS_ROTA_AZURE == null ? '_blank' : '_parent'}')">${obj.DS_ITEM_MENU}</a>`);

                if (linksFavoritos.length > 0) {
                    favoritos.append(
                        `<div class="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
                             <section class="card card-featured card-featured-${grupo[0].DS_GRUPO_MENU.startsWith('Novas F') ? 'secondary' : 'primary'}">
                                 <header class="card-header">
                                     <h2 class="card-title" style="font-size: 16px">
                                         <i class="fa ${grupo[0].DS_ICONE_GRUPO_MENU} mr-2"></i>${grupo[0].DS_GRUPO_MENU}
                                     </h2>
                                 </header>
                                 <div class="card-body" id="">
                                     ${linksFavoritos.join('<br>')}                                 
                                 </div>
                             </section>
                         </div>`);
                }

                //#endregion

                accordions.append(
                    `<div class="card ml-3 mr-3 card-${grupo[0].DS_COR_GRUPO_MENU} card-featured-default card-featured-bottom">
                         <div class="card-header">
                             <h4 class="card-title m-1 mt-1">
                                 <a class="accordion-toggle" data-toggle="collapse" data-parent="#accMenuPrincipal" href="#accMenuPrincipal${i}">
                                     <h2 class="card-title" style="font-size: 16px"><i class="fa ${grupo[0].DS_ICONE_GRUPO_MENU} mr-2"></i>${grupo[0].DS_GRUPO_MENU}</h2>
                                 </a>
                             </h4>
                         </div>
                         <div id="accMenuPrincipal${i}" class="collapse ">
                             <div class="card-body">

                                 <div class="row mt-0 mb-0">
                                     <div class="col-lg-12 mt-0 mb-0">
                                         <div id="lst_Itens_Menu_Grupo_${dsGrupos[i]}"></div>
                                         <div id="context_Menu_Grupo_${i}"></div>
                                     </div>
                                 </div>
                             </div>
                         </div>
                     </div>`);


                const context = $(`#context_Menu_Grupo_${i}`).dxContextMenu({
                    items: [],
                    target: `#lst_Itens_Menu_Grupo_${dsGrupos[i]}`,
                    onItemClick(e) {
                        if (!e.itemData.items) {
                            //console.log(currentItemData);
                            //console.log(currentDataSource);

                            switch (e.itemData.action) {
                                case 'del':
                                case 'add':

                                    Favoritar(currentItemData.CD_ITEM_MENU_RELATORIO)
                                        .then((ret) => {

                                            GetEstruturaMenu().then((dataSource) => {

                                                currentComponent.option("dataSource", new DevExpress.data.DataSource({
                                                    store: dataSource.filter(item => item.CD_GRUPO_MENU === currentItemData.CD_GRUPO_MENU),
                                                    key: "CD_ITEM_MENU",
                                                    group: "DS_AGRUPAMENTO"
                                                }));

                                                //#region [Controle Accordions]
                                                let items = currentComponent.option("items");
                                                let grupo = collapseGroup[currentItemData.DS_GRUPO_MENU].map(function (obj) { return ExtrairValorAgrupamento(obj) });
                                                collapseGroup[currentItemData.DS_GRUPO_MENU] = [];

                                                for (var i = 0; i < items.length; i++) {
                                                    if (grupo.includes(ExtrairValorAgrupamento(items[i].key))) {
                                                        currentComponent.collapseGroup(i);
                                                        collapseGroup[currentItemData.DS_GRUPO_MENU].push(items[i].key);
                                                    }
                                                }
                                                //#endregion

                                                DevExpress.ui.notify(`O item de menu "${currentItemData.DS_ITEM_MENU}" foi ${e.itemData.action == 'del' ? 'removido dos' : 'adicionado aos'} favoritos!`, 'success', 2000);

                                                //#region [ Favoritos ]
                                                let favoritos = $('#favoritos');
                                                favoritos.empty();

                                                let dsGrupos = [...new Set(dataSource.map((i) => i.CD_GRUPO_MENU))];

                                                for (var i = 0; i < dsGrupos.length; i++) {

                                                    let grupo = dataSource.filter((f) => f.CD_GRUPO_MENU == dsGrupos[i]);



                                                    let grupoFiltradoFavoritos = dataSource.reduce((res, obj) => {
                                                        if (!res.itensMenu[obj.DS_ITEM_MENU] && obj.CD_GRUPO_MENU == dsGrupos[i] && obj.LG_FAVORITO) {

                                                            res.itensMenu[obj.DS_ITEM_MENU] = true;
                                                            res.itensSemDuplicata.push(obj);
                                                        }
                                                        return res;
                                                    }, { itensMenu: {}, itensSemDuplicata: [] }).itensSemDuplicata;

                                                    let linksFavoritos = grupoFiltradoFavoritos.map((obj) => `<a href="#" ${obj.DS_GRUPO_MENU.startsWith('Novas F') ? 'style="color: #e36159;" ' : ''} onclick="window.open('${obj.DS_ROTA_AZURE == null ? `${urlLegado}${obj.DS_CAMINHO_CMSYS}` : obj.DS_ROTA_AZURE}', '${obj.DS_ROTA_AZURE == null ? '_blank' : '_parent'}')">${obj.DS_ITEM_MENU}</a>`);

                                                    if (linksFavoritos.length > 0) {
                                                        favoritos.append(
                                                            `<div class="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
                                                                 <section class="card card-featured card-featured-${grupo[0].DS_GRUPO_MENU.startsWith('Novas F') ? 'secondary' : 'primary'}">
                                                                     <header class="card-header">
                                                                         <h2 class="card-title" style="font-size: 16px">
                                                                             <i class="fa ${grupo[0].DS_ICONE_GRUPO_MENU} mr-2"></i>${grupo[0].DS_GRUPO_MENU}
                                                                         </h2>
                                                                     </header>
                                                                     <div class="card-body" id="">
                                                                         ${linksFavoritos.join('<br>')}                                 
                                                                     </div>
                                                                 </section>
                                                             </div>`);
                                                    }
                                                }
                                                //#endregion

                                            });

                                        }).catch(function (error) {
                                            // aqui você trata o erro, caso a promessa seja rejeitada
                                        });

                                    break;
                                case 'fixar':

                                    Fixar(currentItemData.CD_ITEM_MENU_RELATORIO)
                                        .then((ret) => {

                                            GetEstruturaMenu().then((ds) => {

                                                currentComponent.option("dataSource", new DevExpress.data.DataSource({
                                                    store: ds.filter(item => item.CD_GRUPO_MENU === currentItemData.CD_GRUPO_MENU),
                                                    key: "CD_ITEM_MENU",
                                                    group: "DS_AGRUPAMENTO"
                                                }));

                                                //#region [Controle Accordions]
                                                let items = currentComponent.option("items");
                                                let grupo = collapseGroup[currentItemData.DS_GRUPO_MENU].map(function (obj) { return ExtrairValorAgrupamento(obj) });
                                                collapseGroup[currentItemData.DS_GRUPO_MENU] = [];

                                                for (var i = 0; i < items.length; i++) {
                                                    if (grupo.includes(ExtrairValorAgrupamento(items[i].key))) {
                                                        currentComponent.collapseGroup(i);
                                                        collapseGroup[currentItemData.DS_GRUPO_MENU].push(items[i].key);
                                                    }
                                                }
                                                //#endregion

                                                let barra = $('#acessoRapidoBar');
                                                barra.empty();

                                                let itemsFiltradosFixados = ds.reduce((res, obj) => {

                                                    //somente os itens fixados sem duplicata.
                                                    if (!res.itensMenu[obj.DS_ITEM_MENU] && obj.LG_FIXADO) {

                                                        res.itensMenu[obj.DS_ITEM_MENU] = true;
                                                        res.itensSemDuplicata.push(obj);
                                                    }
                                                    return res;
                                                }, { itensMenu: {}, itensSemDuplicata: [] }).itensSemDuplicata;

                                                DevExpress.ui.notify(`O item de menu "${currentItemData.DS_ITEM_MENU}" foi adicionado com sucesso!`, 'success', 2000);

                                                var elemento = $('#accMenusFixados0');
                                                $('#tutorialBarraAcessoRapido').hide(0, function () {
                                                    for (var i in itemsFiltradosFixados) {
                                                        BuildMenuItem(barra, itemsFiltradosFixados[i]);
                                                    }
                                                    elemento.slideDown('fast', function () {
                                                        elemento.addClass('show');
                                                        elemento.attr('style', '');
                                                    });
                                                });
                                            });

                                        }).catch(function (error) {
                                            // aqui você trata o erro, caso a promessa seja rejeitada
                                        });

                                    break;
                            }
                        }
                    },
                }).dxContextMenu('instance');

                //console.log(grupo);
                $(`#lst_Itens_Menu_Grupo_${dsGrupos[i]}`).dxList({
                    dataSource: new DevExpress.data.DataSource({
                        store: grupo,
                        key: "CD_ITEM_MENU",
                        group: "DS_AGRUPAMENTO"
                    }),
                    searchEnabled: true,
                    searchExpr: "DS_ITEM_MENU",
                    grouped: true,
                    collapsibleGroups: true,
                    showContextMenu: true,
                    onGroupRendered: onGroupRendered,
                    onItemContextMenu(e) {

                        context.beginUpdate();
                        currentComponent = e.component;
                        currentItemData = e.itemData;
                        let buttons = [];

                        if (currentItemData.LG_FAVORITO) {
                            buttons.push({ text: 'Retirar dos favoritos', action: 'del', icon: 'fa fa-star-o' });
                        } else {
                            buttons.push({ text: 'Adicionar aos favoritos', action: 'add', icon: 'fa fa-star' });
                        }

                        if (currentItemData.LG_FIXADO == false) {
                            buttons.push({ text: 'Fixar na barra de acesso rápido', action: 'fixar', icon: 'fa fa-thumb-tack' });
                        }

                        context.option('items', buttons);
                        context.endUpdate();

                    },
                    groupTemplate(data) {
                        return $(`${data.key}`);
                    },
                    onInitialized: function (e) {
                        setTimeout(function () {
                            var items = e.component.option("items");
                            for (var i = 0; i < items.length; i++) {
                                let key = `${items[i].items[0].DS_GRUPO_MENU}`;

                                if (collapseGroup[key] == undefined) {
                                    collapseGroup[key] = [];
                                }

                                if (!items[i].items[0].LG_EXPANDIR_AGRUPAMENTO) {
                                    e.component.collapseGroup(i);
                                    collapseGroup[key].push(`${items[i].items[0].DS_AGRUPAMENTO}`);
                                }
                            }
                        }, 50);
                    },
                    itemTemplate(data) {
                        return $(`<div class='ml-4 item-menu-normal'><b><i class='fa ${data.LG_FAVORITO == true ? "fa-star" : "fa-star-o"} mr-2'></i></b>${data.DS_ITEM_MENU}</div>`);
                    },
                    onItemClick(e) {
                        if (e.itemData.DS_ROTA_AZURE == null) {
                            window.open(`${urlLegado}${e.itemData.DS_CAMINHO_CMSYS}`, '_blank')
                        } else {
                            window.open(e.itemData.DS_ROTA_AZURE, '_parent')
                        };
                    },
                });

            }

            $('.loading').fadeOut('slow', function () {
                $('#mainDiv').fadeIn();
            });

        })
        .catch(function (error) {
            // aqui você trata o erro, caso a promessa seja rejeitada
        })

    GetNovasFuncionalidades()
        .then(function (dataSource) {

            let itensNovidade = dataSource.filter(function (obj) { return obj.LG_NOVIDADE });

            if (itensNovidade.length > 0) {
                $("#gridHistoricoImplementacoesNovidades").dxDataGrid({
                    dataSource: new DevExpress.data.DataSource({
                        store: dataSource,
                        key: 'NR_SEQUENCIA',
                        group: 'DS_TITULO',
                    }),

                    keyExpr: "NR_SEQUENCIA",
                    filterValue: [['LG_NOVIDADE', '=', true]],

                    scrolling: { mode: 'virtual' },

                    showBorders: true,
                    showRowLines: false,

                    hoverStateEnabled: true,
                    rowAlternationEnabled: false,
                    wordWrapEnabled: true,
                    columnHidingEnabled: false,
                    columnsAutoWidth: false,
                    allowColumnResizing: true,
                    allowColumnReordering: true,
                    showColumnHeaders: false,

                    searchPanel: {
                        visible: false,
                        highlightCaseSensitive: false,
                        highlightSearchText: true,
                        placeholder: "Procurar...",
                    },
                    groupPanel: {
                        visible: false,
                        emptyPanelText: "Agrupar"
                    },
                    export: {
                        enabled: false,
                        allowExportSelectedData: false
                    },
                    onExporting: function (e) {
                        var workbook = new ExcelJS.Workbook();
                        var worksheet = workbook.addWorksheet('Histórico de Implementações');

                        DevExpress.excelExporter.exportDataGrid({
                            component: e.component,
                            worksheet: worksheet,
                            autoFilterEnabled: true
                        }).then(function () {
                            workbook.xlsx.writeBuffer().then(function (buffer) {
                                saveAs(new Blob([buffer], {
                                    type: 'application/octet-stream'
                                }), 'Historico_Implementacoes.xlsx');
                            });
                        });
                        e.cancel = true;
                    },
                    filterRow: {
                        visible: true,
                        applyFilter: "auto"
                    },
                    headerFilter: {
                        visible: false,
                        allowSearch: true
                    },
                    filterPanel: {
                        visible: false
                    },

                    columnChooser: {
                        enabled: false,
                        allowSearch: true,
                        //height: 350, 
                        //width: 300,
                    },

                    paging: {
                        pageSize: 5
                    },
                    pager: {
                        visible: false,
                        allowedPageSizes: [15, 20, 50, 100],
                        showPageSizeSelector: false,
                        showNavigationButtons: true
                    },

                    columnsAutoWidth: true,

                    columns: [
                        {
                            dataField: "LG_NOVIDADE",
                            caption: "Novidade",
                            width: 75,
                            alignment: 'center',
                            cssClass: "column-data-grid-novidade",
                            visible: false,
                        },
                        {
                            dataField: "DT_INCLUSAO",
                            caption: "Data",
                            width: 75,
                            sortOrder: 'desc',
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            allowGrouping: true,
                            dataType: "date",
                            format: "dd/MM/yyyy",
                            editorOptions: { useMaskBehavior: true },
                            alignment: 'center',
                            cssClass: "column-data-grid-novidade",
                            visible: false,
                        },
                        {
                            dataField: "DS_TITULO",
                            caption: "Recurso",
                            //width: 180,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: false,
                            alignment: 'left',
                            cssClass: "column-data-grid-novidade",
                            allowGrouping: true,
                            //allowHiding: false,
                            groupIndex: 0,
                            groupCellTemplate: function (element, options) {
                                element.text(options.value);
                            },
                        },
                        {
                            dataField: "DS_MODULO",
                            caption: "Módulo",
                            width: 80,
                            allowEditing: false,
                            allowSorting: true,
                            allowHeaderFiltering: true,
                            alignment: 'center',
                            cssClass: "column-data-grid-novidade",
                            allowGrouping: true,
                            visible: false,
                        },
                        {
                            dataField: "DS_DESCRICAO",
                            caption: "Especificação",
                            //width: 500,
                            allowEditing: false,
                            allowSorting: false,
                            allowHeaderFiltering: true,
                            alignment: 'left',
                            cssClass: "column-data-grid-novidade",
                            allowGrouping: false,
                        },
                        {
                            type: 'buttons',
                            width: 50,
                            alignment: 'center',
                            buttons: [{
                                hint: 'Assitir vídeo de demonstração',
                                icon: 'fa fa-play',
                                width: 30,
                                height: 30,
                                visible(e) {
                                    if (e.row.data.DS_CAMINHO_VIDEO_DEMONSTRACAO == null || e.row.data.DS_CAMINHO_VIDEO_DEMONSTRACAO == undefined) {
                                        return false;
                                    } else {
                                        return true;
                                    };
                                },
                                onClick(e) {
                                    //console.log('onClick',e.row.data);
                                    window.open(e.row.data.DS_CAMINHO_VIDEO_DEMONSTRACAO, "_blank");
                                    $.post("/Home/VideoReproduzidoSimples", { obj: { CdOrigem: "NOVIDADE", DsOrigem: e.row.data.DS_TITULO, DsLinkVideo: e.row.data.DS_CAMINHO_VIDEO_DEMONSTRACAO } });
                                    

                                },
                            }],
                            allowHiding: false,
                        },
                    ],

                    onCellPrepared: function (e) {

                        if (e.rowType === "group") {
                            e.cellElement.css("color", "#f05b41");
                            e.cellElement.css("background-color", "#f8f9fa");
                        }

                    },

                    onCellClick(e) {
                        //console.log('onCellClick', e.row.data);
                        window.open(e.row.data.DS_CAMINHO_VIDEO_DEMONSTRACAO, "_blank");
                        $.post("/Home/VideoReproduzidoSimples", { obj: { CdOrigem: "NOVIDADE", DsOrigem: e.row.data.DS_TITULO, DsLinkVideo: e.row.data.DS_CAMINHO_VIDEO_DEMONSTRACAO } });
                    },

                    //toolbar: {
                    //    items: [
                    //        {
                    //            location: 'after',
                    //            widget: 'dxButton',
                    //            options: {
                    //                icon: 'hierarchy',
                    //                text: '',
                    //                hint: 'Fechar ou expandir os agrupamentos',
                    //                onClick(e) {
                    //                    const dataGrid = $("#gridHistoricoImplementacoesNovidades").dxDataGrid('instance');

                    //                    const expanding = e.component.option('text') === 'Expandir';
                    //                    dataGrid.option('grouping.autoExpandAll', expanding);
                    //                    e.component.option('text', expanding ? '' : 'Expandir');
                    //                },
                    //            },
                    //        },
                    //        {
                    //            name: "groupPanel",
                    //            locateInMenu: "auto",
                    //        },
                    //        'exportButton',
                    //        'columnChooserButton',
                    //        'searchPanel',
                    //    ],
                    //},

                });
            }
            else {
                $("#cardNovidades").remove();

            }

            $("#gridHistoricoImplementacoes").dxDataGrid({
                dataSource: new DevExpress.data.DataSource({
                    store: dataSource,
                    key: 'NR_SEQUENCIA',
                    //group: 'DS_MODULO',
                }),

                keyExpr: "NR_SEQUENCIA",
                //scrolling: { mode: 'virtual' },

                showBorders: true,
                showRowLines: false,

                hoverStateEnabled: true,
                showBorders: true,
                showRowLines: true,
                rowAlternationEnabled: true,
                wordWrapEnabled: true,
                columnHidingEnabled: true,
                columnsAutoWidth: false,
                allowColumnResizing: true,
                allowColumnReordering: true,

                searchPanel: {
                    visible: true,
                    highlightCaseSensitive: false,
                    highlightSearchText: true,
                    placeholder: "Procurar...",
                },
                groupPanel: {
                    visible: true,
                    emptyPanelText: "Agrupar"
                },
                export: {
                    enabled: false,
                    allowExportSelectedData: false
                },
                onExporting: function (e) {
                    var workbook = new ExcelJS.Workbook();
                    var worksheet = workbook.addWorksheet('Histórico de Implementações');

                    DevExpress.excelExporter.exportDataGrid({
                        component: e.component,
                        worksheet: worksheet,
                        autoFilterEnabled: true
                    }).then(function () {
                        workbook.xlsx.writeBuffer().then(function (buffer) {
                            saveAs(new Blob([buffer], {
                                type: 'application/octet-stream'
                            }), 'Historico_Implementacoes.xlsx');
                        });
                    });
                    e.cancel = true;
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
                    enabled: false,
                    allowSearch: true,
                    //height: 350, 
                    //width: 300,
                },

                paging: {
                    pageSize: 5
                },
                pager: {
                    visible: true,
                    allowedPageSizes: [5, 15, 20, 50, 100],
                    showPageSizeSelector: true,
                    showNavigationButtons: true
                },

                columnsAutoWidth: true,

                columns: [
                    {
                        dataField: "DT_INCLUSAO",
                        caption: "Data",
                        width: 75,
                        sortOrder: 'desc',
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        allowGrouping: true,
                        dataType: "date",
                        format: "dd/MM/yyyy",
                        editorOptions: { useMaskBehavior: true },
                        alignment: 'center',
                        cssClass: "column-data-grid",
                    },
                    {
                        dataField: "DS_TITULO",
                        caption: "Implementação",
                        //width: 180,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: false,
                        alignment: 'left',
                        cssClass: "column-data-grid",
                        allowGrouping: false,
                        //allowHiding: false,
                    },
                    {
                        dataField: "DS_MODULO",
                        caption: "Módulo",
                        width: 80,
                        allowEditing: false,
                        allowSorting: true,
                        allowHeaderFiltering: true,
                        alignment: 'center',
                        cssClass: "column-data-grid",
                        allowGrouping: true,
                        groupCellTemplate: function (element, options) {
                            element.text(options.value);
                        },
                        //allowHiding: false,
                        //groupIndex: 0,
                    },
                    {
                        dataField: "DS_DESCRICAO",
                        caption: "Especificação",
                        width: 500,
                        allowEditing: false,
                        allowSorting: false,
                        allowHeaderFiltering: true,
                        alignment: 'left',
                        cssClass: "column-data-grid",
                        allowGrouping: false,
                    },
                    {
                        type: 'buttons',
                        width: 35,
                        buttons: [{
                            hint: 'Assitir vídeo de demonstração',
                            icon: 'video',
                            visible(e) {
                                if (e.row.data.DS_CAMINHO_VIDEO_DEMONSTRACAO == null || e.row.data.DS_CAMINHO_VIDEO_DEMONSTRACAO == undefined) {
                                    return false;
                                } else {
                                    return true;
                                };
                            },
                            onClick(e) {
                                //console.log('onClick', e.row.data);
                                window.open(e.row.data.DS_CAMINHO_VIDEO_DEMONSTRACAO, "_blank");
                                $.post("/Home/VideoReproduzidoSimples", { obj: { CdOrigem: "HISTÓRICO", DsOrigem: e.row.data.DS_TITULO, DsLinkVideo: e.row.data.DS_CAMINHO_VIDEO_DEMONSTRACAO } });
                            },
                        }],
                        //cssClass: "column-data-grid",
                        allowHiding: false,
                    },
                ],

                onCellPrepared: function (e) {

                    if (e.rowType === "group") {
                        e.cellElement.css("color", "#f05b41");
                        e.cellElement.css("background-color", "white");
                    }

                },

                toolbar: {
                    items: [
                        {
                            location: 'after',
                            widget: 'dxButton',
                            options: {
                                icon: 'hierarchy',
                                text: '',
                                hint: 'Fechar ou expandir os agrupamentos',
                                onClick(e) {
                                    const dataGrid = $("#gridHistoricoImplementacoes").dxDataGrid('instance');

                                    const expanding = e.component.option('text') === 'Expandir';
                                    dataGrid.option('grouping.autoExpandAll', expanding);
                                    e.component.option('text', expanding ? '' : 'Expandir');
                                },
                            },
                        },
                        {
                            name: "groupPanel",
                            locateInMenu: "auto",
                        },
                        'exportButton',
                        'columnChooserButton',
                        'searchPanel',
                    ],
                },

            });
        });

    GetImagesMenuCentral()
        .then(function (dataSource) {
            if (dataSource.length > 0) {
                gallery = $('#galleryQuadroAvisos').dxGallery({
                    //dataSource: dataSource.map(function (obj) { return `/img/quadro-avisos/${obj.DS_IMAGEM}` }),
                    dataSource: dataSource,
                    height: '100%',
                    width: '100%',
                    loop: true,
                    slideshowDelay: 6000,
                    showNavButtons: false,
                    showIndicator: true,
                    itemTemplate: function (itemData, itemIndex, itemElement) {
                        var $image = $('<img>').attr('src', `/img/quadro-avisos/${itemData.DS_IMAGEM}`).appendTo(itemElement);

                        if (itemData.DS_LINK_URL !== null) {
                            $image.css('cursor', 'pointer');
                            $image.click(function () {
                                window.open(itemData.DS_LINK_URL, '_blank');                                
                                $.post("/Home/VideoReproduzidoSimples", { obj: { CdOrigem: "QUADRO", DsOrigem: itemData.DS_TITULO, DsLinkVideo: itemData.DS_LINK_URL } });
                            });
                        }

                    }
                }).dxGallery('instance');

                if (window.innerWidth < 1082) {
                    $('#cardQuadroAvisosAzure').hide();
                } else {
                    $('#cardQuadroAvisosAzure').show();
                }

                setTimeout(() => {
                    gallery.repaint();
                }, "2000");
            } else {
                $('#cardQuadroAvisosAzure').remove();
            }
        });

    ajustaLayoutTabs();

    if (administrador || dashboardAccess) {
        $('.dashboard').fadeIn('slow');
    }

    if (administrador || gerenciamentoAccess) {
        $('#navAbaGerenciamento').show();
    }

    $('.indicadores').click(function () {
        if (interval == null) {

            LoadDashboardData();

            interval = setInterval(function () {
                if ($('.indicadores').length === $('.indicadores.card-collapsed').length) {
                    clearInterval(interval);
                    interval = null;

                    $('.resultIndicadores').hide();
                    if (administrador) {
                        $('#saldoContas').hide();
                    }
                    $('.loadingIndicadores').show();
                } else {
                    LoadDashboardData();
                }
            }, refreshTime * 1000);

        }
    });



    window.addEventListener('resize', function () {
        ajustaLayoutTabs();
    });
});