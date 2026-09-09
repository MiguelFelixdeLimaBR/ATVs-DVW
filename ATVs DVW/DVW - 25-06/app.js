const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

const sequelize = require('./config/bd')
const Produto = require('./models/produto.model')
const Usuario = require('./models/usuario.model');

app.engine(
    'handlebars', 
    exphbs.engine( {defaultLayout: false} )
);
app.set(
    'view engine', 
    'handlebars'
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('home');
});

app.get(
    '/exercicio4',
    async (req, res) => {
        await Produto.create({
            nome: 'Produto A', 
            preco: 10.0 
        });
        await Produto.create({ 
            nome: 'Produto B', 
            preco: 20.0 
        });
        await Produto.create({ 
            nome: 'Produto C', 
            preco: 30.0 
        });

        const produtos = await Produto.findAll();
        console.log(produtos);

        res.send('OK');
    }
);

app.get(
    '/exercicio5',
    async (req, res) => {
        const produto = await Produto.findByPk(1, { raw: true });
        console.log('Nome:', produto.nome);
        console.log('Preço:', produto.preco);

        res.send('ok');
    }
);

app.get(
    '/exercicio6',
    async (req, res) => {
        const produto = await Produto.findByPk(1);
        produto.preco = 99.99;
        await produto.save();
        console.log('Preço atualizado com sucesso!');

        res.send('ok');
    }
);

app.get(
    '/exercicio7',
    async (req, res) => {
        const produto = await Produto.findByPk(14);
        await produto.destroy();
        console.log('Produto removido com sucesso!');
        
        const produtos = await Produto.findAll({ raw: true });
        console.log(produtos);

        res.send('ok');
    }
);

app.get(
    '/produtos',
    async (req, res) => {
        const produtos = await Produto.findAll({ raw: true });
        console.log(produtos);

        res.json(produtos);
    }
);

app.post(
    '/produtos',
    async (req, res) => {
        const { nome, preco } = req.body;
        const produto = await Produto.create({ nome, preco });
        console.log('Produto criado com sucesso!');
        res.json(produto);
    }
);

app.get(
    '/produtos/delete/:id',
    async (req, res) => {
        const { id } = req.params;
        const produto = await Produto.findByPk(id);

        await produto.destroy();
        console.log(`Produto ${id} removido com sucesso!`);
        res.send('Produto removido com sucesso');
    }
);

app.get(
    '/usuarios',
    async (req, res) => {
        const usuarios = await Usuario.findAll({ raw: true });
        console.log('Usuários encontrados:', usuarios.length);
        console.log(usuarios);

        const listaUsuarios = usuarios.length
            ? usuarios
                .map(usuario => `
                    <li>
                        <strong>Nome:</strong> ${usuario.nome} | 
                        <strong>E-mail:</strong> ${usuario.email}
                        <button type="button" onclick="window.location.href='/usuarios/delete/${usuario.id}'">Remover</button>
                    </li>`)
                .join('')
            : '<li>Nenhum usuário encontrado</li>';

        res.render('usuarios', { listaUsuarios });
    }
);

app.get(
    '/usuarios/cadastrar',
    (req, res) => {
        res.render('cadastrarUsuario');
    }
);

app.post(
    '/usuarios',
    async (req, res) => {
        const { nome, email, idade } = req.body;
        await Usuario.create({ nome, email, idade });
        console.log('Usuário cadastrado:', nome, email, idade);
        res.redirect('/usuarios');
    }
);

app.get(
    '/usuarios/delete/:id',
    async (req, res) => {
        const { id } = req.params;
        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).send('Usuário não encontrado');
        }

        await usuario.destroy();
        console.log(`Usuário ${id} removido com sucesso!`);
        res.redirect('/usuarios');
    }
);

async function conectarBD() {
    try{
        await sequelize.sync();
        console.log('Conexão com o banco de dados estabelecida com sucesso!')
    } catch (erro) {
        console.error('Erro ao conectar:', erro);
    }
}

conectarBD()

app.listen(
    3000,
    () => console.log('Servidor em execução')
)