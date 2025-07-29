let activeTab = null;
let activeTime = Date.now();

chrome.tabs.onActivated.addListener(activeInfo => {
  updateTime();
  chrome.tabs.get(activeInfo.tabId, tab => {
    activeTab = tab;
    activeTime = Date.now();
  });
});

chrome.windows.onFocusChanged.addListener(() => {
  updateTime();
  activeTime = Date.now();
});

function updateTime() {
  if (!activeTab) return;
  const timeSpent = Math.round((Date.now() - activeTime) / 1000);
  const domain = new URL(activeTab.url).hostname;

  fetch('http://localhost:5000/log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ domain, timeSpent })
  });
}
