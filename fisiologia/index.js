"use strict";
// Menu

const doseador = {
    abrirSelect() {
        select.classList.add("on");
        select.querySelector("#src").focus();

        // Para mobile
        document.querySelector("body").classList.add("overflow-h");
        campoFarmaco.classList.remove("pos-relative");
        window.innerWidth < 1024 && document.querySelector("a#logotipo").scrollIntoView();
    },

    fecharSelect() {
        select.classList.remove("on");
        document.querySelector("body").classList.remove("overflow-h");

        // Para não transbordar o button.btn-expandir-select no mobile  
        campoFarmaco.classList.add("pos-relative");

        // Para resetar o input.value e os resultados da pesquisa anterior
        const selectChildren = select.querySelectorAll("li.placeholder, div.optgroup.arvs h3, div.optgroup.arvs li");

        select.querySelector("#src").value = "";
        for (const child of selectChildren) {
            child.classList.remove("hide");
        }
    },

    selecionarFarmaco(farmaco) { 
        for (const opt of selectOptions) {
            opt.classList.remove("selected");
        }
        farmaco.classList.add("selected");
    },

    pesquisarFarmaco(query) {
        let queryToLowerCase = query.toLowerCase();
        let farmacos = select.querySelectorAll("div.arvs li");
        let titulos_dos_farmacos = select.querySelectorAll("div.arvs h3");
        
        // PESQUISA DIRECTAMENTE PELO NOME DO FÁRMACO
        for (const farmaco of farmacos) {
            let farmacoInnerText = farmaco.textContent.toLowerCase();
 
            if(!farmacoInnerText.includes(queryToLowerCase)) {
                farmaco.classList.add("hide");
                
            } else {
                farmaco.classList.remove("hide");
            }
        }

        // PESQUISA PELO 'OPTGROUP-LABEL' (TITULOS DOS FÁRMACOS) 
        for (const titulo of titulos_dos_farmacos) {
            let tituloInnerText = titulo.textContent.toLowerCase();

            if(tituloInnerText.includes(queryToLowerCase)) {
                let titleParentChildren = titulo.parentElement.children;

                for (const child of titleParentChildren) {
                    child.classList.remove("hide");
                } 
            } else {
                titulo.classList.add("hide")
            }
        }
    }
}

const menu = {
    mostrarArtigoRelacionadoAaba(aba) {
        const artigos = document.querySelectorAll("article section");
        const artigoRelacionado = aba.dataset.artigorelacionado;
        let titulo_do_doseador = document.querySelector(".doseador h1");

        for (let i = 0; i < abas_do_menu.length; i++) {
            abas_do_menu[i].classList.remove("current");
            artigos[i].classList.remove("on");

            if(artigos[i].matches(`.${artigoRelacionado}`)) {
                artigos[i].classList.add("on");
            }
        }
        aba.classList.add("current");
        titulo_do_doseador.textContent = aba.dataset.titulodaaba;
        document.title = aba.dataset.titulodaaba + " - Tarv Pediátrico";
    },

    mostrarFarmacosRelacionadosAaba(aba) {
        const gruposDeFarmacos = document.querySelectorAll("div.optgroup");
        const GrupoDeFarmacosRelacionadosAaba =  document.querySelectorAll(`div.optgroup.${aba.dataset.for}`);

        for (const grupo of gruposDeFarmacos) {
            grupo.classList.add("hide");
        }
        // Looping por optgroup.arvs ser um nodelist
        for (const grupo of GrupoDeFarmacosRelacionadosAaba) {
            grupo.classList.remove("hide");
        }
            
        const elementosRelacionados = document.querySelectorAll("label.arv, li.placeholder, div.caixa-de-pesquisa");
        
        if(aba.dataset.for !== "arvs") {
            elementosRelacionados[0].innerHTML = "Fármaco:";
            elementosRelacionados[1].classList.add("hide");
            elementosRelacionados[2].classList.add("hide");
        } else {
            elementosRelacionados[0].innerHTML = "ARV:&nbsp;";
            elementosRelacionados[1].classList.remove("hide");
            elementosRelacionados[2].classList.remove("hide");
        }

        let optionDefault = document.querySelector(`[data-nome=${aba.dataset.optiondefault}]`);
        doseador.selecionarFarmaco(optionDefault);
    }
}

let abas_do_menu,
campoFarmaco,
select, selectSrc, selectOptions, expansoresDeSelect;
window.addEventListener("load", () => {
    abas_do_menu = document.querySelectorAll(".menu-principal a");
    
    // INVOCAÇÃO 
    abas_do_menu.forEach ( aba => {
        aba.addEventListener("click", () => {
            menu.mostrarArtigoRelacionadoAaba(aba);
            menu.mostrarFarmacosRelacionadosAaba(aba);

            // Para resetar o input.value e os resultados da pesquisa da aba do Doseador
            menu.fecharSelect();
        })
    })

    // DOSEADOR 
    campoFarmaco = document.querySelector("div.campo-de-farmaco");
    select = document.querySelector("ul.select");
    selectOptions = select.querySelectorAll("li");
    selectSrc = select.querySelector("input#src");
    const selectSrcBtn = select.querySelector("button.voltar");
    expansoresDeSelect = document.querySelectorAll(".btn-expandir-select, label.arv");

    // Abrir lista de fármacos
    expansoresDeSelect.forEach (expansor => {
        expansor.addEventListener("click", () => doseador.abrirSelect());
    })

    selectOptions.forEach ( option => {
        option.addEventListener("click", () => {
            if(select.matches(".on")) {
                doseador.selecionarFarmaco(option);
                doseador.fecharSelect();
                campoFarmaco.classList.add("focus");
            } else {
                doseador.abrirSelect();
            } 
        });
    });

    // Pesquisar fármacos
    selectSrc.addEventListener("input", () => doseador.pesquisarFarmaco(selectSrc.value));

    // Fechar lista de fármacos
    selectSrcBtn.addEventListener("click", () => doseador.fecharSelect()); 

    // Adicionar borda laranja aos campos de peso e fármaco
    const campoPeso = document.querySelector("input#peso");
    campoPeso.addEventListener("focusin", () => campoPeso.parentElement.classList.add("focus"));
    campoPeso.addEventListener("focusout", () => campoPeso.parentElement.classList.remove("focus"));

    // PARTILHAR
    let conteudo = {
        title: "Doseador de Antirretrovirais",
        text: "Calcula automaticamente a dose de acordo com o peso, a posologia e o número de comprimidos a dispensar dos antirretrovirais e dos fármacos usados na profilaxia contra infecções oportunistas.",
        url: "https://www.quinamine.github.io/tarv-pediatrico/index.html"
    }

    const btnPartilhar = document.querySelector("button.partilhar");
    btnPartilhar.addEventListener("click", () => {
        try {
            navigator.share(conteudo)
            .then(() => {
                console.log("Endereço do Doseador partilhado com sucesso.");
            })
            .catch((erro) => {
                console.log(`Não foi possível partilhar devido ao erro: ${erro}.`);
            })
        } catch (erro) {
            console.log("O seu navegador não tem suporte ao método 'navigator.share()'.");
        }
    });
});



// EVENTO DE FECHAMENTO DO SELECT 
window.addEventListener("click", event => {
   
    const selectChildren = campoFarmaco.querySelectorAll("*");
   
    let numChildrenClicked = 0;
    for (const child of selectChildren) {
        if(child === event.target) {
            numChildrenClicked++;
        }
    }

    if(numChildrenClicked <= 0) {
        doseador.fecharSelect();
        document.querySelector(".campo-de-farmaco").classList.remove("focus");
    }
});

window.addEventListener("scroll", () => {
    if(window.innerWidth > 1023) {
        doseador.fecharSelect();
        document.querySelector(".campo-de-farmaco").classList.remove("focus");
    }
});










