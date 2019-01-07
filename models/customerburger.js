
console.log("customerburgers model");
module.exports = (sequelize, DataTypes) => {
  const Customerburger = sequelize.define("Customerburger", {
    counter: { 
      type: DataTypes.INTEGER, 
      defaultValue: 1 
    }
  });

  Customerburger.associate = function(models) {
    // associations can be defined here
    console.log("inside customer burger associate customer")
    console.log(models)
    Customerburger.belongsTo(models.Customer, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  Customerburger.associate = function(models) {
    // associations can be defined here
    console.log("inside customer burger associate burger")
    console.log(models)
    Customerburger.belongsTo(models.Burger, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  // Syncs with DB
  // Customerburger.sync();
  return Customerburger;
};

