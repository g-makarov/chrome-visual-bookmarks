import React, { PureComponent } from 'react';
import bind from 'cached-bind';
import styles from '../../styles.css';
import {
  createFolderIfNotExist,
  getChildren,
  getTree,
  isFolder,
  getSubTree,
  searchBookmarks
} from '../../utils';

class Tabs extends PureComponent {
  state = {
    bookmarks: [],
    history: []
  };

  componentDidMount = async () => {
    const tree = await getTree();

    // console.log(tree);
    // chrome.bookmarks.search(res => console.log(res));

    // const { id } = await createFolderIfNotExist('Visual Bookmarks');
    // const bookmarks = await getChildren(id);
    const { id, children } = tree[0];
    this.setState({ bookmarks: children, history: [id] });
  };

  back = async () => {
    const { history } = this.state;
    const newHistory = [...history];
    newHistory.pop();
    const [res] = await getSubTree(newHistory[newHistory.length - 1]);
    this.setState({ bookmarks: res.children, history: newHistory });
  };

  open = async (id) => {
    const [res] = await getSubTree(id);
    console.log(res);
    const { history } = this.state;
    this.setState({ bookmarks: res.children, history: [...history, id] });
  };

  searchTabs = ({ target: { value } }) => {
    const { history, bookmarks } = this.state;
    console.log(value);

    if (this.inputChangeTimeout) {
      clearTimeout(this.inputChangeTimeout);
    }

    this.inputChangeTimeout = setTimeout(() => {
      console.log('NEW: ',bookmarks.filter(bookmark => bookmark.title.toLowerCase() === value.toLowerCase()));
      this.setState({ bookmarks: bookmarks.filter(bookmark => bookmark.title.toLowerCase() === value.toLowerCase()) });
      this.inputChangeTimeout = null;
    }, 300);
  };

  renderFolder = (bookmark) => {

    return (
      <div
        key={bookmark.id}
        className={styles['tabs__item']}
        onClick={bind(this, 'open', bookmark.id)}
      >
        <div>{bookmark.title}</div>
      </div>
    )
  };

  renderBookmark = (bookmark) => {

    return (
      <a key={bookmark.id} href={bookmark.url} className={styles['tabs__item']}>
        <div className={styles['tabs__item-logo']}>
          <img src={`https://www.google.com/s2/favicons?domain=${bookmark.url}`}/>
        </div>
        <span>{bookmark.title}</span>
      </a>
    )
  };

  renderTabs = (bookmarks) => {
    return bookmarks.map(bookmark => bookmark.children ? this.renderFolder(bookmark) : this.renderBookmark(bookmark))
  };

  render = () => {
    const { bookmarks, history } = this.state;

    console.log({ history });
    console.log({ bookmarks });

    return (
      <div className={styles['tabs-wrapper']}>
        {/*<input type="text" onChange={this.searchTabs}/>*/}
        <button
          type="button"
          onClick={this.back}
          className={styles['tabs__back-btn']}
          disabled={history.length === 1}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="24" viewBox="0 0 24 24" width="24">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
        </button>
        <div className={styles['tabs']}>
          {this.renderTabs(bookmarks)}
        </div>
      </div>
    )
  }
}

export default Tabs;