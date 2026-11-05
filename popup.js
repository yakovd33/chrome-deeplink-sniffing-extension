document.addEventListener('DOMContentLoaded', () => {
  const logsContainer = document.getElementById('logs');
  const emptyMsg = document.getElementById('empty');
  const clearBtn = document.getElementById('clearBtn');
  const autoOpenToggle = document.getElementById('autoOpenToggle');

  function renderLogs(logs) {
    logsContainer.innerHTML = '';
    if (logs.length === 0) {
      emptyMsg.style.display = 'block';
    } else {
      emptyMsg.style.display = 'none';
      logs.forEach(log => {
        const div = document.createElement('div');
        div.className = 'log-item';
        div.innerHTML = `
          <div class="header-row">
            <span class="protocol-badge">${log.protocol}</span>
            <span class="time">${log.time}</span>
          </div>
          <div class="url">${log.url}</div>
        `;
        logsContainer.appendChild(div);
      });
    }
  }

  chrome.storage.local.get({logs: [], autoOpen: false}, (result) => {
    renderLogs(result.logs);
    autoOpenToggle.checked = result.autoOpen;
  });

  chrome.storage.onChanged.addListener((changes) => {
    if (changes.logs) renderLogs(changes.logs.newValue);
    if (changes.autoOpen) autoOpenToggle.checked = changes.autoOpen.newValue;
  });

  clearBtn.addEventListener('click', () => {
    chrome.storage.local.set({logs: []}, () => renderLogs([]));
  });

  autoOpenToggle.addEventListener('change', (e) => {
    chrome.storage.local.set({autoOpen: e.target.checked});
  });
});
