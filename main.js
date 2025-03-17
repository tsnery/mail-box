const CONFIG = {
  loveMessage:
    "Esta carta simboliza diversos sentimentos meus e um passo a mais na busca por ser uma pessoa melhor, por isso fiz isto aqui, com todo carinho e amor que sinto por você, quero ter você na minha vida e te amar para sempre, te fazer feliz e pedir perdão por te machucar, te causar inseguranças e te fazer sentir que não é suficiente. Quero provar que você é de longe mais que suficiente.",

  animation: {
    heartCount: 15,
    particleCount: 50,
    typeSpeed: 50,
  },
};

let mailboxContainer;
let letterContainer;
let crumpledPaper;
let loveMessageElement;
let particlesCanvas;
let heartsContainer;

let mailboxAnimation;
let letterAnimation;

const state = {
  animationStarted: false,
  letterShown: false,
  paperShown: false,
};

document.addEventListener("DOMContentLoaded", () => {
  initElements();
  initLottieAnimations();
  createFloatingHearts();
  initParticles();
  addEventListeners();
});

function initElements() {
  mailboxContainer = document.querySelector(".mailbox-container");
  letterContainer = document.querySelector(".letter-container");
  crumpledPaper = document.querySelector(".crumpled-paper");
  loveMessageElement = document.getElementById("love-message");
  particlesCanvas = document.getElementById("particles-canvas");
  heartsContainer = document.querySelector(".hearts-container");
}

function initLottieAnimations() {
  console.log("Inicializando animações Lottie...");

  // Mostrar status no elemento de status
  const statusElement = document.getElementById("status");

  // Função para carregar uma animação com fallback
  function loadAnimationWithFallback(options, fallbackPath, onComplete) {
    const { container, path } = options;
    console.log(`Tentando carregar: ${path}`);

    try {
      // Tentar carregar a animação principal
      const animation = lottie.loadAnimation({
        container: container,
        renderer: "svg",
        loop: false,
        autoplay: false,
        path: path,
      });

      // Adicionar eventos
      animation.addEventListener("DOMLoaded", () => {
        console.log(`DOM carregado: ${path}`);
      });

      animation.addEventListener("data_ready", () => {
        console.log(`Dados carregados com sucesso: ${path}`);
      });

      animation.addEventListener("data_failed", (error) => {
        console.error(`Falha ao carregar dados: ${path}`, error);

        // Tentar carregar o fallback
        console.log(`Tentando carregar fallback: ${fallbackPath}`);

        const fallbackAnimation = lottie.loadAnimation({
          container: container,
          renderer: "svg",
          loop: false,
          autoplay: false,
          path: fallbackPath,
        });

        fallbackAnimation.addEventListener("complete", onComplete);

        return fallbackAnimation;
      });

      animation.addEventListener("complete", onComplete);

      return animation;
    } catch (error) {
      console.error(`Erro ao inicializar animação: ${path}`, error);
      if (statusElement) {
        statusElement.innerHTML += `<p style="color: red;">✗ Erro ao inicializar: ${path} - ${error.message}</p>`;
      }

      // Tentar carregar o fallback
      try {
        console.log(`Tentando carregar fallback: ${fallbackPath}`);
        if (statusElement) {
          statusElement.innerHTML += `<p>Tentando fallback: ${fallbackPath}</p>`;
        }

        const fallbackAnimation = lottie.loadAnimation({
          container: container,
          renderer: "svg",
          loop: false,
          autoplay: false,
          path: fallbackPath,
        });

        fallbackAnimation.addEventListener("complete", onComplete);

        return fallbackAnimation;
      } catch (fallbackError) {
        console.error(
          `Erro ao carregar fallback: ${fallbackPath}`,
          fallbackError
        );
        if (statusElement) {
          statusElement.innerHTML += `<p style="color: red;">✗ Erro ao carregar fallback: ${fallbackPath} - ${fallbackError.message}</p>`;
        }
        return null;
      }
    }
  }

  // Carregar animação da caixa de correio
  mailboxAnimation = loadAnimationWithFallback(
    {
      container: document.getElementById("mailbox-animation"),
      path: "mail-box.json",
    },
    "test-mailbox.json",
    onMailboxAnimationComplete
  );

  // Carregar animação da carta
  letterAnimation = loadAnimationWithFallback(
    {
      container: document.getElementById("letter-animation"),
      path: "letter-opening-animation.json",
    },
    "test-letter.json",
    onLetterAnimationComplete
  );
}

function createFloatingHearts() {
  for (let i = 0; i < CONFIG.animation.heartCount; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤️";

    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${Math.random() * 15 + 10}px`;

    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 10;

    heart.style.animation = `float-heart ${duration}s linear infinite`;
    heart.style.animationDelay = `${delay}s`;

    heartsContainer.appendChild(heart);
  }
}

function initParticles() {
  const canvas = particlesCanvas;
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  const particles = [];

  for (let i = 0; i < CONFIG.animation.particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      color: getRandomColor(),
      speedX: Math.random() * 0.5 - 0.25,
      speedY: Math.random() * 0.5 - 0.25,
      opacity: Math.random() * 0.5 + 0.5,
    });
  }

  function getRandomColor() {
    const colors = [
      "#FFB6C1", // Rosa
      "#FFD700", // Dourado
      "#FF6B6B", // Vermelho suave
      "#FFC0CB", // Rosa claro
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // Animar partículas
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.globalAlpha = particle.opacity;
      ctx.fill();

      particle.x += particle.speedX;
      particle.y += particle.speedY;

      if (particle.x < 0 || particle.x > canvas.width) {
        particle.speedX = -particle.speedX;
      }

      if (particle.y < 0 || particle.y > canvas.height) {
        particle.speedY = -particle.speedY;
      }
    });

    requestAnimationFrame(animateParticles);
  }

  animateParticles();
}

// Adicionar event listeners
function addEventListeners() {
  mailboxContainer.addEventListener("click", startAnimation);

  // Adicionar suporte para touch
  mailboxContainer.addEventListener("touchstart", (e) => {
    e.preventDefault();
    startAnimation();
  });
}

// Iniciar animação
function startAnimation() {
  console.log("Iniciando animação...");

  if (state.animationStarted) {
    console.log("Animação já iniciada, ignorando");
    return;
  }

  state.animationStarted = true;

  // Verificar se a animação foi carregada
  if (!mailboxAnimation) {
    console.error("Animação da caixa de correio não foi inicializada");

    const statusElement = document.getElementById("status");
    if (statusElement) {
      statusElement.innerHTML +=
        '<p style="color: red;">❌ Animação da caixa de correio não foi inicializada</p>';
      statusElement.innerHTML +=
        "<p>Tentando reinicializar as animações...</p>";
    }

    // Tentar inicializar novamente
    initLottieAnimations();

    // Verificar novamente após um pequeno delay
    setTimeout(() => {
      if (!mailboxAnimation) {
        const errorMsg =
          "Não foi possível carregar a animação. Por favor, recarregue a página.";
        console.error(errorMsg);

        if (statusElement) {
          statusElement.innerHTML += `<p style="color: red;">❌ ${errorMsg}</p>`;
        }

        alert(errorMsg);
        return;
      } else {
        // Animação carregada com sucesso após a reinicialização
        console.log("Animação carregada após reinicialização, continuando...");
        if (statusElement) {
          statusElement.innerHTML +=
            '<p style="color: green;">✅ Animação carregada após reinicialização</p>';
        }

        // Continuar com a animação
        playMailboxAnimation();
      }
    }, 1000);

    return;
  }

  // Reproduzir a animação
  playMailboxAnimation();
}

// Função para reproduzir a animação da caixa de correio
function playMailboxAnimation() {
  console.log("Reproduzindo animação da caixa de correio");

  try {
    // Esconder texto de dica
    const hintText = document.querySelector(".hint-text");
    if (hintText) {
      hintText.style.opacity = "0";
    }

    // Adicionar efeito de brilho
    mailboxContainer.style.boxShadow = "0 0 20px var(--dourado)";

    // Reproduzir a animação
    mailboxAnimation.play();
  } catch (error) {
    console.error("Erro ao reproduzir animação:", error);

    const statusElement = document.getElementById("status");
    if (statusElement) {
      statusElement.innerHTML += `<p style="color: red;">❌ Erro ao reproduzir animação: ${error.message}</p>`;
    }

    // Tentar avançar para a próxima etapa mesmo assim
    onMailboxAnimationComplete();
  }
}

// Callback quando a animação da caixa de correio terminar
function onMailboxAnimationComplete() {
  if (state.letterShown) return;

  state.letterShown = true;

  // Esconder caixa de correio com fade out
  mailboxContainer.style.opacity = "0";
  mailboxContainer.style.transition = "opacity 0.5s ease";

  // Mostrar container da carta após um pequeno delay
  setTimeout(() => {
    mailboxContainer.style.display = "none";
    letterContainer.style.display = "flex";
    letterContainer.style.opacity = "0";

    // Fade in da carta
    setTimeout(() => {
      letterContainer.style.opacity = "1";
      letterContainer.style.transition = "opacity 0.5s ease";

      // Iniciar animação da carta
      setTimeout(() => {
        letterAnimation.play();
      }, 500);
    }, 100);
  }, 500);
}

// Callback quando a animação da carta terminar
function onLetterAnimationComplete() {
  if (state.paperShown) return;

  state.paperShown = true;

  // Esconder carta com fade out
  letterContainer.style.opacity = "0";
  letterContainer.style.transition = "opacity 0.5s ease";

  // Mostrar papel amassado após um pequeno delay
  setTimeout(() => {
    letterContainer.style.display = "none";
    crumpledPaper.style.display = "block";

    // Adicionar classe para iniciar animação
    setTimeout(() => {
      crumpledPaper.classList.add("visible");

      // Aplicar textura ao papel
      window.PaperEffects.applyPaperTexture();

      // Adicionar efeito de digitação
      setTimeout(() => {
        window.PaperEffects.typeWriterEffect(
          loveMessageElement,
          CONFIG.loveMessage,
          CONFIG.animation.typeSpeed
        );
      }, 1000);
    }, 100);
  }, 500);
}
