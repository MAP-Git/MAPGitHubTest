import * as React from 'react';
import styles from './SpFxSpawp.module.scss';
import { ISpFxSpawpProps } from './ISpFxSpawpProps';
import { escape } from '@microsoft/sp-lodash-subset';
import  Dashboard  from './Dashboard/Dashboard';
import  Pages  from './Pages/Pages';
import  APPS  from './APPS/APPS_Page';
import { BrowserRouter as Router, Route, Link, Redirect, Switch, HashRouter, PropsRoute } from 'react-router-dom';
import  SiteNavigation from '../components/SiteNavigation/SiteNavigation';
import { Stack, StackItem } from 'office-ui-fabric-react';

export default class SpFxSpawp extends React.Component<ISpFxSpawpProps, {}> {
  public render(): React.ReactElement<ISpFxSpawpProps> {
    return (
      <HashRouter >  
        <Stack horizontal gap={15}>   
          <SiteNavigation />  
          <StackItem grow={2}>  
            <Switch>  
              <Route path='/' exact={true} component={() => <Dashboard  {...this.props} />} />  
              <Route path='/APPS' exact={true} component={() => <APPS  {...this.props} />} />  
              <Route path='/Pages' exact={true} component={() => <Pages  {...this.props} />} />  
            </Switch>  
          </StackItem>  
        </Stack>  
      </HashRouter>
    );
  }
}
