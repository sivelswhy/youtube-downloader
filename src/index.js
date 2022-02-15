#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import { createSpinner } from "nanospinner";
import ytdl from "ytdl-core";
import fs from "fs";
import {username} from 'username';

let linkvalue;

const sleep = (ms = 3000) => new Promise((r) => setTimeout(r, ms));
let user = await username()
async function welcome() {
  console.clear();
  const Title = chalkAnimation.neon(
    `Welcome to the Downloader of YouTube video with the Terminal\n`
  );
  await sleep();
  Title.stop();
  console.log(`
        ${chalk.cyan(`CLI App made by Sivels#0001, All rights reserved\n`)}`);
  console.log(`
                ${chalk.cyan`https://github.com/sivelswhy`}\n`);
}

async function askLink() {
  const answers = await inquirer.prompt({
    name: "linkfield",
    type: "input",
    message: "Please insert your YouTube link",
    default() {
      return console.log(
        "Please insert YouTube video link \n " +
          chalk.italic(
            "(right click in terminal to paste from clipboard)"
          )
      );
    },
  });
  // console.log('Le lien est', answers.linkfield)
  linkvalue = answers.linkfield
  if (!linkvalue.includes(`youtu`)) {
    console.log(chalk.red(`Your URL is not a valid YouTube link`));
    process.exit(1);
  }
}
async function fileType() {
  const answerFile = await inquirer.prompt({
    name: "file_type",
    type: "list",
    message:
      "In which file type do you want to store the video",
    choices: [
      ".mp3",
      ".mp4",
    ],
  });
  return answerFile.file_type
}
async function downloadvid() {
  const spinner = createSpinner(
    "The video is being downloaded."
    ).start();  
  const stream = ytdl(`${linkvalue}`);
  const infolink = await ytdl.getBasicInfo(linkvalue)
  const video_title = (infolink.videoDetails.title)
  const newvideo_title = video_title.replace(/\s+/g, '-').toLowerCase();
  const newvideo_titlex2 = newvideo_title.replace('?', '-').replace('\\', '-').replace('/', '-').replace(':', '-').replace('*', '-').replace('"', '-').replace('<', '-').replace('>', '-').replace('|', '-')
  stream.pipe(fs.createWriteStream(`C:/Users/${user}/Downloads/${newvideo_titlex2}${value}`));
  stream.on("finish", function() {
      spinner.success({ text: "The video is now downloaded !\n" });
      console.log(`You can now find the file under C:/Users/${user}/Downloads/${newvideo_titlex2}${value}`)
  });
}
await welcome();
const linkask = await askLink()
const value = await fileType() 
console.log(`\n\n`);
await downloadvid();