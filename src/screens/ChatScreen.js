import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import { dialogflowConfig } from '../utils/env';
import { saveObjLikeData,readOBjLikeData,DeleteData } from '../utils/dataStorage';
const botAvater = require('./1.jpg')

const BOT = {
  _id: 2,
  name: 'ehealth',
  avatar: botAvater,
};

class ChatScreen extends Component {
  state = {
    messages: [
      // {
      //   _id: 2,
      //   text: 'Hi! I am the eHeath bot.',
      //   createdAt: new Date(),
      //   user: BOT
      // },
      // {
      //   _id: 1,
      //   text: 'How may I help you with today?',
      //   createdAt: new Date(),
      //   user: BOT
      // },
    ]
  };

  componentDidMount() {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id
    );
    readOBjLikeData("message").
    then(
      (historyMessages)=>{
        if(historyMessages)
          this.setState({messages:JSON.parse(historyMessages)})
      }
    )
  }


  handleGoogleResponse(result) {
    console.log(JSON.stringify(result));
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    this.sendBotResponse(text);
  }

  sendBotResponse(text) {
    let msg = {
      _id: this.state.messages.length + 1,
      text,
      // image,
      createdAt: new Date(),
      user: BOT
    };

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, [msg])
    }),()=>{saveObjLikeData(this.state.messages,"message")});
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));

    let message = messages[0].text;
    Dialogflow_V2.requestQuery(
      message,
      (result) => this.handleGoogleResponse(result),
      (error) => console.log(error)
    );
  }

  onQuickReply(quickReply){
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, quickReply)
    }));

    let message = quickReply[0].value;
    Dialogflow_V2.requestQuery(
      message,
      (result) => this.handleGoogleResponse(result),
      (error) => console.log(error)
    );
  }



  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <GiftedChat
          messages={this.state.messages}
          onSend={(message) => this.onSend(message)}
          onQuickReply={(quickReply) => this.onQuickReply(quickReply)}
          user={{
            _id: 1
          }}
        />
      </View>
    );
  }
}

export default ChatScreen;