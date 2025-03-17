const fs = require("fs");

// Função para validar um arquivo JSON
function validateJsonFile(filePath) {
  console.log(`\nValidando arquivo: ${filePath}`);

  try {
    // Verificar se o arquivo existe
    if (!fs.existsSync(filePath)) {
      console.error(`  ❌ Arquivo não encontrado: ${filePath}`);
      return false;
    }

    // Verificar tamanho do arquivo
    const stats = fs.statSync(filePath);
    console.log(`  📊 Tamanho do arquivo: ${stats.size} bytes`);

    // Ler o conteúdo do arquivo
    const content = fs.readFileSync(filePath, "utf8");
    console.log(
      `  📄 Primeiros 100 caracteres: ${content.substring(0, 100)}...`
    );

    // Tentar fazer o parse do JSON
    const jsonData = JSON.parse(content);
    console.log(`  ✅ JSON válido`);

    // Verificar propriedades essenciais para animações Lottie
    if (jsonData.v && jsonData.fr && jsonData.w && jsonData.h) {
      console.log(`  ✅ Parece ser uma animação Lottie válida`);
      console.log(
        `  📋 Versão: ${jsonData.v}, Framerate: ${jsonData.fr}, Dimensões: ${jsonData.w}x${jsonData.h}`
      );
      return true;
    } else {
      console.warn(
        `  ⚠️ Arquivo JSON não parece ser uma animação Lottie válida`
      );
      return false;
    }
  } catch (error) {
    console.error(`  ❌ Erro ao validar JSON: ${error.message}`);
    return false;
  }
}

// Validar os arquivos
console.log("=== VALIDAÇÃO DE ARQUIVOS JSON ===");
validateJsonFile("mail-box.json");
validateJsonFile("letter-opening-animation.json");
validateJsonFile("test-mailbox.json");
validateJsonFile("test-letter.json");
console.log("\n=== FIM DA VALIDAÇÃO ===");
