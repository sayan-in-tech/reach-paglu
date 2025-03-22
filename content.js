// Extract username from the URL
function getUsernameFromURL() {
    const match = window.location.href.match(/https:\/\/x\.com\/([^\/]+)/);
    return match ? match[1] : null;
  }
  
  // Inject reputation badge into the profile page
  function injectReputationBadge(username) {
    const profileHeader = document.querySelector('[data-testid="UserName"]');
    if (!profileHeader) return;
  
    const badge = document.createElement('span');
    badge.className = 'reputation-badge bg-danger text-white ms-2 px-2 rounded';
    badge.textContent = `🚩 ${getReputation(username)} Reports`;
  
    profileHeader.appendChild(badge);
  }
  
  // Fetch reputation from background script
  function getReputation(username) {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(
        { type: 'GET_REPUTATION', username },
        (response) => resolve(response.reputation || 0)
      );
    });
  }
  
  // Run when the page loads
  (async () => {
    const username = getUsernameFromURL();
    if (username) {
      const reputation = await getReputation(username);
      injectReputationBadge(username);
    }
  })();