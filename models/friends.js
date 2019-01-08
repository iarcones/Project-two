console.log("customer model");
module.exports = (sequelize, DataTypes) => {
  
  const Friend = sequelize.define("Friend", {
    friend_email:  {
      type: DataTypes.STRING,
      validate: {len: [1]}
    },
  });
  Friend.associate = function(models) {
    console.log("inside friend  associate")
    Friend.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
    // associations can be defined here
  
  // Syncs with DB
  // Customer.sync();
  return Friend;
};
