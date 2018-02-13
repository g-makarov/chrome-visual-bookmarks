import React, { PureComponent } from 'react';
import styles from '../../styles.css';
import { createFolderIfNotExist, getChildren } from '../../utils';

class Tabs extends PureComponent {
  state = {
    bookmarks: []
  };

  componentDidMount = async () => {
    const { id } = await createFolderIfNotExist('Visual Bookmarks');
    const bookmarks = await getChildren(id);
    this.setState({ bookmarks });
  };

  render = () => {
    const { bookmarks } = this.state;
    console.log({ bookmarks });
    return (
      <div className={styles['tabs-wrapper']}>
        <div className={styles['tabs']}>
          {bookmarks.map(({ title, url, id }) => (
            <a key={id} href={url} className={styles['tabs__item']}>
              <div className={styles['tabs__item-logo']}>
                <img src={`https://www.google.com/s2/favicons?domain=${url}`}/>
              </div>
              <span>{title}</span>
            </a>
          ))}
        </div>
      </div>
    )
  }
}

export default Tabs;