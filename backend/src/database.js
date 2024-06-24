const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('proyecto', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexión establecida correctamente con la base de datos');
  })
  .catch(err => {
    console.error('Error al conectar con la base de datos:', err);
  });

module.exports = sequelize;