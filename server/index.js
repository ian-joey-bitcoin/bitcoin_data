const express = require("express");
const path = require("path");
const axios = require("axios");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/bitcoin", (req, res) => {
  let params = { start: req.query.startDate, end: req.query.endDate };
  axios
    .get(
      "https://api.coindesk.com/v1/bpi/historical/close.json",
      { params: params }
    )
    .then(({ data }) => {
      res.send(data);
    });
});

app.use(express.static(path.join(__dirname, "../client/")));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
