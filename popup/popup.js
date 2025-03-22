// Get the current tab's URL and extract the username
async function getUsername() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const url = tab.url;
  
    // Extract username from URL (e.g., https://x.com/_akhaliq)
    const match = url.match(/https:\/\/x\.com\/([^\/]+)/);
    return match ? match[1] : null;
  }
  
  // Fetch and display reputation data
  async function updateUI() {
    const username = await getUsername();
    if (!username) {
      document.getElementById('profileInfo').innerHTML = '<p>Not a profile page.</p>';
      return;
    }
  
    document.getElementById('username').textContent = username;
  
    // Fetch reputation from background script
    chrome.runtime.sendMessage(
      { type: 'GET_REPUTATION', username },
      (response) => {
        document.getElementById('reportCount').textContent = response.reputation || 0;
      }
    );
  }
  
  // Handle report button click
  document.getElementById('reportButton').addEventListener('click', async () => {
    const username = await getUsername();
    if (!username) return;
  
    chrome.runtime.sendMessage(
      { type: 'REPORT_USER', target: username },
      (response) => {
        if (response.success) {
          updateUI(); // Refresh the UI after reporting
        }
      }
    );
  });
  
  // Initialize UI
  updateUI();