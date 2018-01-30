import {
  NativeModules,
  Platform
} from 'react-native';

requestCode = 0;

async function signWithApp(form) {
  if (Platform.OS === 'ios') {
    console.warn('iOS is not supported.');
    return null;
  }

  const { StartActivity } = NativeModules;
  const action = "com.ixosign.SIGN";
  const componentName = await StartActivity.resolveActivity(action);
  if (!componentName) {
    // TODO: send link to app store?
    console.warn("Cannot resolve signing activity. Did you install the signing app?");
    return null;
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

export default sign;
