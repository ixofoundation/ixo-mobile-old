import React, { Component } from 'react';

import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes,
} from 'react-native';

import FingerprintScanner from 'react-native-fingerprint-scanner';

const PropTypes = require('prop-types');

class FingerprintPopup extends Component {

  static propTypes = {
    description: PropTypes.string,
    onCancel: PropTypes.func,
    onSuccess: PropTypes.func,
    style: ViewPropTypes.style
  }

  static defaultProps = {
    description: 'Scan your fingerprint on the\ndevice scanner to continue'
  }

  state = {
    errorMessage: undefined
  }

  constructor(props) {
    super(props);
    
    this.state = { 
      errorMessage: undefined 
    };

    this._onCancel = this._onCancel.bind(this);
    this._onSuccess = this._onSuccess.bind(this);
  }

  componentDidMount() {
    FingerprintScanner
      .authenticate({ onAttempt: this.handleAuthenticationAttempted })
      .then(this._onSuccess)
      .catch((error) => {
        this.setState({ errorMessage: error.message });
      });
  }

  componentWillUnmount() {
    FingerprintScanner.release();
  }

  handleAuthenticationAttempted = (error) => {
    this.setState({ errorMessage: error.message });
  };

  _onCancel() {
    this.props.onCancel && this.props.onCancel();
  }

  _onSuccess() {
    this.props.onSuccess && this.props.onSuccess();
  }

  render() {
    const { errorMessage } = this.state;
    const { style } = this.props;

    return (
      <View style={[styles.contentContainer, style]}>

        <Image
          style={styles.logo}
          source={require('./assets/finger_print.png')}
        />

        <Text style={styles.heading}>
          Fingerprint{'\n'}Authentication
        </Text>
        <Text
          style={styles.description(!!errorMessage)}>
          {errorMessage || this.props.description}
        </Text>

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this._onCancel}
        >
          <Text style={styles.buttonText}>
            Cancel
          </Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = {
  contentContainer: {
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    marginVertical: 45,
  },
  heading: {
    textAlign: 'center',
    color: '#00a4de',
    fontSize: 21,
  },
  description: (error) => ({
    textAlign: 'center',
    color: error ? '#ea3d13' : '#a5a5a5',
    height: 65,
    fontSize: 18,
    marginVertical: 10,
    marginHorizontal: 20,
  }),
  buttonContainer: {
    padding: 20,
  },
  buttonText: {
    color: '#8fbc5a',
    fontSize: 15,
    fontWeight: 'bold',
  },
};

export default FingerprintPopup;
