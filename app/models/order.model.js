module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("orders", {
    OrderNumber: {
      type: Sequelize.INTEGER,
    },
    Status: {
      type: Sequelize.STRING,
    },
    Date: {
      type: Sequelize.DATE,
    },
    Customer: {
      type: Sequelize.STRING,
    },
    TaxesAmount: {
      type: Sequelize.INTEGER,
    },
    TotalTaxes: {
      type: Sequelize.INTEGER,
    },
    TotalAmount: {
      type: Sequelize.INTEGER,
    }
  });

  return Order;
};
