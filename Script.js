const navSlide = () => {
    const threelines = document.querySelector('.threelines');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');


    threelines.addEventListener('click',()=>{

        //Toggle Nav
        nav.classList.toggle('nav-active');

        //Animate Links
        navLinks.forEach((link,index) => {
            if (link.style.animation){
                link.style.animation = '';
            }else{
                link.style.animation = `navLinkFade 0.5s ease forwards ${index /7 + 0.5}s`;
            }
        });
        //Three Lines Animation
        threelines.classList.toggle('toggle')
    });

}

const ShowButtonText = () => {

    
    //Display Text
    var TF = document.getElementById("JokesID")
    TF.style.display = "inline-block";
    //Display Button
    var close = document.getElementById("CloseID")
    close.style.display = "inline-block"
    close.style.alignContent = "center"; 

     
}

const HideButtonText = () => {

    //Display Text
    var TF = document.getElementById("JokesID")
    TF.style.display = "none";
    //Hide Button
    var close = document.getElementById("CloseID")
    close.style.display = "none"
    close.style.alignContent = "center"; 
}



//Alle Funktionen die dauernd aufgerufen werden 
const Funktionen = ()=>{
    navSlide();

}
Funktionen();
