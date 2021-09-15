const { Client } = require('pg');

const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "password",
    database: "ecommerce"
});

client.on("connect", () => {
    console.log("Connected to database");
});

client.on("end", () => {
    console.log("Connection ended");
});

module.exports = client;

