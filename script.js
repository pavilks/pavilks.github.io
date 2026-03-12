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
alpha:true,
antialias:true
})

renderer.setSize(window.innerWidth,window.innerHeight)

camera.position.z = 30


// GAISMA

const light1 = new THREE.PointLight(0xffffff,1)
light1.position.set(20,20,20)
scene.add(light1)

const light2 = new THREE.PointLight(0x00ffff,0.8)
light2.position.set(-20,-10,10)
scene.add(light2)


// BANERI

const banners = []

for(let i=0;i<10;i++){

const geometry = new THREE.BoxGeometry(6,3,0.3)

const material = new THREE.MeshStandardMaterial({
color:0x00ffff,
metalness:0.4,
roughness:0.3
})

const banner = new THREE.Mesh(geometry,material)

banner.position.x = (Math.random()-0.5)*50
banner.position.y = (Math.random()-0.5)*25
banner.position.z = (Math.random()-0.5)*30

scene.add(banner)

banners.push(banner)

}


// DIGITĀLAIS PUNKTU TĪKLS

const starsGeometry = new THREE.BufferGeometry()
const starCount = 800

const positions = []

for(let i=0;i<starCount;i++){

positions.push((Math.random()-0.5)*200)
positions.push((Math.random()-0.5)*200)
positions.push((Math.random()-0.5)*200)

}

starsGeometry.setAttribute(
'position',
new THREE.Float32BufferAttribute(positions,3)
)

const starsMaterial = new THREE.PointsMaterial({
color:0xffffff,
size:0.7
})

const starField = new THREE.Points(starsGeometry,starsMaterial)

scene.add(starField)


// PELES KUSTĪBA

let mouseX = 0
let mouseY = 0

document.addEventListener("mousemove",(event)=>{

mouseX = (event.clientX/window.innerWidth)*2-1
mouseY = (event.clientY/window.innerHeight)*2-1

})


// ANIMĀCIJA

function animate(){

requestAnimationFrame(animate)

banners.forEach(b=>{

b.rotation.y += 0.002
b.rotation.x += 0.001

})

starField.rotation.y += 0.0008

camera.position.x += (mouseX*5 - camera.position.x)*0.02
camera.position.y += (-mouseY*3 - camera.position.y)*0.02

renderer.render(scene,camera)

}

animate()


// RESIZE

window.addEventListener("resize",()=>{

camera.aspect = window.innerWidth/window.innerHeight
camera.updateProjectionMatrix()

renderer.setSize(window.innerWidth,window.innerHeight)

})

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
