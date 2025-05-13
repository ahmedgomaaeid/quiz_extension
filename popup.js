document.getElementById('copyButton').addEventListener('click', async () => {
  const status = document.getElementById('status');
  status.textContent = 'Working...';
  status.style.color = 'blue';

  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (!tab?.id) throw new Error('No active tab found');

    // First inject content script (if not already there)
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    });

    // Send message with proper error handling
    let response;
    try {
      response = await chrome.tabs.sendMessage(tab.id, { 
        action: "copyQuestionContainer" 
      });
    } catch (err) {
      // Retry once if failed
      await new Promise(r => setTimeout(r, 300));
      response = await chrome.tabs.sendMessage(tab.id, { 
        action: "copyQuestionContainer" 
      });
    }

    if (!response) throw new Error('No response from content script');
    if (!response.success) throw new Error(response.error || 'Copy failed');

    status.textContent = 'Copied successfully!';
    status.style.color = 'green';
    
  } catch (error) {
    status.textContent = `Error: ${error.message}`;
    status.style.color = 'red';
    console.error('Extension error:', error);
  } finally {
    setTimeout(() => {
      status.textContent = 'Ready to copy';
      status.style.color = '#666';
    }, 2000);
  }
});