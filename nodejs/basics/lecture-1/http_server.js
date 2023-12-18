//create simple server
//1. require/import the http module
const http = require("http");
const fs = require("fs");
const axios = require("axios");
const { log } = require("console");

// const getPDF = async () => {
//   try {
//     const config = {
//       headers: {
//         "Content-Type": "plain/html",
//         Authourization: "Bearer token",
//       },
//     };
//     const { data } = await axios.get(
//       "https://jsonplaceholder.typicode.com/todos/1",
//       config
//     );
//     console.log(data);
//   } catch (err) {
//     console.log(err);
//   }
// };

// getPDF();

//create server using createServer()
const server = http.createServer((req, res) => {
  console.log(req.url, "request");
  if (req.url === "/") {
    res.end("Welcome to node server - update");
  }

  //server text
  if (req.url === "/serve-text" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "plain/text" });
    res.write("This is the posts endpont");
    res.end();
  }

  if (req.url === "/serve-html" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "plain/html" });
    fs.readFile("./content/index.html", (err, data) => {
      if (err) {
        console.log("error", err);
        res.end(err.message);
      }
      res.write(data);
      res.end();
    });
  }

  if (req.url === "/serve-json" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    const data = {
      status: "success",
      data: { username: "John", role: "admin", email: "admn@example.com" },
    };

    res.end(JSON.stringify(data));
  }

  if (req.url === "/serve-pdf" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/pdf" });

    fs.readFile("index.pdf", (err, data) => {
      if (err) {
        console.log("error", err);
        res.end(JSON.stringify(err));
        return;
      }
      res.end(data);
    });
  }

  if (req.url === "/serve-mp3" && req.method === "GET") {
    fs.exists("my.mp3", (exist) => {
      if (exist) {
        res.writeHead(200, { "Content-Type": "audio/mp3" });
        const rStream = fs.createReadStream("my.mp3");
        rStream.pipe(res);
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify("Resource Not found"));
      }
    });
  }

  if (req.url === "/serve-mp4" && req.method === "GET") {
    fs.exists("./media/v.mp4", (exist) => {
      if (exist) {
        res.writeHead(200, { "Content-Type": "video/mp4" });
        const rStream = fs.createReadStream("./media/v.mp4");
        rStream.pipe(res);
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify("Resource Not found"));
      }
    });
  }

  if (req.url === "/register" && req.method === "POST") {
    res.writeHead(200, { "Content-Type": "application/json" });

    const data = {
      status: "success",
      data: "",
    };

    res.end(JSON.stringify(data));
  }
});

//listen to request on server
const port = 5000;
server.listen(port, (err) => {
  if (err) {
    console.log("error", err);
    return;
  }
  console.log(`Server is running on port ${port}`);
});
