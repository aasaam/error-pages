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
      'host: %{host}',
      'id: %{request_id}',
      'ip: %{remote_addr}',
      'method: %{request_method}',
      'status: %{status}',
      'waf: %{waf_mode}',
      'time_iso8601: %{time_iso8601}',
      'url: %{request_uri}',
    ].join('\n'),
  );
  var urlParams = {
    mode: 'webserver-status',
    host: '%{host}',
    id: '%{request_id}',
    ip: '%{remote_addr}',
    method: '%{request_method}',
    status: '%{status}',
    waf: '%{waf_mode}',
    time_iso8601: '%{time_iso8601}',
    url: '%{request_uri}',
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
        'mailto:%{support_email}?subject=' +
          emailSubject +
          '&body=' +
          emailBody,
      );
    document
      .querySelector('#support-url')
      .setAttribute(
        'href',
        '%{support_url}?' + urlQueryString,
      );
  });
  // eslint-disable-next-line no-undef
})(document);
