import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FoldingCard from './FoldingCard';

class MainApp extends Component {
  state = {
    folded: true,
  };

  toggleFolding = () => {
    this.setState({
      folded: !this.state.folded,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.toggleFolding} style={styles.btn}>
          <Text>Run animation</Text>
        </TouchableOpacity>

        <FoldingCard folded={this.state.folded}>
          <Text style={styles.text}>This is the content of the card!!</Text>
        </FoldingCard>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 10,
    paddingTop: 50,
  },
  btn: {
    backgroundColor: '#e74c3c',
    width: 150,
    borderRadius: 3,
    padding: 10,
    marginBottom: 10,
  },
  text: {
    color: '#e74c3c',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default MainApp;
