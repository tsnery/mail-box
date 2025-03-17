const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

const MIME_TYPES = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".ttf": "font/ttf",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".eot": "application/vnd.ms-fontobject",
  ".otf": "font/otf",
};

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // Normalizar URL
  let url = req.url;
  if (url === "/") {
    url = "/index.html";
  }

  // Obter caminho do arquivo
  const filePath = path.join(__dirname, url);
  const extname = path.extname(filePath);

  // Verificar tipo MIME
  const contentType = MIME_TYPES[extname] || "application/octet-stream";

  // Log adicional para arquivos JSON
  if (extname === ".json") {
    console.log(`Servindo arquivo JSON: ${filePath}`);

    // Verificar se o arquivo existe
    if (fs.existsSync(filePath)) {
      console.log(`Arquivo JSON existe: ${filePath}`);

      // Verificar tamanho do arquivo
      const stats = fs.statSync(filePath);
      console.log(`Tamanho do arquivo: ${stats.size} bytes`);
    } else {
      console.log(`Arquivo JSON NÃO existe: ${filePath}`);
    }
  }

  // Ler arquivo
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        // Arquivo não encontrado
        console.error(`Arquivo não encontrado: ${filePath}`);
        res.writeHead(404);
        res.end("Arquivo não encontrado");
      } else {
        // Erro de servidor
        console.error(`Erro ao ler arquivo: ${err}`);
        res.writeHead(500);
        res.end(`Erro de servidor: ${err.code}`);
      }
    } else {
      // Sucesso
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Pressione Ctrl+C para encerrar`);
});
