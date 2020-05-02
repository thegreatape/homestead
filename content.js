/*
 * Adapted from https://github.com/mdn/webextensions-examples/blob/master/history-deleter/history.js
 */

function get_hostname(url) {
  var a = document.createElement('a');
  a.href = url;
  return a.hostname;
}

function removeHistory() {
  browser.runtime.sendMessage({
    command: "remove",
    domain: get_hostname()
  });
}

removeHistory();
