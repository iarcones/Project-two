
console.log("profile model");
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define("Profile", {
    media_name: {
      type: DataTypes.STRING,
      validate: {len: [1]}
    },
    media_type: {
      type: DataTypes.STRING,
      validate: {len: [1]}
    },
    media_plot: { 
      type: DataTypes.INTEGER, 
      defaultValue: 0
    },
    omdb_id: { 
      type: DataTypes.INTEGER, 
      defaultValue: 0
    },
    user_rating: { 
      type: DataTypes.INTEGER, 
      defaultValue: 0
    },
    user_rating: { 
        type: DataTypes.INTEGER, 
        defaultValue: 0
      },
  });
  Profile.associate = function(models) {
    
      console.log("inside media associate")
      Media.hasMany(models.usermedia);
    
    // associations can be defined here
  };
  // Syncs with DB
  // Burger.sync();
  return Profile;
};



// $(function() {
//   alert("Hi");
//   $.ajax({
//       url: "http://private-174c-themoviedb.apiary.io/3/search/movie?api_key=[pastedMyApiKeyHere]&callback=test",
//       contentType: "application/json",
//       type: "GET",
//       crossDomain: true,
//       success: function(data) {
//           alert("It worked");
//       },
//       error: function(err) {
//           alert(JSON.stringify(err));
//       }
//   });
// });