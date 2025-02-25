// Remove existing context menu items to prevent duplicates
chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: "translateText",
      title: "Translate Text to French",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "translateText" && info.selectionText) {
      fetch("http://localhost:5000/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: info.selectionText })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(data => {
          chrome.notifications.create({
            type: "basic",
            iconUrl: "icon.png",
            title: "Translation",
            message: "Translated Text: " + data.translatedText
          });
        })
        .catch(error => {
          chrome.notifications.create({
            type: "basic",
            iconUrl: "icon.png",
            title: "Translation Error",
            message: "Failed to translate text: " + error.message
          });
        });
    }
  });