import React, { Component } from 'react';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FacesDetected from './components/FacesDetected/FacesDetected';
import './App.css';

const app = new Clarifai.App({
  apiKey: '53e92cd83bf34c8eaeecad285511964f'
 });


class App extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      imageUrl: '',
      boxes: [],
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        joined: ''
    }
  }
}

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocations = (apiData) => {
    const regions = apiData.outputs[0].data.regions;
    if (regions === undefined) {
      // no faces found
      return [];
    }

    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    const faceLocations = regions.map(region => {
      const box = region.region_info.bounding_box;
      return {
        // calculate distance to borders of the image
        top: box.top_row * height,
        left: box.left_col * width,
        bottom: height - (box.bottom_row * height),
        right: width - (box.right_col * width)
      };
    });
    return faceLocations;
  }

  displayFaceBox = (boxes) => {
    console.log(boxes.length);
    this.setState({boxes: boxes});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onPictureSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
    .then(response =>
      this.displayFaceBox(this.calculateFaceLocations(response)))
    .catch(err => console.log(err));
  }

 onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const {isSignedIn,route} = this.state;
    return (
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
          ? <div>
              <Logo />
              <ImageLinkForm 
               onInputChange={this.onInputChange} 
               onPictureSubmit={this.onPictureSubmit}
              />
              <FacesDetected numFaces={this.state.boxes.length}/>
              <FaceRecognition boxes={this.state.boxes} imageUrl={this.state.imageUrl}/>
            </div>
          : (
             route === 'signin'
             ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
             : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
        </div>    
    );
  }
}

export default App;