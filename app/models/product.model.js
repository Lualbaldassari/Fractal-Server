module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("products", {
    Name: {
      type: Sequelize.STRING,
    },
    Category: {
      type: Sequelize.STRING,
    },
    UnitPrice:{
        type: Sequelize.INTEGER,
    },
    Active: {
      type: Sequelize.BOOLEAN,
    },
  });

  return Product;
};
