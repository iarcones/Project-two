
console.log("user model");
module.exports = (sequelize, DataTypes) => {

  const User = sequelize.define("User", {
    user_name: {
      type: DataTypes.STRING,
      validate: { len: [1] }
    },
    first_name: {
      type: DataTypes.STRING,
      validate: { len: [1] }
    },
    last_name: {
      type: DataTypes.STRING,
      validate: { len: [1] }
    },
    user_email: {
      type: DataTypes.STRING,
      validate: { isEmail: true }
    }
  });
  
  User.associate = function (models) {
    User.hasMany(models.usermedia);
  };

  // User.associate = function (models) {
  //   User.hasMany(models.Friend);
  // };

  // associations can be defined here

  // Syncs with DB
  // User.sync();
  return User;
};

