"use strict";

class Calculadora {
    constructor(peso, farmaco, doseporkg, dosagem, diluicao, posologia) {
        this.peso = peso;
        this.farmaco = farmaco;
        this.doseporkg = doseporkg;
        this.dosagem = dosagem;
        this.diluicao = diluicao;
        this.posologia = posologia;
    }

    get retornarFormafarmaceutica(){
		let forma;
        if(this.farmaco === "benzatina" || this.farmaco ==="procaina") {
            forma = "U.I";
        } 
        else if (this.farmaco === "al" || 
            this.farmaco ==="quinina" || 
            this.farmaco ==="mebendazol-100") {
                forma = "cp(s)";
        } 
        else {
            forma = "ml";
        }
		return forma;
	}

    get retornarPosologia() {
        let pos;
        
        if(this.farmaco=="benzatina") {
			pos = "dose única (na Sífilis recente) ou uma dose por semana durante 3 semanas (na Sífilis tardia)";
        } 
        else if(this.posologia === "1") {
			pos = "dose única diária";
        } 
        else if(this.posologia === "2") {
            pos = "de 12 em 12 horas";
            if(this.farmaco === "al") pos+= " durante 3 dias consecutivos"
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
            camposDoseEnota[1].innerHTML = `Não tomar ao mesmo tempo que medicamentos que contêm alumínio e magnésio (ex.: Hidróxido de Alumínio e Hidróxido de Magnésio).`; 
        } 

        else if(this.farmaco === "ctz-susp") {
            camposDoseEnota[1].innerHTML = `Recomenda-se a ingestão de líquidos com abundância durante o tratamento para a prevenção da cristalúria e litíase renais (cálculos ou "pedrinhas" nos rins). Devido à gravidade dos efeitos adversos hematológicos e alérgicos, prescrever o Cotrimoxazol unicamente quando não houver alternativa mais segura.`; 
        } 

        else if(this.farmaco === "cloranfenicol-susp") {
            camposDoseEnota[1].innerHTML = `Sobretudo em crianças, reservar o uso do Cloranfenicol unicamente para quadros graves, que não tenham respondido a outros antibióticos ou quando há comprovação ou suspeita forte de se tratar de Febre Tifóide. Entre os efeitos adversos mais graves, inclui a <b>Síndrome de bebé cinzento</b>. Manifesta-se 2 a 9 dias após início do tratamento por distensão abdominal, vómitos, respiração anormal, cianose, letargia, seguida de colapso vasomotor, hipotermia e "<b>cianose cinzenta</b>". Aparece sobretudo em prematuros ou quando se administra o Cloranfenicol nas primeiras 2 semanas de vida. Pode ocorrer também em crianças até aos 2 anos. `; 
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
            camposDoseEnota[1].innerHTML = `Evitar o uso concomitante com os Antiácidos, pois aumentam a toxicidade da Quinina.`; 
        } 
        
        else if(this.farmaco === "ibuprofeno-susp") {
            camposDoseEnota[1].innerHTML = `Associado à Zidovudina há um risco maior de toxicidade hematológica. A sua concentração plasmática é aumentada em associação com Ritonavir.`; 
        } 

        else {
            camposDoseEnota[1].innerHTML = ``; 
        } 
    }

    printarDose(dose) {
        camposDoseEnota[0].innerHTML = `${dose} ${this.retornarFormafarmaceutica} ${this.retornarPosologia}.`;
    }
    
    calcularDose(){
		let dosemg = this.doseporkg * this.peso / this.posologia;

		// DOSES MÁXIMAS
		if(this.farmaco === "clorfeniramina-susp" && dosemg >= 4){
			dosemg = 4;
		}
		else if(this.farmaco === "clavamox-susp" && dosemg >= 625){
			dosemg = 625;
        }

        else if (this.farmaco === "ctz-susp" && dosemg >= 960){
            dosemg = 960; 
        }

       /* else if (this.farmaco !== "clavamox-susp" && this.farmaco !== "ctz-susp" && dosemg >= 500){
            dosemg = 500;
        }*/

        else if(this.farmaco === "metoclopramida-susp"){
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
		
		// CONVERSÃO DA DOSE DE MG PARA ML
        let doseml = dosemg * this.diluicao / this.dosagem;	

        if(this.farmaco === "benzatina" || this.farmaco === "procaina") {
            doseml = dosemg.toLocaleString();
        }
        else if(this.farmaco === "al"){
            let dose;

            if(this.peso<5){
                this.mostrarNota();
                return false;
            } 
            else if(this.peso < 15) {dose = 1;} 
            else if(this.peso < 25) {dose = 2;} 
            else if(this.peso < 35) {dose = 3;} 
            else {dose=4;}
            
            doseml = dose;
        }       
        else if(this.farmaco === "quinina"){
            let dose;

            if(this.peso < 10){dose = "1/4";}
            else if(this.peso <= 15){dose = "1/2";}
            else if(this.peso <= 25){dose = "3/4";}
            else if(this.peso <= 35){dose = 1;}
            else if(this.peso > 35){dose = 2;}

            doseml = dose;
        }
        else if(this.farmaco === "mebendazol-100"){
            let dose;

            if(this.peso < 20){
                dose="1/2";
            } else {
                dose=1;
            }
            doseml = dose;
        } 	
        else {
            doseml = doseml.toFixed(1);
        }

        this.printarDose(doseml);
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
            let farmacoSelecionado, dosagem, diluicao, dosePorKg, posologia;
    
            for (const farmaco of farmacos) {
                if(farmaco.matches(".selected")) {
                    farmacoSelecionado = farmaco.dataset.nome;
                    dosePorKg = farmaco.dataset.doseporkg;
                    dosagem = farmaco.dataset.dos;
                    diluicao = farmaco.dataset.dil;
                    posologia = farmaco.dataset.pos;

                    if(farmaco.matches(".placeholder")) {
                        return false;
                    }
                } 
            }
            const dose = new Calculadora(peso.value, farmacoSelecionado, dosePorKg, dosagem,diluicao, posologia);
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