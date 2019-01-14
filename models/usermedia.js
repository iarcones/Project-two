
console.log("usermedia model");
module.exports = (sequelize, DataTypes) => {
  const usermedia = sequelize.define("usermedia", {
    rating: { 
      type: DataTypes.INTEGER, 
      defaultValue: 1 
    },
    myreview: { 
      type: DataTypes.STRING, 
      defaultValue: 1 
    }
  });

  usermedia.associate = function(models) {
    // associations can be defined here
   
    console.log(models)
    usermedia.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  usermedia.associate = function(models) {
    // associations can be defined here
    
    console.log(models)
    usermedia.belongsTo(models.Media, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  // Syncs with DB
  // usermedia.sync();
  return usermedia;
};

