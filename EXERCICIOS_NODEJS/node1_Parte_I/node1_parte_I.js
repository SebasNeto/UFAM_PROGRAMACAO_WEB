//importação do módulo HTTP
const http = require('http');
const fs = require('fs');
const path = require('path');

const directoryPath = process.argv[2];
if (!directoryPath) {
  console.error('esqueceu do argumento (diretório).');
  process.exit(1);
}

//criação do servidor 
const server = http.createServer((req, res) => {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      res.writeHead(500, {'Content-Type': 'text/plain'});
      res.end('Houve erro na leitura do diretório');
      return;
    }
    
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<html><body><ul>');
    
    files.forEach(file => {
      res.write(`<li>${file}</li>`);
    });
    
    res.write('</ul></body></html>');
    res.end();
  });
});

//inicialização do servidor
const PORT = 3333;
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
