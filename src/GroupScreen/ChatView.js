import React, { Component } from 'react';
import { Text, View, Button, Row, Item, Input, Icon } from 'native-base';
import { FlatList } from 'react-native';

import firebaseInstance from '../firebase';

const ORIENTATION = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
};

const Message = props => {
  let bubbleStyle = {};
  let textStyle = {};
  let leftSpacer = null;
  let rightSpacer = null;
  if (props.orientation === ORIENTATION.RIGHT) {
    bubbleStyle.backgroundColor = '#9ccc65';
    leftSpacer = <View style={{ width: 60 }} />;
  } else {
    bubbleStyle.backgroundColor = '#bdbdbd';
    rightSpacer = <View style={{ width: 60 }} />;
  }
  return (
    <Row>
      {leftSpacer}
      <View
        style={{
          borderRadius: 5,
          marginTop: 8,
          marginRight: 10,
          marginLeft: 10,
          paddingHorizontal: 10,
          paddingVertical: 5,
          flexDirection: 'row',
          flex: 1,
          ...bubbleStyle
        }}
      >
        <Text style={{ color: '#000' }}>{props.text}</Text>
      </View>
      {rightSpacer}
    </Row>
  );
};

const MessageList = ({ messages }) => {
  return (
    <FlatList
      data={messages}
      renderItem={({ item }) => <Message {...item} />}
    />
  );
};
export default class ChatView extends Component {
  state = {
    messageText: '',
    messages: []
  };

  handleChange = value => {
    this.setState({ messageText: value });
  };

  componentDidMount() {
    const { currentGroup } = this.props;
    let messagesList = [];
    const messagesRef = firebaseInstance
      .database()
      .ref()
      .child(`groups/${currentGroup}/messages`);
    messagesRef.orderByKey().on('value', snap => {
      if (snap) {
        messagesList = Object.values(snap.val());
        this.setState({ messages: messagesList });
      }
    });
  }

  onSend = () => {
    const currentGroup = this.props.currentGroup;
    const message = {
      text: this.state.messageText,
      createdAt: new Date(),
      user: {
        id: this.props.currentUser.uid,
        name: this.props.currentUser.displayName
      }
    };
    const newMsg = firebaseInstance
      .database()
      .ref()
      .child(`groups/${currentGroup}/messages`)
      .push();
    message.key = newMsg.key;
    newMsg.set(message);
    this.setState({ messageText: '' });
  };
  render() {
    const { messages } = this.state;
    const { currentUser } = this.props;
    const messagesList = messages.map(msg => {
      if (msg.user.id === currentUser.uid) {
        msg.orientation = ORIENTATION.RIGHT;
      } else {
        msg.orientation = ORIENTATION.LEFT;
      }
      return msg;
    });
    return (
      <View style={{ flex: 1 }}>
        <Row size={4}>
          <MessageList messages={messagesList} />
        </Row>
        <Row style={{}} size={1}>
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              alignContent: 'space-between',
              flexDirection: 'row'
            }}
          >
            <Item rounded style={{ alignSelf: 'center', flex: 6 }}>
              <Input
                placeholder="Escribe un mensaje..."
                onChangeText={this.handleChange}
                value={this.state.messageText}
              />
            </Item>
            <Button
              rounded
              style={{ alignSelf: 'center', flex: 1 }}
              onPress={this.onSend}
            >
              <Icon name="md-send" />
            </Button>
          </View>
        </Row>
      </View>
    );
  }
}
