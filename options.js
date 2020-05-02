function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    domains: document.querySelector("#domains").value
  });
}

function restoreOptions() {

  function setDomains(result) {
    document.querySelector("#domains").value = result.domains || "";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  browser.storage.sync.get("domains").then(setDomains, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
