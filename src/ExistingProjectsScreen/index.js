import React, { Component } from "react";
import ProjectListScreen from "./ProjectListScreen.js";
import ProjectDetailScreen from "./ProjectDetailScreen.js";
import TemplateScreen from "./TemplateScreen.js";
import { StackNavigator } from "react-navigation";
import { Ixo } from 'ixo-module';

class IxoCredentialProvider {
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
            resolve(this.signature);
        })
    }
    
    setSignature(signature){
        this.signature = signature;
    }

}

let hostName = 'http://192.168.0.104:5000'; //'https://ixo-node.herokuapp.com';
let ixo = new Ixo(hostName, new IxoCredentialProvider());

export default (DrawNav = StackNavigator({
    ProjectListScreen: { screen: (props) => <ProjectListScreen {...props } ixo={ixo}/> },
    ProjectDetailScreen: { screen: (props) => <ProjectDetailScreen {...props } ixo={ixo} /> },
    TemplateScreen: { screen: (props) => <TemplateScreen {...props } ixo={ixo} />}
}));