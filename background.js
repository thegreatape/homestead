/*
 * Adapted from https://github.com/mdn/webextensions-examples/blob/master/history-deleter/history.js
 */

var blacklist = [
  'reddit.com',
  'twitter.com',
  'news.ycombinator.com',
  'theverge.com',
  'instagram.com',
  'macrumors.com',
  'goodreads.com',
  'rockpapershotgun.com',
  'youtube.com',
  'bostonglobe.com',
  'washingtonpost.com',
  'nytimes.com',
  'gizmodo.com',
  'politico.com',
  'fivethirtyeight.com',
];

function clearHistoryIfBlackholed(domain) {
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

browser.runtime.onMessage.addListener((message) => {
  console.log(message);
  if (message.command == "remove") {
    clearHistoryIfBlackholed(message.domain);
  }
})
