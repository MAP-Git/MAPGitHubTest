import * as React from 'react';
import styles from '../../components/SpFxSpawp.module.scss';

export default class Pages extends React.Component<any> {
    public render(): React.ReactElement<any> {
      return (
        <div className={ styles.spFxSpawp }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              Welcome to Pages
            </div>
          </div>
        </div>
      </div>      
      );
    }

  }
