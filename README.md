# aasaam error pages

[![Greenkeeper badge](https://badges.greenkeeper.io/aasaam/error-pages.svg)](https://greenkeeper.io/)

Simple modified error pages via emoji for web servers that include some processed properties.

## Usage with nginx

Include [error-pages.conf](./dist/nginx/snippets/error-pages.conf) on **http** context and use [server-error-page.conf](./dist/nginx/snippets/server-error-page.conf) **server** context.

## Preview pages

| 3xx | 4xx | 5xx |
| --- | --- | --- |
| 🔀 [300 Multiple Choices](./dist/nginx/error-pages/300.html) | 🚫 [400 Bad Request](./dist/nginx/error-pages/400.html) | 💣 [500 Internal Server Error](./dist/nginx/error-pages/500.html) |
| 🚚 [301 Moved Permanently](./dist/nginx/error-pages/301.html) | 🔐 [401 Unauthorized](./dist/nginx/error-pages/401.html) | 📭 [501 Not Implemented](./dist/nginx/error-pages/501.html) |
| 🔎 [302 Found](./dist/nginx/error-pages/302.html) | 💰 [402 Payment Required](./dist/nginx/error-pages/402.html) | 🚧 [502 Bad Gateway](./dist/nginx/error-pages/502.html) |
| 📨 [303 See Other](./dist/nginx/error-pages/303.html) | ⛔ [403 Forbidden](./dist/nginx/error-pages/403.html) | 🚨 [503 Service Unavailable](./dist/nginx/error-pages/503.html) |
| 💠 [304 Not Modified](./dist/nginx/error-pages/304.html) | ❓ [404 Not Found](./dist/nginx/error-pages/404.html) | ⏲ [504 Gateway Timeout](./dist/nginx/error-pages/504.html) |
| ℹ️ [307 Temporary Redirect](./dist/nginx/error-pages/307.html) | ❗ [405 Method Not Allowed](./dist/nginx/error-pages/405.html) | 🕯 [505 HTTP Version Not Supported](./dist/nginx/error-pages/505.html) |
| 🆕 [308 Permanent Redirect](./dist/nginx/error-pages/308.html) | 🛡 [406 Not Acceptable](./dist/nginx/error-pages/406.html) | 💔 [506 Variant Also Negotiates](./dist/nginx/error-pages/506.html) |
| | 🔩 [407 Proxy Authentication Required](./dist/nginx/error-pages/407.html) | 💯 [507 Insufficient Storage](./dist/nginx/error-pages/507.html) |
| | ⌛️ [408 Request Timeout](./dist/nginx/error-pages/408.html) | ➰ [508 Loop Detected](./dist/nginx/error-pages/508.html) |
| | 💥 [409 Conflict](./dist/nginx/error-pages/409.html) | 📈 [509 Bandwidth Limit Exceeded](./dist/nginx/error-pages/509.html) |
| | 💨 [410 Gone](./dist/nginx/error-pages/410.html) | 🏗 [510 Not Extended](./dist/nginx/error-pages/510.html) |
| | 📏 [411 Length Required](./dist/nginx/error-pages/411.html) | 🔑 [511 Network Authentication Required](./dist/nginx/error-pages/511.html) |
| | 🛑 [412 Precondition Failed](./dist/nginx/error-pages/412.html) | |
| | 🗃 [413 Payload Too Large](./dist/nginx/error-pages/413.html) | |
| | 🆖 [414 URI Too Long](./dist/nginx/error-pages/414.html) | |
| | 📼 [415 Unsupported Media Type](./dist/nginx/error-pages/415.html) | |
| | 📐 [416 Range Not Satisfiable](./dist/nginx/error-pages/416.html) | |
| | 🤔 [417 Expectation Failed](./dist/nginx/error-pages/417.html) | |
| | 🍵 [418 I'm a Teapot](./dist/nginx/error-pages/418.html) | |
| | 🔂 [421 Misdirected Request](./dist/nginx/error-pages/421.html) | |
| | 💩 [422 Unprocessable Entity](./dist/nginx/error-pages/422.html) | |
| | 🔒 [423 Locked](./dist/nginx/error-pages/423.html) | |
| | 😒 [424 Failed Dependency](./dist/nginx/error-pages/424.html) | |
| | 📤 [426 Upgrade Required](./dist/nginx/error-pages/426.html) | |
| | ⛓ [428 Precondition Required](./dist/nginx/error-pages/428.html) | |
| | 🌋 [429 Too Many Requests](./dist/nginx/error-pages/429.html) | |
| | 🤮 [431 Request Header Fields Too Large](./dist/nginx/error-pages/431.html) | |
| | 📛 [438 Intrusion Detected](./dist/nginx/error-pages/438.html) | |
| | 🗑 [444 No Response](./dist/nginx/error-pages/444.html) | |
| | 🔏️ [451 Unavailable For Legal Reasons](./dist/nginx/error-pages/451.html) | |
| | 🐳 [494 Request header too large](./dist/nginx/error-pages/494.html) | |
| | 🏅 [495 SSL Certificate Error](./dist/nginx/error-pages/495.html) | |
| | 🏷 [496 SSL Certificate Required](./dist/nginx/error-pages/496.html) | |
| | ❎ [497 HTTP Request Sent to HTTPS Port](./dist/nginx/error-pages/497.html) | |

## Build

```bash
# build icons
npm run build:pages
```
