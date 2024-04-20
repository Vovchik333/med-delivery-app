db.createUser(
    {
        user: "account",
        pwd: "password123",
        roles: [
            {
                role: "readWrite",
                db: "med_delivery_app_db"
            }
        ]
    }
);
db.createUser(
    {
        user: "med_delivery",
        pwd: "password321",
        roles: [
            {
                role: "readWrite",
                db: "med_delivery_app_db"
            }
        ]
    }
);