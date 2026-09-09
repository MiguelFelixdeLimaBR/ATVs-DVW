const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs.engine({ defaultLayout: false }));
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: true }));

const videosTtk = [
    {
        titulo: 'Como fazer pão',
        criador: 'João',
        descricao: 'Receita fácil',
        visualizacoes: 1200,
        curtidas: 350,
        hashtag: '#receita',
        videoUrl: 'https://exemplo.com/video1',
        thumbnailUrl: 'https://via.placeholder.com/150'
    }
];

// Página inicial
app.get('/ttk', (req, res) => {
    res.render('homettk');
});

// Listagem
app.get('/videosttk', (req, res) => {

    let listaVideos = '';

    videosTtk.forEach(video => {
        listaVideos += `
            <div style="border:1px solid #ccc; padding:10px; margin:10px;">
                <img src="${video.thumbnailUrl}" width="150">

                <h3>${video.titulo}</h3>

                <p>Criador: ${video.criador}</p>

                <p> ${video.visualizacoes}</p>

                <p> ${video.curtidas}</p>

                <p> ${video.hashtag}</p>
            </div>
        `;
    });

    res.render('videosttk', {
        listaVideos
    });
});

// Formulário
app.get('/videosttk/cadastrarttk', (req, res) => {
    res.render('cadastrarttk');
});

// Cadastro
app.post('/videosttk', (req, res) => {

    const novoVideo = {
        titulo: req.body.titulo,
        criador: req.body.criador,
        descricao: req.body.descricao,
        visualizacoes: req.body.visualizacoes,
        curtidas: req.body.curtidas,
        hashtag: req.body.hashtag,
        videoUrl: req.body.videoUrl,
        thumbnailUrl: req.body.thumbnailUrl
    };

    videosTtk.push(novoVideo);

    res.redirect('/videosttk');
});

app.listen(3000, () => {
    console.log('Servidor em execução');
});