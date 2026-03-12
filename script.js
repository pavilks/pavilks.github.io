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
let input=document.getElementById("msg"); if(input.value==="") return;
let box=document.getElementById("chatMessages");
box.innerHTML+="<div>Tu: "+input.value+"</div>";
box.innerHTML+="<div>AI: Paldies! Mēs drīz atbildēsim.</div>";
input.value="";
}

// kontakt forma
document.getElementById("contactForm").addEventListener("submit", function(e){
e.preventDefault(); alert("Ziņa nosūtīta! Mēs sazināsimies drīz."); this.reset();
});