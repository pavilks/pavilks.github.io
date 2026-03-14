document.addEventListener("DOMContentLoaded", function(){

const canvas = document.getElementById("bg3d")

if(!canvas) return

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth / window.innerHeight,
0.1,
1000
)

camera.position.z = 30

const renderer = new THREE.WebGLRenderer({
canvas: canvas,
alpha: true,
antialias: true
})

renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)

/* LIGHT */

const light = new THREE.PointLight(0xffffff, 1)
light.position.set(20,20,20)
scene.add(light)

/* OBJECTS */

const banners = []

for(let i=0;i<12;i++){

const geo = new THREE.BoxGeometry(6,3,0.3)

const mat = new THREE.MeshStandardMaterial({
color:0x00ffff,
metalness:0.4,
roughness:0.3
})

const mesh = new THREE.Mesh(geo, mat)

mesh.position.x = (Math.random()-0.5)*50
mesh.position.y = (Math.random()-0.5)*30
mesh.position.z = (Math.random()-0.5)*40

scene.add(mesh)

banners.push(mesh)

}

/* ANIMATION */

function animate(){

requestAnimationFrame(animate)

banners.forEach(b=>{
b.rotation.y += 0.002
b.rotation.x += 0.001
})

renderer.render(scene,camera)

}

animate()

/* RESIZE */

window.addEventListener("resize",function(){

camera.aspect = window.innerWidth / window.innerHeight
camera.updateProjectionMatrix()

renderer.setSize(window.innerWidth, window.innerHeight)

})

})
