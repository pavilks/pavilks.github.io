// r01

document.addEventListener("DOMContentLoaded",function(){

/* DEVICE */

const isMobile=/Android|iPhone|iPad/i.test(navigator.userAgent)

/* THREE JS */

const canvas=document.getElementById("bg3d")

if(canvas && typeof THREE!=="undefined"){

const scene=new THREE.Scene()

const camera=new THREE.PerspectiveCamera(

75,
window.innerWidth/window.innerHeight,
0.1,
1000

)

camera.position.z=30

const renderer=new THREE.WebGLRenderer({

canvas:canvas,
alpha:true,
antialias:!isMobile

})

renderer.setSize(window.innerWidth,window.innerHeight)


/* OBJECTS */

const banners=[]

const count=isMobile?6:12

for(let i=0;i<count;i++){

const geo=new THREE.BoxGeometry(6,3,0.3)

const mat=new THREE.MeshBasicMaterial({color:0x00ffff})

const mesh=new THREE.Mesh(geo,mat)

mesh.position.x=(Math.random()-0.5)*50
mesh.position.y=(Math.random()-0.5)*30
mesh.position.z=(Math.random()-0.5)*40

scene.add(mesh)

banners.push(mesh)

}


/* ANIMATE */

function animate(){

requestAnimationFrame(animate)

banners.forEach(b=>{

b.rotation.y+=0.002

})

renderer.render(scene,camera)

}

animate()

}


/* CHAT */

const chatButton=document.getElementById("chatButton")
const chat=document.getElementById("chat")

chatButton.onclick=()=>{

chat.classList.toggle("open")

}

const sendBtn=document.getElementById("sendBtn")
const msg=document.getElementById("msg")
const chatMessages=document.getElementById("chatMessages")

function sendMessage(){

const text=msg.value.trim()

if(!text) return

chatMessages.innerHTML+=`<div>${text}</div>`

msg.value=""

setTimeout(()=>{

chatMessages.innerHTML+=`<div style="color:#00ffff">Paldies! Atbildēsim drīz.</div>`

},500)

}

sendBtn.onclick=sendMessage


/* CALCULATOR */

window.calculateBanner=function(){

const w=document.getElementById("width").value
const h=document.getElementById("height").value
const install=document.getElementById("install").value

const price=(w*h*20)+Number(install)

document.getElementById("result").innerText=

"Aptuvenā cena: "+price+" €"

}


/* CONTACT */

const form=document.getElementById("contactForm")

form.addEventListener("submit",function(e){

e.preventDefault()

alert("Ziņa nosūtīta!")

})


})


/* WHATSAPP */

function openWhatsApp(){

const phone="371XXXXXXXX"

const url="https://api.whatsapp.com/send?phone="+phone

window.open(url,"_blank")

}
