// THREE.js 3D particle background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas:document.getElementById('bg3d'), alpha:true});
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;
let geometry = new THREE.BufferGeometry();
let vertices = [];
for(let i=0;i<1500;i++){vertices.push((Math.random()-0.5)*20,(Math.random()-0.5)*20,(Math.random()-0.5)*20);}
geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices,3));
let material = new THREE.PointsMaterial({color:0xffffff, size:0.05});
let points = new THREE.Points(geometry, material);
scene.add(points);
function animate(){requestAnimationFrame(animate);points.rotation.y += 0.001;renderer.render(scene, camera);}
animate();

// scroll animation
const cards = document.querySelectorAll(".card");
window.addEventListener("scroll", () => {cards.forEach(card => {if(card.getBoundingClientRect().top<window.innerHeight-100) card.classList.add("show");});});

// AI chat
function sendChat(){

let input=document.getElementById("msg")

let message=input.value.toLowerCase()

if(message==="") return

let box=document.getElementById("chatMessages")

box.innerHTML+=`<div class="user">${message}</div>`

let reply=""

if(message.includes("cena") || message.includes("baneris")){

reply=`Baneru cena atkarīga no izmēra.

Aptuvenās cenas:

1m x 1m → ~40€  
3m x 2m → ~120€  
5m x 3m → ~250€

Vai vēlies aprēķināt precīzu cenu?
Uzraksti izmēru (piem: 4x2).`

}
  function toggleChat(){

let chat=document.getElementById("chat")

chat.classList.toggle("open")

  }

else if(message.match(/\d+x\d+/)){

let size=message.split("x")

let w=parseFloat(size[0])
let h=parseFloat(size[1])

let price=(w*h*20).toFixed(0)

reply=`Aptuvenā banera cena: ${price}€.

Cenā nav iekļauta montāža.

Vai nepieciešama arī:
• montāža
• konstrukcija
• apgaismojums?`

}

else if(message.includes("montāž")){

reply=`Mēs veicam profesionālu baneru montāžu visā Latvijā.

Montāžas cena parasti:
50€ – 200€

Atkarībā no augstuma un konstrukcijas.`

}

else if(message.includes("būvvald")){

reply=`Jā, AlfaB palīdz ar reklāmas saskaņošanu būvvaldē.

Sagatavojam:
• dokumentāciju
• rasējumus
• projektu`

}

else if(message.includes("kontak") || message.includes("zvan")){

reply=`Sazinies ar mums WhatsApp:

https://wa.me/37100000000`

}

else{

reply=`Varu palīdzēt ar:

• baneru cenu
• montāžu
• konstrukcijām
• reklāmas saskaņošanu

Uzraksti savu jautājumu.`

}

setTimeout(()=>{

box.innerHTML+=`<div class="bot">${reply}</div>`

box.scrollTop=box.scrollHeight

},500)

input.value=""

}

// kontakt forma
document.getElementById("contactForm").addEventListener("submit", function(e){
e.preventDefault(); alert("Ziņa nosūtīta! Mēs sazināsimies drīz."); this.reset();
});
