
console.log("customer model");
module.exports = (sequelize, DataTypes) => {
  
  const Customer = sequelize.define("Customer", {
    customer_name:  {
      type: DataTypes.STRING,
      validate: {len: [1]}
    },
  });
  Customer.associate = function(models) {
    console.log("inside customer  associate")
    Customer.hasMany(models.Customerburger);
    };
    // associations can be defined here
  
  // Syncs with DB
  // Customer.sync();
  return Customer;
};

