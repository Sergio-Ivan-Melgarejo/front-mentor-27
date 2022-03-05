const card = document.getElementById("card");
const adviceNumber = document.getElementById("number");
const adviceText = document.getElementById("text");
const btn = document.getElementById("button");

const getData = async () =>{
    const response = await fetch(`https://api.adviceslip.com/advice`, {
        cache: "no-cache",
    });
    const data = await response.json();
    
    if(data.slip !== undefined){
        const { id, advice } = data.slip;
        adviceNumber.textContent = id;
        adviceText.textContent = `"${advice}"`;
        localStorage.setItem("lastAdvice",JSON.stringify(data.slip));
        card.classList.remove("error");

        speak(id)
        speak(advice)
    }
    else if(data.menssage !== undefined){
        const { type, advice } = data.slip;
        adviceNumber.textContent = type;
        adviceText.textContent = advice;
        card.classList.add("error");
    }
    else{
        adviceNumber.textContent = "Error";
        adviceText.textContent = "There was a problem with the server, try again later";
        card.classList.add("error");
    }

    card.dataset.active = "true";
    card.classList.remove("loading");
}

function speak (text) {
    speechSynthesis.speak(new SpeechSynthesisUtterance(text))
    console.log("paso")
}

addEventListener("DOMContentLoaded",()=>{
    let lastAdvice = localStorage.getItem("lastAdvice");
    if(lastAdvice !== null){  
        card.classList.add("loading");
        lastAdvice = JSON.parse(lastAdvice);
        const { id, advice } = lastAdvice;
        adviceNumber.textContent = id;
        adviceText.textContent = `"${advice}"`;
        card.classList.remove("loading");

        speak(id)
        speak(advice)
    }
    else getData();
    
    btn.addEventListener("click",(e)=>{
        card.classList.add("loading");
        if(card.dataset.active === "true"){
            card.dataset.active = "false";   
            getData();
        }
    })
})