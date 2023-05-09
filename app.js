const mysql = require('mysql2');
const con = mysql.createConnection
({
    host: "localhost", // hostname
    user: "root", // username
    password: "", // password
    database: "timezone" // database name
});

con.connect((err) => 
{
  if(err)
  {
    console.log("Error while connecting to the database:", err);
  }
  else
  {
    console.log("Database connected!");
  }
});


// Specify the country and timezone you want to use
const country = 'America';
const timezone = 'America/Lima';

// Get the current date and time in the specified timezone
const currentDate = new Date();
const options = {
  timeZone: timezone,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false // set to false to use 24-hour format
};
// Format the current date and time in the DATETIME format of MySQL
const currentDateTime = new Date(Date.parse(currentDate.toLocaleString('en-US', options)));

const year = currentDateTime.getFullYear();
const month = ('0' + (currentDateTime.getMonth() + 1)).slice(-2);
const day = ('0' + currentDateTime.getDate()).slice(-2);
const hour = ('0' + currentDateTime.getHours()).slice(-2);
const minute = ('0' + currentDateTime.getMinutes()).slice(-2);
const second = ('0' + currentDateTime.getSeconds()).slice(-2);

const mysqlDateTime = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
console.log(`The current date and time in ${country} is ${mysqlDateTime}`);


const chetime = `INSERT INTO timecheck(some, created_at) VALUES ('144', '${mysqlDateTime}')`;
console.log(chetime);
con.query(chetime, (err, result) => {
  if (err) {
    console.log("Error while inserting data into database:", err.message);
  } else {
    console.log("Data inserted successfully!");
  }
});
