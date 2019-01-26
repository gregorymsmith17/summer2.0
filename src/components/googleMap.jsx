
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
  render() {
    return (
      <Map google={this.props.google} zoom={14}>


      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (AIzaSyAqe1Z8I94AcnNb3VsOam1tnUd_8WdubV4)
})(MapContainer)
