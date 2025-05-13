// Keep background connection alive
let keepAlive = setInterval(() => {
  chrome.runtime.getPlatformInfo(() => {});
}, 20000);

// Clean up on extension unload
chrome.runtime.onSuspend.addListener(() => {
  clearInterval(keepAlive);
});1/1

fzsgsdfgfdsg

5

1

3

2

6

3

4

4