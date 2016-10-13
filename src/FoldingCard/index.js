import React, { Component, PropTypes } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

class FoldingCard extends Component {
  static propTypes = {
    folded: PropTypes.bool,
    duration: PropTypes.number,
  };

  static defaultProps = {
    duration: 1000,
  };

  state = {
    hideCard1: false,
    hideCard2: true,
  };

  componentWillMount() {
    this.animatedValue1 = new Animated.Value(0);
    this.animatedValue2 = new Animated.Value(0);

    this.animatedValue1.addListener(({value}) => {
      if (value === 1) {
        this.setState({
          hideCard1: true,
          hideCard2: false,
        });
      }
    });

    this.animatedValue2.addListener(({value}) => {
      if (value === 0) {
        this.setState({
          hideCard1: false,
          hideCard2: true,
        });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.folded) {
      this.startFoldAnimation();
    } else {
      this.startUnfoldAnimation();
    }
  }

  startUnfoldAnimation = () => {
    const { duration } = this.props;

    this.animatedValue1.setValue(0);
    Animated.sequence([
      Animated.timing(this.animatedValue1, {
        toValue: 1,
        duration: duration/2,
      }),
      Animated.timing(this.animatedValue2, {
        toValue: 1,
        duration: duration/2,
      }),
    ]).start();
  }

  startFoldAnimation = () => {
    const { duration } = this.props;

    this.animatedValue1.setValue(1);
    Animated.sequence([
      Animated.timing(this.animatedValue2, {
        toValue: 0,
        duration: duration/2,
      }),
      Animated.timing(this.animatedValue1, {
        toValue: 0,
        duration: duration/2,
      }),
    ]).start();
  }

  render() {
    const { children } = this.props;
    const animation1 = {
      opacity: this.state.hideCard1 ? 0 : 1,
      transform: [
        { perspective: -2000 },
        { translateY: this.animatedValue1.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 80],
          })
        },
        { rotateX: this.animatedValue1.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '90deg'],
          })
        },
      ],
    };
    const animation2 = {
      opacity: this.state.hideCard2 ? 0 : 1,
      transform: [
        { perspective: -2000 },
        { translateY: this.animatedValue2.interpolate({
            inputRange: [0, 1],
            outputRange: [-70, 0],
          })
        },
        { rotateX: this.animatedValue2.interpolate({
            inputRange: [0, 1],
            outputRange: ['-80deg', '0deg'],
          })
        },
      ],
    };

    return (
      <View style={styles.main}>
        <Animated.View
          ref="card1"
          style={[
            styles.folded,
            animation1,
          ]}
        />
        <Animated.View
          ref="card2"
          style={[
            styles.folded,
            styles.internal,
            animation2
          ]}
        >
          {children}
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: '#fff',
    height: 150,
  },
  internal: {
    backgroundColor: '#fff',
  },
  folded: {
    backgroundColor: '#ecf0f1',
    height: 150,
    transform: [
      { perspective: -2000 },
      { translateY: 80 },
      { rotateX: '90deg' },
    ],
  },
});

export default FoldingCard;
