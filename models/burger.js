
console.log("burger model");
module.exports = (sequelize, DataTypes) => {
  const Burger = sequelize.define("Burger", {
    burger_name: {
      type: DataTypes.STRING,
      validate: {len: [1]}
    },
    burger_counter: { 
      type: DataTypes.INTEGER, 
      defaultValue: 0
    }
  });
  Burger.associate = function(models) {
    
      console.log("inside burger associate")
      Burger.hasMany(models.Customerburger);
    
    // associations can be defined here
  };
  // Syncs with DB
  // Burger.sync();
  return Burger;
};