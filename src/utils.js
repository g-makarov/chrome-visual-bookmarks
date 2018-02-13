export const createFolderIfNotExist = async (title) => {
  const foundFolder = await searchBookmarks({ title }).then(result => result.filter(item => !item.url));
  return foundFolder.length > 0 ? foundFolder[0] : await createBookmark({ title });
};

export const getChildren = (id) => {
  return new Promise(resolve => chrome.bookmarks.getChildren(id, resolve));
};

export const createBookmark = (query) => {
  return new Promise(resolve => chrome.bookmarks.create(query, resolve));
};

export const searchBookmarks = (query = {}) => {
  return new Promise(resolve => chrome.bookmarks.search(query, resolve));
};