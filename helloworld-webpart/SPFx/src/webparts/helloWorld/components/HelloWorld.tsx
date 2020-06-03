import * as React from 'react';
import styles from './HelloWorld.module.scss';
import { IHelloWorldProps } from './IHelloWorldProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { IPersonaProps } from 'office-ui-fabric-react/lib/Persona';
import {  NormalPeoplePicker } from 'office-ui-fabric-react/lib/Pickers';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http'; 
import { autobind } from 'office-ui-fabric-react/lib//Utilities'; 

export default class HelloWorld extends React.Component<IHelloWorldProps, {}> {

constructor(prop: IHelloWorldProps) {
   super(prop);
  
}


  public render(): React.ReactElement<IHelloWorldProps> {
    return (
      <div className={ styles.helloWorld }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
              (2) This is People Picker: 
              <NormalPeoplePicker onResolveSuggestions={this._onFilterChanged}  resolveDelay={200} />              
            </div>
          </div>
        </div>  
      </div>
    );
  }

  @autobind 
  private _onFilterChanged(filterText: string) { 
    if (filterText) { 
      if (filterText.length > 2) { 
        return this.searchPeople(filterText);         
      } 
    } else { 
      return []; 
    } 
  } 

  private searchPeople(terms: string): IPersonaProps[] | Promise<IPersonaProps[]> { 
    return new Promise<IPersonaProps[]>((resolve, reject) => 
      this.props.spcontect.get(`https://shahown9.sharepoint.com/sites/SPLearning/EmpLocMap/_api/search/query?querytext='*${terms}*'&rowlimit=10&sourceid='b09a7990-05ea-4af9-81ef-edfab16c4e31'`, 
        SPHttpClient.configurations.v1, 
        { 
          headers: { 
            'Accept': 'application/json;odata=nometadata', 
            'odata-version': '' 
          } 
        }).then((response: SPHttpClientResponse): Promise<{ PrimaryQueryResult: any }> => { 
          return response.json(); 
        }).then((response: { PrimaryQueryResult: any }): void => { 
          let relevantResults: any = response.PrimaryQueryResult.RelevantResults; 
          let resultCount: number = relevantResults.TotalRows; 
          let people = []; 
          if (resultCount > 0) { 
            relevantResults.Table.Rows.forEach(function (row) { 
              let persona: IPersonaProps = {}; 
              row.Cells.forEach(function (cell) { 
                if (cell.Key === 'JobTitle') 
                  persona.secondaryText = cell.Value; 
                if (cell.Key === 'PictureURL') 
                  persona.imageUrl = cell.Value; 
                if (cell.Key === 'PreferredName') 
                  persona.primaryText = cell.Value; 
              }); 
              people.push(persona); 
            }); 
          } 
          resolve(people); 
        }, (error: any): void => { 
          reject(); 
        })); 
  } 

}
