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

class Funcionario extends Model {
  static init(sequelize) {
    super.init(
      {
        matricula: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        idsetor: {
          type: DataTypes.INTEGER,
          references: {
            model: Setor,
            key: "idsetor",
          },
          allowNull: false,
        },
        nome: {
          type: DataTypes.STRING(60),
          allowNull: false,
        },
        nascimento: {
          type: DataTypes.DATE,
        },
        telefone: {
          type: DataTypes.STRING(15),
        },
      },
      { sequelize, modelName: "funcionario", tableName: "funcionarios" },
    );
  }
}

Funcionario.init(sequelize);

// Sincronismo
(async () => {
  await sequelize.sync({ force: true });
  // Usando o Create
  const setor_create = await Setor.create({
    nome: "Financeiro",
    ramal: "2134",
    email: "financeiro@empresa.com",
  });
  const setor_create_S = await Setor.create({
    nome: "Secretaria",
    ramal: "2135",
    email: "secretaria@empresa.com",
  });
  const setor_create_P = await Setor.create({
    nome: "Portaria",
    ramal: "2136",
    email: "portaria@empresa.com",
  });

  // Read - Listar objetos
  const setores_listar = await Setor.findAll();
  console.log(
    "Lista de setores: \n",
    JSON.stringify(setores_listar, ["idsetor", "nome", "ramal", "email"], 2),
    "\n\n",
  );

  // Update - Atualizar objetos

  const setor_chave = await Setor.findByPk(3);
  setor_chave.nome = "Estoque";

  const resultado = await setor_chave.save();
  console.log(resultado);

  // Read - Listar objetos
  const setores_update = await Setor.findAll();
  console.log(
    "Lista de setores Atualizados: \n",
    JSON.stringify(setores_update, ["idsetor", "nome", "ramal", "email"], 2),
    "\n\n",
  );

  // Delete - Deletar objetos
  
})();
