// Search the bookmarks when entering the search keyword.
// Get the bookmarks and display them in the popup
chrome.bookmarks.getTree((tree) => {
  const bookmarkList = document.getElementById("bookmarkList");
  displayBookmarks(tree[0].children, bookmarkList);
});

// Recursively display the bookmarks
function displayBookmarks(nodes, parentNode) {
  for (const node of nodes) {
    // If the node is a bookmark, create a list item and append it to the parent node
    if (node.url) {
      const listItem = document.createElement("li");
      listItem.textContent = node.title;
      parentNode.appendChild(listItem);
    }

    // If the node has children, recursively display them
    if (node.children) {
      //folder title
      const listItem = document.createElement("li");
      listItem.textContent = node.title;
      parentNode.appendChild(listItem);
      //append children
      const sublist = document.createElement("ul");
      parentNode.appendChild(sublist);
      displayBookmarks(node.children, sublist);
    }
  }
}

const sort_a_to_z = async (roots) => {
  // Recursively sort folders
  async function sortFolder(folderId) {
    const children = await new Promise((resolve) =>
      chrome.bookmarks.getChildren(folderId, resolve)
    );

    // Sort by title alphabetically
    children.sort((a, b) =>
      a.title.localeCompare(b.title, undefined, { sensitivity: "base" })
    );

    // Apply sorted order by updating each child’s index
    for (let i = 0; i < children.length; i++) {
      chrome.bookmarks.move(children[i].id, {
        parentId: folderId,
        index: i,
      });
      // If this child is a folder, recurse
      if (children[i].children) {
        sortFolder(children[i].id);
      }
    }
  }

  // Chrome returns multiple root nodes (Bookmarks Bar, Other, Mobile)
  for (const root of roots) {
    for (const child of root.children) {
      if (child.children) {
        await sortFolder(child.id);
      }
    }
  }
  return roots;
};

const sort_reverse = async (roots) => {
  async function sortFolder(folderId) {
    const children = await chrome.bookmarks.getChildren(folderId);
    children.sort((a, b) =>
      b.title.localeCompare(a.title, undefined, { sensitivity: "base" })
    );
    for (let i = 0; i < children.length; i++) {
      await chrome.bookmarks.move(children[i].id, {
        parentId: folderId,
        index: i,
      });
      if (children[i].url === undefined) await sortFolder(children[i].id); // recurse into folders
    }
  }
  for (const root of roots) {
    for (const child of root.children || [])
      if (child.children) await sortFolder(child.id);
  }
  return roots;
};

document.getElementById("sort-a-to-z").addEventListener("click", async () => {
  chrome.bookmarks.getTree(async (tree) => {
    const bookmarkList = document.getElementById("bookmarkList");
    bookmarkList.innerHTML = "";
    displayBookmarks(await sort_a_to_z(tree), bookmarkList);
  });
});

document.getElementById("sort-reverse").addEventListener("click", async () => {
  chrome.bookmarks.getTree(async (tree) => {
    const bookmarkList = document.getElementById("bookmarkList");
    bookmarkList.innerHTML = "";
    displayBookmarks(await sort_reverse(tree), bookmarkList);
  });
});
