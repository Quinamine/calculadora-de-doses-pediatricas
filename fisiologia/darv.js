"use strict";

class Darv {
    constructor(peso, arv){
        this.peso = peso;
        this.arv = arv;
    }

    get retornarFormaFarmaceutica(){
        let forma;

        if( (this.arv.includes("xpe")) || (this.arv.includes("susp"))) {
            forma = "ml";
        }
        else if(this.arv==="LPV/r-40-10mg") {
            forma = "saquetas";
        }

        else {
            forma = "cp(s)";
        }
        return forma;
    }

    get retornarEmbalagem(){
        let embalagem;

        if(this.arv==="LPV/r-xpe"){
            embalagem = "frascos de 60 ml para";
        }

        else if ((this.arv==="CTZ-susp") || (this.arv==="AZT-xpe")){
            embalagem = "frascos de 100 ml para"
        }
        else if(this.arv==="LPV/r-40-10mg") {
            embalagem = "saquetas para";
        }

        else {
            embalagem = "comprimidos para";
        }
        return embalagem;
    }

    // MÉTODO DE RECOMENDAÇÃO 
    mostrarRecomendacao(){

        // ABACAVIR + LAMIVUDINA 
        if((this.arv==="ABC") && (this.peso>=25)
        || (this.arv==="ABC/3TC-60-30mg") && (this.peso>=25)
        || (this.arv==="ABC/3TC-120-60mg") && (this.peso>=25)) {
            recomendacaoOutput.innerHTML = `Para peso &ge; 25 kg, recomenda-se o "<b>ABC/3TC 600 mg/300 mg Comp.</b>".`;
        }

        else if((this.arv==="ABC/3TC-600-300mg") && (this.peso<25)) {
            recomendacaoOutput.innerHTML = `Para peso &lt; 25 kg, recomenda-se o "<b>ABC/3TC 120 mg/60 mg Comp.</b>" ou "<b>ABC/3TC 60 mg/30 mg Comp.</b>".`; 
        }

        // LOPINAVIR + RITONAVIR 
        else if ((this.arv==="LPV/r-40-10mg") && (this.peso>=20)
        || (this.arv==="LPV/r-xpe") && (this.peso>=20)) {
            recomendacaoOutput.innerHTML = `Para peso &ge; 20 kg, recomenda-se o "<b>LPV/r 100 mg/25 mg Comp.</b>" ou "<b>LPV/r 200 mg/50 mg Comp.</b>".`; 
        }

        else if(this.arv==="ABC/3TC-LPV/r") {
            if ((this.peso>=20) && (this.peso<25)) {
                recomendacaoOutput.innerHTML = `Para peso &ge; 20 kg, recomenda-se o "<b>ABC/3TC 120 mg/60 mg Comp.</b>" e o "<b>LPV/r 100 mg/25 mg Comp.</b>" ou "<b>LPV/r 200 mg/50 mg Comp.</b>".`;
            } 
            else if(this.peso>=25){
                recomendacaoOutput.innerHTML = `Para peso &gt; 25 kg, recomenda-se o "<b>ABC/3TC 600 mg/300 mg Comp.</b>" e o "<b>LPV/r 100 mg/25 mg Comp.</b>" ou "<b>LPV/r 200 mg/50 mg Comp.</b>".`;
            }

            else {
                recomendacaoOutput.innerHTML = "";
            }
        }

        else if ((this.arv==="LPV/r-100-25mg") && (this.peso>=10) 
        || (this.arv==="LPV/r-200-50mg") && (this.peso>=14)) {
            recomendacaoOutput.innerHTML = `Os comprimidos não podem ser partidos, esmagados ou mastigados, pois a eficácia reduz muito se assim forem manipulados.`; 
        } 

        else if ((this.arv==="LPV/r-100-25mg") && (this.peso<10)) {
            recomendacaoOutput.innerHTML = `Para peso &lt; 10 kg, recomenda-se o "<b>LPV/r 40 mg/10 mg Cáps./Saquetas</b>" ou "<b>LPV/r 80 mg/20 mg/ml Xarope</b>".`; 
        }

        else if(this.arv==="LPV/r-200-50mg"){
            if(this.peso<10){
                recomendacaoOutput.innerHTML = `Para peso &lt; 10 kg, recomenda-se o "<b>LPV/r 40 mg/10 mg Cáps./Saquetas</b>" ou "<b>LPV/r 80 mg/20 mg/ml Xarope</b>".`; 
            }

            else if(this.peso<14){
                recomendacaoOutput.innerHTML = `Para peso &lt; 14 kg, recomenda-se o "<b>LPV/r 100 mg/25 mg Comp.</b>" ou "<b>LPV/r 40 mg/10 mg Cáps./Saquetas</b>".`;  
            }
        }
        
        // DOLUTEGRAVIR 
        else if((this.arv==="TDF/3TC/DTG") && (this.peso<30)) {
            recomendacaoOutput.innerHTML = `A Dose Fixa Combinada (DFC) de "<b>TDF/3TC/DTG 300/300/50 mg Comp.</b>" está indicada apenas para crianças com peso &ge; 30 kg.`; 
        }
   
        else if((this.arv==="pDTG-10mg") && (this.peso>=20)) {
            recomendacaoOutput.innerHTML = `Para peso &ge; 20 kg, recomenda-se o "<b>DTG 50 mg Comp.</b>".`; 
        }

        else if((this.arv==="DTG-50mg") && (this.peso<20)) {
            recomendacaoOutput.innerHTML = `Para peso &lt; 20 kg, recomenda-se o "<b>pDTG 10 mg Comp.</b>".`;  
        }

        else if((this.arv==="pDTG-10mg") && (this.peso<20) 
        || (this.arv==="DTG-50mg") && (this.peso>=20)) {       
            recomendacaoOutput.innerHTML = `<strong>Importante:</strong> Não é recomendado tomar o DTG ao mesmo tempo que as Vitaminas, Sulfato Ferroso, Fenitoína ou Antiácidos, pois reduzem a concentração plasmática do DTG. Nestes casos, recomenda-se tomar o DTG no mínimo 2 horas antes ou 6 horas depois da toma destes medicamentos.`; 
        }

        // AZIDOTIMIDINA + LAMIVUDINA  
        else if ((this.arv==="AZT-xpe") && (this.peso>=14)) {
            recomendacaoOutput.innerHTML = `O "<b>AZT 10 mg/ml Xarope</b>" é recomendado para crianças com peso &lt; 14 kg.`; 
        }

        else if ((this.arv==="Duovir-ped") && (this.peso>=25)) {
            recomendacaoOutput.innerHTML = `Para peso &ge; 25 kg, recomenda-se o "<b>AZT/3TC 300 mg/150 mg Comp.</b>".`; 
        }

        else if ((this.arv==="Duovir-adult") && (this.peso<14)) {
            recomendacaoOutput.innerHTML = `Para peso &lt; 14 kg, recomenda-se o "<b>AZT/3TC 60 mg/30 mg Comp.</b>".`; 
        }

        // AZIDOTIMIDINA + LAMIVUDINA + NEVIRAPINA 
        else if ((this.arv==="DuovirN-ped") && (this.peso>=25)) {
            recomendacaoOutput.innerHTML = `Para peso &ge; 20 kg, recomenda-se o "<b>AZT/3TC/NVP 300/150/200 mg Comp.</b>"`; 
        }

        else if ((this.arv==="DuovirN-adult") && (this.peso<14)) {
            recomendacaoOutput.innerHTML = `Para peso &lt; 14 kg, recomenda-se o "<b>AZT/3TC/NVP 60/30/50 mg Comp.</b>".`; 
        }

        // TENOFOVIR + LAMIVUDINA 
        else if ((this.arv==="TDF/3TC") && (this.peso<30)) {
            recomendacaoOutput.innerHTML = `A Dose Fixa Combinada (DFC) de "<b>TDF/3TC 300 mg/300 mg Comp.</b>" está indicada apenas para crianças com peso &ge; 30 kg. Constitui o fármaco de eleição para Profilaxia Pré-Exposição (PrEP).`; 
        }

         // TENOFOVIR + LAMIVUDINA + EFAVIRENZ-400
        else if ((this.arv==="TDF/3TC/EFV-400") && (this.peso<30)) {
            recomendacaoOutput.innerHTML = `A Dose Fixa Combinada (DFC) de "<b>TDF/3TC/EFV 300/300/400 mg Comp.</b>" está indicada apenas para crianças com peso &ge; 30 kg.`; 
        }

        // TENOFOVIR + LAMIVUDINA + EFAVIRENZ-600
        else if((this.arv==="TDF/3TC/EFV-600") && (this.peso<35)){
            recomendacaoOutput.innerHTML = `O "<b>TDF/3TC/EFV 300/300/600 mg Comp.</b>" só pode ser tomado por pacientes com peso &ge; 35 kg.`; 
        }

        // ATAZANAVIR
        else if(this.arv==="ATV/r") {
            if(this.peso<25){
                recomendacaoOutput.innerHTML = `O "<b>ATV/r 300 mg/100 mg Comp.</b>" só pode ser tomado por pacientes com peso &ge; 25 kg.`; 
            }
            else {
                recomendacaoOutput.innerHTML = `<strong>Importante</strong>: Pacientes que estiverem a usar a Rifampicina (RIF) devem <b>substituir o ATV/r por DTG e ajustar a dose de DTG (DTG 12/12 horas)</b> durante o tempo que recebem RIF e por mais 2 semanas. Depois mantêm o DTG e passam a tomar apenas 1 vez/dia.`; 
            }
        }
 
        // RALTEGRAVIR  
        else if((this.arv==="RAL-25") && (this.peso>=25)) {
            recomendacaoOutput.innerHTML = `Para peso &ge; 25 kg, recomenda-se o "<b>RAL 400 mg Comp.</b>".`; 
        }

        else if ((this.arv==="RAL-400") && (this.peso<25)) {
            recomendacaoOutput.innerHTML = `Para peso &lt; 25 kg, recomenda-se o "<b>RAL 25 mg Comp.</b>".`; 
        }

        // RITONAVIR 
        else if ((this.arv==="RTV-25") && (this.peso<10) || (this.arv==="RTV-100-superboosting") && (this.peso<10)) {
            recomendacaoOutput.innerHTML = `O <b>RTV isolado</b> está indicado apenas para crianças com peso &ge; 10 kg, que sejam capazes de o deglutir inteiro, pois <strong>não pode ser quebrado, esmagado, nem dissolvido em liquidos ou alimentos</strong>.`; 
        }

        else if ((this.arv==="RTV-25") && (this.peso < 25) 
        || (this.arv==="RTV-100-superboosting") && (this.peso >= 10)) {
            recomendacaoOutput.innerHTML = `O <b>RTV isolado</b> deve ser usado para fazer a <b>potenciação de LPV/r</b> em crianças co-infectadas (TB/HIV sensível) em regime contendo LPV/r. <strong>Não pode ser quebrado, esmagado, nem dissolvido em liquidos ou alimentos</strong>.`; 
        }

        else if ((this.arv==="RTV-25") && (this.peso>=25)) {
            recomendacaoOutput.innerHTML = `Para peso &ge; 25 kg, recomenda-se o "<b>RTV 100 mg Comp.</b>".`;
        }

        else if ((this.arv==="RTV-100-3alinha") && (this.peso < 14)) {
            recomendacaoOutput.innerHTML = `O "<b>RTV 100 mg Comp." como adjuvante de DRV (Darunavir) na 3ª linha</b>, está indicado apenas para crianças com peso &ge; 14 kg.`; 
        }

        // DARUNAVIR
        else if( (this.arv.includes("drv")) && (this.peso < 14)) {
            recomendacaoOutput.innerHTML = `O "<b>Darunavir</b>" está indicado apenas para crianças com peso &ge; 14 kg.`; 
        }

        else if((this.arv==="drv-75") && (this.peso >= 30) 
        || (this.arv==="drv-150") && (this.peso >= 30)) {
            recomendacaoOutput.innerHTML = `Para peso &ge; 30 kg, recomenda-se o "<b>DRV 600 mg Comp.</b>".`;
        }

        else if((this.arv==="drv-75") && (this.peso>=25) && (this.peso<30)) {
            recomendacaoOutput.innerHTML = `Para peso &ge; 25 kg, recomenda-se o "<b>DRV 150 mg Comp.</b>" ou "<b>DRV 600 mg Comp.</b>".`;
        }

        else if((this.arv==="drv-75") && (this.peso>=25) && (this.peso<30)) {
            recomendacaoOutput.innerHTML = `Para peso &ge; 25 kg, recomenda-se o "<b>DRV 150 mg Comp.</b>" ou "<b>DRV 600 mg Comp.</b>".`;
        }

        else if((this.arv==="drv-600") && (this.peso<25)) {
            recomendacaoOutput.innerHTML = `Para peso no intervalo de 14 - 24.9 kg, recomenda-se o "<b>DRV 150 mg Comp.</b>" ou "<b>DRV 75 mg Comp.</b>". <br/> Neste caso, usar o "<b>DRV 600 mg Comp.</b>" apenas na ausência destes dois.`;
        }
    
        // COTRIMOXAZOL
        else if ((this.arv==="CTZ-susp") && (this.peso>=20)) {
            recomendacaoOutput.innerHTML = `Para peso &ge; 20 kg, recomenda-se o "<b>Cotrimoxazol 480 mg Comp.</b>".`; 
        }

        // ISONIAZIDA 
        else if ((this.arv==="isoniazida-300") && (this.peso<25)) {
            recomendacaoOutput.innerHTML = `Para peso &lt; 25 kg, recomenda-se "<b>Isoniazida 100 mg Comp.</b>".`;
        }

        // LEVOFLOXACINA 
        else if ((this.arv==="levofloxacina-100") && (this.peso<26) 
        || (this.arv==="levofloxacina-250") && (this.peso>=4)) {
            recomendacaoOutput.innerHTML = `<strong>Importante:</strong> Se o caso fonte de Tuberculose Multi-resistente tiver resistência comprovada a Fluroquinolonas, o Tratamento Preventivo de Tuberculose (TPT) com Levofloxacina não deve ser oferecido.`;
        }

        else if ((this.arv==="levofloxacina-100") && (this.peso>=26)) {
            recomendacaoOutput.innerHTML = `Para peso &ge; 26 kg, recomenda-se "<b>Levofloxacina 250 mg Comp.</b>".`; 
        }

        else if ((this.arv==="levofloxacina-250") && (this.peso<4)) {
            recomendacaoOutput.innerHTML = `Para peso &lt; 4 kg, recomenda-se "<b>Levofloxacina 100 mg Comp.</b>".`; 
        }

        /** PIRIDOXINA*/
        else if((this.arv==="piridoxina-50") && (this.peso<5)) {
            recomendacaoOutput.innerHTML = `Para peso &lt; 5 kg, recomenda-se "<b>Piridoxina 25 mg Comp.</b>".`; 
        }

        else {
            recomendacaoOutput.innerHTML = "";
        }
       
    }

    // MÉTODO DE IMPRESSÃO 
    mostrarDose(doseManha, doseNoite){
        if((doseManha==="&minus;") && (doseNoite==="&minus;")){
            doseEposologiaOutput.innerHTML = `
            <table>
                <thead>
                    <tr><th>Dose-manhã</th> <th>Dose-noite</th></tr>
                </thead>
                <tbody>
                    <tr><td>${doseManha}</td> <td>${doseNoite}</td></tr>
                </tbody>
            </table>
            `;
        } else if (this.arv.includes("piridoxina")){       
            let numMensalDeCps;
            let numTrimestralDeCps;
            let duracaoMensal = "30 dias";
            let duracaoTrimestral = "90 dias";

            if(doseManha === "1/2 cp, 3 vezes por semana") {
                numMensalDeCps = 0.5 * (3*4); // Onde 3 é a posologia e 4 é o número de semanas;
                numTrimestralDeCps = 0.5 * (3*12);  // Onde 3 é a posologia e 12 é o número de semanas;
                duracaoMensal = "4 semanas";
                duracaoTrimestral = "12 semanas";
            } else if (doseManha === "1/2 cp por dia") {
                numMensalDeCps = 0.5 * 30;
                numTrimestralDeCps = 0.5 * 90;

            } else if (doseManha === "1 cp por dia") {
                numMensalDeCps = 1 * 30;
                numTrimestralDeCps = 1 * 90;

            } else if (doseManha === "2 cp(s) por dia") {
                numMensalDeCps = 2 * 30;
                numTrimestralDeCps = 2 * 90;
            }

            doseEposologiaOutput.innerHTML = `<table>
                <tr>
                    <td colspan="2">${doseManha}</td>
                </tr>
                <tr class="l3">
                    <th colspan="2">Nº de comprimidos para</th>
                </tr>
                <tr> 
                    <th>${duracaoMensal}</th> <th>${duracaoTrimestral}</th> 
                </tr>
                <tr> 
                    <td>${numMensalDeCps}</td> <td>${numTrimestralDeCps}</td> 
                </tr>
                
            </table>`;

        } else {
            let formaFarmaceuticaManha = this.retornarFormaFarmaceutica;
            let formaFarmaceuticaNoite = this.retornarFormaFarmaceutica;
            let doseMatinal = doseManha;
            let doseNoturna = doseNoite;
            
            if(doseManha==="&minus;"){
                formaFarmaceuticaManha = "&minus;";
                doseMatinal = 0;
            } else if(doseManha==="1/4") {
                doseMatinal = 0.25;
            } 

            if(doseNoite==="&minus;"){
                formaFarmaceuticaNoite = "&minus;";
                doseNoturna = 0;
            }

            let numMensalDeCps = (doseMatinal + doseNoturna)*30;
            let numTrimestralDeCps = (doseMatinal + doseNoturna)*90;

            if((this.arv==="LPV/r-xpe") || (this.arv==="CTZ-susp") || (this.arv==="AZT-xpe")){
                let capacidadeDoFrasco = 100;

                if(this.arv==="LPV/r-xpe") {
                    capacidadeDoFrasco = 60;
                }

                numMensalDeCps = Math.ceil(numMensalDeCps/capacidadeDoFrasco);
                numTrimestralDeCps = Math.ceil(numTrimestralDeCps/capacidadeDoFrasco);
            }

            doseEposologiaOutput.innerHTML = `<table>
                <thead>
                    <tr> <th>Dose-manhã</th> <th>Dose-noite</th> </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>${doseManha} <br/> ${formaFarmaceuticaManha}</td> 
                        <td>${doseNoite} <br/> ${formaFarmaceuticaNoite}</td>
                    </tr>
                </tbody>
                <thead>
                    <tr class="l3"> 
                        <th colspan="2">Nº de ${this.retornarEmbalagem}:</th> 
                    </tr>
                    <tr> <th>30 dias</th> <th>90 dias</th> </tr>
                </thead>
                <tbody>
                    <tr> 
                        <td>${numMensalDeCps}</td><td>${numTrimestralDeCps}</td>
                    </tr>
                </tbody> 
            </table>
            `;
        }

        this.mostrarRecomendacao();
        
    }

    // MÉTODO PRINCIPAL 
    calcularDose(){
        let dosemanha;
        let dosenoite;

        let peso = this.peso;

        // ABACAVIR + LAMIVUDINA 
        if((this.arv==="ABC") || (this.arv==="ABC/3TC-60-30mg")){
            if(peso<6){dosemanha = 2;}
            else if(peso<10){dosemanha = 3;}
            else if(peso<14){dosemanha = 4;}
            else if(peso<20){dosemanha = 5;}
            else if(peso<25){dosemanha = 6;}
            else {
                //this.verAbc3tcDeAdulto();
                dosemanha = "&minus;";
            }
        }

        else if(this.arv==="ABC/3TC-120-60mg"){
            if(peso<6){dosemanha = 1;}
            else if(peso<10){dosemanha = 1.5;}
            else if(peso<14){dosemanha = 2;}
            else if(peso<20){dosemanha = 2.5;}
            else if(peso<25){dosemanha = 3;}
            else {
                //this.verAbc3tcDeAdulto();
                dosemanha = "&minus;";
            }
        }

        else if(this.arv==="ABC/3TC-600-300mg"){
            if(peso<25){
                dosemanha = "&minus;";
            }
            else if(peso>=25){
                dosemanha = 1;
            }
        }

        // LOPINAVIR - RITONAVIR 
        else if(this.arv==="LPV/r-40-10mg"){
            if(peso<6){
                dosemanha = 2;
                dosenoite = 2;
            }
            else if(peso<10){
                dosemanha = 3;
                dosenoite = 3;
            }
            else if(peso<14){
                dosemanha = 4;
                dosenoite = 4;
            }
            else if(peso<20){
                dosemanha = 5;
                dosenoite = 5;
            }
            else {
                //this.verLPVde100ou200();
                dosemanha = "&minus;";
                dosenoite = "&minus;";
            }
        }

        else if(this.arv==="LPV/r-xpe"){
            if(peso<4){
                dosemanha = 1;
                dosenoite = 1;
            }

            else if(peso<10){
                dosemanha = 1.5;
                dosenoite = 1.5;
            }
            else if(peso<14){
                dosemanha = 2;
                dosenoite = 2;
            }
            else if(peso<20){
                dosemanha = 2.5;
                dosenoite = 2.5;
            }
            else {
                //this.verLPVde100ou200();
                dosemanha = "&minus;";
                dosenoite = "&minus;";
            }
        }

        else if(this.arv==="LPV/r-100-25mg"){
        
            if(peso<10){
                dosemanha = "&minus;";
                dosenoite = "&minus;";
            }

            else if(peso<14){
                dosemanha = 2;
                dosenoite = 1;
            }

            else if(peso<25){
                dosemanha = 2;
                dosenoite = 2;
            }

            else {
                dosemanha = 3;
                dosenoite = 3;
            }
        }

        else if(this.arv==="LPV/r-200-50mg"){
            if(peso<14){
                //this.verLpvXpeouCaps();
                dosemanha = "&minus;";
                dosenoite = "&minus;";
            }

            else if(peso<25){
                dosemanha = 1;
                dosenoite = 1;
            }

            else if(peso<30){
                dosemanha = 2;
                dosenoite = 1;
            }

            else {
                dosemanha = 2;
                dosenoite = 2;
            }
        }

        else if(this.arv==="ABC/3TC-LPV/r"){
            if(peso<6){
                dosemanha = 2;
                dosenoite = 2;
            }
            else if(peso<10){
                dosemanha = 3;
                dosenoite = 3;
            }
            else if(peso<14){
                dosemanha = 4;
                dosenoite = 4;
            }
            else if(peso<20){
                dosemanha = 5;
                dosenoite = 5;
            }
            else if(peso>=20) {
                //this.verAbc3tcPediatricoELPVde100ou200();
                dosemanha = "&minus;";
                dosenoite = "&minus;";
            }
        }

        // DOLUTEGRAVIR 
        else if(this.arv==="TDF/3TC/DTG"){
            if(peso<30){
                dosemanha = "&minus;";
            }
            else {
                dosemanha = 1;
            }
        }

        else if(this.arv==="pDTG-10mg"){
            if(peso<6){dosemanha = 0.5;}
            else if(peso<10){dosemanha = 1.5;}
            else if(peso<14){dosemanha = 2;}
            else if(peso<20){dosemanha = 2.5;}
            else {
                //this.verAbc3tcDeAdulto();
                dosemanha = "&minus;";
            }
        }

        else if(this.arv==="DTG-50mg"){
            if(peso<20){
                dosemanha = "&minus;";
            }
            else {
                dosemanha = 1;
            }
        }

        // DUOVIR - N 
        else if(this.arv === "AZT-xpe") {
            if(peso<6){
                dosemanha = 6;
                dosenoite = 6;
            }
            else if(peso<10){
                dosemanha = 9;
                dosenoite = 9;
            }
            else if(peso<14){
                dosemanha = 12;
                dosenoite = 12;
            }

            else {
                dosemanha = "&minus;";
                dosenoite = "&minus;";
            }
        }

        else if((this.arv==="Duovir-ped") || (this.arv==="DuovirN-ped")){
            if(peso<6){
                dosemanha = 1;
                dosenoite = 1;
            }
            else if(peso<10){
                dosemanha = 1.5;
                dosenoite = 1.5;
            }
            else if(peso<14){
                dosemanha = 2;
                dosenoite = 2;
            }
            else if(peso<20){
                dosemanha = 2.5;
                dosenoite = 2.5;
            }
            else if(peso<25){
                dosemanha = 3;
                dosenoite = 3;
            }

            else {
                dosemanha = "&minus;";
                dosenoite = "&minus;";
            }
        }

        else if((this.arv==="Duovir-adult") ||(this.arv==="DuovirN-adult")){
         if(peso<14){
                dosemanha = "&minus;";
                dosenoite = "&minus;";
            }
            else if(peso<25){
                dosemanha = 1;
                dosenoite = 0.5;
            }
            else {
                dosemanha = 1;
                dosenoite = 1;
            }
        }

        // TDF +  3TC + EFV 
        else if((this.arv==="TDF/3TC") || (this.arv==="TDF/3TC/EFV-400")){
            if(peso<30){
                dosemanha = "&minus;";
            }
            else{
                dosemanha = 1;
            }
        }

        else if(this.arv==="TDF/3TC/EFV-600"){
            if(peso<35){
                dosemanha = "&minus;";
            }
            else{
                dosemanha = 1;
            }
        }

        else if(this.arv==="EFV"){
            if(peso<10){ dosenoite = "&minus;";}
            else if(peso<14){dosenoite = 1;}
            else if(peso<25){dosenoite = 1.5;}
            else {dosenoite = 2;}

            dosemanha = "&minus;";
        }

        // ATAZANAVIR 
        else if(this.arv==="ATV/r"){
            if(peso<25){dosemanha = "&minus;";}
            else {dosemanha = 1;}
        }

        // RALTEGRAVIR 
        else if(this.arv==="RAL-25"){
            if(peso<6){
                dosemanha = 1;
                dosenoite = 1;
            }
            else if(peso<10){
                dosemanha = 2;
                dosenoite = 2;
            }
            else if(peso<14){
                dosemanha = 3;
                dosenoite = 3;
            }
            else if(peso<20){
                dosemanha = 4;
                dosenoite = 4;
            }
            else if(peso<25){
                dosemanha = 6;
                dosenoite = 6;
            }
            else {
                dosemanha = "&minus;";
                dosenoite = "&minus;";
            }
        }

        else if(this.arv==="RAL-400"){
            if(peso<25){
                dosemanha = "&minus;";
                dosenoite = "&minus;";
            }
            else {
                dosemanha = 1;
                dosenoite = 1;
            }
        }

        // RALTEGRAVIR 
        else if(this.arv==="RTV-25"){
            if(peso<10){
                dosemanha = "&minus;";
                dosenoite = "&minus;";
            }

            else if(peso<14){
                dosemanha = 4;
                dosenoite = 4;
            }

            else if(peso<25){
                dosemanha = 6;
                dosenoite = 6;
            }
 
            else{
                dosemanha = "&minus;";
                dosenoite = "&minus;";
            }
        }

        else if(this.arv==="RTV-100-superboosting"){
            if(peso<10){
                dosemanha = "&minus;";
                dosenoite = "&minus;";
            }

            else if(peso<14){
                dosemanha = 1;
                dosenoite = 1;
            }

            else if(peso<25){
                dosemanha = 1;
                dosenoite = 2;
            }
 
            else if(peso<30){
                dosemanha = 2;
                dosenoite = 2;
            }

            else{
                dosemanha = 3;
                dosenoite = 3;
            }  
        }

        else if(this.arv==="RTV-100-3alinha"){
            if(peso<14){
                dosemanha = "&minus;";
                dosenoite = "&minus;";
            }

            else if(peso<25){
                dosemanha = 0.5;
                dosenoite = 0.5;
            }

            else{
                dosemanha = 1;
                dosenoite = 1;
            }  
        }
        
        // DARUNAVIR 
        else if(this.arv==="drv-75"){
            if((peso<14) || (peso>=25)) {
                dosemanha = "&minus;";
                dosenoite = "&minus;";
            }

            else if(peso<25){
                dosemanha = 5;
                dosenoite = 5;
            }
        }

        else if(this.arv==="drv-150"){
            if((peso<14) || (peso>=30)){
                dosemanha = "&minus;";
                dosenoite = "&minus;";
            }

            else if(peso<25){
                dosemanha = 2.5;
                dosenoite = 2.5;
            }

            else if(peso<30){
                dosemanha = 3;
                dosenoite = 3;
            }  
        }

        else if(this.arv==="drv-600"){
            if(peso<14) {
                dosemanha = "&minus;";
                dosenoite = "&minus;";
            }

            else if(peso<25){
                dosemanha = 0.5;
                dosenoite = 0.5;
            }

            else {
                dosemanha = 1;
                dosenoite = 1;
            }  
        }

        // CTZ
        else if(this.arv==="CTZ-cp"){
            if(peso<7){
               dosemanha = "1/4";
            }
            else if(peso<10){
                dosemanha = 0.5;
            }
            else if(peso<20){
                dosemanha = 1;
            }
            else {
                dosemanha = 2;
            }
        }

        else if(this.arv==="CTZ-susp"){
            if(peso<7){
               dosemanha = 2.5;
            }
            else if(peso<10){
                dosemanha = 5;
            }
            else if(peso<15){
                dosemanha = 7.5;
            }
            else if(peso<20) {
                dosemanha = 10;
            }
            else {
                dosemanha = "&minus;";
            }
        }

        // ISONIAZIDA
        else if(this.arv==="isoniazida-100"){
            if(peso<5){
               dosemanha = 0.5;
            }
            else if(peso<10){
                dosemanha = 1;
            }
            else if(peso<14){
                dosemanha = 1.5;
            }
            else if(peso<20){
                dosemanha = 2;
            }
            else if(peso<25){
                dosemanha = 2.5
            }
            else {
                dosemanha = 3;
            }
        }

        else if(this.arv==="isoniazida-300"){
            if(peso<25){
                dosemanha = "&minus;";
            }
            else {
                dosemanha = 1;
            }
        }

        // LEVOFLOXACINA
        else if(this.arv==="levofloxacina-100"){
            if(peso<4){
               dosemanha = 0.5
            }
            else if(peso<7){
                dosemanha = 1;
            }
            else if(peso<10){
                dosemanha = 1.5;
            }
            else if(peso<13){
                dosemanha = 2;
            }
            else if(peso<16){
                dosemanha = 3;
            }
            else if(peso<19){
                dosemanha = 3.5;
            }
            else if(peso<21){
                dosemanha = 4;
            }
            else if(peso<24){
                dosemanha = 4.5;
            }
            else if(peso<26){
                dosemanha = 5;
            }
            else {
                dosemanha = "&minus;";
            }
        }

        else if(this.arv==="levofloxacina-250"){
            if(peso<4){
                dosemanha = "&minus;";
            }
           
            else if(peso<10){
                dosemanha = 0.5;
            }

            else if(peso<16){
                dosemanha = 1;
            }

            else if(peso<21){
                dosemanha = 1.5;
            }
          
            else if(peso<26){
                dosemanha = 2;
            }

            else if(peso<45){
                dosemanha = 3;
            }

            else {
                dosemanha = 4;
            }
        }

        // Piridoxina
        else if(this.arv==="piridoxina-25"){
            if(peso<5){
                dosemanha = "1/2 cp, 3 vezes por semana";
            }
            else if(peso<8){
                dosemanha = "1/2 cp por dia";
            }

            else if(peso<15){
                dosemanha = "1 cp por dia";
            }

            else {
                dosemanha = "2 cp(s) por dia";
            }
        }

        else if(this.arv==="piridoxina-50"){
            if(peso<5){
                this.mostrarRecomendacao();
                return false;
            }

            else if(peso<15){
                dosemanha = "1/2 cp, 3 vezes por semana";
            }

            else {
                dosemanha = "1 cp por dia";
            }
        }

        // INVOCAÇÃO DA FUNÇÃO 'mostrarDose'
        if((this.arv==="ATV/r") || (this.arv.startsWith("ABC")) 
        || (this.arv.startsWith("TDF")) || (this.arv.startsWith("levofloxacina")) 
        || (this.arv.includes("DTG")) || (this.arv.includes("CTZ")) 
        || (this.arv.includes("isoniazida"))) {
            dosenoite = "&minus;";
        }
        this.mostrarDose(dosemanha, dosenoite);
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
            if ((peso.value < 3) || (peso.value > 45)) {
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
            let arvSelecionado;
    
            for (const arv of arvs) {
                if( arv.matches(".selected")) {
                    arvSelecionado = arv.dataset.nome;
                    if(arv.matches(".placeholder")) {
                        return false;
                    }
                } 
            }
            const dose = new Darv(peso.value, arvSelecionado);
            dose.calcularDose();
    
            // Adicionar Padding ao 'p.recomendacao'
    
            if(recomendacaoOutput.textContent.length > 0) {
                recomendacaoOutput.classList.add("pad-10");
                
            } else {
                recomendacaoOutput.classList.remove("pad-10");
            }
        }
    },

    limparCamposDeSaida() {
        doseEposologiaOutput.innerHTML = "";
        recomendacaoOutput.innerHTML = "";
        recomendacaoOutput.classList.remove("pad-10");
    }
}

var peso, arvs, doseEposologiaOutput, recomendacaoOutput;
window.addEventListener("load", () => {
    peso = document.querySelector("input#peso");
    arvs = document.querySelectorAll("ul.select li");
    doseEposologiaOutput = document.querySelector("div.dose");
    recomendacaoOutput = document.querySelector("p.recomendacao");
    
    // Eventos

    peso.addEventListener("input", () => objectoDarv.instanciarClasse());
    arvs.forEach ( arv => arv.addEventListener("click", () => objectoDarv.instanciarClasse()));

    abas_do_menu.forEach ( aba => {
        aba.addEventListener("click", () => {
            objectoDarv.instanciarClasse();

            // Para não apresentar a dose de outra aba, já que o optionDefault é o placeholder
            if(aba.matches("[data-for=arvs]")) {
                objectoDarv.limparCamposDeSaida();
            }
           
        })
    })
})
