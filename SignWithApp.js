import {
  NativeModules,
  Platform
} from 'react-native';

import {Ixo} from 'ixo-module';
import { Promise } from 'es6-promise';

requestCode = 0;

function getIxo(){
  //Hardcode in some text to sign
  const ixo = new Ixo("https://ixo-node.herokuapp.com");
  console.log('done ixo');
  return ixo;
}


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


  const ixo = getIxo();
  // TODO: The should be changed to be response.data.signature.creator and then the public key should also be sent
  var did = response.data.signature.publicKey;
  var signature = response.data.signature.signature; 
  var data = response.data.content;
  var signedDate = response.data.signature.created;
  var signatureType = response.data.signature.type;

  console.log("Sign response:" + JSON.stringify(response.data.signature));
  return ixo.project.createProject(did, signature, data, signedDate, signatureType);
  
};

export default signWithApp;
