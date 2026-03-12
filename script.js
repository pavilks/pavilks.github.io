alert("JS strādā")
// GAIDĪT KAMĒR HTML IELĀDĒJAS
document.addEventListener("DOMContentLoaded", () => {

////////////////////////////
// 3D BACKGROUND
////////////////////////////

const canvas = document.getElementById("bg3d")

if(canvas){

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
)

const renderer = new THREE.WebGLRenderer({
canvas:canvas,
alpha:true
})

renderer.setSize(window.innerWidth,window.innerHeight)

const geometry = new THREE.TorusKnotGeometry(8,2,100,16)

const material = new THREE.MeshNormalMaterial()

const mesh = new THREE.Mesh(geometry,material)

scene.add(mesh)

camera.position.z = 20

function animate(){

requestAnimationFrame(animate)

mesh.rotation.x += 0.01
mesh.rotation.y += 0.01

renderer.render(scene,camera)

}

animate()

}

////////////////////////////
// BANNER CALCULATOR
////////////////////////////

window.calculateBanner = function(){

const w = document.getElementById("width").value
const h = document.getElementById("height").value
const install = document.getElementById("install").value

if(!w || !h){

document.getElementById("result").innerText =
"Ievadi izmērus"

return
}

const pricePerM2 = 20

const area = w * h

const price = (area * pricePerM2) + Number(install)

document.getElementById("result").innerText =
"Aptuvenā cena: " + price + " €"

}

////////////////////////////
// CHATBOT
////////////////////////////

const chatButton = document.getElementById("chatButton")
const chat = document.getElementById("chat")
const sendBtn = document.getElementById("sendBtn")
const msgInput = document.getElementById("msg")
const chatMessages = document.getElementById("chatMessages")

if(chatButton){

chatButton.addEventListener("click",()=>{

chat.classList.toggle("open")

})

}

////////////////////////////
// SEND MESSAGE
////////////////////////////

function sendMessage(){

const message = msgInput.value.trim()

if(!message) return

chatMessages.innerHTML +=
`<div class="user">${message}</div>`

msgInput.value = ""

let reply =
"Varu palīdzēt ar baneru izgatavošanu, montāžu vai cenu."

const text = message.toLowerCase()

if(text.includes("cena")){
reply =
"Baneru cena atkarīga no izmēra. Izmanto kalkulatoru lapā."
}

if(text.includes("montāža")){
reply =
"Piedāvājam profesionālu baneru montāžu visā Latvijā."
}

if(text.includes("kontakti")){
reply =
"Vari rakstīt WhatsApp vai aizpildīt kontaktformu."
}

if(text.includes("izmērs")){
reply =
"Populāri baneru izmēri ir 3x2m, 4x2m un 5x3m."
}

chatMessages.innerHTML +=
`<div class="bot">${reply}</div>`

chatMessages.scrollTop =
chatMessages.scrollHeight

}

////////////////////////////
// SEND BUTTON
////////////////////////////

if(sendBtn){

sendBtn.addEventListener("click", sendMessage)

}

////////////////////////////
// ENTER SEND
////////////////////////////

if(msgInput){

msgInput.addEventListener("keydown",(e)=>{

if(e.key === "Enter"){

sendMessage()

}

})

}

})
