"use strict";

class Calculadora {
    constructor(peso, farmaco, dosagem, diluicao, formaFarmaceutica, doseporkg, dosemaxima, posologia) {
        this.peso = peso;
        this.farmaco = farmaco;
        this.dosagem = dosagem;
        this.diluicao = diluicao;
        this.formaFarmaceutica = formaFarmaceutica;
        this.doseporkg = doseporkg;
        this.dosemaxima = dosemaxima;      
        this.posologia = posologia;   
    }

    get retornarFormafarmaceutica(){
		let forma;
        
        if(this.formaFarmaceutica === "susp") {
            forma = "ml";
        } else if(this.formaFarmaceutica === "inj-im"){
            forma = "U.I via I.M profunda";
        } else {
            forma = this.formaFarmaceutica;
        }
		return forma;
	}

    get retornarPosologia() {
        let pos;
        
        if(this.posologia === "1") {
			pos = "dose única diária";
        } 
        else if(this.posologia === "2") {
            pos = "de 12 em 12 horas";
            if(this.farmaco === "al" && this.farmaco === "mebendazol-100") pos+= " durante 3 dias consecutivos";
        } 
        else if(this.posologia === "3") {
            pos = "de 8 em 8 horas";
            if(this.farmaco === "quinina") pos+= " durante 7 dias consecutivos"
        } 
        else if(this.posologia === "4") {
            pos = "de 6 em 6 horas";
        }

        return pos;
    }

    mostrarNota(){	
		if(this.farmaco === "fenox-susp") {
            camposDoseEnota[1].innerHTML = `Administrar as doses de preferência 30 minutos antes das refeições.`;
        }

        else if(this.farmaco === "benzatina" || this.farmaco ==="procaina") {
            camposDoseEnota[1].innerHTML = `<strong>Nunca injectar por via endovenosa ou subcutânea.</strong>`; 
        }

        else if(this.farmaco === "azitromicina") {
            camposDoseEnota[1].innerHTML = `Não tomar ao mesmo tempo que medicamentos que contêm alumínio e magnésio (ex.: hidróxido de alumínio e hidróxido de magnésio).`; 
        } 

        else if(this.farmaco === "ctz-susp") {
            camposDoseEnota[1].innerHTML = `Recomenda-se a ingestão de líquidos com abundância durante o tratamento para a prevenção da cristalúria e litíase renais (cálculos ou "pedrinhas" nos rins). Devido à gravidade dos efeitos adversos hematológicos e alérgicos, prescrever o Cotrimoxazol unicamente quando não houver alternativa mais segura.`; 
        } 

        else if(this.farmaco === "cloranfenicol-susp") {
            camposDoseEnota[1].innerHTML = `Sobretudo em crianças, reservar o uso do Cloranfenicol unicamente para quadros graves, que não tenham respondido a outros antibióticos ou quando há comprovação ou suspeita forte de se tratar de Febre Tifóide. Entre os efeitos adversos mais graves, inclui a <b>Síndrome de bebé cinzento</b>. Manifesta-se 2 a 9 dias após início do tratamento por <em>distensão abdominal, vómitos, respiração anormal, cianose, letargia, seguida de colapso vasomotor, hipotermia</em> e "<b>cianose cinzenta</b>". Aparece sobretudo em prematuros ou quando se administra o Cloranfenicol nas primeiras 2 semanas de vida. Pode ocorrer também em crianças até aos 2 anos. `; 
        } 

        else if(this.farmaco.includes("metronidazol")) {
            camposDoseEnota[1].innerHTML = `A dose por kg de peso de Metronidazol é variável em conformidade com o tipo e gravidade da infecção. A dose acima é para o <b>tratamento de infecção por bactérias anaeróbias</b>.`; 
        } 

        else if(this.farmaco === "al" && this.peso >= 5) {
            camposDoseEnota[1].innerHTML = `Para melhorar a sua absorção, recomenda-se tomar os comprimidos com alimentos ricos em gordura (ex.: verdura com amendoim ou coco, manteiga, leite de coco, leite de vaca, entre outros).`; 
        } 

        else if(this.farmaco === "al" && this.peso < 5) {
            camposDoseEnota[0].innerHTML = ``; 
            camposDoseEnota[1].innerHTML = `<strong>Não recomendado. Tratar como Malária grave.</strong>`; 
        }
         
        else if(this.farmaco === "quinina") {
            camposDoseEnota[1].innerHTML = `Evitar o uso concomitante com os anti-ácidos, pois aumentam a toxicidade da Quinina.`; 
        } 
        
        else if(this.farmaco === "ibuprofeno-susp") {
            camposDoseEnota[1].innerHTML = `Associado à zidovudina, há um risco maior de toxicidade hematológica. A sua concentração plasmática é aumentada em associação com ritonavir.`; 
        } 

        else {
            camposDoseEnota[1].innerHTML = ``; 
        } 
    }

    printarDose(dose) {
        camposDoseEnota[0].innerHTML = `${dose} ${this.retornarFormafarmaceutica} ${this.retornarPosologia}.`;

        if(this.farmaco=="benzatina") {
            camposDoseEnota[0].innerHTML = `${dose} ${this.retornarFormafarmaceutica} dose única (na Sífilis recente) ou ${dose} U.I por semana durante 3 semanas (na Sífilis tardia).`;
        } 
    }
    
    calcularDose(){
        let dosemg = this.doseporkg * this.peso / this.posologia;
        
        if(this.farmaco === "metoclopramida-susp"){
			if(this.peso < 10) {
                dosemg = 1;
                this.posologia = "2";
			}
			else if(this.peso <= 14){dosemg = 1;}
			else if(this.peso <= 19){dosemg = 2;}
			else if(this.peso <= 29){dosemg = 2.5;}
			else if(this.peso <= 34){dosemg = 5;}
			else {dosemg = 10;}
        } 
        else if(this.farmaco === "al"){
            if(this.peso<5){
                this.mostrarNota();
                return false;
            } 
            else if(this.peso < 15) {dosemg = 1;} 
            else if(this.peso < 25) {dosemg = 2;} 
            else if(this.peso < 35) {dosemg = 3;} 
            else {dosemg = 4;};
        } 
        else if(this.farmaco === "quinina"){
            if(this.peso < 10){dosemg = "1/4";}
            else if(this.peso <= 15){dosemg = "1/2";}
            else if(this.peso <= 25){dosemg = "3/4";}
            else if(this.peso <= 35){dosemg = 1;}
            else if(this.peso > 35){dosemg = 2;}
        }
        else if(this.farmaco === "mebendazol-100"){
            if(this.peso < 20){
                dosemg = "1/2";
            } else {
                dosemg = 1;
            }
        } 

		// DOSES MÁXIMAS
		if( dosemg > this.dosemaxima){
            dosemg = this.dosemaxima;
		}

        // CONVERSÃO DA DOSE DE MG PARA ML
        if(this.retornarFormafarmaceutica === "ml") {
            let doseml = dosemg * this.diluicao / this.dosagem;	
            dosemg = doseml.toFixed(1);;
        } else if (this.retornarFormafarmaceutica === "U.I via I.M profunda"){
            dosemg = Number(dosemg).toLocaleString();
        }
        
        this.printarDose(dosemg);
        this.mostrarNota();
    } 
}

const objectoDarv = {
    validarPeso() {
        const msg = "O peso deve estar no intervalo de 3 à 45 kg.";
        const output = document.querySelector("p.msg-de-validacao-de-peso");     
        const omitirMsgDeValidacao = () => {
            output.innerHTML = "";
            output.classList.remove("on");
        }

        if(peso.value != "") {
            if (peso.value < 3 || peso.value > 45) {
                output.innerHTML = msg;
                output.classList.add("on");
                this.limparCamposDeSaida();
                
            } else {
                omitirMsgDeValidacao();
                return true;
            }
        } else {
            omitirMsgDeValidacao();
            this.limparCamposDeSaida();
        }
    },

    instanciarClasse () {
        if(this.validarPeso()) {
            let farmacoSelecionado, dosagem, diluicao, formaFarmaceutica, dosePorKg, dosemaxima, posologia;
    
            for (const farmaco of farmacos) {
                if(farmaco.matches(".selected")) {
                    farmacoSelecionado = farmaco.dataset.nome;
                    dosagem = farmaco.dataset.dos;
                    diluicao = farmaco.dataset.dil;
                    formaFarmaceutica = farmaco.dataset.forma;
                    dosePorKg = farmaco.dataset.doseporkg;
                    dosemaxima = farmaco.dataset.dosemax;                   
                    posologia = farmaco.dataset.pos;

                    if(farmaco.matches(".placeholder")) {
                        return false;
                    }
                } 
            }

            // Parâmetros da classe: (peso, farmaco, dosagem, diluicao, formaFarmaceutica, doseporkg, dosemaxima, posologia)
            const dose = new Calculadora(peso.value, farmacoSelecionado, dosagem, diluicao, formaFarmaceutica, dosePorKg, dosemaxima, posologia);
            dose.calcularDose();
    
            // Adicionar Padding ao 'p.recomendacao'  
            for (const campo of camposDoseEnota) {
                if(campo.textContent.length > 0) {
                    campo.classList.add("pad-10");    
                } else {
                    campo.classList.remove("pad-10");
                }
            }  
            
        }
    },

    limparCamposDeSaida() {
        for (const campo of camposDoseEnota) {
            campo.textContent = "";
            campo.classList.remove("pad-10");
        }
    }
}

var peso, farmacos, camposDoseEnota;
window.addEventListener("load", () => {
    peso = document.querySelector("input#peso");
    farmacos = document.querySelectorAll("ul.select li");
    camposDoseEnota = document.querySelectorAll("p.dose, p.nota");
    
    // Eventos
    peso.addEventListener("input", () => objectoDarv.instanciarClasse());
    farmacos.forEach ( arv => arv.addEventListener("click", () => objectoDarv.instanciarClasse()));
});