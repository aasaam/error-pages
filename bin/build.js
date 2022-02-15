/* eslint-disable import/no-extraneous-dependencies */
// @ts-check

const { execSync } = require('child_process');
const fs = require('fs');

const httpStatus = require('@aasaam/http-status-extra');

const modernBrowserBack = `
if("%{agent_is_modern}"==="yes")window.location.href="/";
`.trim();

const { Organization } = require('@aasaam/information');

const { PurgeCSS } = require('purgecss');
const _ = require('lodash');
const nunjucks = require('nunjucks');
const sass = require('node-sass');
const pug = require('pug');
const cssnano = require('cssnano');
const litePreset = require('cssnano-preset-lite');
const postcss = require('postcss').default;
const stripComments = require('strip-comments');
const uglify = require('uglify-js');

const firefoxSvg = fs.readFileSync(
  `${__dirname}/../node_modules/@aasaam/brand-icons/svg/si_firefoxbrowser.svg`,
  { encoding: 'utf-8' },
).trim();
const chromeSvg = fs.readFileSync(
  `${__dirname}/../node_modules/@aasaam/brand-icons/svg/si_googlechrome.svg`,
  { encoding: 'utf-8' },
).trim();
const svg502504 = fs.readFileSync(
  `${__dirname}/502-504.svg`,
  { encoding: 'utf-8' },
).trim();

const { log } = console;

(async () => {
  execSync(
    [
      `rm -rf ${__dirname}/../tmp`,
      `rm -rf ${__dirname}/../dist`,
      `mkdir -p ${__dirname}/../tmp`,
      `mkdir -p ${__dirname}/../dist/nginx/error-pages`,
      `mkdir -p ${__dirname}/../dist/nginx/snippets`,
      `rm -rf ${__dirname}/../tmp/_css_framework.scss`,
      `cat ${__dirname}/../node_modules/minireset.css/minireset.css > ${__dirname}/../tmp/_css_framework.scss`,
    ].join(' && '),
  );

  fs.writeFileSync(
    `${__dirname}/../tmp/_css_framework.scss`,
    stripComments(
      fs.readFileSync(`${__dirname}/../tmp/_css_framework.scss`, {
        encoding: 'utf8',
      }),
      {
        preserveNewlines: false,
      },
    ),
  );

  const supportScript = uglify.minify(
    fs.readFileSync(`${__dirname}/support-url.js`, {
      encoding: 'utf8',
    }),
  );

  let style = sass
    .renderSync({
      file: `${__dirname}/../src/styles/error.scss`,
      sourceMap: false,
      outputStyle: 'compressed',
    })
    .css.toString('utf-8')
    .trim();

  const resetCss = fs.readFileSync(`${__dirname}/../tmp/_css_framework.scss`, {
    encoding: 'utf8',
  });

  style = `${resetCss}${'\n'}${style}`;

  const preset = litePreset({ discardComments: false });

  // @ts-ignore
  const nano = postcss([cssnano({ preset })]).process(style);

  style = nano.css.replaceAll(/\n/g, ' ');
  const errorCodes = {};
  Object.keys(httpStatus.statusCodes).forEach((code) => {
    const el = httpStatus.statusCodes[code];
    const c = parseInt(code, 10);
    // @ts-ignore
    if (c < 300) {
      return;
    }
    if (el.standard === 'http') {
      errorCodes[c] = el;
    }

    if (
      el.standard === 'nginx'
      // @ts-ignore
      && [444, 494, 495, 496, 497].indexOf(c) !== -1
    ) {
      errorCodes[c] = el;
    }

    if (el.standard === 'aasaam') {
      errorCodes[c] = el;
    }
  });

  const compliedPug = pug.compileFile(
    `${__dirname}/../src/templates/error.pug`,
    { pretty: process.env.NODE_ENV === 'test' },
  );

  // generate templates
  const markDownHelper = {};
  Object.keys(errorCodes).forEach(async (c) => {
    const code = parseInt(c, 10);
    const { emoji } = errorCodes[code];

    let family = 5;
    if (code < 400) {
      family = 3;
    } else if (code < 500) {
      family = 4;
    }

    if (!markDownHelper[family]) {
      markDownHelper[family] = [];
    }
    markDownHelper[family].push(
      `| ${code} | ${emoji} | [${errorCodes[code].message}](https://aasaam.github.io/error-pages/dist/nginx/error-pages/${code}.html) |`,
    );

    if (!emoji) {
      throw new Error('Emoji not found');
    }

    const edgeDebug = {
      host: '%{host}',
      http_host: '%{http_host}',
      time_iso8601: '%{time_iso8601}',
      scheme: '%{scheme}',

      support_email: '%{support_email}',
      support_tel: '%{support_tel}',
      support_url: '%{support_url}',

      request_id: '%{request_id}',
      remote_addr: '%{remote_addr}',
      request_method: '%{request_method}',
      request_uri: '%{request_uri}',
      request_length: '%{request_length}',

      client_uid: '%{client_uid}',
      username: '%{username}',

      http_user_agent: '%{http_user_agent}',

      agent_name: '%{agent_name}',
      agent_version: '%{agent_version}',
      agent_os: '%{agent_os}',
      agent_os_version: '%{agent_os_version}',
      agent_category: '%{agent_category}',
      agent_vendor: '%{agent_vendor}',
      agent_is_modern: '%{agent_is_modern}',
      user_agent_hash: '%{user_agent_hash}',

      geo_country_name: '%{geo_country_name}',
      geo_country_code: '%{geo_country_code}',
      geo_country_flag: '%{geo_country_flag}',
      geo_city: '%{geo_city}',
      geo_continent_name: '%{geo_continent_name}',
      geo_continent_code: '%{geo_continent_code}',
      geo_timezone: '%{geo_timezone}',
      geo_latitude: '%{geo_latitude}',
      geo_longitude: '%{geo_longitude}',
      geo_accuracy_radius: '%{geo_accuracy_radius}',
      geo_isp: '%{geo_isp}',
      geo_isp_number: '%{geo_isp_number}',

      organization_title: '%{organization_title}',
      organization_brand_icon:
        '/.well-known/aasaam/brand_icons/%{organization_brand_icon}.svg',

      waf_mode: '%{waf_mode}',
      protection_mode: '%{protection_mode}',
    };

    const defaultTemplateData = {
      family,
      svg502504,
      supportScript: supportScript.code,
      organization: Organization.en,
      style,
      firefoxSvg,
      modernBrowserBack,
      chromeSvg,
      title: `${errorCodes[code].message}`,
      errorDetail: errorCodes[code],
      code,
      status: code,
    };

    let htmlContent = compliedPug(
      _.merge({}, _.clone(defaultTemplateData), { debug: edgeDebug }),
    );

    const cssPure = new PurgeCSS();

    const purger = cssPure.purge({
      // @ts-ignore
      whitelistPatterns: [/'data-content'/],
      content: [
        {
          raw: htmlContent,
          extension: 'html',
        },
      ],
      css: [
        {
          raw: style,
        },
      ],
    });

    purger.then((purgeResult) => {
      htmlContent = compliedPug(
        _.merge(
          {},
          _.clone(defaultTemplateData),
          { debug: edgeDebug },
          { style: purgeResult[0].css },
        ),
      );

      fs.writeFileSync(
        `${__dirname}/../dist/nginx/error-pages/${code}.html`,
        htmlContent,
      );

      const errorPages = nunjucks.render(
        `${__dirname}/../src/templates/nginx/error-pages.j2`,
        {
          errorCodes: Object.keys(errorCodes),
        },
      );

      fs.writeFileSync(
        `${__dirname}/../dist/nginx/snippets/error-pages.conf`,
        errorPages.trim(),
      );

      const edgeServerLocationError = nunjucks.render(
        `${__dirname}/../src/templates/nginx/server-error-pages.j2`,
        {
          edgeDebug,
        },
      );

      fs.writeFileSync(
        `${__dirname}/../dist/nginx/snippets/server-error-page.conf`,
        edgeServerLocationError.trim(),
      );
    });
  });
  log(markDownHelper[3].join('\n'));
  log(markDownHelper[4].join('\n'));
  log(markDownHelper[5].join('\n'));
})();
