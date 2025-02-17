"use strict"
const doserGeneralFunctions = {
    highlightFocusedInput(focusedInput) {
        focusedInput.classList.add("--focus");
    },
    removehighlightFromFocusedInput(focusedInput) {
        focusedInput.classList.remove("--focus");
    },
    openOrCloseSelect() {
        const doserSelect = document.querySelector(".doser__select");
        const selectOfMedicines = document.querySelector(".doser__section--medicines");
        const body = document.querySelector("#body");
        doserSelect.classList.toggle("--open");
        doserGeneralFunctions.highlightFocusedInput(selectOfMedicines);
        body.classList.toggle("--overflow-hidden-on-mobile");
        doserGeneralFunctions.showOptionsHiddenByFilter();
    },
    closeSelect() {
        const doserSelect = document.querySelector(".doser__select");
        const selectOfMedicines = document.querySelector(".doser__section--medicines");
        const body = document.querySelector("#body");
        doserSelect.classList.remove("--open");
        doserGeneralFunctions.removehighlightFromFocusedInput(selectOfMedicines);
        body.classList.remove("--overflow-hidden-on-mobile");
        doserGeneralFunctions.showOptionsHiddenByFilter();
    },
    selectAnOption(optionToSelect) {
        const options = document.querySelectorAll(".doser__select__option");
        for (const option of options) {
            option.classList.remove("--selected");
        }
        optionToSelect.classList.add("--selected");
    },
    filterAnOption(query) {
        function trimAndLowerStr(str) {
            return str.replaceAll(/\W/g, "").toLowerCase();
        }
        function showOrHideElement(action, element) {
            action === "show" ? element.classList.remove("--display-none")
            : element.classList.add("--display-none")
        }
        // Filter or Search options
        query = trimAndLowerStr(query);
        const options = document.querySelectorAll(".doser__select__option");
        for (const option of options) {
            trimAndLowerStr(option.textContent).includes(query) ? showOrHideElement("show", option)
            : showOrHideElement("hide", option);
        }
        // Filter Optgroups
        const optgroups = document.querySelectorAll(".doser__optgroup__title");
        for (const optgroup of optgroups) {
            if(trimAndLowerStr(optgroup.textContent).includes(query)) {
                showOrHideElement("show", optgroup);
                let optionsRelated = optgroup.parentElement.querySelectorAll(".doser__select__option");
                for (const option of optionsRelated) {showOrHideElement("show", option)}
            } else {
                showOrHideElement("hide", optgroup);
            }
        }
    },
    showOptionsHiddenByFilter() {
        const options = document.querySelectorAll(".doser__select *");
        const inputSearch = document.querySelector(".doser__select__input--search")
        for(const option of options) {
            if(option.matches(".doser__select__optgroup--ctz, .doser__select__optgroup--anti-tbs")) return 0;
            option.classList.remove("--display-none");
            inputSearch.value = "";
        }
    },
    showMinWeightAlert() {
        const alertaDePesoMinimo = document.querySelector(".doser__min-weight-alert");
        alertaDePesoMinimo.textContent = "O peso não deve ser menor que 1.";
        alertaDePesoMinimo.classList.add("--open");
    },
    clearMinWeightAlert() {
        const alertaDePesoMinimo = document.querySelector(".doser__min-weight-alert");
        alertaDePesoMinimo.textContent = "";
        alertaDePesoMinimo.classList.remove("--open");
    },
    clearDoseAndnote() {
        document.querySelector(".doser__section__dose").innerHTML = "";
        let noteOutput = document.querySelector(".doser__section__note");
        noteOutput.innerHTML = "";  
        // remove padding when the note does not have content to avoid bg-color appearing
        noteOutput.classList.add("doser__section__note--no-padding");       
    }
}
class Doser {
    constructor(peso, farmaco, dosagem, diluicao, forma, dosePorKg, doseMaxima, posologia) {
        this.peso = peso;
        this.farmaco = farmaco;
        this.dosagem = dosagem;
        this.diluicao = diluicao;
        this.formaFarmaceutica = forma;
        this.dosePorKg = dosePorKg;
        this.doseMaxima = doseMaxima;
        this.posologia = posologia
    }
    getUnidadeDeMedicaoDaDose() {
        let unidade = this.formaFarmaceutica === "susp" ? "ml"
        : this.formaFarmaceutica === "inj-im" ? "U.I via I.M profunda"
        : "cp(s)";
        return unidade;
    }
    getPosologia() {
        let pos;
        if (this.posologia === "1") {
            pos = "dose única diária";
            this.farmaco === "benzatina" && (pos = "dose única (na Sífilis recente) ou por semana durante 3 semanas (na Sífilis tardia)");
        } else if (this.posologia === "2") {
            pos = "de 12 em 12 horas";
            if (this.farmaco === "al" || this.farmaco === "mebendazol-100") {
                pos += " durante 3 dias consecutivos";
            }
        } else if (this.posologia === "3") {
            pos = "de 8 em 8 horas";
            if (this.farmaco === "quinina") {
                pos += " durante 7 dias consecutivos";
            }
        } else if (this.posologia === "4") {
            pos = "de 6 em 6 horas";
        }
        return pos;
    }
    getNotasEprecaucoes() {
        let nota;
        if(this.farmaco === "fenox-susp") {
            nota = `<b>(1)</b> Administrar as doses de preferência 30 minutos antes das refeições. <b>(2)</b>&nbsp;Não é prudente usar em infecções graves. <b>(3)</b>&nbsp;Não deve ser usada também em infecções meningocócicas ou gonocócicas. <b>(4)</b>&nbsp;<strong>Contra-indicações</strong>: Hipersensibilidade (alergia) às penicilinas.`;
        } else if(this.farmaco === "benzatina") {
            nota = `<b>(1)</b> Ao administrar injecção I.M., assegurar cumprimento das normas para o efeito e aspirar sempre antes de fazer a injecção da penicilina. <b>(2)</b>&nbsp; Nunca injectar por via E.V. ou S.C. <b>(3)</b>&nbsp;<strong>Contra-indicações</strong>: Hipersensibilidade (alergia) às penicilinas.`;
        } else if(this.farmaco === "procaina") {
            nota = `<b>(1)</b> Ao administrar injecção I.M., assegurar cumprimento das normas para o efeito e aspirar sempre antes de fazer a injecção da penicilina (risco de reacções graves à procaína com injecção E.V. inadvertida). <b>(2)</b>&nbsp;Nunca injectar por via E.V. ou S.C. <b>(3)</b>&nbsp;<strong>Contra-indicações</strong>: Hipersensibilidade (alergia) à penicilina ou à procaína.`;
        } else if(this.farmaco.includes("amox")) {
            nota = `<strong>Contra-indicações</strong>: Hipersensibilidade (alergia) às penicilinas, mononucleose infecciosa, leucemia linfocítica crónica.`;
        } else if(this.farmaco === "azitromicina") {
            nota = `<b>(1)</b> Não tomar ao mesmo tempo que medicamentos que contêm alumínio e magnésio. <b>(2)</b>&nbsp;<strong>Contra-indicações</strong>: Hipersensibilidade (alergia) à azitromicina ou à outro macrólido. Insuficiência hepática.`;
        }else if(this.farmaco.includes("eritromicina")) {
            nota = `Fármaco seguro e eficaz mas que com frequência provoca intolerância gastrointestinal (dor abdominal, anorexia, náusea, vómitos, diarreia). Ocasionalmente elevação transitória das transaminases hepáticas, prurido anal, estomatite.`;
        }  else if(this.farmaco === "ctz-susp") {
            nota = `<b>(1)</b> Interrogar sempre o doente ou familiares sobre antecedentes de alergia às sulfamidas e se fez algum tratamento com sulfamidas (ex. sulfadoxina-pirimetamina) nas 3 semanas anteriores e neste último caso, evitar o cotrimoxazol. <b>(2)</b>&nbsp;Devido à gravidade dos efeitos adversos hematológicos e alérgicos, prescrever o cotrimoxazol unicamente quando não houver alternativa mais segura. <b>(3)</b>&nbsp;Aconselhar o doente a ingerir líquidos com abundância durante o tratamento para a prevenção da cristalúria e litíase renais. <b>(4)</b>&nbsp;<strong>Contra-indicações</strong>: Antecedentes de alergia à sulfamidas; crianças menores de 6 semanas devido ao risco de kernicterus; insuficiência renal ou hepática; discrasias sanguíneas e porfiria.`;
        } else if(this.farmaco === "cloranfenicol-susp") {
            nota = `<b>(1)</b> Deve ser usado com cuidado sobretudo em recém-nascidos e somente em situações em que não haja disponível alternativa mais segura. <b>(2)</b>&nbsp;Sobretudo em crianças, reservar o uso do cloranfenicol unicamente para quadros graves, intra-hospitalares, que não tenham respondido a outros antibióticos ou quando há comprovação ou suspeita forte de se tratar de febre tifóide ou ricketsiose. <b>(3)</b>&nbsp;Evitar o uso repetido e os tratamentos prolongados. <b>(4)</b>&nbsp;O fenobarbital e a rifampicina diminuem os níveis plasmáticos do cloranfenicol. <b>(5)</b>&nbsp;Os efeitos secundários mais graves são as discrasias sanguíneas e a <a href="https://pt.wikipedia.org/wiki/S%C3%ADndrome_do_beb%C3%AA_cinzento" target="_blank">síndrome do bebé cinzento</a>.`;
        } else if(this.farmaco.includes("metronidazol")) {
            nota = `A dose de Metronidazol é variável conforme o tipo e gravidade da infecção. A dose acima pode ser usada para o <b>tratamento de amebíase ou infecção não severa por bactérias anaeróbias</b>.`;
        } else if(this.farmaco.includes("mebendazol")) {
            nota = `<b>(1)</b> Administrar de preferência no intervalo das refeições. <b>(2)</b> Nas infestações maciças, sobretudo por Ancylostoma e Enterobius, convém repetir um novo ciclo de tratamento passadas 2-4 semanas. <b>(3)</b> Na ascaridíase pode-se usar como esquema alternativo uma dose única de 500 mg. <b>(4)</b> Na triquinose prolongar o tratamento por 5 dias associando-se, se necessário, prednisolona para alívio dos sintomas alérgicos e inflamatórios.`;
        } else if(this.farmaco === "al" && this.peso >= 5) {
            nota = `<b>(1)</b> Se o paciente vomitar na primeira meia hora após a administração do medicamento, deve-se repetir a toma. Se os vómitos persistirem, deve ser colocada a hipótese de malária complicada. <b>(2)</b> Para melhorar a sua absorção, os comprimidos devem ser administrados após a ingestão de alimentos ou líquidos que contenham gorduras (por ex.: leite de coco, leite de vaca, manteiga, verdura com amendoim ou coco etc.). <b>(3)</b> <strong>Deve-se evitar tratar as Síndromes febris suspeitas de malária com antimaláricos sem confirmação laboratorial.</strong> O tratamento antimalárico deve ser dispensado apenas aos doentes com resultados positivos (TDR) e/ou quando se observam parasitas no sangue ou, <strong>excepcionalmente</strong> nos casos de suspeita em que não é possível confirmar a doença por falta dos meios auxiliares de diagnóstico (Malária clínica). <b>(4)</b> O Arteméter-Lumefantrina é bem tolerado, os efeitos adversos mais frequentes são: dor abdominal, anorexia (falta de apetite), náuseas, vómitos, diarreia, cefaleia (dor de cabeça), tonturas, distúrbios do sono e fadiga.`;
        } else if(this.farmaco === "al" && this.peso < 5) {
            nota = `<strong>Não recomendado. Tratar como Malária grave.</strong>`
        } else if(this.farmaco.includes("quinina")) {
            nota = `Os comprimidos devem ser tomados com água potável. Se ocorrer vómito na primeira meia hora após a administração do medicamento, deve repetir-se a toma. Se os vómitos persistirem, deve ser colocada a hipótese de malária complicada.`;
        } else if(this.farmaco.includes("paracetamol")) {
            nota = `Em geral é muito bem tolerado. Raramente podem ocorrer reacções cutâneas de hipersensibilidade, neutropenia e trombocitopenia. A administração prolongada pode levar a nefro ou hepatotoxicidade.`;
        } else if(this.farmaco.includes("metoclopramida")) {
            nota = `<b>(1)</b> Efeitos secundários extra-piramidais (especialmente em crianças e jovens adultos),
            hiperprolactinemia (ginecomastia, galactorreia, diminuição da libido). <b>(2)</b>&nbsp;<strong>Contra-indicações</strong>: Obstrução, perfuração ou hemorragia gastrointestinal; 3-4 dias depois de cirurgia gastrointestinal; no feocromocitoma; durante a lactação.`;
        } else if(this.farmaco === "ibuprofeno-susp") {
            nota = `<b>(1)</b> Associado à zidovudina há um risco maior de toxicidade hematológica. <b>(2)</b> A sua concentração plasmática é aumentada em associação com ritonavir.`;
        } else if(this.farmaco.includes("clorfeniramina")) {
            nota = `Os efeitos secundários incluem: sonolência, sensação de fadiga, tonturas, secura da boca e visão turva. Em
            altas doses, pode provocar confusão e ataxia.`;
        }  else {
            nota = "";
        }
        return nota;
    }
    determinarDose() {
        let dose = this.dosePorKg * this.peso / this.posologia;
        if("metoclopramida-susp" === this.farmaco) {
            this.peso < 10 ? ( dose = 1, this.posologia = "2")
            : dose = this.peso <= 14 ? 1 
            : this.peso <= 19 ? 2
            : this.peso <= 29 ? 2.5
            : this.peso <= 34 ? 5
            : 10; 
        } else if("al" === this.farmaco) {
            if(this.peso < 5)
                return 'Ver <b>Notas e Precauções</b>.';
            dose = this.peso < 15 ? 1 
            : this.peso < 25 ? 2 
            : this.peso < 35 ? 3 
            : 4;
        } else if("quinina" === this.farmaco) {
            dose = this.peso < 10 ? "<sup>1</sup>/<sub>4</sub>"
            : this.peso <= 15 ? "<sup>1</sup>/<sub>2</sub>"
            : this.peso <= 25 ? "<sup>3</sup>/<sub>4</sub>"
            : this.peso <= 35 ? 1 
            : 2;
        } else if("mebendazol-100" === this.farmaco) {
            dose = this.peso < 20 ? "<sup>1</sup>/<sub>2</sub>"
            : 1;
        }
        dose > this.doseMaxima && (dose = this.doseMaxima);
        // Converter dose para de mg para ml
        let doseEmMl;
        if("ml" === this.getUnidadeDeMedicaoDaDose()) {
            doseEmMl = dose * this.diluicao / this.dosagem;
            doseEmMl = doseEmMl.toFixed(1);
            dose = doseEmMl
        } 
        if("U.I via I.M profunda" === this.getUnidadeDeMedicaoDaDose()) {
            dose = Number(dose).toLocaleString();
        }
        return this.printDose(dose)
    }
    printDose(dose) {
        return `${dose} ${this.getUnidadeDeMedicaoDaDose()} ${this.getPosologia()}.`;
    }
}
function instantiateDoser() {
    let weight = document.querySelector(".doser__input--weight").value;
    if(weight !== "" && weight < 1) {
        doserGeneralFunctions.showMinWeightAlert();
        doserGeneralFunctions.clearDoseAndnote();
    } else if(weight !== "" && weight >= 1) {
        doserGeneralFunctions.clearMinWeightAlert();
        doserGeneralFunctions.clearDoseAndnote();
        const medicines = document.querySelectorAll(".doser__select__option");
        let selectedMedicine;
        for (const medicine of medicines) {
            if(medicine.matches(".--selected")) {
                selectedMedicine = medicine;
            }
        }
        // Se não for option de placeholder
        if(selectedMedicine.dataset.nome) {
            let farmaco = selectedMedicine.dataset.nome;
            let dosagem = selectedMedicine.dataset.dos;
            let diluicao = selectedMedicine.dataset.dil;
            let forma = selectedMedicine.dataset.forma;
            let dosePorKg = selectedMedicine.dataset.doseporkg;
            let doseMaxima = selectedMedicine.dataset.dosemax; 
            let posologia = selectedMedicine.dataset.pos; 
            let doserObject = new Doser(weight, farmaco, dosagem, diluicao, forma, dosePorKg, doseMaxima, posologia) 
            let doseOutput = document.querySelector(".doser__section__dose");
            let noteOutput = document.querySelector(".doser__section__note");
            doseOutput.innerHTML = `<p class="doser__section__note">${doserObject.determinarDose()}</p>`;
            noteOutput.innerHTML = doserObject.getNotasEprecaucoes();
            // Add Padding to the note when it has some content or remove when it does not to avoid bg-color appearing
            noteOutput.textContent !== "" ? noteOutput.classList.remove("doser__section__note--no-padding")
            : noteOutput.classList.add("doser__section__note--no-padding");
        }
    } else {
        doserGeneralFunctions.clearMinWeightAlert();
        doserGeneralFunctions.clearDoseAndnote();
    }
}
function listenToDoserEvents() {
     // Highlight focused input
     const inputForWeight = document.querySelector(".doser__input--weight");
     inputForWeight.addEventListener("focusin", () => doserGeneralFunctions.highlightFocusedInput(inputForWeight.parentElement));
     // Remove highlight from the input
     inputForWeight.addEventListener("focusout", () => doserGeneralFunctions.removehighlightFromFocusedInput(inputForWeight.parentElement));
    // Toggle select (Open or Close);
    const selectOpeners = document.querySelectorAll(".doser__select__option, .select-opener");
    selectOpeners.forEach(opener => {
        opener.addEventListener("click", doserGeneralFunctions.openOrCloseSelect);
    });
    // Close select 
    const btnSelectCloser = document.querySelector(".doser__select__btn--close");
    btnSelectCloser.addEventListener("click", doserGeneralFunctions.closeSelect);
    // Close select by clicking anywhere 
    window.addEventListener("click", event => {
        !event.target.matches(".doser__select, .doser__select *, .select-opener") && doserGeneralFunctions.closeSelect();
    });
    // Select an option
    const medicines = document.querySelectorAll(".doser__select__option");
    medicines.forEach( medicine => {
        medicine.addEventListener("click", () => doserGeneralFunctions.selectAnOption(medicine));
    });
    // Search an option
    const inputTypeSearch = document.querySelector(".doser__select__input--search");
    inputTypeSearch.addEventListener("input", () => doserGeneralFunctions.filterAnOption(inputTypeSearch.value));
    // Determine doses
    inputForWeight.addEventListener("input", instantiateDoser);
    const medicinesAndMenuTabs = document.querySelectorAll(".doser__select__option, .header__main-menu__btn");
    medicinesAndMenuTabs.forEach( target => {
        target.addEventListener("click", instantiateDoser);
    });
}
window.addEventListener("load", listenToDoserEvents);