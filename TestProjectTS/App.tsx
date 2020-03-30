/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { Component, ComponentProps } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  AppState,
  CameraRoll,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// import MapboxGL from '@react-native-mapbox-gl/maps';

// MapboxGL.setAccessToken('pk.eyJ1IjoiaXZhbnlhdm9yaW4iLCJhIjoiY2s2MG9uN28xMDlnejNqbG9na25qdG82dCJ9.8zu4rjJ4HupNnNmKuIz7Yg')

//using react-native-maps (Apple maps for iOS)
import MapView, { Circle, Marker, LatLng, Callout, CalloutSubview, Camera } from 'react-native-maps';

declare var global: { HermesInternal: null | {} };

// function getDataJson():any {
//   return require('chicago-parks.geojson');
// }


const markerCoordinates: LatLng = {
  latitude: 50.4429101,
  longitude: 30.4419941
}

const { height, width } = Dimensions.get('window');

type AppState = {
  radius: number;
}

type AppProps = {

}

class App extends Component<AppProps, AppState> {

  mapView?: MapView | null;

  state: AppState = {
    radius: 100,
  }

  // constructor(props:AppProps) {
  //   super(props);

  // }

  componentDidMount() {

    setTimeout(() => {
      this.mapView?.getCamera()
        .then((camera) => {
          console.log(`Camera\n Altitude: ${camera.altitude}, Zoom: ${camera.zoom}`)

          let aCamera: Camera = {
            heading: 0.0,
            center: markerCoordinates,
            pitch: 35, //tilt the camera north outside
            altitude: 2150, //arbitrary 
            zoom: camera.zoom
          }

          this.mapView?.animateCamera(aCamera, { duration: 2000 });
        })
        .catch((reason) => {
          console.log(` Exception while getting Camera: ${reason.description}`);
        })
    }
      , 1000);

  }

  render() {
    const circleCenter: LatLng = { latitude: 64.165329, longitude: 48.844287 };

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={{ backgroundColor: 'lightgray', alignItems: "center" }}>
            <Text>some text</Text>
            <MapView
              ref={ref => this.mapView = ref}
              style={{ width: width, height: height - 50 }}
              maxZoomLevel={18}
              minZoomLevel={3}

              initialRegion={{
                latitude: 50.3993511,
                longitude: 30.6497879,
                latitudeDelta: 0.5,
                longitudeDelta: 0.5,
              }}

              onMapReady={() => {
                this.mapView?.getCamera()
                  .then((camera) => {
                    console.log(`-- onMapReady.getCamera: \n Altitude: ${camera.altitude},\n Zoom: ${camera.zoom} \n`)
                  });

                this.mapView?.getMapBoundaries()
                  .then((boundaries => {
                    console.log(`-- onMapReady.getMapBoundaries: \n northEast: ${boundaries.northEast.latitude}, ${boundaries.northEast.longitude}, 
                                              \n southWest:${boundaries.southWest.latitude}, ${boundaries.southWest.longitude}\n`)
                  }));
              }
              }

              onRegionChangeComplete={(change) => {
                console.log(`onRegionChangeComplete: ${change.latitudeDelta}, ${change.longitudeDelta}`)
                this.mapView?.getCamera()
                  .then((camera) => {
                    // console.log(`onRegionChangeComplete.getCamera:\n New Heading: ${camera.heading}`)
                    // console.log(`onRegionChangeComplete.getCamera:\n New\n Altitude: ${camera.altitude}, Zoom: ${camera.zoom}`)
                    console.log(`onRegionChangeComplete.getCamera:\n New\n pitch: ${camera.pitch}, Zoom: ${camera.zoom}`)
                  })



                let result = Math.round(((change.longitudeDelta + change.latitudeDelta)) * 1000)
                console.log(`Circle radius: ${result}`);
                this.setState({
                  radius: result,
                })
              }
              }
            >

              <Marker coordinate={{ latitude: 50.4429101, longitude: 30.4419941 }}
                onPress={(event) => {
                  (event)
                  console.log('marker pressed');
                  this.mapView?.fitToCoordinates(
                    [markerCoordinates],
                    {
                      edgePadding: { top: 0, left: 0, bottom: 0, right: 0 },
                      animated: true
                    }
                  )
                }}
                onCalloutPress={(evt) => {
                  (evt)
                  console.log('Callout pressed');
                }}
                title={'Very Well Cafe'}
                description={'Test callout view'}
                onDeselect={() => {
                  console.log('Deselected')
                }}
              />

              <Circle
                key={'aCircle_1'}
                center={markerCoordinates} //{circleCenter} //50.4478816,30.4558811
                radius={this.state.radius || 20}
                strokeWidth={1}
                strokeColor='purple'
                fillColor='rgba(120, 110, 160, 0.5)'
                onPress={(mapEvent) => {

                }}
                zIndex={1000}
              >
              </Circle>


              
            </MapView>
          </View>
        </SafeAreaView>
      </>
    );
  }

};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;


/*
 <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.tsx</Text> to change
                this screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
*/

/*
region={{
                  latitude: 37.78825,
                  longitude: -122.4324,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
                }}
*/