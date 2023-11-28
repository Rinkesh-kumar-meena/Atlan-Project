const express = require('express');
const app = express();
const cors = require("cors");
const pool = require('./app');
const fs = require("fs");
const fastcsv = require("fast-csv");
  
require('dotenv').config();
const port = 3000;

app.use("/Intern", express.static(__dirname + "/Intern"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

// Middleware to simulate translation - Task 1 (Placeholder)
function findSlang(req, res) {
    const { word, lang } = req.query;
    const translations = {
        'city': 'Urban Center',
        'City': 'Ciudaa',
        // Add more translations as needed
    };
    const translatedText = translations[word] || "Translation not found";
    res.send(translatedText);
}

// Middleware to validate data - Task 2
function validateData(req, res, next) {
    const { income_per_annum, savings_per_annum, mobile_number } = req.body;

    if (income_per_annum < savings_per_annum) {
        res.send("Invalid Data: Savings cannot be more than Income");
    } else if (isNaN(mobile_number) || mobile_number.length !== 10) {
        res.send("Invalid mobile number, should be a 10-digit number");
    } else {
        next();
    }
}

// Middleware to export data in CSV - Task 3
async function exportCSV(req, res) {
    try {
        let data = await pool.query("SELECT * FROM client_income_data");
        data = data.rows;

        const csvData = fastcsv.writeToString(data, { headers: true });
        fs.writeFileSync("Intern/data.csv", csvData);
        res.download("Intern/data.csv");
    } catch (err) {
        console.error(err.message);
        res.send(err.message);
    }
}

// Middleware to simulate sending SMS - Task 4 (Placeholder)
function sendSMS(req, res) {
    const { client_email, client_name, income_per_annum, savings_per_annum, mobile_number } = req.body;
    const smsContent = `Your Details:\nEmail ID: ${client_email}\nName: ${client_name}\nIncome Per Annum: ${income_per_annum}\nSavings Per Annum: ${savings_per_annum}\nContact: ${mobile_number}\nThank you for your response`;
    console.log("Simulated SMS Content:", smsContent);
    res.send("Simulated SMS sent successfully!");
}

// Routes
app.get('/getSlang', findSlang);
app.post('/validateNew', validateData, async (req, res) => {
    // Insert data into the database after validation
});
app.get('/validateAll', async (req, res) => {
    // Validate and handle invalid data
});
app.get('/getCSV', exportCSV);
app.post('/sendmessage', sendSMS);

app.listen(port, () => {
    console.log(`Server is listening at port : ${port}`);
});
