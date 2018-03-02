import {
  NativeModules,
  Platform
} from 'react-native';

import {Ixo} from 'ixo-module';
import { Promise } from 'es6-promise';

requestCode = 0;


async function signWithApp(formAsString) {
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

  const form = JSON.parse(formAsString);
  const response = await StartActivity.startActivityForResult(
    ++requestCode,
    action,
    { content: form });

  console.log('got someting from StartActivity: %', JSON.stringify(response) );
  if (response.resultCode !== StartActivity.OK) {
    throw new Error('Invalid result from sign activity.');
  }

  return response.data;

  
};

export default signWithApp;
