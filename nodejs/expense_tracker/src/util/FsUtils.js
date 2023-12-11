import fs from "fs";

const readText = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        reject(null);
      } else {
        resolve(data);
      }
    });
  });
};

const deleteText = (path) => {
  return new Promise((resolve, reject) => {
    fs.unlink(path, (err) => {
      if (err) {
        reject(null);
      } else {
        resolve();
      }
    });
  });
};

export { readText, deleteText };
