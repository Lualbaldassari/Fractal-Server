const db = require("../models");
const Order = db.order;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: orders } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, orders, totalPages, currentPage };
};

// Create and Save a new order
exports.create = (req, res) => {
  // Validate request
  if (!req.body.OrderNumber) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a order
  const order = {
    OrderNumber: req.body.OrderNumber,
    Status: req.body.Status,
    Date: req.body.Date,
    Customer: req.body.Customer,
    TaxesAmount: req.body.TaxesAmount,
    TotalTaxes: req.body.TotalTaxes,
    TotalAmount: req.body.TotalAmount,
  };

  // Save order in the database
  Order.create(order)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Order.",
      });
    });
};

// Retrieve all orders from the database.
exports.findAll = (req, res) => {
  const { page, size, orderNumber } = req.query;
  var condition = orderNumber
    ? { orderNumber: { [Op.like]: `%${orderNumber}%` } }
    : null;
  const { limit, offset } = getPagination(page, size);



  Order.findAndCountAll({ where: condition, limit, offset })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving orders.",
      });
    });
};

// Find a single order with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Order.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find the Order with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving the order with id=" + id,
      });
    });
};

// Update a order by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Order.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Order was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Order with id=${id}. Maybe the Order was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating the Order with id=" + id,
      });
    });
};
// Delete a product with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Order.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Order was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Order with id=${id}. Maybe Order was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Order with id=" + id,
      });
    });
};

// // Find all active products
// exports.findAllPublished = (req, res) => {
//   Order.findAll({ where: { status: true } })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Some error occurred while retrieving orders.",
//       });
//     });
// };
