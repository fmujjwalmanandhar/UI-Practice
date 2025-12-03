import React, { useCallback, useRef, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import {
  KeyboardController,
  KeyboardGestureArea,
  useKeyboardHandler,
} from "react-native-keyboard-controller";
import Reanimated, {
  useAnimatedProps,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

type MessageProps = {
  text: string;
  sender?: boolean;
};
export const Message = ({ text, sender }: MessageProps) => {
  return (
    <View style={sender ? styles.senderContainer : styles.recipientContainer}>
      <Text style={styles.message}>{text}</Text>
    </View>
  );
};
export const history = [
  { text: "Hmmm🤔" },
  { text: "It looks like it still will be choppy..." },
  { text: "But I don't know what should I try next" },
  { text: "Reanimated?", sender: true },
  { text: "A little bit disappointed 😔" },
  { text: "🤯" },
  { text: "Try to check it. I hope it helps you...", sender: true },
  { text: "It really pushes you to think twice on how to design it first" },
  {
    text: "Looks promising!😎 I was always looking for a solution that would allow us to run animations on native thread and provide at least stable 60 FPS",
  },
  { text: "You have to check it!!!", sender: true },
  { text: "Ha-ha! I'm definitely going to check it!" },
  { text: "Hello! How are you?" },
  { text: "Hi! I'm good. How are you?", sender: true },
  {
    text: "I'm fine, thank you! Have you seen new keyboard animation library?",
  },
  { text: "No! Let me check.", sender: true },
  {
    text: "Wow! I've been looking for it for a while. It's awesome!",
    sender: true,
  },
];

import type { GestureResponderEvent, LayoutChangeEvent } from "react-native";

const AnimatedTextInput = Reanimated.createAnimatedComponent(TextInput);

const useKeyboardAnimation = () => {
  const progress = useSharedValue(0);
  const height = useSharedValue(0);
  const inset = useSharedValue(0);
  const offset = useSharedValue(0);
  const scroll = useSharedValue(0);
  const shouldUseOnMoveHandler = useSharedValue(false);

  useKeyboardHandler({
    onStart: (e) => {
      "worklet";

      // i. e. the keyboard was under interactive gesture, and will be showed
      // again. Since iOS will not schedule layout animation for that we can't
      // simply update `height` to destination and we need to listen to `onMove`
      // handler to have a smooth animation
      if (progress.value !== 1 && progress.value !== 0 && e.height !== 0) {
        // eslint-disable-next-line react-compiler/react-compiler
        shouldUseOnMoveHandler.value = true;

        return;
      }
      progress.value = e.progress;
      height.value = e.height;

      inset.value = e.height;
      // Math.max is needed to prevent overscroll when keyboard hides (and user scrolled to the top, for example)
      offset.value = Math.max(e.height + scroll.value, 0);
    },
    onInteractive: (e) => {
      "worklet";

      progress.value = e.progress;
      height.value = e.height;
    },
    onMove: (e) => {
      "worklet";

      if (shouldUseOnMoveHandler.value) {
        progress.value = e.progress;
        height.value = e.height;
      }
    },
    onEnd: (e) => {
      "worklet";

      height.value = e.height;
      progress.value = e.progress;
      shouldUseOnMoveHandler.value = false;
    },
  });

  const onScroll = useAnimatedScrollHandler({
    onScroll: (e) => {
      scroll.value = e.contentOffset.y - inset.value;
    },
  });

  return { height, progress, onScroll, scroll, inset, offset };
};

const TEXT_INPUT_HEIGHT = 50;

const contentContainerStyle = {
  paddingBottom: TEXT_INPUT_HEIGHT,
};

function InteractiveKeyboard() {
  const ref = useRef<Reanimated.ScrollView>(null);
  const { height, onScroll, inset, offset } = useKeyboardAnimation();
  const [inputHeight, setInputHeight] = useState(TEXT_INPUT_HEIGHT);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState(history);

  const onInputLayoutChanged = useCallback((e: LayoutChangeEvent) => {
    setInputHeight(e.nativeEvent.layout.height);
  }, []);

  const scrollToBottom = useCallback(() => {
    ref.current?.scrollToEnd({ animated: false });
  }, []);

  const onSendMessage = useCallback(() => {
    if (text.trim()) {
      // Add your message sending logic here
      setMessages((messages) => [...messages, { text: text, sender: true }]);
      setText("");
      scrollToBottom();
    }
  }, [text, scrollToBottom]);

  const textInputStyle = useAnimatedStyle(
    () => ({
      position: "absolute",
      minHeight: TEXT_INPUT_HEIGHT,
      width: "100%",
      fontSize: 16,
      lineHeight: 22,
      textAlignVertical: "auto",
      paddingHorizontal: 12,
      paddingVertical: 12,
      // backgroundColor: "#fff",
      // transform: [{ translateY: -height.value }],
    }),
    []
  );

  const inputContainerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -height.value }],
  }));

  const props = useAnimatedProps(() => ({
    contentInset: {
      bottom: inset.value,
    },
    contentOffset: {
      x: 0,
      y: offset.value,
    },
  }));
  const onInputTouchStart = useCallback((event: GestureResponderEvent) => {
    KeyboardController.dismiss();
  }, []);

  return (
    <KeyboardGestureArea
      offset={inputHeight}
      // interpolator="ios"
      style={styles.container}
      textInputNativeID="composer"
    >
      <Reanimated.ScrollView
        ref={ref}
        // simulation of `automaticallyAdjustKeyboardInsets` behavior on RN < 0.73
        animatedProps={props}
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={contentContainerStyle}
        contentInsetAdjustmentBehavior="never"
        keyboardDismissMode="interactive"
        testID="chat.scroll"
        onContentSizeChange={scrollToBottom}
        onScroll={onScroll}
      >
        {messages.map((message, index) => (
          <Message key={index} {...message} />
        ))}
      </Reanimated.ScrollView>
      <Reanimated.View
        style={[styles.inputContainer, inputContainerAnimatedStyle]}
      >
        <View style={styles.flex}>
          <AnimatedTextInput
            multiline
            nativeID="composer"
            style={textInputStyle}
            // testID="chat.input"
            value={text}
            onChangeText={setText}
            placeholder="Useless placeholder"
            placeholderTextColor={"#333"}
            onLayout={onInputLayoutChanged}
            onSubmitEditing={onSendMessage}
            onTouchStart={onInputTouchStart}
          />
        </View>
        <Button onPress={onSendMessage} title="Send" />
      </Reanimated.View>
    </KeyboardGestureArea>
  );
}

const container = {
  borderRadius: 10,
  padding: 10,
  margin: 10,
  marginVertical: 5,
};
const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    flex: 1,
  },
  senderContainer: {
    alignSelf: "flex-end",
    backgroundColor: "#e0e0e0",
    ...container,
  },
  recipientContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#50FF00",
    ...container,
  },
  message: {
    color: "#000000",
  },
  inputContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    padding: 12,
  },
  flex: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default InteractiveKeyboard;
