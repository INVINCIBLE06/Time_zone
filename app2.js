const mysql = require('mysql2');
const con = mysql.createConnection
({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'timezone',
});

con.connect((err) => 
{
  if (err)
  {
  console.log('Error while connecting to the database:', err);
  }
  else
  {
    console.log('Database connected!');
  }
});

let sel = `SELECT * FROM country`;
con.query(sel, (err, result1) => {
  if (result1.length != 0) {
    console.log('Successfully');
    // console.log(result1.length);
    //console.log(result1);
    for (let i = 0; i < result1.length; i++) {
      let country = [];
      let timezone = [];
      country[i] = result1[i].name;
      timezone[i] = result1[i].timezone;
      let currentDate = [];
      let options = [];
      currentDate[i] = new Date();
      options[i] = {
        timeZone: timezone[i],
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false, // set to false to use 24-hour format
      };
      let currentDateTime = [];
      currentDateTime[i] = new Date(
        Date.parse(currentDate[i].toLocaleString('en-US', options[i]))
      );
      let year = [];
      let month = [];
      let day = [];
      let hour = [];
      let minute = [];
      let second = [];
      year[i] = currentDateTime[i].getFullYear();
      month[i] = ('0' + (currentDateTime[i].getMonth() + 1)).slice(-2);
      day[i] = ('0' + currentDateTime[i].getDate()).slice(-2);
      hour[i] = ('0' + currentDateTime[i].getHours()).slice(-2);
      minute[i] = ('0' + currentDateTime[i].getMinutes()).slice(-2);
      second[i] = ('0' + currentDateTime[i].getSeconds()).slice(-2);
      let mysqlDateTime = [];
      mysqlDateTime[i] = `${year[i]}-${month[i]}-${day[i]} ${hour[i]}:${minute[i]}:${second[i]}`;
      console.log(`${i} - The current date and time in ${country[i]} is ${mysqlDateTime[i]}`);
    }
  } else {
    console.log('Error Occured while fetching the country details', err.message);
  }
});
