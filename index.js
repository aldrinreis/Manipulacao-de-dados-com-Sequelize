// Importando as biliotecas
const { Sequelize, Model, DataTypes } = require("sequelize");
//Abrindo conexão com o Banco de dados ou criando um novo caso não exista
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "empresa.sqlite",
});
// Definindo a classe setor

class Setor extends Model {
  static init(sequelize) {
    super.init(
      {
        idsetor: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        nome: {
          type: DataTypes.STRING(40),
          allowNull: false,
        },
        ramal: {
          type: DataTypes.STRING(10),
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(30),
        },
      },
      { sequelize, modelname: "setor", tableName: "setores" },
    );
  }
}

// Inicializando o modelo create table setor
Setor.init(sequelize);

// Sincronismo
(async () => {
  await sequelize.sync({ force: true });
})();