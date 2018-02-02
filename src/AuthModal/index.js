import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Button
} from 'react-native';

import FingerprintScanner from 'react-native-fingerprint-scanner';
import Modal from 'react-native-modal';
import FingerprintPopup from './FingerprintPopup';

const PropTypes = require('prop-types');

class AuthModal extends Component<{}> {

  static propTypes = {
    onCancel: PropTypes.func,
    onSuccess: PropTypes.func,
    preferFingerprint: PropTypes.bool,
  }

  static defaultProps = {
    preferFingerprint: true
  }

  state = {
    busy: true,
    fingerprintReady: false,
    useFingerprint: false,
  }

  constructor() {
    super();
    this._onCancel = this._onCancel.bind(this);
  }

  async componentWillMount() {
    try {
      const isAvailable = await FingerprintScanner.isSensorAvailable();
      this.setState({ 
        fingerprintReady: isAvailable,
        useFingerprint: this.props.preferFingerprint && isAvailable
      });
    } finally {
      this.setState({ busy: false });
    }      
  }

  render() {
    return (
      <Modal isVisible={true}>
        {this._renderAuth()}
      </Modal>
    );
  }

  _onCancel() {
    this.props.onCancel && this.props.onCancel();
  }

  _renderAuth() {
    if (this.state.busy) {
      return <View/>;
    }

    if (this.state.useFingerprint) {
      return (
        <FingerprintPopup
          onSuccess={this.props.onSuccess}
          onCancel={() => this.setState({useFingerprint: false})}
        />
      );
    }

    let fingerprintButton;
    if (this.state.fingerprintReady) {
      fingerprintButton = (
        <Button
          title='Use Fingerprint'
          onPress={() => this.setState({useFingerprint: true})} 
        />
      );
    }
    return (
      <View>
        {fingerprintButton}
        <Button
          title='Cancel'
          onPress={this._onCancel}
        />
      </View>
    )
  }
}

export default AuthModal;
