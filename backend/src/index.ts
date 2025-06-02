import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

let accessToken = ''; // store after OAuth flow
console.log('Client ID:', process.env.SLACK_CLIENT_ID);
console.log('Redirect URI:', process.env.SLACK_REDIRECT_URI);


// Step 1: Redirect to Slack for OAuth
app.get('/auth/slack', (req, res) => {
  const slackUrl = `https://slack.com/oauth/v2/authorize?client_id=${process.env.SLACK_CLIENT_ID}&scope=chat:write,channels:read,channels:history,chat:update,chat:delete&redirect_uri=${process.env.SLACK_REDIRECT_URI}`;
  res.redirect(slackUrl);
});

// Step 2: Slack OAuth Callback
app.get('/slack/callback', async (req, res) => {
  const code = req.query.code;
  const response = await axios.post('https://slack.com/api/oauth.v2.access', null, {
    params: {
      client_id: process.env.SLACK_CLIENT_ID,
      client_secret: process.env.SLACK_CLIENT_SECRET,
      code,
      redirect_uri: process.env.SLACK_REDIRECT_URI
    }
  });

//for postman testing
  // console.log('Access Token:', accessToken);
  res.send('Slack authentication successful. You can now send messages!');
});

//  Send Message
app.post('/slack/message/send', async (req, res) => {
  const { channel, text } = req.body;
  const response = await axios.post('https://slack.com/api/chat.postMessage', {
    channel,
    text
  }, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  res.json(response.data);
});

//  Schedule Message
app.post('/slack/message/schedule', async (req, res) => {
  const { channel, text, post_at } = req.body;
  const response = await axios.post('https://slack.com/api/chat.scheduleMessage', {
    channel,
    text,
    post_at // Unix timestamp (e.g., Math.floor(Date.now() / 1000) + 60 for 1 min later)
  }, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  res.json(response.data);
});

//  Get Messages
app.get('/slack/message/history', async (req, res) => {
  const { channel } = req.query;
  const response = await axios.get('https://slack.com/api/conversations.history', {
    headers: { Authorization: `Bearer ${accessToken}` },
    params: { channel }
  });

  res.json(response.data);
});

//  Edit Message
app.post('/slack/message/edit', async (req, res) => {
  const { channel, ts, text } = req.body;
  const response = await axios.post('https://slack.com/api/chat.update', {
    channel,
    ts,
    text
  }, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  res.json(response.data);
});

//  Delete Message
app.post('/slack/message/delete', async (req, res) => {
  const { channel, ts } = req.body;
  const response = await axios.post('https://slack.com/api/chat.delete', {
    channel,
    ts
  }, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });

  res.json(response.data);
});

app.listen(3000, () => console.log('Server started on http://localhost:3000'));
