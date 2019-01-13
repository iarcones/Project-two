console.log("customer model");
module.exports = (sequelize, DataTypes) => {
  
  const Friend = sequelize.define("Friend", {
    friend_email:  {
      type: DataTypes.STRING,
      validate: {len: [1]}
    },
    friendUserId: {
      type: DataTypes.INTEGER,
    }
  });

  // Friend.associate = function(models) {
  //   console.log("inside friend  associate")
  //   Friend.belongsTo(models.User, {
  //     as: 'userfriend',
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };

  Friend.associate = function(models) {
    console.log("inside friend  associate")
    Friend.belongsTo(models.User, {
      // as: 'myuser',
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
