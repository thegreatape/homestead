/*
 * Adapted from https://github.com/mdn/webextensions-examples/blob/master/history-deleter/history.js
 */

var blacklist = [
  /reddit\.com/,
  /twitter\.com/,
];

function clearHistoryIfBlackholed(domain) {
  var matched = false;
  for (let i in blacklist) {
    if (blacklist[i].test(domain)) {
      matched = true;
    }
  }

  if (!matched) {
    return;
  }

  var searchingHistory = browser.history.search({text: domain})
  searchingHistory.then((results) => {
    for (let k in results) {
      console.log("removing ", results[k].url);
      browser.history.deleteUrl({url: results[k].url});
    }
  }
  );
}

browser.runtime.onMessage.addListener((message) => {
  console.log(message);
  if (message.command == "remove") {
    clearHistoryIfBlackholed(message.domain);
  }
})
