let startupDelay = 5000; // Delay in ms for session restoration to complete

// Check if Chrome is starting
chrome.runtime.onStartup.addListener(() => {
  // Set the flag in storage
  chrome.storage.local.set({ isChromeStarting: true });

  // Reset after a delay to give Chrome time to restore sessions
  setTimeout(() => {
    chrome.storage.local.set({ isChromeStarting: false });
    // console.log("Chrome startup process completed.");
  }, startupDelay);
});

// Listen for new tabs
chrome.tabs.onCreated.addListener((tab) => {
  // Retrieve the startup flag from storage
  chrome.storage.local.get("isChromeStarting", (data) => {
    if (data.isChromeStarting) {
      // console.log("Skipping focus for tab during Chrome startup:", tab.id);
      return;
    }

    // Focus the newly created tab
    chrome.tabs.update(tab.id, { active: true });
    // console.log("Focused new tab:", tab.id);
  });
});
