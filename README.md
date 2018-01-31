# IXO Mobile App

This app is built with [React Native](https://github.com/facebook/react-native).

## Getting Started

### System Requirements

Install the following prerequisites:

- [Node LTS](https://nodejs.org/) (currently 8.9.4)
- NPM v5.5.1
- [Android Studio](https://developer.android.com/studio)

Install the React Native CLI:

```
npm i -g react-native-cli
```

### Running the app

Clone the repository:

```
git clone https://github.com/ixofoundation/ixo-mobile
```

In the cloned repo directory, run NPM install:

```
npm i
```

NPM install will generate a `shim.js` file, as well as patch up some Node dependencies from [`ixo-module`](https://github.com/ixofoundation/ixo-module) to work with React Native.

Start an Android emulator or connect a device. Start the app.

```
react-native run-android
```
