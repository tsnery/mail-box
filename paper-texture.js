/**
 * Efeitos de textura para o papel amassado
 */

// Função para adicionar textura ao papel
function applyPaperTexture() {
  const paper = document.querySelector(".crumpled-paper");

  if (!paper) return;

  // Adicionar vincos aleatórios ao papel
  const creaseCount = Math.floor(Math.random() * 3) + 3;

  for (let i = 0; i < creaseCount; i++) {
    const crease = document.createElement("div");
    crease.classList.add("paper-crease");

    // Posição aleatória
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const rotation = Math.random() * 180;

    // Estilo do vinco
    crease.style.position = "absolute";
    crease.style.top = `${top}%`;
    crease.style.left = `${left}%`;
    crease.style.width = `${Math.random() * 30 + 20}%`;
    crease.style.height = "1px";
    crease.style.background = "rgba(0,0,0,0.05)";
    crease.style.transform = `rotate(${rotation}deg)`;
    crease.style.boxShadow = "0 0 2px rgba(0,0,0,0.05)";

    paper.appendChild(crease);
  }

  // Adicionar efeito de movimento sutil ao passar o mouse
  paper.addEventListener("mousemove", (e) => {
    const rect = paper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const moveX = (x - centerX) / 50;
    const moveY = (y - centerY) / 50;

    paper.style.transform = `translate(-50%, -50%) perspective(1000px) rotateX(${moveY}deg) rotateY(${-moveX}deg)`;
  });

  paper.addEventListener("mouseleave", () => {
    paper.style.transform = "translate(-50%, -50%)";
    paper.style.transition = "transform 0.5s ease";
  });
}

// Função para criar o efeito de escrita gradual
function typeWriterEffect(element, text, speed = 50) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Exportar funções
window.PaperEffects = {
  applyPaperTexture,
  typeWriterEffect,
};
