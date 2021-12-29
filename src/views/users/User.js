import React, { useState,useEffect } from "react";
import { Modal, Button, Form , Accordion, Card, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import usersData from "./UsersData";
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
import "./MapViewerComp.css";
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

import {
  Map,
  TileLayer,
  Marker,
  Popup,
  FeatureGroup,
  Circle,
} from "react-leaflet";
import L, { map } from "leaflet";
import { EditControl } from "./src";
// import { EditControl } from "react-leaflet-draw";
import { Tabs } from "antd";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Users from "./Users";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { optionsSupported } from "dom-helpers/cjs/addEventListener";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
// import { concat } from "core-js/core/array";
// import Form from "antd/lib/form/Form";

const { TabPane } = Tabs;


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
const rows = [
    "Constraction",
    "0212",
    "7:30",
    "4:50",
    "Addis Ababa",
    "x6t25H3",
    "03/05/20",
    "4:30"
  ]



const AnyReactComponent = ({ text }) => <div>{text}</div>;

function GetIcon(icon) {
  return L.icon({
    // iconUrl: require("../../assets/icons/logo.jpg"),
    iconUrl: require("./src/akil.jpg"),
    iconSize: icon,
  });
}

// const akile_icon = GetIcon(30) 

// function setMarkers(){
//   var akile_pointer = L.icon({
//     iconUrl: require("./src/akil.jpg"),

//     iconSize:     [38, 95], 
//     iconAnchor:   [22, 94], 
//     shadowAnchor: [4, 62],  
//     popupAnchor:  [-3, -76] 
// });
//   return L.marker([51.5, -0.09], {icon: akile_pointer}).addTo(Map);

// }

// var akile_pointer = L.icon({
//   iconUrl: require("./src/akil.jpg"),

//   iconSize:     [38, 95], 
//   iconAnchor:   [22, 94], 
//   shadowAnchor: [4, 62],  
//   popupAnchor:  [-3, -76] 
// });

// const akile_markers = L.marker([51.5, -0.09], {icon: akile_pointer}).addTo()

var Name = [];
var Location = [];
var Location_Name = [];
var Sitemanager = [];
var Paint_Area = [];
var Starts = [];
var Ends = [];
var Sanding_Material = [];
var Painting_Material = [];
var Conctact_Person = [];
var Information = [];
var latitude = [];
var longitude = [];
var count = 0;
var namerows = [];
var staffnames = ["Berekert Haile","Nardos Ephrem",
"Mulualem Tesfaye","Ismael","Asnakech Tesfaye","Gebiru",
"Atsede","Zenebe","Hirut Fanta","Abayneh"];
const otherEmps = [];

var database_siteName=[];
var database_location=[];
var database_latitude=[];
var database_longitude=[];
var database_sitemanager=[];
var database_paintarea=[];
var  site_id;
var userID;
var siteChoice;

var sites = [];
const url = 'http://localhost:9000/api/v1/sites/'
export default function User() {
  const [mapLayers, setMapLayer] = useState([]);
  const [showModal, setShow] = useState(false);
  const [showModal2, setShow2] = useState(false);
  const [fullscreen, setFullscreen] = useState(true);
  const [site,setSites] = useState([])
  const [sitemanager,setSiteManager] = useState([])
  const [startDate,setStartDate] = useState(new Date());
  const [endDate,setEndDate] = useState(new Date());
  const [openUpdateModal,setOpenUpdateModal] = useState(false);
  const [allEmployees,setallEmployees] = useState([]);
  const[assignConfermation,setAssignConfermation] = useState(false)
  
  
  // const getUsers = ()=>{
  //   axios.get(url).then((response)=>{
  //     const user_info = response.data;
  //     const {users} = user_info
  //     console.log(user_info)
  //     setStaffNames(users)
  //   })
  // }

  //   useEffect(async ()=>{
  
  //   getUsers();
   
  // },[]);

//   var akile_marker= L.Icon.extend({
//     options: {
//         shadowUrl: null,
//         iconAnchor: new L.Point(12, 12),
//         iconSize: new L.Point(24, 24),
//         iconUrl: require("./src/akil.jpg")
//     }
// });



// function drawControl(layer) {
//   return L.Control.Draw({
//     // iconUrl: require("../../assets/icons/logo.jpg"),
//     draw : {
//       position : 'topleft',
//       polygon : {
//         shapeOptions: {
//           color: 'red'
//         }
//       },
//       marker: {
//         icon: new akile_marker() //Here assign your custom marker
//       },
//       polyline : false,
//       rectangle : {
//         shapeOptions: {
//           color: 'blue'
//         }
//       },
//       circle : false
//     },
//     edit: {
//       featureGroup: layer, //REQUIRED!!
//       remove: true
//     }
//   });
// }










  const mapopener = () => {
    setShow2(true);


  };

  const backmodule = () => {
    setShow2(false);


  };

  const pinlocation = (location) => {
    console.log("Location:",location)
    Location = location
    latitude = latitude.concat(location.lat)
    longitude = longitude.concat(location.lng)
    return location 
    // setShow(false);

  };
  
  const closemap = (event) => {

    setShow2(false);
    

  };

  const handleSiteChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    Name = value
   
  };
  const handleLocationChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    Location_Name = value
    
  };
  
  const handleManagerChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    Sitemanager = value
  };


  const handlePaintChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    Paint_Area = value
  };

    const handleLongtudeChange = (event) =>{
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    longitude = value
  }
    const handleLatitudeChange = (event) =>{
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    latitude = value
  }

    const handleSiteSubmit = ()=>{
      var name = Name;
      var Latitude = latitude;
      var Longitude = longitude;
      var sitemanager = Sitemanager
      var area = area; //this needs to be checked!!!!
      var loc = Location;



      const Site = {
        _id:"",
        sitename:name,
        location:Location_Name,
        latitude:Latitude,
        longitude:Longitude,
        sitemanager:sitemanager,
        paintarea:Paint_Area
      }
      console.log(Site);
        axios
    .post('http://localhost:9000/api/v1/sites/addsite', Site)
    .then(() => console.log('Site Created',Site))
    .catch(err => {
      console.error("The Error:",err);
    });
      addsiteinformation()
  }


  const assignmodule = (event) => {
    // disable assign Button
    // disable dropdown options
    // send assignment to user
  }
  const changemodule = (event) => {
    // enable assign Button
    // enable dropdown options
    // unsend assignment to user

  }


  const addsiteinformation = (event) => {
    count  = count + 1;
    namerows = namerows.concat(Name);
    sites = sites.concat(Name);

    Information = Information.concat(createData(Name,Location_Name,longitude,latitude,Sitemanager,Paint_Area));
    
    closeModal()

  };

  const MakeItem  = (X) => {
    return <option>{X}</option>;
  };
  




  const createData = (
    site_name,
    location,
    longitude,
    latitude,
    manager,
    paint_area,
  ) => {
    return {
      site_name,
      location,
      longitude,
      latitude,
      manager,
      paint_area,
    };
  };
  


  

  const addSiteModal = () => setShow(true);
  const closeModal = () => setShow(false);
  const closeModal2 = () => setShow(false);
  const _onCreate = (e) => {

    

    console.log(e, "onCreate");

    const { layerType, layer } = e;



    if (layerType === "marker") {
      const { _leaflet_id } = layer;
      const { _latlng } = layer;
      
      

      setMapLayer((layer) => [...layer, { id: _leaflet_id, latlng: _latlng }]);
      pinlocation(_latlng)
      console.log(layer, "layersss", mapLayers);
    }
  };

  const _onEditPath = (e) => {
    console.log(e, "edit path");
    let numEdited = 0;
    e.layers.eachLayer((layer) => {
      numEdited += 1;
    });
    console.log(`_onEdited: edited ${numEdited} layers`, e);
  };

  const _onDeleted = (e) => {
    console.log(e, "deleted");

    let numDeleted = 0;
    e.layers.eachLayer((layer) => {
      numDeleted += 1;
    });
    console.log(`onDeleted: removed ${numDeleted} layers`, e);
  };

  const getSites = ()=>{
    axios.get(url).then((response)=>{
      const sites_info = response.data;
      const {sites} = sites_info
      setSites(sites)
      var counter =0;
      if(sites.length !== 0){
        var length = site.length;
        sites.forEach(element => {
          database_siteName[counter]=(element.sitename);
          database_location[counter]=(element.location);
          database_longitude[counter]=(element.latitude);
          database_latitude[counter]=(element.longitude);
          database_sitemanager[counter]=(element.sitemanager);
          database_paintarea[counter]=(element.paintarea);

          counter++;
          




        });

        
      }
      

    }).catch((err)=>{
        console.log(err,'Api error')
    })
  }
const getSiteManagers = ()=>{
const users = axios.get('http://localhost:9000/api/v1/users/').then((response)=>{
  const user_info = response.data;
  const {users} = user_info;
  const sitemanagers =users.filter(manager => manager.position === 'Site Manager' || manager.position === 'Project Manager');
  const otherEmps =users.filter(manager => manager.position === 'Painter' || manager.position === 'PMP');
  setallEmployees(otherEmps);
  console.log("management",sitemanagers)
  setSiteManager(sitemanagers);
}).catch((err)=>{
  console.log(err);
})
}



//delete-sites/
const removeSite =  (id)=>{
  var site_id = id;
  axios.delete('http://localhost:9000/api/v1/sites/delete-sites/'+id);
  setSites(site.filter(sid => sid.id !== site_id));
  console.log("operation successfull");
}
const handleCloseUpdatemodal = () =>{
  setOpenUpdateModal(false);
}
//update-sites /update-sites/:id
const updateSites = ()=>{
       var name = Name;
      var Latitude = latitude;
      var Longitude = longitude;
      var sitemanager = Sitemanager
      var area = area; //this needs to be checked!!!!
      var loc = Location;



      const Site = {
        sitename:name,
        location:Location_Name,
        latitude:Latitude,
        longitude:Longitude,
        sitemanager:sitemanager,
        paintarea:Paint_Area
      }
  axios.put('http://localhost:9000/api/v1/sites/update-sites/'+site_id,Site);
  handleCloseUpdatemodal();
  
}
function assignSites(){
  const Site = {
    workingSite:siteChoice

  }
    axios.put('http://localhost:9000/api/v1/users/assign-sites/'+userID,Site);
    setAssignConfermation(false)

}

 

useEffect(()=>{
  getSites();
  
},[site])

useEffect(()=>{
  getSiteManagers();
  
},[])



const handleOpenUpdateModal = (id) =>{
  setOpenUpdateModal(true);
}
  


  return (
    
    <>
    
      <Tabs defaultActiveKey="2">
        <TabPane tab="Sites" key="1">
         
          <Button
            color="primary"
            onClick={addSiteModal}
            style={{ float: "right", marginBottom: "2%", marginRight: "1%" }}
          >
          Add{""}
          </Button>

          <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Site Name</StyledTableCell>
                <StyledTableCell>Location</StyledTableCell>
                <StyledTableCell>Latitude</StyledTableCell>
                <StyledTableCell>Longitude</StyledTableCell>
                <StyledTableCell>Site Manager</StyledTableCell>
                <StyledTableCell>Paint Area</StyledTableCell>
                {/* <StyledTableCell>Starts</StyledTableCell>
                <StyledTableCell>Ends</StyledTableCell>
                <StyledTableCell>Sanding Material</StyledTableCell>
                <StyledTableCell>Painting Material</StyledTableCell>
                <StyledTableCell align="right">
                  Contact Person
                </StyledTableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {site.map((krow,idx) => (
                <StyledTableRow krow={krow} key={krow.rowcount}>
                  <StyledTableCell component="th" scope="row">{krow.sitename}</StyledTableCell>
                  <StyledTableCell>{krow.location}</StyledTableCell>
                  <StyledTableCell>{krow.latitude}</StyledTableCell>
                  <StyledTableCell>{krow.longitude}</StyledTableCell>
                  <StyledTableCell>{krow.sitemanager}</StyledTableCell>
                  <StyledTableCell>{krow.paintarea}</StyledTableCell>
                  {/* <StyledTableCell>{Information.starts}</StyledTableCell>
                  <StyledTableCell>{Information.ends}</StyledTableCell> */}
                  {/* <StyledTableCell>{row.sanding_material}</StyledTableCell>
                  <StyledTableCell>{row.painting_area}</StyledTableCell>
                  <StyledTableCell align="right">{row.contact_person}</StyledTableCell> */}
                   <StyledTableCell component="th" scope="row" >
                    <Button color="secondary" onClick={()=>{setOpenUpdateModal(true)
                            site_id = krow._id;
                            
                    }}>
                    
                      Edit
                    </Button>
                       <Modal show = {openUpdateModal} onHide={closeModal}>
                       <Modal.Title>update site</Modal.Title>
                       <Modal.Body>
                         <Form>
                            <Form.Group>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">Name</InputGroupAddon>

                    <Input onChange={handleSiteChange}  placeholder="Name of Site" />
                  </InputGroup>
                  <br/>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">Location</InputGroupAddon>

                    <Input onChange={handleLocationChange}  placeholder="Location of Site" />

                    <Button
                    color="primary"
                    onClick={mapopener}
                    // style={{ float: "right", marginBottom: "2%" }}
                    >
                    Pin on Map{" "}
                    </Button>
                

                  </InputGroup>
                  <br/>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">Latitude</InputGroupAddon>
                    <Input placeholder = {Location.lat} onChange={handleLatitudeChange} />
                    <InputGroupAddon addonType="prepend">Longitude</InputGroupAddon>
                    <Input placeholder = {Location.lng}  onChange={handleLongtudeChange}/>
                  </InputGroup>
                </Form.Group>
                <br/>
                 <Form.Group>
                  {/* <Label for="exampleEmail">Position</Label> */}
                  <InputGroup>
                    {/* <Label for="exampleEmail">Age</Label> */}

                    <InputGroupAddon addonType="prepend">Site Manager</InputGroupAddon>
                    <Input onChange={handleManagerChange} type="select" name="backdrop" id="backdrop">
                      <option value="">----Select Name----</option>
                      <option value="Nahom Amare">Nahome Amare</option>
                      <option value="Zeynu Nesru">Zeynu Nesru</option>
                      <option value="Getachew Anteneh">Getachew Anteneh</option>
                    </Input>
                  </InputGroup>
                  </Form.Group>
                  <br/>
                  <Form.Group>
                  <InputGroup>
                  <InputGroupAddon addonType="prepend">Paint Area</InputGroupAddon>
                    <Input onChange={handlePaintChange} placeholder="Area in meter-square" />
                  </InputGroup>
                </Form.Group>
                <br/>
                   <Button
                    onClick={handleCloseUpdatemodal}
                    color="primary"
                    style={{ float: "right", marginBottom: "2%" }}
                    >
                    Cancel{" "}
                  </Button>
                  <Button
                    color="primary"
                    onClick={addsiteinformation}
                    onClick={updateSites}
                    style={{ float: "right", marginBottom: "2%" , marginRight: "1%"}}
                    
                    
                    >
                      
                    update{" "}
                  </Button>

                         </Form>
                       </Modal.Body>
                       

                    </Modal>
                  </StyledTableCell>
                  
                  <StyledTableCell align="left">
                    <Button color="secondary" onClick={()=>{removeSite(krow._id)}}>
                      Remove
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>

                
              ))}
            </TableBody>
          </Table>
        </TableContainer>





          <Modal show={showModal} onHide = {closeModal}
          // style={{width: "750px" , margin: "auto"}}
          >
            
            
            <Modal.Header >
              <Modal.Title> Add Sites</Modal.Title>
            </Modal.Header>
            <Modal.Body >
              <Form >
                <Form.Group>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">Name</InputGroupAddon>

                    <Input onChange={handleSiteChange}  placeholder="Name of Site" />
                  </InputGroup>
                  <br/>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">Location</InputGroupAddon>

                    <Input onChange={handleLocationChange}  placeholder="Location of Site" />

                    <Button
                    color="primary"
                    onClick={mapopener}
                    // style={{ float: "right", marginBottom: "2%" }}
                    >
                    Pin on Map{" "}
                    </Button>
                

                  </InputGroup>
                  <br/>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">Latitude</InputGroupAddon>
                    <Input placeholder = {Location.lat} onChange={handleLatitudeChange} />
                    <InputGroupAddon addonType="prepend">Longitude</InputGroupAddon>
                    <Input placeholder = {Location.lng}  onChange={handleLongtudeChange}/>
                  </InputGroup>
                </Form.Group>
                <br/>
                <Form.Group>
                  {/* <Label for="exampleEmail">Position</Label> */}
                  <InputGroup>
                    {/* <Label for="exampleEmail">Age</Label> */}

                    <InputGroupAddon addonType="prepend">Site Manager</InputGroupAddon>
                    <Input onChange={handleManagerChange} type="select" name="backdrop" id="backdrop">
                      <option value="">----Select Name----</option>
                      {sitemanager.map((manager)=>(
                        <option value={manager.name} key={manager.id}>{manager.name}</option>
                      ))}
                      
                      
 
                    </Input>
                  </InputGroup>
                  </Form.Group>
                  <br/>
                  <Form.Group>
                  <InputGroup>
                  <InputGroupAddon addonType="prepend">Paint Area</InputGroupAddon>
                    <Input onChange={handlePaintChange} placeholder="Area in meter-square" />
                  </InputGroup>
                </Form.Group>
                <br/>


                  {/* <Form.Group>
                    <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Paint</Accordion.Header>
                        <Accordion.Body>
                        <div className="radio" >
                          <label>
                            <input
                              type="radio"
                              value="Manual"
                              name="Paint"
                              // checked={this.state.selectedOption === "Manual"}
                              // onChange={this.onValueChange}
                            />
                              Ceiling
                          </label>
                          </div>
                          <div className="radio">
                            <label>
                              <input
                                type="radio"
                                value="Manual"
                                name="Paint"
                                // checked={this.state.selectedOption === "Manual"}
                                // onChange={this.onValueChange}
                              />
                                Wall
                            </label>
                          </div>
                          <div className="radio">
                            <label>
                              <input
                                type="radio"
                                value="Manual"
                                name="Paint"
                                // checked={this.state.selectedOption === "Manual"}
                                // onChange={this.onValueChange}
                              />
                                Beam
                            </label>
                          </div>
                          <div className="radio">
                            <label>
                              <input
                                type="radio"
                                value="Manual"
                                name="Paint"
                                // checked={this.state.selectedOption === "Manual"}
                                // onChange={this.onValueChange}
                              />
                                Column
                            </label>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                      <br/>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Delivering Time</Accordion.Header>
                        <Accordion.Body>
                          <Form.Group>
                            <InputGroup>
                              <InputGroupAddon addonType="prepend">Starts:</InputGroupAddon>
                                <p>
                                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> <br/>
                                </p>
                            </InputGroup>
                            <InputGroup>
                              <InputGroupAddon addonType="prepend">Ends:</InputGroupAddon>
                                <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} /> <br/>
                            </InputGroup>
                          </Form.Group>
                        </Accordion.Body>
                      </Accordion.Item>
                      <br/>
                      <Accordion.Item eventKey="2">
                        <Accordion.Header>Sanding Material</Accordion.Header>
                        <Accordion.Body>
                          <div className="radio">
                            <label>
                              <input
                                type="radio"
                                value="Manual"
                                name="Sanding-Options"
                                // checked={this.state.selectedOption === "Manual"}
                                // onChange={this.onValueChange}
                              />
                                Manual
                            </label>
                          </div>
                          <div className="radio">
                            <label>
                              <input
                                type="radio"
                                value="Sanding Machine"
                                name="Sanding-Options"
                                // checked={this.state.selectedOption === "Sanding Machine"}
                                // onChange={this.onValueChange}
                              />
                                Sanding Machine
                            </label>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                      <br/>
                      <Accordion.Item eventKey="3">
                        <Accordion.Header>Painting Material</Accordion.Header>
                        <Accordion.Body>
                          <div className="radio">
                              <label>
                                <input
                                  type="radio"
                                  value="Manual"
                                  name="Painting Materials"
                                  // checked={this.state.selectedOption === "Manual"}
                                  // onChange={this.onValueChange}
                                />
                                  Spray Machine
                              </label>
                            </div>
                            <div className="radio">
                              <label>
                                <input
                                  type="radio"
                                  value="Sanding Machine"
                                  name="Painting Materials"
                                  // checked={this.state.selectedOption === "Sanding Machine"}
                                  // onChange={this.onValueChange}
                                />
                                  Tool Box
                              </label>
                            </div>
                            <div className="radio">
                              <label>
                                <input
                                  type="radio"
                                  value="Sanding Machine"
                                  name="Painting Materials"
                                  // checked={this.state.selectedOption === "Sanding Machine"}
                                  // onChange={this.onValueChange}
                                />
                                  Jet Roller
                              </label>
                            </div>
                            <div className="radio">
                              <label>
                                <input
                                  type="radio"
                                  value="Sanding Machine"
                                  name="Painting Materials"
                                  // checked={this.state.selectedOption === "Sanding Machine"}
                                  // onChange={this.onValueChange}
                                />
                                  Same Accessories
                              </label>
                            </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </Form.Group> */}
                  <Modal show={showModal2} fullscreen={fullscreen} onHide = {closeModal2}>
                    <Modal.Header >
                      <Modal.Title> Pin on Map</Modal.Title>
                    </Modal.Header>
                      <Modal.Body >
                          <Map
                            center={[8.980603, 38.757759]}
                            zoom={12}
                            scrollWheelZoom={true}
                            className="mapContainer"
                          >
                          <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          />
                            <Marker position={[8.980603, 38.757759]} icon={GetIcon(30)}>
                              <Popup>
                                <p>Akile Main-Office</p>
                                  <FeatureGroup>
                                    <EditControl
                                      position="topleft"
                                      onEdited={_onEditPath}
                                      onCreated={_onCreate}
                                      onDeleted={_onDeleted}
                                      draw={{
                                        rectangle: false,
                                        circle: false,
                                        polyline: false,
                                        polygone: false,
                                      }}
                                  />
                                  <Circle center={[51.51, -0.06]} radius={200} />
                                  </FeatureGroup>
                              </Popup>
                            </Marker>
                          </Map>
                          <pre>{JSON.stringify(mapLayers, 0, 2)}</pre>  
                          <Button
                            color="primary"
                            style={{ float: "right", marginBottom: "2%" }}
                            onClick={backmodule}
                            >
                            Back{" "}
                          </Button>
                          <Button
                            color="primary"
                            style={{ float: "right", marginBottom: "2%", marginRight: "1%"}}
                            onClick={closemap} 
                            >
                            Pin{" "}
                          </Button>                  
                      
                      </Modal.Body>
                  </Modal>            
           



{/* 
                  <Form.Group>
                  <InputGroup>
                  <InputGroupAddon addonType="prepend">Sanding Material:</InputGroupAddon>
                  </InputGroup>
                  </Form.Group>
                  <Form.Group>
                  <InputGroup>
                  <InputGroupAddon addonType="prepend">Painting Material:</InputGroupAddon>
                  </InputGroup>
                  </Form.Group> */}
                  <Button
                    onClick={closeModal}
                    color="primary"
                    style={{ float: "right", marginBottom: "2%" }}
                    >
                    Cancel{" "}
                  </Button>
                  <Button
                    color="primary"
                    onClick={addsiteinformation}
                    onClick={handleSiteSubmit}
                    style={{ float: "right", marginBottom: "2%" , marginRight: "1%"}}
                    
                    
                    >
                      
                    save{" "}
                  </Button>
                  



                  
                
              </Form>

            
              
              </Modal.Body>
          </Modal>
        </TabPane>
        {/* <TabPane tab="Map" key="2">
          <div style={{ height: "82vh", width: "100%" }}>
            <Map
              center={[8.980603, 38.757759]}
              zoom={12}
              scrollWheelZoom={false}
              className="mapContainer"
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[8.980603, 38.757759]} icon={GetIcon(30)}>
                <Popup>
                  <p>Akile Main-Office</p>
                  <FeatureGroup>
                    <EditControl
                      position="topright"
                      onEdited={_onEditPath}
                      onCreated={_onCreate}
                      onDeleted={_onDeleted}
                      draw={{
                        rectangle: false,
                        circle: false,
                        polyline: false,
                        polygone: false,
                      }}
                    />
                    <Circle center={[51.51, -0.06]} radius={200} />
                  </FeatureGroup>
                </Popup>
              </Marker>
            </Map>
            <pre>{JSON.stringify(mapLayers, 0, 2)}</pre>
          </div>
        </TabPane> */}
        <TabPane tab="Assign Site" key="3">
          {/* <div style={{ width: "100%" }}>
            <Users mapData={mapLayers} />
          </div> */}
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Employee Name</StyledTableCell>
                <StyledTableCell>Assignment</StyledTableCell>
              </TableRow>
            </TableHead>
                        <TableBody>
              {allEmployees.map((krow,idy) => (
                <StyledTableRow krow={krow} key={krow.rowcount}>
                  <StyledTableCell component="th" scope="row">{krow.name}</StyledTableCell>
                  <StyledTableCell>  
                    <Input onChange={(e)=>{ siteChoice = e.target.value;}} type="select" name="backdrop" id="backdrop">
                      <option value="">Choose Site</option>
                      {site.map((site,idz) => (    
                      <option value={site.sitename}>{site.sitename}</option>
                      ))}
                    </Input>
                    <Button
                    color="primary"
                    onClick={addsiteinformation}
                    style={{ float: "right", marginTop: "2%" }}
                    >
                    Change
                  </Button>
                  <Button
                    color="primary"
                    onClick={()=>{setAssignConfermation(true);userID=krow._id}}
                    style={{ float: "right", marginTop: "2%" , marginRight: "2%" }}
                    >
                    Assign
                  </Button>
                  <Modal show={assignConfermation} onHide = {closeModal}>
                        <h3>Are You sure You want to assign this Employee</h3>
                        <Button  style={{ float: "right", marginTop: "2%" , marginRight: "2%" }}>Yes</Button>
                        <Button onClick={()=>{setAssignConfermation(false)}} style={{ float: "right", marginTop: "2%" , marginRight: "2%" }}>No</Button>
                  </Modal>
                    
                  </StyledTableCell>  

                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </TabPane>
        <TabPane tab="Information" key="4"></TabPane>
      </Tabs>
    </>
  );
}

