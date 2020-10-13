const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const api = require("./utils/api");
const generateMarkdown = require("./utils/generateMarkdown");

const questions = [
    {
        type: "input",
        message: "What is your project title?",
        name: "title",
        default: "My Title",
    },

    {
        type: "input",
        message: "Enter project description",
        name: "description",
        default: "My Description"
    },

    {
        type: "input",
        message : "Enter installation instructions",
        name: "install",
        default: "Installation Instructions",
    },

    {
        type: "input",
        message: "What is your GitHub username (exclude the @)",
        name: "username",
        default: "My Username",
    },

    {
        type: "input",
        message: "What is the name of your GitHub repo?",
        name: "GitHubRepo",
        default: "New-Repo",
    },

    {
        type: "input",
        message: "Enter some examples of the project for the usage section!",
        name: "usage"
    },

    {
        type: "list",
        message: "Choose a license for your project!",
        choices: ["MIT License","GNU Lesser General Public License v3.0","Mozilla Public License 2.0","GNU Affero General Public License v3.0","The unlicense","Apache License 2.0","GNU General Public License v3.0"],
        name: "license"
    },

    {
        type: "input",
        message: "Enter instructions for others to contribute!",
        name: "contributors"
    },

    {
        type: "input",
        message: "Enter any tests you wrote for your application & how to run them here!",
        name: "tests"
    }


];

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, err => {
        if (err) {
          return console.log(err);
        }
      
        console.log("Congratulations!! Your README file has been generated!!")
    });
}

const writeFileAsync = util.promisify(writeToFile);

async function init() {
    try {
        const userResponses = await inquirer.prompt(questions);
        console.log("You Entered: ", userResponses);
    
        const userInfo = await api.getUser(userResponses);
        console.log("Your GitHub user info: ", userInfo);
    
        console.log("Generating README")
        const markdown = generateMarkdown(userResponses, userInfo);
        console.log(markdown);
    
        await writeFileAsync('README.md', markdown);

    } catch (error) {
        console.log(error);
    }

}
init();
