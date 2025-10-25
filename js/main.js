// main bookmark logic

// Codes that trigger sorting:
// - AtoZ
// - ZtoA

// Sorting functions

const sortAtoZ = () => {};

const sortZtoA = () => {};

// Event listeners that trigger

chrome.runtime.onMessage.addListener(async (msg, _, send) => {
  if (msg.type === "AtoZ") {
    await sortAtoZ();
  }
});

chrome.runtime.onMessage.addListener(async (msg, _, send) => {
  if (msg.type === "ZtoA") {
    await sortZtoA();
  }
});
