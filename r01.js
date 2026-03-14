document.addEventListener("DOMContentLoaded", function(){

const canvas = document.getElementById("bg3d")

if(canvas && typeof THREE !== "undefined"){

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
)

camera.position.z = 5

const renderer = new THREE.WebGLRenderer({
canvas:canvas,
alpha:true
})

renderer.setSize(window.innerWidth,window.innerHeight)

/* TEST CUBE */

const geometry = new THREE.BoxGeometry(2,2,2)
const material = new THREE.MeshBasicMaterial({color:0x00ffff})
const cube = new THREE.Mesh(geometry,material)

scene.add(cube)

function animate(){

requestAnimationFrame(animate)

cube.rotation.x += 0.01
cube.rotation.y += 0.01

renderer.render(scene,camera)

}

animate()

}

})
