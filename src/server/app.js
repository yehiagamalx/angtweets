const express = require("express");
const app = express();
const port = 3000;
var axios = require("axios");
var cors = require("cors");
app.use(express.json());
app.use(cors());

app.use(
  cors({
    origin: "http://localhost:4200",
    methods: "*",
    headers: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/proxy", async (req, res) => {
  let json = req.body;
  var config = {
    method: json.data?.method,
    url: json.data?.url,
    headers: {
      Authorization: json.data?.headers,
    },
    data: json.data?.data,
    body: json.data?.body,
  };
  axios(config)
    .then(function (response) {
      res.send(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
