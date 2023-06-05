const body = document.getElementsByTagName("BODY");
const projectList = [];
const photoList = [];
const targetProgetti = document.getElementById("targetProgetti");
const targetCarousel = (document.getElementsByClassName("carousel-inner"))[0];
const url = "https://portfolio-a7285-default-rtdb.europe-west1.firebasedatabase.app/";

function dynamicBackground() {   
    let estratto = Math.floor(Math.random() * 5);
    if (estratto == 0) {
        body[0].classList.add("maratea");
    } else if (estratto == 1) {
        body[0].classList.add("monticchio");
    } else if (estratto == 2) {
        body[0].classList.add("castelSantAngelo");
    } else if (estratto == 3) {
        body[0].classList.add("rivaLago");
    } else {
        body[0].classList.add("benevento");
    }
}

function fetchProjects() {
    fetch(url + "progetti.json")
    .then(res => {return res.json()})
    .then(data => { 
        Object.keys(data).map(key => {
            projectList.push(data[key])
        })
        printProjects(projectList);
    })
}

function printProjects(projectList) {
    let projectToPrint = projectList.reverse();
    for (let i = 0; i < projectToPrint.length; i++) {
        let project = projectToPrint[i];
        // CREAZIONE ARTICLE
        let article = document.createElement("article");
        article.classList.add("py-3", "clearfix");
        // CREAZIONE TITOLO
        let h4 = document.createElement("h4");
        h4.classList.add("text-center", "text-primary", "fw-semibold", "mb-3");
        h4.innerHTML += project.title;
        // CREAZIONE DIV CON FOTO E LINK
        let divCard = document.createElement("div");
        divCard.classList.add("card", "border-primary", "border-2", "mx-auto", "mb-3", "mb-md-0");
        if ((i % 2) == 0) {
            divCard.classList.add( "me-md-3", "float-md-start");
        } else {
            divCard.classList.add( "ms-md-3", "float-md-end");
        }
        // CREAZIONE IMMAGINE
        let img = document.createElement("img");
        img.classList.add("card-img-top");
        img.setAttribute("src", project.imagePath);
        img.setAttribute("alt", "screenshot " + project.title);
        // CREAZIONE CARD BODY
        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body", "d-flex", "flex-column");
        // CREAZIONE BOTTONI CARD
        let bottoneSito = document.createElement("a");
        let bottoneRepo = document.createElement("a");
        bottoneSito.setAttribute("target", "_blank");
        bottoneRepo.setAttribute("target", "_blank");
        bottoneSito.classList.add("btn", "btn-outline-primary", "rounded-5", "btn-sm", "mb-2");
        bottoneRepo.classList.add("btn", "btn-outline-primary", "rounded-5", "btn-sm");
        if (project.linkSito === undefined) {
            bottoneSito.classList.add("disabled");
            bottoneSito.innerHTML += "SITO NON DISPONIBILE";
        } else {
            bottoneSito.setAttribute("href", project.linkSito);
            bottoneSito.innerHTML += "VISITA IL SITO";
        }
        if (project.linkRepo === undefined) {
            bottoneRepo.classList.add("disabled");
            bottoneRepo.innerHTML += "REPO NON DISPONIBILE";
        } else {
            bottoneRepo.setAttribute("href", project.linkRepo);
            bottoneRepo.innerHTML += "VISITA LA REPOSITORY";
        }
        // COMPOSIZIONE CARD BODY
        cardBody.append(bottoneSito, bottoneRepo);
        // COMPOSIZIONE DIV CON FOTO E LINK
        divCard.append(img, cardBody);
        // DESCRIZIONE PROGETTO
        let p = document.createElement("p");
        p.innerHTML += project.description;
        // COMPOSIZIONE ARTICLE
        article.append(h4, divCard, p);
        // CREAZIONE HR
        let hr = document.createElement("hr");
        hr.classList.add("border-2", "border-primary", "opacity-100");
        // STAMPA NEL DOM
        targetProgetti.append(article, hr);
    }
}

function fetchPhotos() {
    fetch(url + "fotoCarousel.json")
    .then(res => {return res.json()})
    .then(data => {
        Object.keys(data).map(key => {
            photoList.push(data[key])
        })
        printCarousel(photoList);
    })
}

function printCarousel(photoList) {
    for (let i = 0; i < photoList.length; i++) {
        let photo = photoList[i];
        // CREAZIONE DIV CONTENITORE
        let divItem = document.createElement("div");
        divItem.classList.add("carousel-item");
        if (i == 0) {
            divItem.classList.add("active");
        }
        // CREAZIONE IMG
        let img = document.createElement("img");
        img.setAttribute("src", photo.path);
        img.classList.add("d-block", "mx-auto");
        if (photo.isStretched === true) {
            img.classList.add("stretch");
        }
        img.setAttribute("alt", photo.title);
        // CREAZIONE DIV DIDASCALIA
        let divDidascalia = document.createElement("div");
        divDidascalia.classList.add("carousel-caption", "d-none", "d-md-block");
        // CREAZIONE DIDASCALIA
        let h5 = document.createElement("h5");
        h5.innerHTML += photo.title;
        // COMPOSIZIONE CAROUSEL ITEM
        divDidascalia.append(h5);
        divItem.append(img, divDidascalia);
        // STAMPA NEL DOM
        targetCarousel.append(divItem);
    }
}

function initialise() {
    dynamicBackground();
    fetchProjects();
    fetchPhotos();
}

window.addEventListener("load", initialise());