import React from 'react';
import { StyleSheet, Text, View, Image, FlatList, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Install expo-linear-gradient if not already installed
import { PanResponder } from 'react-native';

const albumCover = 'https://upload.wikimedia.org/wikipedia/en/4/42/Beatles_-_Abbey_Road.jpg';

const data: Array<ShelfProps> = [
  [
    { name: 'The Beatles', image: albumCover, id: '1' },
    { name: 'The Beatles', image: albumCover, id: '2' },
    { name: 'The Beatles', image: albumCover, id: '3' },
  ],
  [
    { name: 'The Beatles', image: albumCover, id: '4' },
    { name: 'The Beatles', image: albumCover, id: '5' },
    { name: 'The Beatles', image: albumCover, id: '6' },
  ],
  [
    { name: 'The Beatles', image: albumCover, id: '7' },
    { name: 'The Beatles', image: albumCover, id: '8' },
    { name: 'The Beatles', image: albumCover, id: '9' },
  ],
];

function Shelf({ shelf }: { shelf: ShelfProps }) {
  return (
    <View style={styles.shelfContainer} >
      {/* Row of album covers */}
      <View style={styles.row}>
        {shelf.map((item) => (
          <Cover key={item.id} {...item} />
        ))}
      </View>
      {/* Shelf image below the row */}
      <Image source={require('./assets/shelf.jpg')} style={styles.shelf} />
    </View>
  );
}

function Cover(props: albumCoverProps) {
  const panResponder = React.useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) =>
        true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) =>
        true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
      },
      onPanResponderMove: (evt, gestureState) => {
        console.log(gestureState)
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) =>
        true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // Another component has become the responder, so this gesture
        // should be cancelled
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // Returns whether this component should block native components from becoming the JS
        // responder. Returns true by default. Is currently only supported on android.
        return true;
      },
    }),
  ).current;
  return (
    <View style={styles.albumContainer} {...panResponder.panHandlers}>
      <Image source={{ uri: albumCover }} style={styles.albumCover} />
      <Text style={styles.albumText}>The Beatles</Text>
    </View>
  );
}

export default function App() {
  

  return (
    <View style={styles.fullContainer} >
    <ImageBackground
      source={require('./assets/texture-background.jpg')} // Ensure the image is in the correct path
      style={styles.background}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['transparent', 'black']}
        style={styles.gradient}
      />
      <View style={styles.fullContainer}>
        <View style={styles.container}>
          <FlatList
            data={data}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => <Shelf shelf={item} />}
            contentContainerStyle={styles.list}
          />
        </View>
        {/* Record component positioned at the bottom */}
        <Record />
            </View>
    </ImageBackground>
    </View>
  );
}

function Record() {
  return (
    <View style={styles.recordSegment}>
      <Image source={require('./assets/VideoRecord.png')} style={{ width: 150, height: 150 }} />
    </View>
  );
}

type ShelfProps = Array<albumCoverProps>;

type albumCoverProps = {
  name: string;
  image: string;
  id: string;
}
const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  background: {
    flex: 1,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject, // Covers the entire screen
  },
  container: {
    flex: 1, // Takes up all available space above the record
    paddingTop: 50,
  },
  list: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10, // Add spacing between the row and the shelf
    width: '90%',
  },
  albumContainer: {
    alignItems: 'center',
  },
  albumCover: {
    width: 110,
    height: 110,
    borderRadius: 5,
  },
  albumText: {
    marginTop: 5,
    fontSize: 12,
    textAlign: 'center',
    color: 'white', // Ensure text is visible on the dark background
  },
  shelf: {
    width: '100%',
    height: 30,
    resizeMode: 'contain', // Ensure the shelf image scales properly
  },
  shelfContainer: {
    width: '95%',
    flexDirection: 'column',
    alignItems: 'center', // Center the shelf and row
    marginBottom: 20, // Add spacing between shelves
  },
  recordSegment: {
    height: 160, // Fixed height for the record section
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', // Optional: Add a background color for contrast
  },
});