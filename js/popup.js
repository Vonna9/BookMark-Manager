// pop up logic on the front end

// Codes that trigger sorting:
// - AtoZ
// - ZtoA

const trigger_sort_a_to_Z = () => {
  chrome.runtime.sendMessage({ type: "AtoZ" });
};

const trigger_sort_z_to_a = () => {
  chrome.runtime.sendMessage({ type: "ZtoA" });
};
