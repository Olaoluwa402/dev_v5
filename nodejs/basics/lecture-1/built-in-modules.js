//examples
const os = require("os");
const path = require("path");
const { log } = require("console");

//os
const userDetail = {
  name: os.userInfo(),
  platform: os.platform(),
  type: os.type(),
  uptime: os.uptime(),
  totalMem: os.totalmem(),
};

// console.log(userDetail);

//path - sep
const sep = path.sep;
// log(sep);

//path.join() - generates relative path link
const pathLink = path.join("content", "index.html");
log(pathLink);

//path.resolve - renerates absolute path link
const pathAbsolute = path.resolve(__dirname, "content", "index.html");
log(pathAbsolute);

//path : basename
const base = path.basename(pathLink);
log(base);
