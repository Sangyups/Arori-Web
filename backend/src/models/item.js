const Sequelize = require('sequelize');

module.exports = class Item extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        desc: {
          type: Sequelize.STRING(500),
        },
        price: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        fileName: {
          type: Sequelize.STRING,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: true,
        modelName: 'Item',
        tableName: 'items',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      },
    );
  }
};
