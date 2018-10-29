/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Text, Button, Image, PanResponder, Animated, StyleSheet, View } from 'react-native';
import AnimatedImageButton from './components/Button';
import Icon from 'react-native-ionicons';
import Swiper from 'react-native-deck-swiper';
const d1 = require('./d1.png');
const d2 = require('./d2.png');

export default class App extends Component {
  state = {
    pan: new Animated.ValueXY(),
    scale: new Animated.Value(1),
    btnScale: new Animated.Value(1),
    imageURI: d1
  }
  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
  
      onPanResponderGrant: (e, gestureState) => {
        this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
        this.state.pan.setValue({x: 0, y: 0});
        Animated.spring(
          this.state.scale,
          { toValue: 1.1, friction: 3 }
        ).start();
      },
  
      onPanResponderMove: Animated.event([
        null, {dx: this.state.pan.x, dy: this.state.pan.y},
      ]),
  
      onPanResponderRelease: (e, {vx, vy}) => {
        this.state.pan.flattenOffset();
        Animated.spring(
          this.state.scale,
          { toValue: 1, friction: 3 }
        ).start();
      }
    });
  }
  render() {
    // Destructure the value of pan from the state
    let { btnScale, pan, scale } = this.state;
    let rotate = '0deg';
    // Calculate the x and y transform from the pan value
    let [translateX, translateY] = [pan.x, pan.y];
    let imageStyle = {transform: [{translateX}, {translateY}, {rotate}, {scale}]};
    let btnStyle = {transform: [{translateX: 0}, {translateY: 0}, {rotate}, {btnScale}]};
    return (
      <View style={styles.container}>
        {/* <Animated.View style={imageStyle} {...this._panResponder.panHandlers}>
          <View style={{ width: 100, height: 100, backgroundColor: 'gray', borderRadius: 6 }}>
          </View>
        </Animated.View> */}
        {/* <AnimatedImageButton 
          onchange={(status) => console.log(status)}
          state1={ () => 
            // <Image source={d1} style={{ width: 40, height: 40 }} resizeMode="contain" /> 
            <Icon size={45} name="heart-empty" />
          }
          state2={ () => 
            // <Image source={d2} style={{ width: 40, height: 40 }} resizeMode="contain" /> 
            <Icon size={45} name="heart" style={{ color: 'red' }} />
          }
        />
        <AnimatedImageButton 
          onchange={(status) => console.log(status)}
          state1={ () => 
            // <Image source={d1} style={{ width: 40, height: 40 }} resizeMode="contain" /> 
            <Icon size={45} name="bluetooth" />
          }
          state2={ () => 
            // <Image source={d2} style={{ width: 40, height: 40 }} resizeMode="contain" /> 
            <Icon size={45} name="bluetooth" style={{ color: 'blue' }} />
          }
        />
        <AnimatedImageButton 
          onchange={(status) => console.log(status)}
          state1={ () => 
            // <Image source={d1} style={{ width: 40, height: 40 }} resizeMode="contain" /> 
            <Icon size={45} name="mic-off" />
          }
          state2={ () => 
            // <Image source={d2} style={{ width: 40, height: 40 }} resizeMode="contain" /> 
            <Icon size={45} name="mic" style={{ color: 'gray' }} />
          }
        />
        <AnimatedImageButton
          onchange={(status) => console.log(status)}
          state1={ () => 
            // <Image source={d1} style={{ width: 40, height: 40 }} resizeMode="contain" /> 
            <Icon size={45} name="bookmark" />
          }
          state2={ () => 
            // <Image source={d2} style={{ width: 40, height: 40 }} resizeMode="contain" /> 
            <Icon size={45} name="bookmark" style={{ color: 'yellow' }} />
          }
        /> */}
        <Swiper
            cards={["There is one truth to life", "The answer to all the mysteries", "And that is", "Meetesh is DOPE"]}
            renderCard={(card) => {
                return (
                    <View style={styles.card}>
                      <Text style={{ fontSize: 25, textAlign: 'center', marginBottom: 20 }}>
                        {card}
                      </Text>
                      {card.includes("Meetesh") &&
                        <AnimatedImageButton
                          onchange={(status) => console.log(status)}
                          state1={ () => 
                            // <Image source={d1} style={{ width: 40, height: 40 }} resizeMode="contain" /> 
                            <Icon size={45} name="heart-empty" />
                          }
                          state2={ () => 
                            // <Image source={d2} style={{ width: 40, height: 40 }} resizeMode="contain" /> 
                            <Icon size={45} name="heart" style={{ color: 'red' }} />
                          }
                        />
                      }
                    </View>
                )
            }}
            onSwiped={(cardIndex) => {console.log(cardIndex)}}
            onSwipedAll={() => {console.log('onSwipedAll')}}
            cardIndex={0}
            backgroundColor={'#4FD0E9'}
            stackSize= {3}>
            
        </Swiper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: "white"
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  }
});
