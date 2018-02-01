import {
  NativeModules,
  Platform
} from 'react-native';

requestCode = 0;

async function signWithApp(form) {
  if (Platform.OS === 'ios') {
    throw new Error('iOS is not supported.');
  }

  const { StartActivity } = NativeModules;
  const action = "com.ixosign.SIGN";
  const componentName = await StartActivity.resolveActivity(action);
  if (!componentName) {
    // TODO: send link to app store?
    throw new Error("Cannot resolve signing activity. Did you install the signing app?");
  }

  const response = await StartActivity.startActivityForResult(
    ++requestCode, 
    action,
    { content: form });

  if (response.resultCode !== StartActivity.OK) {
    throw new Error('Invalid result from sign activity.');
  }

  return response.data.content;
};

export default signWithApp;
