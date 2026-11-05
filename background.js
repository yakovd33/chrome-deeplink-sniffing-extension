const ignoreProtocols = [
  'http:', 'https:', 'ftp:', 'file:',
  'chrome:', 'chrome-extension:', 'chrome-native:',
  'about:', 'data:', 'javascript:', 'blob:', 'ws:', 'wss:'
];

// Cache the autoOpen setting so we don't break the user gesture with an async storage call
let autoOpenCache = false;
chrome.storage.local.get({autoOpen: false}, (res) => autoOpenCache = res.autoOpen);
chrome.storage.onChanged.addListener((changes) => {
  if (changes.autoOpen) autoOpenCache = changes.autoOpen.newValue;
});

function openNativePopup() {
  if (autoOpenCache) {
    if (chrome.action && chrome.action.openPopup) {
      // openPopup natively drops down the action bubble!
      chrome.action.openPopup().catch(err => {
        // Fallback to window ONLY if Chrome blocks the native popup (e.g., user gesture trace was lost)
        chrome.windows.create({
          url: chrome.runtime.getURL("popup.html"),
          type: "popup", width: 380, height: 500, focused: true
        });
      });
    } else {
      chrome.windows.create({
        url: chrome.runtime.getURL("popup.html"),
        type: "popup", width: 380, height: 500, focused: true
      });
    }
  }
}

function saveLog(url, protocolStr) {
  const time = new Date().toLocaleTimeString();
  const timestamp = Date.now();
  const protocol = protocolStr || new URL(url).protocol.replace(':', '');
  
  chrome.storage.local.get({logs: []}, (result) => {
    const last = result.logs[0];
    if (last && last.url === url && (timestamp - last.timestamp < 1000)) return;

    const newLogs = [{url, time, timestamp, protocol}, ...result.logs];
    chrome.storage.local.set({logs: newLogs});
  });
}

// 1. Clicks from content script (Maintains user gesture)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "LOG_PROTOCOL") {
    openNativePopup(); // Must be called instantly!
    saveLog(request.url, request.protocol);
  }
});

// 2. JS redirects (Does NOT maintain user gesture, will likely fallback to window)
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  try {
    const urlObj = new URL(details.url);
    if (!ignoreProtocols.includes(urlObj.protocol)) {
      openNativePopup();
      saveLog(details.url);
    }
  } catch (e) {}
});
