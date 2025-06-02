"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
let accessToken = ''; // store after OAuth flow
console.log('Client ID:', process.env.SLACK_CLIENT_ID);
console.log('Redirect URI:', process.env.SLACK_REDIRECT_URI);
// Step 1: Redirect to Slack for OAuth
app.get('/auth/slack', (req, res) => {
    const slackUrl = `https://slack.com/oauth/v2/authorize?client_id=${process.env.SLACK_CLIENT_ID}&scope=chat:write,channels:read,channels:history,chat:update,chat:delete&redirect_uri=${process.env.SLACK_REDIRECT_URI}`;
    res.redirect(slackUrl);
});
// Step 2: Slack OAuth Callback
app.get('/slack/callback', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.query.code;
    const response = yield axios_1.default.post('https://slack.com/api/oauth.v2.access', null, {
        params: {
            client_id: process.env.SLACK_CLIENT_ID,
            client_secret: process.env.SLACK_CLIENT_SECRET,
            code,
            redirect_uri: process.env.SLACK_REDIRECT_URI
        }
    });
    console.log('OAuth Response:', response.data);
    accessToken = response.data.access_token;
    console.log('Access Token:', accessToken);
    res.send('Slack authentication successful. You can now send messages!');
}));
//  Send Message
app.post('/slack/message/send', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { channel, text } = req.body;
    const response = yield axios_1.default.post('https://slack.com/api/chat.postMessage', {
        channel,
        text
    }, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });
    res.json(response.data);
}));
//  Schedule Message
app.post('/slack/message/schedule', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { channel, text, post_at } = req.body;
    const response = yield axios_1.default.post('https://slack.com/api/chat.scheduleMessage', {
        channel,
        text,
        post_at // Unix timestamp (e.g., Math.floor(Date.now() / 1000) + 60 for 1 min later)
    }, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });
    res.json(response.data);
}));
//  Get Messages
app.get('/slack/message/history', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { channel } = req.query;
    const response = yield axios_1.default.get('https://slack.com/api/conversations.history', {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { channel }
    });
    res.json(response.data);
}));
//  Edit Message
app.post('/slack/message/edit', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { channel, ts, text } = req.body;
    const response = yield axios_1.default.post('https://slack.com/api/chat.update', {
        channel,
        ts,
        text
    }, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });
    res.json(response.data);
}));
//  Delete Message
app.post('/slack/message/delete', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { channel, ts } = req.body;
    const response = yield axios_1.default.post('https://slack.com/api/chat.delete', {
        channel,
        ts
    }, {
        headers: { Authorization: `Bearer ${accessToken}` }
    });
    res.json(response.data);
}));
app.listen(3000, () => console.log('Server started on http://localhost:3000'));
