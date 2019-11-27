const express = require("express");
const path = require("path");
const axios = require("axios");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/bitcoin", (req, res) => {
  let params = { start: req.params.startDate, end: req.params.endDate };
  axios
    .get(
      "https://api.coindesk.com/v1/bpi/historical/close.json?start=2013-09-01&end=2016-09-05",
      { params: params }
    )
    .then(({ data }) => {
      res.send(data);
    });
});

app.use(express.static(path.join(__dirname, "../client/")));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
