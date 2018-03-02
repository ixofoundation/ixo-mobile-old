import React, { Component } from "react";
import ProjectListScreen from "./ProjectListScreen.js";
import ProjectDetailScreen from "./ProjectDetailScreen.js";
import TemplateScreen from "./TemplateScreen.js";
import { StackNavigator } from "react-navigation";
import { Ixo } from 'ixo-module';
import {
    NativeModules,
    Platform
  } from 'react-native';
  
import { Promise } from 'es6-promise';
  

  

class IxoCredentialProvider {
    requestCode = 0;

    getDid(){
      if(!this.did){
        return "0x0";
      }else{}
        return this.did;
    }

    setDid(did){
      this.did = did;
    }

    sign(dataToSign, templateName){
        // Thisis a hack.  We need to call setSignature just prior to calling the ixo module to get this to work
        return new Promise((resolve, reject) => {
            let payload = {data: dataToSign, template: {name: templateName} };

            this.signWithApp(payload)
              .then( signedData => {
                this.setDid(signedData.signature.creator);
                console.log(signedData);
                resolve(signedData.signature);
            })
            .catch (error => {
                console.log('failed on signWithApp call');
                console.log(JSON.stringify(error));
                reject(error);
            });
        })
    }

    async signWithApp(formData) {
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
          ++this.requestCode,
          action,
          { content: JSON.stringify(formData) });
      
        console.log('got someting from StartActivity: %', JSON.stringify(response) );
        if (response.resultCode !== StartActivity.OK) {
          throw new Error('Invalid result from sign activity.');
        }
      
        return response.data;
        
    };

}

let hostName = 'https://ixo-node.herokuapp.com'; //'http://192.168.0.104:5000';
let ixo = new Ixo(hostName, new IxoCredentialProvider());

export default (DrawNav = StackNavigator({
    ProjectListScreen: { screen: (props) => <ProjectListScreen {...props } ixo={ixo}/> },
    ProjectDetailScreen: { screen: (props) => <ProjectDetailScreen {...props } ixo={ixo} /> },
    TemplateScreen: { screen: (props) => <TemplateScreen {...props } ixo={ixo} />}
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 }
));