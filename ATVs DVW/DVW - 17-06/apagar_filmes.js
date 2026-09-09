const sequelize = require('./config/bd');

async function apagarFilmes() {
  try {
    await sequelize.authenticate();
    await sequelize.query('DROP TABLE IF EXISTS filmes;');
    console.log('Tabela "filmes" deletada com sucesso.');
  } catch (err) {
    console.error('Erro ao deletar tabela "filmes":', err);
  } finally {
    await sequelize.close();
  }
}

apagarFilmes();
