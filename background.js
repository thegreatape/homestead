/*
 * Adapted from https://github.com/mdn/webextensions-examples/blob/master/history-deleter/history.js
 */

function onError(error) {
  console.log(`Error: ${error}`);
}

function clearHistoryIfBlackholed(domain) {
  let getting = browser.storage.sync.get("domains");
  getting.then(checkAndClear, onError);

  function checkAndClear(settings) {
    let blacklist = settings.domains.replace(/^\s*|\s*$/g, '').split(/\s*\n\s*/);
    console.log(blacklist);

    var match = null;
    for (let i in blacklist) {
      if (domain.indexOf(blacklist[i]) != -1) {
        match = blacklist[i];
      }
    }

    if (!match) {
      return;
    }

    var searchingHistory = browser.history.search({text: match, startTime: 0, maxResults: 100000})
    searchingHistory.then((results) => {
      for (let k in results) {
        browser.history.deleteUrl({url: results[k].url});
      }
    });
  }
}

browser.runtime.onMessage.addListener((message) => {
  if (message.command == "remove") {
    clearHistoryIfBlackholed(message.domain);
  }
})
