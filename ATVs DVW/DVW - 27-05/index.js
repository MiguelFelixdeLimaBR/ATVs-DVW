const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

app.engine('handlebars', exphbs.engine({defaultLayout:false}));
app.set('view engine', 'handlebars');

app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/perfil', (req, res) => {
    res.render('perfil', {
        nome: 'Miguel',
        idade: 20
    });
});

app.get('/listafilmes', (req, res) => {

    const filmes = [
        'Interestelar',
        'Matrix',
        'Shrek'
    ];

    let listaFilmes = '';

    filmes.forEach(filme => {
        listaFilmes += `
            <li>${filme}</li>
        `;
    });

    res.render('listafilmes', {
        listaFilmes
    });
});

app.get('/usuario', (req, res) => {
    res.render('usuario', {
        logado: true,
        admin: false
    });
});

app.get('/filmes', (req, res) => {

    const filmes = [
        {
            nome: 'Interestelar',
            ano: 2014
        },
        {
            nome: 'Matrix',
            ano: 1999
        },
        {
            nome: 'O poderoso chefão',
            ano: 1972
        }
    ];

    let listaFilmes = '';

    filmes.forEach(filme => {
        listaFilmes += `
            <li>
                ${filme.nome} (${filme.ano})
            </li>
        `;
    });

    res.render('filmes', {
        listaFilmes
    });
});

app.get('/', (req, res) => {
    res.send('Bem-vindo ao sistema');
});

app.get('/sobre', (req, res) => {
  res.send('Este é um exmplo de uma rota com para exibir uma mensagem sobre a aplicação');
});

app.get('/contato', (req, res) => {
  res.json({
    "email": "contato@email.com",
    "telefone": "(81) 99999-9999"
  });
});

app.get('/erro', (req, res) => {
  res.status(404).send('Página não encontrada');
});

app.get('/inicio', (req, res) => {
  res.redirect('/');
});

app.get('/usuarios/:id', (req, res) => {
  const id = req.params.id
  res.send(`usuario ${id}`)
});

app.get('/produtos/:nome', (req, res) => {
  const nome = req.params.nome
  res.send(`produto: ${nome}`)
});

app.get('/filmes/:id/:nome', (req, res) => {
  const id_filme = req.params.id
  const nome_filme = req.params.nome

  res.send(`id do filme: ${id_filme} nome do filme: ${nome_filme}`)
});

app.get('/buscar', (req, res) => {
  const nome = req.query.nome
  res.send(`buscando por: ${nome}`)
});

app.get('/produtos2', (req, res) => {
  const categoria = req.query.categoria
  const pagina = req.query.pagina

  res.send(`categoria: ${categoria} pagina: ${pagina}`)
});

app.get('/usuarios2', (req, res) => {
  const idade = req.query.idade
  res.send(`Filtrando usuários com idade ${idade}`)
});

app.listen(
    3000, 
    () => console.log(`Servidor em execução`)
);