import fs from "fs";
import { resolve } from "path";

export const readText = (path) => {
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

export const deleteText = (path) => {
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
