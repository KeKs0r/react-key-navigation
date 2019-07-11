import React, { useState } from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import Focusable from "../src/Focusable";
import Navigation from "../src/Navigation";
import VerticalList from "../src/VerticalList";

function FocusComponent() {
  const [focused, setFocused] = useState();
  return (
    <Focusable
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {focused ? "FOCUSED" : "NOTHING"}
    </Focusable>
  );
}

function FocusDemo() {
  return (
    <Navigation>
      <VerticalList style={{ display: "flex", flexDirection: "column" }}>
        <FocusComponent />
        <FocusComponent />
        <FocusComponent />
        <FocusComponent />
        <FocusComponent />
        <FocusComponent />
      </VerticalList>
    </Navigation>
  );
}

storiesOf("Focus", module).add("Normal Demo", () => <FocusDemo />);
