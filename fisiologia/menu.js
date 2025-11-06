"use strict"
const menu = {
    openOrCloseMeatBalls() {
        const meatBallsMenuContent = document.querySelector(".meatballs-menu-expanded");
        meatBallsMenuContent.classList.toggle("--open");
    },
    closeMeatBalls() {
        const meatBallsMenuContent = document.querySelector(".meatballs-menu-expanded");
        meatBallsMenuContent.classList.remove("--open");
    }
}
function listenToEvents() {
    const meatBallsMenu = document.querySelector(".meatballs-menu");
    meatBallsMenu.addEventListener("click", menu.openOrCloseMeatBalls);
    // Close meatBalls-menu by clicking anywhere
    window.addEventListener("click", event => {
        if(!event.target.matches(".meatballs-menu, .meatballs-menu__dot")) {
            menu.closeMeatBalls();
        }
    });
    // Share
    let data = {
        title: "Calculadora de Doses Pediátricas",
        text: "Doseia automaticamente alguns dos medicamentos mais usuais na prática clínica com base no peso inserido pelo usuário. Tem como referência o Formulário Nacional de Medicamentos, 5ª Edição, 2007.",
        url: "https://quinamine.github.io/calculadora-de-doses-pediatricas/index.html"
    }
    let btnShare = document.querySelector(".meatballs-menu-expanded__option--share");
    btnShare.addEventListener("click", () => {
        try {
            navigator.share(data).then( () => {
                console.log("Partilha bem sucedida.");
            }).catch(error => {
                console.log(`Não foi possível partilhar a Calculadora devido ao erro: ${error}.`);
            });
        } catch (error) {
            console.log('O seu navegador não tem suporte ao método "navigator.share()".');
        }
    });
};
window.addEventListener("load", () => {
    listenToEvents();
});
