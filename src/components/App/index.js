import React, { PureComponent } from 'react';
import styles from '../../styles.css';
import Tabs from '../Tabs';
import TabsController from '../TabsController';

class App extends PureComponent {
  render = () => {
    return (
      <main>
        <header className={styles['header']}/>
        <section className={styles['content']}>
          <Tabs/>
          <TabsController/>
        </section>
      </main>
    )
  }
}

export default App;