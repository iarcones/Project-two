console.log("customer model");
module.exports = (sequelize, DataTypes) => {
  
  const Friend = sequelize.define("Friend", {
    friend_email:  {
      type: DataTypes.STRING,
      validate: {len: [1]}
    },
    friend_phone:  {
      type: DataTypes.STRING,
      validate: {len: [1]}
    },
    invitation_status: {
      type: DataTypes.BOOLEAN, 
      allowNull: false, 
      defaultValue: false 
    },
    friendUserId: {
      type: DataTypes.INTEGER,
    }
  });

  Friend.associate = function(models) {
    console.log("inside friend  associate")
    Friend.belongsTo(models.User, {

      foreignKey: {
        allowNull: false
      }
    });
  };

  
  // Syncs with DB
  // Friend.sync();
  return Friend;
};


  // Friend.associate = function(models) {
  //   console.log("inside friend  associate")
  //   Friend.belongsTo(models.User, {
  //     as: 'userfriend',
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });
  // };