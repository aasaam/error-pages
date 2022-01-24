/* eslint-disable operator-linebreak */
/* eslint-disable prefer-template */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-var */
/* eslint-disable func-names */
/* eslint-disable wrap-iife */
(function (document) {
  var emailSubject = encodeURIComponent('report webserver %{host} [%{status}]');
  var emailBody = encodeURIComponent(
    [
      'id: %{request_id}',
      'status: %{status}',
      'host: %{host}',
      'url: %{request_uri}',
      'method: %{request_method}',
      'ip: %{remote_addr}',
      'waf: %{waf_mode}',
    ].join('\n'),
  );
  var urlParams = {
    mode: 'webserver-status',
    id: '%{request_id}',
    host: '%{host}',
    url: '%{request_uri}',
    method: '%{request_method}',
    ip: '%{remote_addr}',
    waf: '%{waf_mode}',
    status: '%{status}',
  };
  var urlQueryString = Object.keys(urlParams)
    .map(function (key) {
      return key + '=' + encodeURIComponent(urlParams[key]);
    })
    .join('&');
  document.addEventListener('DOMContentLoaded', function () {
    document
      .querySelector('#support-mail')
      .setAttribute(
        'href',
        'mailto:#{debug.support_email}?subject=' +
          emailSubject +
          '&body=' +
          emailBody,
      );
    document
      .querySelector('#support-url')
      .setAttribute(
        'href',
        '#{debug.debug.support_url}?' + urlQueryString,
      );
  });
  // eslint-disable-next-line no-undef
})(document);
