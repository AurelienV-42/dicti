import sleep from "@src/utils/sleep";
import React, { ComponentProps, useState } from "react";
import { GestureResponderEvent, Pressable } from "react-native";

interface MyPressableProps extends ComponentProps<typeof Pressable> {
  /** Keep the opacity when disabled */
  disabledFull?: boolean;
}

function MyPressable(props: MyPressableProps) {
  const { disabled, disabledFull = false, ...otherProps } = props;

  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const [disabledNoMultipleClick, setDisabledNoMultipleClick] = useState(false);

  const disableToAvoidMultipleClick = async () => {
    setDisabledNoMultipleClick(true);
    await sleep(1000);
    setDisabledNoMultipleClick(false);
  };

  return (
    <Pressable
      disabled={disabled || disabledFull || disabledNoMultipleClick}
      className={`opacity-${!disabledFull && (pressed || disabled) ? "30" : hovered ? "70" : "100"}`}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      {...otherProps}
      onPress={(event: GestureResponderEvent) => {
        disableToAvoidMultipleClick();
        props.onPress?.(event);
      }}
    />
  );
}

export default MyPressable;
