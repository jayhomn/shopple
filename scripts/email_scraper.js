const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");
const async = require("async");
const { default: Axios } = require("axios");
const e = require("cors");

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/gmail.modify"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = "token.json";

// Initialize array from json
let companyList = {};
fs.readFile("./company_list.json", (err, content) => {
  if (err) return console.log("Error reading companies:", err);
  companyList = JSON.parse(content);
});

// Load client secrets from a local file.
fs.readFile("./credentials.json", (err, content) => {
  if (err) return console.log("Error loading client secret file:", err);
  // Authorize a client with credentials, then call the Gmail API.
  authorize(JSON.parse(content), addNewSale);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here: ", (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error("Error retrieving access token", err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Lists the labels in the user's account.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listLabels(auth) {
  const gmail = google.gmail({ version: "v1", auth });
  gmail.users.labels.list(
    {
      userId: "me",
    },
    (err, res) => {
      if (err) return console.log("The API returned an error: " + err);
      const labels = res.data.labels;
      if (labels.length) {
        console.log("Labels:");
        labels.forEach((label) => {
          console.log(`- ${label.name}`);
        });
      } else {
        console.log("No labels found.");
      }
    }
  );
}

function createCompany(email, name, sales) {
  Axios.post("https://shopple.herokuapp.com/companies", {
    companyEmail: email,
    companyName: name,
    sales: sales,
  })
    .then((error) => {})
    .catch((error) => {});
}

function createSale(company, discount, descrip) {
  Axios.post(`https://shopple.herokuapp.com/companies/${company}/sales`, {
    amount: discount,
    companyName: company,
    description: descrip,
  })
    .then((error) => {})
    .catch((error) => {});
}

/*
 * function passed in as a callback after authorization to add new sales to db and delete parsed emails
 */
async function addNewSale(auth) {
  const gmail = google.gmail({ version: "v1", auth });

  let idsToDelete = [];

  // List all emails
  const list = await gmail.users.messages.list({
    userId: "me",
  });

  // Goes through each messages
  for (message of list.data.messages) {
    let email = "";
    let discountString = "";
    let description = "";
    let dateRecieved;
    const request = await gmail.users.messages.get({
      userId: "me",
      id: message.id,
    });

    // Goes through each message header
    for (header of request.data.payload.headers) {
      if (header.name === "Subject") {
        // Parses Subject line
        let parsedString = header.value.split(" ");
        for (string of parsedString) {
          // Identifies subject line with "%" and sets that as the amount discounted
          if (string.includes("%")) {
            description = header.value;
            // using regex to extract the numbers
            let numericalAmount = string.match(/\d*/);
            discountString = numericalAmount[0];
            break;
          }
        }
      } else if (header.name === "From") {
        // Parses sender email and extracts just the email string into a json array
        email = header.value.split("<");
        email = email[1].substring(0, email[1].length - 1);
      } else if (header.name === "X-Received") {
        // Parses recieved date
        let recievedString = header.value.split(";");
        dateRecieved = new Date(recievedString[1].trim());
      }
    }

    // Checks if email and discountString are sensible
    if (email != "" && discountString != "") {
      if (!companyList.hasOwnProperty(email)) {
        companyList[email] = "";
      } else {
        let yesterdayMidnight = new Date();
        yesterdayMidnight.setDate(yesterdayMidnight.getDate() - 1);
        yesterdayMidnight.setHours(0, 0, 0);
        console.log(yesterdayMidnight);
        // if recieved date is greater than today at midnight add it: else add to delete list
        if (dateRecieved >= yesterdayMidnight) {
          createSale(companyList[email], discountString, description);
        } else {
          // idsToDelete.push(message.id);
        }
        // createCompany(email, companyList[email], []);
      }
    } else {
      // Add to delete list if not
      // idsToDelete.push(message.id);
    }
  }

  // Trashes messages
  for (id of idsToDelete) {
    await gmail.users.messages.trash({
      id: id,
      userId: "me",
    });
  }
}
