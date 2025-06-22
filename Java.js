// Mensagem de boas-vindas
const nomes = ["guerreiro", "visitante misterioso", "lenda viva", "mestre dos downloads"];
const escolhido = nomes[Math.floor(Math.random() * nomes.length)];
alert(`Bem-vindo ao FN LINKS, ${escolhido}!`);

let cliqueJogos = 0;
let cliqueDownloads = 0;

function showSection(id, btn) {
  document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('active');
  });

  document.getElementById(id).classList.add('active');

  if (id === 'jogos') {
    cliqueJogos++;
    if (cliqueJogos === 5) alert("Tu ama jogos mesmo, né cabra? 🎮");
  } else {
    cliqueDownloads++;
    if (cliqueDownloads === 3) alert("Quer baixar tudo, é? 📥😆");
  }
}

function toggleMode() {
  document.body.classList.toggle("dark");
  localStorage.setItem("modo", document.body.classList.contains("dark") ? "dark" : "light");
}

document.addEventListener("DOMContentLoaded", () => {
  // Aplica modo salvo
  const modoSalvo = localStorage.getItem("modo");
  if (modoSalvo === "dark") {
    document.body.classList.add("dark");
  }
  // Tooltips
  const botoesRGB = document.querySelectorAll(".link-button.rgb");
  botoesRGB.forEach(botao => {
    botao.addEventListener("mouseover", () => {
      botao.title = "Clique e vai voando pro link!";
    });
  });
  updateClock();
  setInterval(updateClock, 1000);
  updateDate();

  // Voltar topo aparece só se scrollar
  window.addEventListener("scroll", () => {
    const btnTopo = document.getElementById("backToTop");
    if (window.scrollY > 200) {
      btnTopo.style.display = "block";
    } else {
      btnTopo.style.display = "none";
    }
  });
});

function updateClock() {
  const clock = document.getElementById("clock");
  const now = new Date();
  const horas = now.getHours().toString().padStart(2, '0');
  const mins = now.getMinutes().toString().padStart(2, '0');
  const secs = now.getSeconds().toString().padStart(2, '0');
  clock.textContent = `${horas}:${mins}:${secs}`;
}

function updateDate() {
  const date = document.getElementById("date");
  const now = new Date();
  const day = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth()+1).toString().padStart(2, '0');
  const year = now.getFullYear();
  date.textContent = `${day}/${month}/${year}`;
}

// Subtítulo que muda
const frases = [
  "Os melhores jogos em um clique 🎮",
  "Links 100% confiáveis 🔗",
  "Atualizado toda semana! 🚀",
  "Feito por Fabrício, o brabo 😎"
];
let fraseIndex = 0;
function mudarFrase() {
  const subtitulo = document.getElementById("subtitle");
  subtitulo.textContent = frases[fraseIndex];
  fraseIndex = (fraseIndex + 1) % frases.length;
}
setInterval(mudarFrase, 3000);
mudarFrase();

// Busca nos jogos
function filtrarJogos() {
  const filtro = document.getElementById('searchBox').value.toLowerCase();
  const jogos = document.querySelectorAll('#jogos .game');
  jogos.forEach(jogo => {
    const nome = jogo.getAttribute('data-name');
    if (nome.includes(filtro)) {
      jogo.style.display = 'block';
    } else {
      jogo.style.display = 'none';
    }
  });
}

// Confete divertido ao clicar em download
function confete() {
  for(let i = 0; i < 30; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.backgroundColor = `hsl(${Math.random()*360}, 100%, 60%)`;
    confetti.style.animationDuration = 2 + Math.random() * 2 + 's';
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 4000);
  }
}

// Botão voltar ao topo
function scrollToTop() {
  window.scrollTo({top: 0, behavior: 'smooth'});
}

// Efeito shake no título ao clicar 3x rápido
let clickCount = 0;
let clickTimer;
document.getElementById('title').addEventListener('click', () => {
  clickCount++;
  if (clickCount === 3) {
    const title = document.getElementById('title');
    title.classList.add('shake');
    setTimeout(() => title.classList.remove('shake'), 1500);
    clickCount = 0;
    clearTimeout(clickTimer);
  }
  clearTimeout(clickTimer);
  clickTimer = setTimeout(() => clickCount = 0, 700);
});