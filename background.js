// background.js
importScripts('./p2p.js', './crypto.js');

let db = {}; // Local database for reputation data

// Initialize P2P network
(async () => {
  const { broadcast, onMessage } = await initP2P();

  // Handle incoming messages
  onMessage(async (message) => {
    const { type, data } = message;

    if (type === 'REPORT' && await verifyReport(data)) {
      const { target, reporter } = data;
      db[target] = db[target] || { reports: 0, reporters: new Set() };

      // Avoid duplicate reports from the same reporter
      if (!db[target].reporters.has(reporter)) {
        db[target].reports++;
        db[target].reporters.add(reporter);
        console.log(`Updated reputation for ${target}: ${db[target].reports} reports`);
      }
    }
  });

  // Handle report submissions from the popup
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'REPORT_USER') {
      const { target } = request;
      const report = { target, reporter: sender.id, timestamp: Date.now() };

      // Sign and broadcast the report
      signReport(report).then((signedReport) => {
        broadcast({ type: 'REPORT', data: signedReport });
        sendResponse({ success: true });
      });
    } else if (request.type === 'GET_REPUTATION') {
      const { username } = request;
      sendResponse({ reputation: db[username]?.reports || 0 });
    }
  });
})();