
console.log("media model");
module.exports = (sequelize, DataTypes) => {
  const Media = sequelize.define("Media", {
    media_name: {
      type: DataTypes.STRING,
      validate: {len: [1]}
    },
    media_pic: {
      type: DataTypes.STRING,
      validate: {len: [1]}
    },
    media_type: {
      type: DataTypes.STRING,
      validate: {len: [1]}
    },
    media_plot: { 
      type: DataTypes.STRING, 
      defaultValue: 0
    },
    themoviedb_id: { 
      type: DataTypes.STRING, 
      defaultValue: 0
    },
    omdb_rating: { 
      type: DataTypes.INTEGER, 
      defaultValue: 0
    },
    counter: { 
      type: DataTypes.INTEGER, 
      defaultValue: 0
    },
    user_rating: { 
      type: DataTypes.INTEGER, 
      defaultValue: 0
    }
  });
  Media.associate = function(models) {
    
      console.log("inside media associate")
      Media.hasMany(models.usermedia);
    
    // associations can be defined here
  };
  // Syncs with DB
  // Media.sync();
  return Media;
};
