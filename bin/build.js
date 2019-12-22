/* eslint-disable import/no-extraneous-dependencies */
// @ts-check

const { execSync } = require('child_process');
const fs = require('fs');

const httpStatus = require('@aasaam/http-status-extra');

const {
  Organization,
} = require('@aasaam/information');
const PurgeCss = require('purgecss');
const _ = require('lodash');
const nunjucks = require('nunjucks');
const sass = require('node-sass');
const pug = require('pug');
const cssnano = require('cssnano');
const stripCssComments = require('strip-css-comments');

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
  Object.keys(httpStatus).forEach((code) => {
    const c = parseInt(code, 10);
    // @ts-ignore
    if (c < 300) {
      return;
    }
    if (httpStatus[c].standard === 'http') {
      errorCodes[c] = httpStatus[c];
    }

    if (
      httpStatus[c].standard === 'nginx'
      // @ts-ignore
      && [444, 494, 495, 496, 497].indexOf(c) !== -1
    ) {
      errorCodes[c] = httpStatus[c];
    }

    if (c === 438) {
      errorCodes[c] = httpStatus[c];
    }
  });

  const compliedPug = pug.compileFile(`${__dirname}/../src/templates/error.pug`, { pretty: process.env.NODE_ENV === 'test' });

  // generate templates
  const markDownHelper = {};
  Object.keys(errorCodes).forEach((c) => {
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
    markDownHelper[family].push(`${emoji} [${code} ${errorCodes[code].message}](./dist/nginx/error-pages/${code}.html)`);

    if (!emoji) {
      throw new Error('Emoji not found');
    }

    const edgeDebug = {
      request_id: '%{request_id}',
      request_ip: '%{request_ip}',
      client_uid: '%{client_uid}',
      user_id: '%{user_id}',
      agent_name: '%{agent_name}',
      agent_version: '%{agent_version}',
      agent_os: '%{agent_os}',
      agent_os_version: '%{agent_os_version}',
      agent_category: '%{agent_category}',
      agent_vendor: '%{agent_vendor}',
      agent_hash: '%{agent_hash}',
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
    };

    const defaultTemplateData = {
      family,
      organization: Organization.en,
      style,
      title: `${code} ${errorCodes[code].message}`,
      errorDetail: errorCodes[code],
      code,
    };

    let htmlContent = compliedPug(
      _.merge({}, _.clone(defaultTemplateData), { debug: edgeDebug }),
    );

    // @ts-ignore
    const cssPure = new PurgeCss({
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

    const purgeResult = cssPure.purge();

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
  // console.log(markDownHelper[3].join('\n'));
  // console.log(markDownHelper[4].join('\n'));
  // console.log(markDownHelper[5].join('\n'));
})();
