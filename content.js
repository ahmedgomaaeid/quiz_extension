// Connection check
function isExtensionContext() {
  try {
    return chrome.runtime?.id !== undefined;
  } catch (e) {
    return false;
  }
}

// Main message handler
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "copyQuestionContainer") {
    copyQuestionContainer().then(result => {
      sendResponse(result);
    }).catch(error => {
      sendResponse({ success: false, error: error.message });
    });
    return true; // Keep message channel open
  }
});

async function copyQuestionContainer() {
  if (!isExtensionContext()) {
    throw new Error('Extension context lost');
  }

  const container = document.querySelector('.quiz-container-inner');
  if (!container) {
    throw new Error('No .quiz-container-inner element found');
  }

  // Modern clipboard API (preferred)
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(container.innerHTML);
      return { success: true };
    } catch (err) {
      console.warn('Modern API failed, falling back', err);
    }
  }

  // Fallback method
  const textarea = document.createElement('textarea');
  textarea.value = container.innerHTML;
  textarea.style.position = 'fixed';
  textarea.style.opacity = 0;
  document.body.appendChild(textarea);
  textarea.select();

  try {
    const success = document.execCommand('copy');
    if (!success) throw new Error('execCommand failed');
    return { success: true };
  } finally {
    document.body.removeChild(textarea);
  }
}