const sequelize = require('../config/bd');
const Pessoa = require('./pessoa.model');
const Passaporte = require('./passaporte.model');
const Autor = require('./autor.model');
const Livro = require('./livro.model');
const Categoria = require('./categoria.model');

Pessoa.hasOne(Passaporte, {
  foreignKey: 'pessoaId',
  as: 'passaporte'
});

Passaporte.belongsTo(Pessoa, {
  foreignKey: 'pessoaId',
  as: 'pessoa'
});

Autor.hasMany(Livro, {
  foreignKey: 'autorId',
  as: 'livros'
});

Livro.belongsTo(Autor, {
  foreignKey: 'autorId',
  as: 'autor'
});

Livro.belongsToMany(Categoria, {
  through: 'LivroCategoria',
  foreignKey: 'livroId',
  as: 'categorias'
});

Categoria.belongsToMany(Livro, {
  through: 'LivroCategoria',
  foreignKey: 'categoriaId',
  as: 'livros'
});