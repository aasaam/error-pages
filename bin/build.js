/* eslint-disable import/no-extraneous-dependencies */
// @ts-check

const { execSync } = require('child_process');
const fs = require('fs');

const httpStatus = require('@aasaam/http-status-extra');

const modernBrowserBack = `
if("%{agent_is_modern}"==="yes")window.location.href="/";
`.trim();

const {
  Organization,
} = require('@aasaam/information');

const opentype = require('opentype.js');
// @ts-ignore
const { optimize } = require('svgo');
const sharp = require('sharp');
const { PurgeCSS } = require('purgecss');
const _ = require('lodash');
const nunjucks = require('nunjucks');
const sass = require('node-sass');
const pug = require('pug');
const cssnano = require('cssnano');
const stripCssComments = require('strip-css-comments');

const logo = fs.readFileSync(`${__dirname}/../node_modules/@aasaam/information/logo/aasaam-mono.svg`, { encoding: 'utf-8' });
const firefoxSvg = fs.readFileSync(`${__dirname}/../node_modules/@aasaam/brand-icons/svg/si_firefoxbrowser.svg`, { encoding: 'utf-8' });
const chromeSvg = fs.readFileSync(`${__dirname}/../node_modules/@aasaam/brand-icons/svg/si_googlechrome.svg`, { encoding: 'utf-8' });

const { log } = console;

(async () => {
  execSync([
    `rm -rf ${__dirname}/../tmp`,
    `rm -rf ${__dirname}/../dist`,
    `mkdir -p ${__dirname}/../tmp`,
    `mkdir -p ${__dirname}/../dist/nginx/error-pages`,
    `mkdir -p ${__dirname}/../dist/nginx/snippets`,
    `rm -rf ${__dirname}/../tmp/_css_framework.scss`,
    `cat ${__dirname}/../node_modules/minireset.css/minireset.css > ${__dirname}/../tmp/_css_framework.scss`,
  ].join(' && '));

  fs.writeFileSync(`${__dirname}/../tmp/_css_framework.scss`, stripCssComments(fs.readFileSync(`${__dirname}/../tmp/_css_framework.scss`, { encoding: 'utf8' }), {
    preserve: false,
  }));

  let style = sass.renderSync({
    file: `${__dirname}/../src/styles/error.scss`,
    sourceMap: false,
    outputStyle: 'compressed',
  }).css.toString('utf-8').trim();

  const resetCss = fs.readFileSync(`${__dirname}/../tmp/_css_framework.scss`, { encoding: 'utf8' });

  style = `${resetCss}${'\n'}${style}`;

  const nano = await cssnano.process(style, {
    from: undefined,
  });

  style = nano.css;
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

  const compliedPug = pug.compileFile(`${__dirname}/../src/templates/error.pug`, { pretty: process.env.NODE_ENV === 'test' });

  // generate templates
  const markDownHelper = {};
  Object.keys(errorCodes).forEach(async (c) => {
    const code = parseInt(c, 10);
    const { emoji } = errorCodes[code];

    let family = 5;
    let color = 'd50000';
    if (code < 400) {
      family = 3;
      color = '0d47a1';
    } else if (code < 500) {
      family = 4;
      color = 'ff6d00';
    }

    if (!markDownHelper[family]) {
      markDownHelper[family] = [];
    }
    markDownHelper[family].push(`| ${code} | ${emoji} | [${errorCodes[code].message}](https://aasaam.github.io/error-pages/dist/nginx/error-pages/${code}.html) |`);

    if (!emoji) {
      throw new Error('Emoji not found');
    }

    const edgeDebug = {
      host: '%{host}',
      http_host: '%{http_host}',
      time_iso8601: '%{time_iso8601}',
      scheme: '%{scheme}',
      request_id: '%{request_id}',
      remote_addr: '%{remote_addr}',
      request_method: '%{request_method}',
      request_uri: '%{request_uri}',
      request_length: '%{request_length}',
      client_uid: '%{client_uid}',
      user_id: '%{user_id}',
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
      organization_brand_icon: '/.well-known/aasaam/brand_icons/%{organization_brand_icon}.svg',

      waf_mode: '%{waf_mode}',
      protection_mode: '%{protection_mode}',
    };

    const svgStatus = await new Promise((res) => {
      opentype.load(`${__dirname}/../node_modules/@aasaam/noto-font/dist/aasaamNotoSansDisplay-Bold.ttf`, (e, font) => {
        const path = font.getPath(code.toString(), 2, 16, 12);
        res(path.toSVG(1));
      });
    });

    let svgStatusOpt = (await optimize(svgStatus)).data;
    svgStatusOpt = svgStatusOpt.replace('<path', `<rect width="24" height="24" rx="2" ry="2" fill="#${color}" /><path fill="#ffffff"`);
    svgStatusOpt = `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">${svgStatusOpt}</svg>`;

    svgStatusOpt = await new Promise((res) => {
      sharp(Buffer.from(svgStatusOpt))
        .resize(16, 16)
        .png()
        .toBuffer((e, b) => {
          res(`data:image/png;base64,${b.toString('base64')}`);
        });
    });

    const defaultTemplateData = {
      family,
      svgStatusOpt,
      organization: Organization.en,
      style,
      firefoxSvg,
      modernBrowserBack,
      chromeSvg,
      title: `${errorCodes[code].message}`,
      errorDetail: errorCodes[code],
      code,
      logo: logo.trim(),
    };

    let htmlContent = compliedPug(
      _.merge({}, _.clone(defaultTemplateData), { debug: edgeDebug }),
    );

    const cssPure = new PurgeCSS();

    const purger = cssPure.purge({
      // @ts-ignore
      whitelistPatterns: [new RegExp('data-content')],
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

      fs.writeFileSync(`${__dirname}/../dist/nginx/error-pages/${code}.html`, htmlContent);

      const errorPages = nunjucks.render(`${__dirname}/../src/templates/nginx/error-pages.j2`, {
        errorCodes: Object.keys(errorCodes),
      });

      fs.writeFileSync(`${__dirname}/../dist/nginx/snippets/error-pages.conf`, errorPages.trim());

      const edgeServerLocationError = nunjucks.render(`${__dirname}/../src/templates/nginx/server-error-pages.j2`, {
        edgeDebug,
      });

      fs.writeFileSync(`${__dirname}/../dist/nginx/snippets/server-error-page.conf`, edgeServerLocationError.trim());
    });
  });
  log(markDownHelper[3].join('\n'));
  log(markDownHelper[4].join('\n'));
  log(markDownHelper[5].join('\n'));
})();
