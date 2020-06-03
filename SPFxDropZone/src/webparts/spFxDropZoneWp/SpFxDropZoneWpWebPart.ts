import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'SpFxDropZoneWpWebPartStrings';
import SpFxDropZoneWp from './components/SpFxDropZoneWp';
import { ISpFxDropZoneWpProps } from './components/ISpFxDropZoneWpProps';

export interface ISpFxDropZoneWpWebPartProps {
  description: string;
  context: any;
}

export default class SpFxDropZoneWpWebPart extends BaseClientSideWebPart <ISpFxDropZoneWpWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISpFxDropZoneWpProps> = React.createElement(
      SpFxDropZoneWp,
      {
        description: this.properties.description,
        context: this.properties.context
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
