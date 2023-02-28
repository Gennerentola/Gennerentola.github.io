const body = document.getElementsByTagName("BODY");

function dynamicBackground() {   
    let estratto = Math.floor(Math.random() * 4);
    if (estratto == 0) {
        body[0].classList.add("maratea");
    } else if (estratto == 1) {
        body[0].classList.add("monticchio");
    } else if (estratto == 2) {
        body[0].classList.add("castelSantAngelo");
    }  else {
        body[0].classList.add("rivaLago");
    }
}

window.addEventListener("load", dynamicBackground());