const express = require('express');
const exphbs = require('express-handlebars');
const app = express();

const sequelize = require('./config/bd');
const Filme = require('./models/filme.model');

app.engine(
    'handlebars', 
    exphbs.engine( {defaultLayout: false} )
);
app.set(
    'view engine', 
    'handlebars'
);

let roupas = ['Blusa', 'Calça', 'Saia', 'Vestido', 'Boné']


app.get(
    '/',
    (req, res) => res.render('listarRoupas', { roupas })
)

app.get(
    '/listar', 
    async (req, res) => {
        const filmes = await Filme.findAll({raw: true});
        console.log(filmes);  
        res.send('ok')  
    }
)


// app.get(
//     '/',
//     (req, res) => res.render('cadastrarRoupa')
// )

app.get(
    '/criar',
    async (req, res) => {
        await Filme.create({
            nome: 'matrix',
            ano: 1999
        });
        res.send('ok')
    }
)

app.get(
    '/delete',
    async (req, res) => {
        const filme = await Filme.findByPk(3);

        await filme.destroy();
        res.send('Ok')
    }
)


// app.get(
//     '/roupa/:id/editar',
//     (req, res) => {
//         const id = req.params.id;
//         const filme = await Filme.findByPk(id);

//         res.render('atualizarRoupa', { filme })
        
//     }
// )


app.get(
    '/atualizar',
    async (req, res) => {
        const filme = await Filme.findByPk(4);

        filme.nome = "Titanic";
        filme.ano = 1997;

        filme.save();

        res.send('Ok');
    }
)



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