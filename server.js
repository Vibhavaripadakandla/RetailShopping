const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000'
  }));

  
app.get('/transactions', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    const transactions = {
        "customers": 
        [
            {
                "name": "VibhaVari",
                "purchases": [
                    {
                        "date": "2021-01-01",
                        "amount": 120
                    },
                    {
                        "date": "2021-01-05",
                        "amount": 80
                    },
                    {
                        "date": "2021-02-01",
                        "amount": 150
                    },
                    {
                        "date": "2021-03-05",
                        "amount": 110
                    }
                ],
            },
            {
                "name": "Chandra",
                "purchases": [
                    {
                        "date": "2021-01-15",
                        "amount": 60
                    },
                    {
                        "date": "2021-03-01",
                        "amount": 200
                    },
                    {
                        "date": "2021-03-05",
                        "amount": 110
                    }
                ],
            },
            {
                "name": "Manasa",
                "purchases": [
                    {
                        "date": "2021-01-15",
                        "amount": 78
                    },
                    {
                        "date": "2021-03-01",
                        "amount": 20
                    },
                    {
                        "date": "2021-03-05",
                        "amount": 180
                    }
                ],
            },
            {
                "name": "Nikhil",
                "purchases": [
                    {
                        "date": "2021-01-15",
                        "amount": 200
                    },
                    {
                        "date": "2021-03-01",
                        "amount": 80
                    },
                    {
                        "date": "2021-03-05",
                        "amount": 100
                    }
                ],
            },
            {
                "name": "Sarada",
                "purchases": [
                    {
                        "date": "2021-01-15",
                        "amount": 70
                    },
                    {
                        "date": "2021-03-01",
                        "amount": 20
                    },
                    {
                        "date": "2021-03-05",
                        "amount": 100
                    }
                ],
            }
       ] };
    res.json({data:transactions });
});


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


  