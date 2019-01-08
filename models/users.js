
console.log("user model");
module.exports = (sequelize, DataTypes) => {
  
  const User = sequelize.define("User", {
    user_name:  {
      type: DataTypes.STRING,
      validate: {len: [1]}
    },
    user_email: {
      type: DataTypes.STRING,
      validate: {isEmail: true}
    }
  });
  User.associate = function(models) {
    console.log("inside user  associate")
    User.hasMany(models.usermedia);
    };
    // associations can be defined here
  
  // Syncs with DB
  // Customer.sync();
  return User;
};

