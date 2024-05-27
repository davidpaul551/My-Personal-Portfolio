const body = document.querySelector("body"),
    header = document.querySelector("header"),
    menuOpen = document.querySelector(".fa-bars-staggered");
    navbarCollapse = document.querySelector(".navbar-collapse");
    backToTop=document.getElementById("backToTop");
    smoothScroll = document.querySelector(".nav-items");
    const navItems = document.querySelectorAll('.nav-items a');











// Toggle the navbar menu when the menu button is clicked
menuOpen.onclick = () => {
  navbarCollapse.classList.toggle('show');
  menuOpen.classList.toggle('fa-xmark');
};
window.onload = function(){
    let elements=document.getElementsByClassName("txt-rotate");
    for(let i=0;i<elements.length;i++){
        let toRotate=elements[i].getAttribute("data-rotate");
        let period=elements[i].getAttribute("data-rotate");
        if(toRotate){
            new TxtRotate(elements[i],JSON.parse(toRotate),period);

        }

    }
    var css=document.createElement("style");
    css.type="text/css";
    css.innerHTML=".txt-rotate   > .wrap { border-right: 0.8rem solid #FFFFFF; }";
    document.body.appendChild(css);
};
var TxtRotate=function(el, toRotate, period){
    this.toRotate=toRotate;
    this.el=el;
    this.loopNum=0;
    this.period=parseInt(period,100)||4000;
    this.txt="";
    this.tick();
    this.isDeleting=false;

}
TxtRotate.prototype.tick=function(){
    var i=this.loopNum%this.toRotate.length;
    var fullTxt=this.toRotate[i];

    if(this.isDeleting){
         this.txt=fullTxt.substring(0,this.txt.length - 1);

    }else{
        this.txt=fullTxt.substring(0,this.txt.length + 1);
    }

    this.el.innerHTML = `<span class='wrap'>${this.txt}</span>`;

    var that=this;
    var delta=150-Math.random()*100;
    if (this.isDeleting){
        delta/2;

    }
    if(!this.isDeleting && this.txt === fullTxt){
        delta=this.period;
        this.isDeleting=true;

    }else if(
        this.isDeleting && this.txt===""
    ){
        this.isDeleting=false;
        this.loopNum++;
        delta=1000;

    }

    setTimeout(function(){
        that.tick();
    }, delta);


};

// Close the navbar menu when a menu item is clicked
navItems.forEach(item => {
  item.addEventListener('click', () => {
    navbarCollapse.classList.remove('show');
    menuOpen.classList.remove('fa-xmark');
  });
});

smoothScroll.forEach((e) => {
    e.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent the default click behavior

      removeActive();
      e.classList.add("active");
      navbarCollapse.classList.remove("show"); // Collapse the menu
      menuOpen.classList.remove("fa-xmark"); // Remove the "fa-xmark" class

      // Scroll to the desired content section
      const target = document.querySelector(event.target.getAttribute("href"));
      target.scrollIntoView({ behavior: "smooth" });
    });
  });
function removeActive(){
    smoothScroll.forEach((e)=>{
        e.classList.remove("active");
    })
}
document.addEventListener("DOMContentLoaded", function() {
    const backToTop = document.getElementById("backToTop");

    backToTop.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent default anchor behavior
        const scrollOptions = {
            top: 0,
            behavior: "smooth"
        };
        window.scrollTo(scrollOptions);
    });
});

window.onscroll = () => {
    if(document.documentElement.scrollTop>5){
        header.classList.add("sticky-on-top");
    }else{
        header.classList.remove("sticky-on-top");
    }
};

