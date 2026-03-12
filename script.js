// 🚀 Pārliecināmies, ka DOM ir ielādēts
document.addEventListener("DOMContentLoaded", () => {

  // ======================
  // 3D FONA KODS (Three.js)
  // ======================
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({canvas: document.getElementById("bg3d"), alpha:true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.z = 5;

  let geometry = new THREE.BufferGeometry();
  let vertices = [];
  for(let i=0; i<1200; i++){
    vertices.push((Math.random()-0.5)*20, (Math.random()-0.5)*20, (Math.random()-0.5)*20);
  }
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  let material = new THREE.PointsMaterial({color: 0xffffff, size: 0.05});
  let points = new THREE.Points(geometry, material);
  scene.add(points);

  function animate(){
    requestAnimationFrame(animate);
    points.rotation.y += 0.0008;
    renderer.render(scene, camera);
  }
  animate();

  // ======================
  // SCROLL ANIMĀCIJAS
  // ======================
  const cards = document.querySelectorAll(".card");
  window.addEventListener("scroll", () => {
    cards.forEach(card => {
      if(card.getBoundingClientRect().top < window.innerHeight - 100){
        card.classList.add("show");
      }
    });
  });

  // ======================
  // CHATBOTS
  // ======================
  const chatButton = document.getElementById("chatButton");
  const chat = document.getElementById("chat");
  const sendBtn = document.getElementById("sendBtn");
  const msgInput = document.getElementById("msg");
  const chatMessages = document.getElementById("chatMessages");

  // Toggle čatu uz klikšķi
  chatButton.addEventListener("click", () => {
    chat.classList.toggle("open");
  });

  // Čata nosūtīšana
  sendBtn.addEventListener("click", () => {
    const message = msgInput.value.trim();
    if(!message) return;

    chatMessages.innerHTML += `<div class="user">${message}</div>`;
    msgInput.value = "";

    // AI loģika
    let reply = "Varu palīdzēt ar baneru cenu, montāžu vai būvvaldes saskaņošanu.";

    if(message.toLowerCase().includes("cena") || message.toLowerCase().includes("baneris")){
      reply = "Baneru cena atkarīga no izmēra. Ievadi izmēru, piem. 4x2, lai aprēķinātu.";
    } else if(message.match(/\d+x\d+/)){
      let size = message.split("x");
      let w = parseFloat(size[0]);
      let h = parseFloat(size[1]);
      let price = (w*h*20).toFixed(0);
      reply = `Aptuvenā banera cena: ${price}€. Cenā nav iekļauta montāža.`;
    } else if(message.toLowerCase().includes("montāž")){
      reply = "Mēs veicam profesionālu baneru montāžu visā Latvijā. Cena parasti: 50€–200€ atkarībā no augstuma un konstrukcijas.";
    } else if(message.toLowerCase().includes("būvvald")){
      reply = "Jā, AlfaB palīdz ar reklāmas saskaņošanu būvvaldē. Sagatavojam dokumentāciju un rasējumus.";
    } else if(message.toLowerCase().includes("kontak") || message.toLowerCase().includes("zvan")){
      reply = `Sazinies ar mums WhatsApp: https://wa.me/37100000000`;
    }

    // Parādīt AI atbildi
    setTimeout(() => {
      chatMessages.innerHTML += `<div class="bot">${reply}</div>`;
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 300);
  });

  // Enter taustiņš nosūta ziņu
  msgInput.addEventListener("keydown", (e) => {
    if(e.key === "Enter") sendBtn.click();
  });

  // ======================
  // BANERU CENU KALKULATORS
  // ======================
  window.calculateBanner = function(){
    const w = document.getElementById("width").value;
    const h = document.getElementById("height").value;
    const install = document.getElementById("install").value;

    if(w=="" || h==""){
      alert("Ievadi izmērus!");
      return;
    }

    const area = w*h;
    const basePrice = area*20;
    const total = basePrice + Number(install);

    document.getElementById("result").innerHTML = "Aptuvenā cena: " + total.toFixed(0) + " €";
  };

  // ======================
  // KONTAKTFORMA
  // ======================
  document.getElementById("contactForm")?.addEventListener("submit", function(e){
    e.preventDefault();
    alert("Ziņa nosūtīta!");
    this.reset();
  });

});
