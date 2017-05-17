import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import { CardActions, CardText, CardTitle } from 'material-ui/Card';
import { Tab, Tabs } from 'material-ui/Tabs';

import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Glass from '/imports/ui/Glass';
import { GlassCard } from '/imports/ui/components/GlassCard';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import PractitionerDetail  from '/imports/ui/workflows/practitioners/PractitionerDetail';
import PractitionerTable  from '/imports/ui/workflows/practitioners/PractitionerTable';
import React  from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin  from 'react-mixin';
import { VerticalCanvas } from '/imports/ui/components/VerticalCanvas';

const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;

Session.setDefault('practitionerPageTabIndex', 1);
Session.setDefault('practitionerSearchFilter', '');
Session.setDefault('selectedPractitioner', false);

export class PractitionersPage extends React.Component {



  getMeteorData() {
    let data = {
      selectedIndex: 0,
      style: {
        opacity: Session.get('globalOpacity'),
        tab: {
          borderBottom: '1px solid lightgray',
          borderRight: 'none'
        }
      },
      tabIndex: Session.get('practitionerPageTabIndex'),
      practitionerSearchFilter: Session.get('practitionerSearchFilter'),
      currentPractitioner: Session.get('selectedPractitioner')
    };

    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);
    data.style.tab = Glass.darkroom(data.style.tab);

    if(process.env.NODE_ENV === "test") console.log("PractitionersPage[data]", data);
    return data;
  }

  // this could be a mixin
  handleTabChange(index){
    Session.set('practitionerPageTabIndex', index);
  }
  select(index){
    //this.setState({selectedIndex: index});
  }

  // this could be a mixin
  onNewTab(){
    console.log("onNewTab; we should clear things...");

    Session.set('selectedPractitioner', false);
    Session.set('practitionerUpsert', false);
  }

  render() {
    return (
      <div id="practitionersPage">
        <VerticalCanvas>
          <GlassCard height='auto'>
            <CardTitle
              title="Practitioners"
            />
            <CardText>
              <Tabs id="practitionersPageTabs" default value={this.data.tabIndex} onChange={this.handleTabChange} initialSelectedIndex={1} style={{borderRight: 'none'}} >
                <Tab className="newPractitionerTab" label='New' style={this.data.style.tab} onActive={ this.onNewTab } value={0} >
                  <PractitionerDetail id='newPractitioner' />
                </Tab>
                <Tab className="practitionerListTab" label='Practitioners' onActive={this.handleActive} style={this.data.style.tab} value={1}>
                  <PractitionerTable showBarcodes={false} />
                 </Tab>
                 <Tab className="practitionerDetailsTab" label='Detail' onActive={this.handleActive} style={this.data.style.tab} value={2}>
                  <PractitionerDetail id='practitionerDetails' />
                </Tab>
              </Tabs>
            </CardText>
            <BottomNavigation selectedIndex={this.data.selectedIndex}>
              <BottomNavigationItem
                label="Recents"
                icon={recentsIcon}
                onTouchTap={this.select(0)}
              />
              <BottomNavigationItem
                label="Favorites"
                icon={favoritesIcon}
                onTouchTap={this.select(1)}
              />
              <BottomNavigationItem
                label="Nearby"
                icon={nearbyIcon}
                onTouchTap={this.select(2)}
              />
            </BottomNavigation>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}


PractitionersPage.propTypes = {
  hasUser: React.PropTypes.object
};
ReactMixin(PractitionersPage.prototype, ReactMeteorData);
