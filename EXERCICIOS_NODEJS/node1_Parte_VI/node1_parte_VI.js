// Importação dos módulos necessários
const http = require('http');
const fs = require('fs');
const path = require('path');
const { createLink } = require('./util');

const dotenv = require('dotenv');
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

const directoryPath = process.argv[2];
if (!directoryPath) {
  console.error('Esqueceu do argumento (diretório).');
  process.exit(1);
}

// Criação do servidor 
const server = http.createServer((req, res) => {
  const urlPath = req.url === '/' ? '' : req.url;

  if (urlPath === '') {
   
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Houve erro na leitura do diretório');
        return;
      }

      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('<html><body>');

      files.forEach(file => {
        if (path.extname(file) === '.txt') {
          res.write(createLink(file));
        }
      });

      res.end('</body></html>');
    });
  } else {

    const filePath = path.join(directoryPath, urlPath);
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Arquivo não encontrado');
        return;
      }

      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('<html><body>');
      res.write('<a href="/">Voltar</a><br><br>');
      res.write(`<pre>${data}</pre>`);
      res.end('</body></html>');
    });
  }
});

// Inicialização do servidor
const PORT = process.env.PORT || 3333;
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
