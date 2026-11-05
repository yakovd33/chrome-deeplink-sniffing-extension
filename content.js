const ignoreProtocols = [
  'http:', 'https:', 'ftp:', 'file:',
  'chrome:', 'chrome-extension:', 'chrome-native:',
  'about:', 'data:', 'javascript:', 'blob:', 'ws:', 'wss:'
];

document.addEventListener('click', function(e) {
  const link = e.target.closest('a');
  if (link && link.href) {
    try {
      const urlObj = new URL(link.href);
      if (!ignoreProtocols.includes(urlObj.protocol)) {
        // Send message synchronously during the click to preserve the "User Gesture" security token
        chrome.runtime.sendMessage({
          action: "LOG_PROTOCOL",
          url: link.href,
          protocol: urlObj.protocol.replace(':', '')
        });
      }
    } catch (err) {}
  }
}, true);
