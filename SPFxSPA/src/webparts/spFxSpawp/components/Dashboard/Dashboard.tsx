import * as React from 'react';
import styles from '../../components/SpFxSpawp.module.scss';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import { ISpFxSpawpProps } from '../../components/ISpFxSpawpProps';
import { DateTimePicker, DateConvention, TimeConvention } from '@pnp/spfx-controls-react/lib/dateTimePicker';
import { Map, ICoordinates, MapType } from "@pnp/spfx-controls-react/lib/Map";
import { ListView, IViewField, SelectionMode, GroupOrder, IGrouping } from "@pnp/spfx-controls-react/lib/ListView";
import { sp } from '@pnp/sp';
import "@pnp/sp/webs";

const groupByFields: IGrouping[] = [
  {
    name: "Extension", 
    order: GroupOrder.ascending 
  }, {
    name: "Author", 
    order: GroupOrder.descending
  }
];

export default class Dashboard extends React.Component<any> {

    public render(): React.ReactElement<any> {
      return (
        <div className={ styles.spFxSpawp }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              Welcome to Dashboard Page

              <DateTimePicker label="DateTime Picker - 12h"
                              dateConvention={DateConvention.DateTime}
                              timeConvention={TimeConvention.Hours12} />

              <DateTimePicker label="DateTime Picker - 24h"
                              dateConvention={DateConvention.DateTime}
                              timeConvention={TimeConvention.Hours24}
                              onChange={this._handleChange} />  

       
            </div>
          </div>
        </div>
      </div>      
      );
    }

private _handleChange  = (item: Date) : void => {
    console.log('Items:', item);
  };  

private _getSelection(items: any[]) {
  console.log('Selected items:', items);
}  

  }
