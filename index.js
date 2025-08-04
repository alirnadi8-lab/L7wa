const axios = require("axios");
const express = require("express");
const app = express();
const port = 3000;

const tokens = [
  "ODk1NzUxMDY3NjE3MzU3OTE0.GTZTiy.U5QbBnPjP-pJT0i41yCWZvO9IWGNaaiv2zmbC0",
];

const channelIds = [
  "1401738722596094163",
];

const message = "كسمك <@1317542744087859322> ";
const delayMs = 1500;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function sendLoop(token, channelId) {
  while (true) {
    try {
      await axios.post(
        `https://discord.com/api/v10/channels/${channelId}/messages`,
        { content: message },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json"
          }
        }
      );
      console.log(`[SENT] ${channelId} - ${token.slice(0, 10)}...`);
    } catch (err) {
      console.error(`[ERROR] ${channelId} - ${err?.response?.status || err.message}`);
    }
    await sleep(delayMs);
  }
}

for (const token of tokens) {
  for (const channelId of channelIds) {
    sendLoop(token, channelId);
  }
}

app.get("/status", (req, res) => {
  res.send("mass_sender running");
});

app.listen(port, () => {
  console.log(`mass_sender express running on port ${port}`);
});
