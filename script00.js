document.addEventListener("DOMContentLoaded", () => {

//////////////////////////////////////////////////////
// DEVICE DETECTION
//////////////////////////////////////////////////////

const isAndroid = /Android/i.test(navigator.userAgent)
const isiPhone = /iPhone|iPad|iPod/i.test(navigator.userAgent)
const isMobile = isAndroid || isiPhone

console.log("Android:", isAndroid)
console.log("iPhone:", isiPhone)
console.log("Mobile:", isMobile)

//////////////////////////////////////////////////////
// 3D BACKGROUND
//////////////////////////////////////////////////////

const canvas = document.getElementById("bg3d")

if (canvas && typeof THREE !== "undefined") {

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
1000
)

camera.position.z = isMobile ? 35 : 30

const renderer = new THREE.WebGLRenderer({
canvas: canvas,
alpha: true,
antialias: !isMobile
})

renderer.setSize(window.innerWidth, window.innerHeight)

if (isMobile) renderer.setPixelRatio(1)
else renderer.setPixelRatio(window.devicePixelRatio)

//////////////////////////////////////////////////////
// LIGHTS
//////////////////////////////////////////////////////

const light1 = new THREE.PointLight(0xffffff,1)
light1.position.set(20,20,20)
scene.add(light1)

const light2 = new THREE.PointLight(0x00ffff,0.7)
light2.position.set(-20,-10,10)
scene.add(light2)

//////////////////////////////////////////////////////
// BANNERS
//////////////////////////////////////////////////////

const banners = []
const bannerCount = isMobile ? 6 : 12

for(let i=0;i<bannerCount;i++){

const geometry = new THREE.BoxGeometry(6,3,0.4)

const material = new THREE.MeshStandardMaterial({
color:0x00ffff,
metalness:0.4,
roughness:0.3
})

const banner = new THREE.Mesh(geometry,material)

banner.position.x=(Math.random()-0.5)*50
banner.position.y=(Math.random()-0.5)*30
banner.position.z=(Math.random()-0.5)*40

scene.add(banner)
banners.push(banner)

}

//////////////////////////////////////////////////////
// STARS
//////////////////////////////////////////////////////

const starCount = isMobile ? 300 : 800

const starGeo = new THREE.BufferGeometry()
const starPositions = []

for(let i=0;i<starCount;i++){

starPositions.push((Math.random()-0.5)*200)
starPositions.push((Math.random()-0.5)*200)
starPositions.push((Math.random()-0.5)*200)

}

starGeo.setAttribute(
"position",
new THREE.Float32BufferAttribute(starPositions,3)
)

const starMat = new THREE.PointsMaterial({
color:0xffffff,
size:isMobile ? 0.8 : 0.6
})

const starField = new THREE.Points(starGeo,starMat)
scene.add(starField)

//////////////////////////////////////////////////////
// MOUSE + TOUCH
//////////////////////////////////////////////////////

let mouseX = 0
let mouseY = 0

document.addEventListener("mousemove",(e)=>{

mouseX = (e.clientX/window.innerWidth)*2-1
mouseY = (e.clientY/window.innerHeight)*2-1

})

document.addEventListener("touchmove",(e)=>{

mouseX = (e.touches[0].clientX/window.innerWidth)*2-1
mouseY = (e.touches[0].clientY/window.innerHeight)*2-1

})

//////////////////////////////////////////////////////
// ANIMATION
//////////////////////////////////////////////////////

function animate(){

requestAnimationFrame(animate)

banners.forEach(b=>{

b.rotation.y += isMobile ? 0.0015 : 0.002
b.rotation.x += isMobile ? 0.0008 : 0.001

})

starField.rotation.y += 0.0004

camera.position.x += (mouseX*5-camera.position.x)*0.02
camera.position.y += (-mouseY*3-camera.position.y)*0.02

renderer.render(scene,camera)

}

animate()

//////////////////////////////////////////////////////
// RESIZE
//////////////////////////////////////////////////////

window.addEventListener("resize",()=>{

camera.aspect = window.innerWidth/window.innerHeight
camera.updateProjectionMatrix()

renderer.setSize(window.innerWidth,window.innerHeight)

})

}

//////////////////////////////////////////////////////
// CHATBOT
//////////////////////////////////////////////////////

const chatBtn=document.getElementById("chatButton")
const chat=document.getElementById("chat")
const sendBtn=document.getElementById("sendBtn")
const msg=document.getElementById("msg")
const messages=document.getElementById("chatMessages")

if(chatBtn){

chatBtn.addEventListener("click",()=>{

chat.classList.toggle("open")

})

}

function sendMessage(){

const text=msg.value.trim()

if(!text) return

messages.innerHTML+=`<div class="user">${text}</div>`
msg.value=""

let reply="Varu palīdzēt ar reklāmas baneriem."

const t=text.toLowerCase()

if(t.includes("cena")) reply="Cena atkarīga no izmēra un materiāla."
if(t.includes("montāža")) reply="Piedāvājam profesionālu montāžu visā Latvijā."
if(t.includes("kontakti")) reply="Raksti mums WhatsApp vai izmanto kontaktformu."
if(t.includes("izmērs")) reply="Populāri izmēri: 3x2m, 4x2m, 5x3m."

setTimeout(()=>{

messages.innerHTML+=`<div class="bot">${reply}</div>`
messages.scrollTop=messages.scrollHeight

},400)

}

if(sendBtn) sendBtn.addEventListener("click",sendMessage)

if(msg){

msg.addEventListener("keydown",(e)=>{

if(e.key==="Enter") sendMessage()

})

}

//////////////////////////////////////////////////////
// BANNER PRICE CALCULATOR
//////////////////////////////////////////////////////

window.calculateBanner=function(){

const w=document.getElementById("width").value
const h=document.getElementById("height").value
const install=document.getElementById("install").value

if(!w||!h){

document.getElementById("result").innerText="Ievadi izmērus"
return

}

const pricePerM2=20
const area=w*h
const price=(area*pricePerM2)+Number(install)

document.getElementById("result").innerText=
"Aptuvenā cena: "+price+" €"

}

//////////////////////////////////////////////////////
// CONTACT FORM
//////////////////////////////////////////////////////

const form=document.getElementById("contactForm")

if(form){

form.addEventListener("submit",(e)=>{

e.preventDefault()

alert("Ziņa nosūtīta!")

form.reset()

})

}

})
