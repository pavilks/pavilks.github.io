// r01 – 3D BACKGROUND
document.addEventListener("DOMContentLoaded", function(){

  const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);

  const canvas = document.getElementById("bg3d");
  if(canvas && typeof THREE !== "undefined"){

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth/window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
      canvas:canvas,
      alpha:true,
      antialias:!isMobile
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // 3D BANNERS
    const banners = [];
    const count = isMobile ? 6 : 12;

    for(let i=0; i<count; i++){
      const geo = new THREE.BoxGeometry(6,3,0.3);
      const mat = new THREE.MeshBasicMaterial({color:0x00ffff});
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.x = (Math.random()-0.5)*50;
      mesh.position.y = (Math.random()-0.5)*30;
      mesh.position.z = (Math.random()-0.5)*40;
      scene.add(mesh);
      banners.push(mesh);
    }

    // ANIMATE
    function animate(){
      requestAnimationFrame(animate);
      banners.forEach(b=>{
        b.rotation.y += 0.002;
      });
      renderer.render(scene, camera);
    }
    animate();

    // RESIZE
    window.addEventListener("resize", ()=>{
      camera.aspect = window.innerWidth/window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

  }

});
