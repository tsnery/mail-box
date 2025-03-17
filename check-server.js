const http = require("http");

function makeRequest(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "localhost",
      port: 3000,
      path: path,
      method: "GET",
    };

    console.log(`Fazendo requisição para: http://localhost:3000${path}`);

    const req = http.request(options, (res) => {
      console.log(`Status: ${res.statusCode}`);
      console.log(`Headers: ${JSON.stringify(res.headers)}`);

      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        console.log(`Tamanho dos dados: ${data.length} bytes`);
        console.log(`Primeiros 100 caracteres: ${data.substring(0, 100)}...`);

        try {
          const json = JSON.parse(data);
          console.log("✅ JSON válido");
          resolve({ status: res.statusCode, data: json });
        } catch (error) {
          console.error("❌ JSON inválido:", error.message);
          reject(error);
        }
      });
    });

    req.on("error", (error) => {
      console.error(`❌ Erro na requisição: ${error.message}`);
      reject(error);
    });

    req.end();
  });
}

async function checkFiles() {
  console.log("=== VERIFICANDO ARQUIVOS NO SERVIDOR ===\n");

  try {
    console.log("Verificando mail-box.json:");
    await makeRequest("/mail-box.json");
    console.log("\n");
  } catch (error) {
    console.error("Erro ao verificar mail-box.json\n");
  }

  try {
    console.log("Verificando letter-opening-animation.json:");
    await makeRequest("/letter-opening-animation.json");
    console.log("\n");
  } catch (error) {
    console.error("Erro ao verificar letter-opening-animation.json\n");
  }

  try {
    console.log("Verificando test-mailbox.json:");
    await makeRequest("/test-mailbox.json");
    console.log("\n");
  } catch (error) {
    console.error("Erro ao verificar test-mailbox.json\n");
  }

  try {
    console.log("Verificando test-letter.json:");
    await makeRequest("/test-letter.json");
    console.log("\n");
  } catch (error) {
    console.error("Erro ao verificar test-letter.json\n");
  }

  console.log("=== FIM DA VERIFICAÇÃO ===");
}

checkFiles().catch(console.error);
