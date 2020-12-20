import React from "react";
import CIcon from "@coreui/icons-react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import usersData from "./UsersData";
import PropTypes from "prop-types";

class User extends React.Component {
  render() {
    return (
      <Map google={this.props.google} zoom={14}>
        <Marker onClick={this.onMarkerClick} name={"Current location"} />

        <InfoWindow onClose={this.onInfoWindowClose}>
          <div>{/* <h1>{this.state.selectedPlace.name}</h1> */}</div>
        </InfoWindow>
      </Map>
    );
  }
}

User.propTypes = {
  google: PropTypes.object,
};

export default GoogleApiWrapper({
  apiKey: "YOUR_GOOGLE_API_KEY_GOES_HERE",
})(User);
