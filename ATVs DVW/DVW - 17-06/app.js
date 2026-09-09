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