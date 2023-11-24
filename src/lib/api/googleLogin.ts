import axios from "axios";
import { google } from "googleapis";
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
const __filename = fileURLToPath(import.meta.url);
const filePath = path.join(process.cwd(), 'oauth2.keys.json');
const fileData = await fs.promises.readFile(filePath, 'utf8');
console.log(fileData);

// Each API may support multiple versions. With this sample, we're getting
// v3 of the blogger API, and using an API key to authenticate.
const blogger = google.blogger({
  version: "v3",
  auth: import.meta.env.API_KEY,
});

// const params = {
//   blogId: "865432666597080328",
// };

// export let blogData = 'abc';

// async function main(params: any) {
//   const res = await blogger.blogs.get(params);
//   blogData = res;
//   console.log(
//     `${res.data.name} has ${res.data.posts.totalItems} posts! The blog url is ${res.data.url}`
//   );
// }

// main(params).catch(console.error);

const oauth2Client = new google.auth.OAuth2(
  import.meta.env.CLIENT_ID,
  import.meta.env.CLIENT_SECRET,
  import.meta.env.REDIRECT_URI
);

// set auth as a global default
google.options({
  auth: oauth2Client,
});

// generate a url that asks permissions for Blogger and Google Calendar scopes
const scopes = [
  "https://www.googleapis.com/auth/blogger",
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/user.gender.read",
  "https://www.googleapis.com/auth/user.birthday.read",
];

export const loginUrl = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: "offline",
  // If you only need one scope you can pass it as a string
  scope: scopes,
});
