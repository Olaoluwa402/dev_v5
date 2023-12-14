import fs from "fs";

const readText = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, data) => {
      if (err) {
        reject("Cannot read text, No file exist");
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
        reject("cannot delete, no file found");
      } else {
        resolve();
      }
    });
  });
};

export { readText, deleteText };
