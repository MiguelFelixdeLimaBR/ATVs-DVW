const express = require('express');
const exphbs = require('express-handlebars');
const sequelize = require('./config/bd');
const Pessoa = require('./models/pessoa.model');
const Passaporte = require('./models/passaporte.model');
const Autor = require('./models/autor.model');
const Livro = require('./models/livro.model');
const Categoria = require('./models/categoria.model');

require('./models/relacionamentosModels');
const app = express();

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine('handlebars', exphbs.engine({defaultLayout: false}));

app.set('view engine', 'handlebars');

app.get('/', (req, res) => {

  res.render('home', {
    titulo: 'Página Inicial'
  });

});

app.get('/pessoas', async (req, res) => {
  const pessoas = await Pessoa.findAll({raw: true});
  res.render('pessoas', { pessoas });
});

app.get('/pessoas/cadastrar', async (req, res) => {
  res.render('cadastrarPessoas');
});

app.post('/pessoas/cadastrar', async (req, res) => {
  const { nome, numero, validade } = req.body;

  const pessoa = await Pessoa.create({ nome });

  await pessoa.createPassaporte({
    numero,
    validade
  });

  res.redirect('/pessoas');
});

app.get(
  '/pessoas/:id',
  async (req, res) => {
    const id = req.params.id;
    const pessoa = await Pessoa.findByPk(id, {
      include: [
        { model: Passaporte, as: 'passaporte' }
      ]
    });
    res.render('detalharPessoa', { pessoa: pessoa.toJSON() });
  }
);

app.get('/autores', async (req, res) => {
  const autores = await Autor.findAll({raw: true});
  res.render('autores', { autores });
});

app.get('/autores/cadastrar', async (req, res) => {
  res.render('cadastrarAutores');
});
app.post('/autores/cadastrar', async (req, res) => {
  const { nome, titulo1, anoPublicacao1, titulo2, anoPublicacao2 } = req.body;

  const autor = await Autor.create({ nome });

  await Livro.create({
    titulo: titulo1,
    anoPublicacao: anoPublicacao1,
    autorId: autor.id
  });

  await Livro.create({
    titulo: titulo2,
    anoPublicacao: anoPublicacao2,
    autorId: autor.id
  });

  res.redirect('/autores');
});

app.get(
  '/autores/:id',
  async (req, res) => {
    const id = req.params.id;
    const autor = await Autor.findByPk(id, {
      include: [
        { model: Livro, as: 'livros' }
      ]
    });
    res.render('detalharAutor', { autor: autor.toJSON() });
  }
);

app.get('/livros/cadastrar', async (req, res) => {
  const categorias = await Categoria.findAll({ raw: true });
  const autores = await Autor.findAll({ raw: true });
  res.render('cadastrarLivros', { categorias, autores });
});

app.post('/livros/cadastrar', async (req, res) => {
  const { titulo, anoPublicacao, autorId, categorias } = req.body;

  const livro = await Livro.create({
    titulo,
    anoPublicacao,
    autorId
  });

  const idsCategorias = Array.isArray(categorias)
    ? categorias
    : [categorias];

  await livro.setCategorias(idsCategorias);

  res.redirect('/livros');
});

app.get(
  '/Livros/:id',
  async (req, res) => {
    const id = req.params.id;
    const livro = await Livro.findByPk(id, {
      include: [
        { model: Categoria, as: 'categorias' }
      ]
    });
    res.render('detalharLivro', { livro: livro.toJSON() });
  }
);

app.get('/livros', async (req, res) => {
  const livros = await Livro.findAll({raw: true});
  res.render('livros', { livros });
});









async function conectarBD() {
  try {
    await sequelize.sync();
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  } catch (erro) {
    console.error('Erro ao conectar:', erro);
  }
}

conectarBD();

app.listen(3000, () => {

  console.log('Servidor executando em http://localhost:3000');

});