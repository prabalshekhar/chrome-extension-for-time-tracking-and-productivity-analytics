let activeTabId = null;
let activeDomain = null;
let activeSince = null;

chrome.tabs.onActivated.addListener(activeInfo => {
  handleTabChange(activeInfo.tabId);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.status === 'complete') {
    handleTabChange(tabId);
  }
});

function handleTabChange(tabId) {
  if (activeTabId !== null) {
    logTime();
  }

  activeTabId = tabId;
  activeSince = Date.now();

  chrome.tabs.get(tabId, tab => {
    if (tab.url) {
      const url = new URL(tab.url);
      activeDomain = url.hostname;
    }
  });
}

function logTime() {
  const duration = Date.now() - activeSince;
  console.log(`Time on ${activeDomain}: ${duration}ms`);

  fetch('http://localhost:5000/api/log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ domain: activeDomain, duration })
  });
}
