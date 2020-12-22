import React from "react";
import CIcon from "@coreui/icons-react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import usersData from "./UsersData";
// import * as mapboxgl from "react-mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";
import PropTypes from "prop-types";
import { Tabs } from "antd";

const { TabPane } = Tabs;
// const Map = ReactMapboxGl({
//   accessToken:
//     "pk.eyJ1IjoiZmFicmljOCIsImEiOiJjaWc5aTV1ZzUwMDJwdzJrb2w0dXRmc2d0In0.p6GGlfyV-WksaDV_KdN27A",
// });

class User extends React.Component {
  state = {
    activeTab: "",
  };

  setActiveTab = (tabKey) => {
    this.setState({
      active: tabKey,
    });
  };

  render() {
    return (
      <>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Add Site" key="1">
            {/* <Map
              style="mapbox://styles/mapbox/streets-v9"
              containerStyle={{
                height: "100vh",
                width: "100vw",
              }}
            >
              <Layer
                type="symbol"
                id="marker"
                layout={{ "icon-image": "marker-15" }}
              >
                <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
              </Layer>
            </Map> */}
          </TabPane>
          <TabPane tab="Assign Site" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Inforamtion" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </>
    );
  }
}

User.propTypes = {
  google: PropTypes.object,
};

export default GoogleApiWrapper({
  apiKey: "YOUR_GOOGLE_API_KEY_GOES_HERE",
})(User);
