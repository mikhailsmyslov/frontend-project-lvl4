/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { debounce } from 'lodash';

const WithWindowSize = (WrappedComponent) => class extends React.Component {
  static get displayName() { return 'WithWindowSize'; }

  constructor(props) {
    super(props);
    this.state = {
      windowSize: {
        width: window.innerWidth,
        height: window.innerHeight,
        deviceSize: this.getdeviceSizeName(window.innerWidth),
      },
    };
    this.handleWindowResize = debounce(this.updateState, 100);
  }

  componentDidMount() {
    this.updateState();
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount() {
    this.handleWindowResize.cancel();
    window.removeEventListener('resize', this.handleWindowResize);
  }

  getdeviceSizeName = (width) => {
    switch (true) {
      case width < 576:
        return 'xs';
      case width >= 1200:
        return 'xl';
      case width >= 992:
        return 'lg';
      case width >= 768:
        return 'md';
      case width >= 576:
        return 'sm';
      default:
        throw new Error('Window.innerWidth has wrong value or window object is not available.');
    }
  }

  updateState = () => this.setState({
    windowSize: {
      width: window.innerWidth,
      height: window.innerHeight,
      deviceSize: this.getdeviceSizeName(window.innerWidth),
    },
  });

  render() {
    const { windowSize } = this.state;
    return (
      <WrappedComponent {...this.props} windowSize={windowSize} />
    );
  }
};

export default WithWindowSize;
