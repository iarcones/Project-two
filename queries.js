db.User.create({
    user_name: user,
    user_email: email
})
    .then(function (data) {
        console.log(data)
        res.json(data);
    });


db.User.findOne({ where: { user_email: email } }).then(function (data) {
    console.log("data", data)
    if (data) {
        console.log("rec exist");
    }
    else {
        console.log("rec no exist");
        db.User.create({
            user_name: user,
            user_email: email
        })
            .then(function (data) {
                console.log(data)
                res.json(data);
            });
    }
})