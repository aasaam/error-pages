<div align="center">
  <h1>
    Error Pages
  </h1>
  <p>
    Modified error pages for web servers
  </p>
  <p>
    <a href="https://github.com/aasaam/error-pages/actions/workflows/test.yml">
      <img alt="test" src="https://github.com/aasaam/error-pages/actions/workflows/test.yml/badge.svg">
    </a>
    <a href="https://david-dm.org/aasaam/error-pages?type=dev">
      <img alt="David" src="https://img.shields.io/david/dev/aasaam/error-pages">
    </a>
    <a href="https://github.com/aasaam/error-pages/blob/master/LICENSE">
      <img alt="License" src="https://img.shields.io/github/license/aasaam/error-pages">
    </a>
  </p>
</div>

Simple modified error pages via emoji for web servers that include some processed properties.

## Usage with nginx

Include [error-pages.conf](./dist/nginx/snippets/error-pages.conf) on **http** context and use [server-error-page.conf](./dist/nginx/snippets/server-error-page.conf) **server** context.

## Preview

| Code | Emoji | Message                                                                                                 |
| ---- | ----- | ------------------------------------------------------------------------------------------------------- |
| 300  | 🔀     | [Multiple Choices](https://aasaam.github.io/error-pages/dist/nginx/error-pages/300.html)                |
| 301  | 🚚     | [Moved Permanently](https://aasaam.github.io/error-pages/dist/nginx/error-pages/301.html)               |
| 302  | 🔎     | [Found](https://aasaam.github.io/error-pages/dist/nginx/error-pages/302.html)                           |
| 303  | 📨     | [See Other](https://aasaam.github.io/error-pages/dist/nginx/error-pages/303.html)                       |
| 304  | 💠     | [Not Modified](https://aasaam.github.io/error-pages/dist/nginx/error-pages/304.html)                    |
| 307  | ℹ️     | [Temporary Redirect](https://aasaam.github.io/error-pages/dist/nginx/error-pages/307.html)              |
| 308  | 🆕     | [Permanent Redirect](https://aasaam.github.io/error-pages/dist/nginx/error-pages/308.html)              |
| 400  | 🚫     | [Bad Request](https://aasaam.github.io/error-pages/dist/nginx/error-pages/400.html)                     |
| 401  | 🔐     | [Unauthorized](https://aasaam.github.io/error-pages/dist/nginx/error-pages/401.html)                    |
| 402  | 💰     | [Payment Required](https://aasaam.github.io/error-pages/dist/nginx/error-pages/402.html)                |
| 403  | ⛔     | [Forbidden](https://aasaam.github.io/error-pages/dist/nginx/error-pages/403.html)                       |
| 404  | ❓     | [Not Found](https://aasaam.github.io/error-pages/dist/nginx/error-pages/404.html)                       |
| 405  | ❗     | [Method Not Allowed](https://aasaam.github.io/error-pages/dist/nginx/error-pages/405.html)              |
| 406  | 🛡     | [Not Acceptable](https://aasaam.github.io/error-pages/dist/nginx/error-pages/406.html)                  |
| 407  | 🔩     | [Proxy Authentication Required](https://aasaam.github.io/error-pages/dist/nginx/error-pages/407.html)   |
| 408  | ⌛️     | [Request Timeout](https://aasaam.github.io/error-pages/dist/nginx/error-pages/408.html)                 |
| 409  | 💥     | [Conflict](https://aasaam.github.io/error-pages/dist/nginx/error-pages/409.html)                        |
| 410  | 💨     | [Gone](https://aasaam.github.io/error-pages/dist/nginx/error-pages/410.html)                            |
| 411  | 📏     | [Length Required](https://aasaam.github.io/error-pages/dist/nginx/error-pages/411.html)                 |
| 412  | 🛑     | [Precondition Failed](https://aasaam.github.io/error-pages/dist/nginx/error-pages/412.html)             |
| 413  | 🗃     | [Payload Too Large](https://aasaam.github.io/error-pages/dist/nginx/error-pages/413.html)               |
| 414  | 🆖     | [URI Too Long](https://aasaam.github.io/error-pages/dist/nginx/error-pages/414.html)                    |
| 415  | 📼     | [Unsupported Media Type](https://aasaam.github.io/error-pages/dist/nginx/error-pages/415.html)          |
| 416  | 📐     | [Range Not Satisfiable](https://aasaam.github.io/error-pages/dist/nginx/error-pages/416.html)           |
| 417  | 🤔     | [Expectation Failed](https://aasaam.github.io/error-pages/dist/nginx/error-pages/417.html)              |
| 418  | 🍵     | [I'm a Teapot](https://aasaam.github.io/error-pages/dist/nginx/error-pages/418.html)                    |
| 421  | 🔂     | [Misdirected Request](https://aasaam.github.io/error-pages/dist/nginx/error-pages/421.html)             |
| 422  | 💩     | [Unprocessable Entity](https://aasaam.github.io/error-pages/dist/nginx/error-pages/422.html)            |
| 423  | 🔒     | [Locked](https://aasaam.github.io/error-pages/dist/nginx/error-pages/423.html)                          |
| 424  | 😒     | [Failed Dependency](https://aasaam.github.io/error-pages/dist/nginx/error-pages/424.html)               |
| 426  | 📤     | [Upgrade Required](https://aasaam.github.io/error-pages/dist/nginx/error-pages/426.html)                |
| 428  | ⛓     | [Precondition Required](https://aasaam.github.io/error-pages/dist/nginx/error-pages/428.html)           |
| 429  | 🌋     | [Too Many Requests](https://aasaam.github.io/error-pages/dist/nginx/error-pages/429.html)               |
| 431  | 🤮     | [Request Header Fields Too Large](https://aasaam.github.io/error-pages/dist/nginx/error-pages/431.html) |
| 437  | 🚮     | [Legacy browser](https://aasaam.github.io/error-pages/dist/nginx/error-pages/437.html)                  |
| 438  | 📛     | [Intrusion Detected](https://aasaam.github.io/error-pages/dist/nginx/error-pages/438.html)              |
| 439  | 🚷     | [Access denied](https://aasaam.github.io/error-pages/dist/nginx/error-pages/439.html)                   |
| 444  | 🗑     | [No Response](https://aasaam.github.io/error-pages/dist/nginx/error-pages/444.html)                     |
| 451  | 🔏️     | [Unavailable For Legal Reasons](https://aasaam.github.io/error-pages/dist/nginx/error-pages/451.html)   |
| 494  | 🐳     | [Request header too large](https://aasaam.github.io/error-pages/dist/nginx/error-pages/494.html)        |
| 495  | 🏅     | [SSL Certificate Error](https://aasaam.github.io/error-pages/dist/nginx/error-pages/495.html)           |
| 496  | 🏷     | [SSL Certificate Required](https://aasaam.github.io/error-pages/dist/nginx/error-pages/496.html)        |
| 497  | ❎     | [HTTP Request Sent to HTTPS Port](https://aasaam.github.io/error-pages/dist/nginx/error-pages/497.html) |
| 500  | 💣     | [Internal Server Error](https://aasaam.github.io/error-pages/dist/nginx/error-pages/500.html)           |
| 501  | 📭     | [Not Implemented](https://aasaam.github.io/error-pages/dist/nginx/error-pages/501.html)                 |
| 502  | 🚧     | [Bad Gateway](https://aasaam.github.io/error-pages/dist/nginx/error-pages/502.html)                     |
| 503  | 🚨     | [Service Unavailable](https://aasaam.github.io/error-pages/dist/nginx/error-pages/503.html)             |
| 504  | ⏲     | [Gateway Timeout](https://aasaam.github.io/error-pages/dist/nginx/error-pages/504.html)                 |
| 505  | 🕯     | [HTTP Version Not Supported](https://aasaam.github.io/error-pages/dist/nginx/error-pages/505.html)      |
| 506  | 💔     | [Variant Also Negotiates](https://aasaam.github.io/error-pages/dist/nginx/error-pages/506.html)         |
| 507  | 💯     | [Insufficient Storage](https://aasaam.github.io/error-pages/dist/nginx/error-pages/507.html)            |
| 508  | ➰     | [Loop Detected](https://aasaam.github.io/error-pages/dist/nginx/error-pages/508.html)                   |
| 509  | 📈     | [Bandwidth Limit Exceeded](https://aasaam.github.io/error-pages/dist/nginx/error-pages/509.html)        |
| 510  | 🏗     | [Not Extended](https://aasaam.github.io/error-pages/dist/nginx/error-pages/510.html)                    |
| 511  | 🔑     | [Network Authentication Required](https://aasaam.github.io/error-pages/dist/nginx/error-pages/511.html) |
| 538  | 📜     | [Temporary down](https://aasaam.github.io/error-pages/dist/nginx/error-pages/538.html)                  |

<div>
  <p align="center">
    <img alt="aasaam software development group" width="64" src="https://raw.githubusercontent.com/aasaam/information/master/logo/aasaam.svg">
    <br />
    aasaam software development group
  </p>
</div>
