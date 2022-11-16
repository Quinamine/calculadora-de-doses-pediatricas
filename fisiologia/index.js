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
        let farmacos = select.querySelectorAll("div.optgroup li");
        let titulos_dos_farmacos = select.querySelectorAll("div.optgroup h3");
        
        // PESQUISA DIRECTAMENTE PELO NOME DO FÁRMACO
        for (const farmaco of farmacos) {
            let farmacoInnerText = farmaco.querySelector("span").textContent.toLowerCase();
 
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
    abrir() {
        document.querySelector("nav.menu-principal").classList.add("on");
    }, 

    fechar() {
        document.querySelector("nav.menu-principal").classList.remove("on");
    }
}

let campoFarmaco,
select, selectSrc, selectOptions, expansoresDeSelect;
window.addEventListener("load", () => { 
    // INVOCAÇÃO 
    const menuPontinhos = document.querySelector("div.menu-pontinhos");
    menuPontinhos.addEventListener("click", () => menu.abrir());

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
        title: "Calculadora de Doses Pediátricas",
        text: "É um serviço online gratuito que, com base no peso, doseia automaticamente alguns dos medicamentos mais usuais na prática clínica para pacientes pediátricos. Tem como referência o Formulário Nacional de Medicamentos - 5ª Edição, 2007.</p>",
        url: "https://www.quinamine.github.io/calculadora-de-doses-pediatricas/index.html"
    }

    const btnPartilhar = document.querySelector("button.partilhar");
    btnPartilhar.addEventListener("click", () => {
        try {
            navigator.share(conteudo)
            .then(() => {
                console.log("Endereço da Calculadora partilhado com sucesso.");
            })
            .catch((erro) => {
                console.log(`Não foi possível partilhar devido ao erro: ${erro}.`);
            })
        } catch (erro) {
            console.log("O seu navegador não tem suporte ao método 'navigator.share()'.");
        }
    });
});



// EVENTO DE FECHAMENTO DO SELECT E DO MENU
window.addEventListener("click", event => {
    // Fechar Menu
    if(!event.target.matches(".menu-pontinhos") && !event.target.matches(".dot")) {
        menu.fechar();
    }
    // Fechar Select
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










