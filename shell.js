// const express = require("express");
// const app = express();

// app.listen(5000, () => console.log("server started"));
// setInterval(()=>{

// },100)
// const exec = require("child_process").exec;
// exec("cat shell.js", (err, stdout, stderr) => {
//   console.log(stdout);
// });
// const spawn = require("child_process").spawn;
// if (process.argv[2] === "child") {
//   console.log("inside child");
// } else {
//   var child = spawn(process.execPath, [__filename, "child"]);
//   //   child.stdout.on("data", (data) => {
//   //     console.log("from child ->", data.toString());
//   //   });
//   child.stdout.pipe(process.stdout);
// }

const spawn = require("child_process").spawn;
const exec = require("child_process").exec;
const os = require("os");
const fs = require("fs");

//
//default working directory set to user’s home directory
process.chdir(os.homedir());
process.stdout.write(
  "\t\t---NODE.JS SHELL---\nsupported commands : pwd,ls,cd,exit,<path_to_binary> <args>..\n\n$ "
);

//main process
process.stdin.on("data", (data) => {
  const input = `${data}`;
  const args = data.toString().split(" ");
  args.forEach((el, inx) => {
    args[inx] = el.trim();
  });

  // for single word commands. pwd,exit
  if (args.length === 1) {
    if (args[0] === "pwd") {
      process.stdout.write(process.cwd() + "\n$ ");
    } else if (args[0] === "exit") {
      process.stdout.write("closing shell...\n");
      process.exit();
    } else if (args[0] === "ls") {
      exec("ls", (err, stdout, stderr) => {
        if (stdout !== null || stdout !== undefined)
          process.stdout.write(`${stdout}$ `);
        else process.stdout.write("error occured while listing files !\n$ ");
      });
    } else {
      process.stdout.write("command not supported !\n$ ");
    }
  } else {
    // commands with arguments. cd,ls,fg
    if (args[0] === "cd") {
      process.chdir(args[1]);
      process.stdout.write("$ ");
    } else if (args[0] === "ls") {
      exec("ls " + args[1], (err, stdout, stderr) => {
        if (stdout !== null || stdout !== undefined)
          process.stdout.write(stdout + "\n$ ");
        else process.stdout.write("error occured while listing files !\n$ ");
      });
    } else if (args[0] === "fg") {
      exec("fg " + args[1], (err, stdout, stderr) => {
        if (err || stderr) process.stdout.write("error !\n$ ");
      });
    } else {
      if (input.includes("/") || input.includes("\\")) {
        var temp = input.includes("/") ? input.split("/") : input.split("\\");
        var temp2 = temp.pop().split(" ");
        var dirPath = input.includes("/") ? temp.join("/") : temp.join("\\");
        dirPath += input.includes("/") ? "/" : "\\";
        dirPath += temp2[0];
        temp2.shift();
        temp2.forEach((el, ind) => {
          temp2[ind] = el.trim();
        });
        // console.log(dirPath, temp2);
        var child = spawn(dirPath.trim(), temp2);
        child.on("spawn", (data) => {});
      } else {
        process.stdout.write("command not found\n$ ");
      }
    }
  }
});
