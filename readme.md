# back-end

# URI path

```sh
/api/users
```

```sh
{
    message: "ok",
    auth: false,
    authAdmin: false,
    data: {
        users: [
            {
                id: 2,
                username: "admin",
                password_digest: "$2a$10$fRDU0sx0PC3J.9.pyMq2/.uUA45ufc6tQC6qSFrfr.rvtJbkqDi1m",
                email: "admin@admin.com",
                block: false
            },
            {
                id: 5,
                username: "user3",
                password_digest: "$2a$10$WEB1rbJJKg4oSAuMHWIYIOQHeOy68QH/ty4OJv6GBw/FProUEI3L.",
                email: "user3@user3.com",
                block: false
            },
            {
                id: 6,
                username: "user4",
                password_digest: "$2a$10$HXVvBSvvhs8PtgZadNgljOLSsV2qdY9Ar63lDdmHt2eMy.QMX7d6e",
                email: "user4@user4.com",
                block: false
            },
            {
                id: 3,
                username: "user",
                password_digest: "$2a$10$ncCQzj05otVlNX/ySZVuruPneEek20nJJzf4E86LJWdCetrWn7Tli",
                email: "user@user.com",
                block: true
            },
            {
                id: 4,
                username: "user2",
                password_digest: "$2a$10$HtMBHUf/z1DbsnVAYIo0QuPyPbbe.vLW36lPKvAuA5xlI.ZaU/KVq",
                email: "user2@user2.com",
                block: true
            }
        ]
    }
}
```
# stack

- React
- node/express
- psql

# dependencies

```sh
"dependencies": {
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.18.2",
    "cookie-parser": "^1.4.3",
    "dotenv": "^4.0.0",
    "express": "^4.16.2",
    "express-session": "^1.15.6",
    "morgan": "^1.9.0",
    "passport": "^0.4.0",
    "passport-local": "^1.0.0",
    "pg-promise": "^7.3.1"
  }
```
# steps

1) installed dependencies
2) created server(back)
3) created client(front)
4) created db
5) setup user authentication
6) setup user authorization

# user stories

admin can sign in and choose to delete or block a users access to the site
