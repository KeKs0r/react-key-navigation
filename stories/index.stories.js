import React, { useState, useRef, useCallback, forwardRef } from "react";

import FocusLock from "react-focus-lock";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import Focusable from "../src/Focusable";
import Navigation from "../src/Navigation";
import VerticalList from "../src/VerticalList";
import { logTree } from "./util";

const FocusComponent = forwardRef(({ children, style, ...props }, ref) => {
  const [focused, setFocused] = useState();
  return (
    <Focusable
      onFocus={() => {
        console.log("focusing", props.focusId);
        setFocused(true);
      }}
      onBlur={() => setFocused(false)}
      style={{ borderLeft: focused ? "1px solid blue" : "none", ...style }}
      ref={ref}
      {...props}
    >
      {children}
    </Focusable>
  );
});

function onEnterDown() {
  console.log("OnEnterDown");
}

function ListDemo() {
  return (
    <Navigation>
      <VerticalList style={{ display: "flex", flexDirection: "column" }}>
        <FocusComponent>First</FocusComponent>
        <FocusComponent>Second</FocusComponent>
        <FocusComponent>Third</FocusComponent>
        <FocusComponent>Forth</FocusComponent>
        <FocusComponent>Fifth</FocusComponent>
        <FocusComponent>Six</FocusComponent>
      </VerticalList>
    </Navigation>
  );
}

function NestedDemo() {
  return (
    <Navigation>
      <VerticalList style={{ display: "flex", flexDirection: "column" }}>
        <FocusComponent>First</FocusComponent>
        <FocusComponent>Second</FocusComponent>
        <FocusComponent>Main</FocusComponent>
        <VerticalList
          style={{ display: "flex", flexDirection: "column", paddingLeft: 8 }}
        >
          <FocusComponent>Sub 1</FocusComponent>
          <FocusComponent>Sub 2</FocusComponent>
          <FocusComponent>Sub 3</FocusComponent>
        </VerticalList>
        <FocusComponent>Forth</FocusComponent>
        <FocusComponent>Fifth</FocusComponent>
        <FocusComponent>Six</FocusComponent>
      </VerticalList>
    </Navigation>
  );
}

function SubList() {
  const [expanded, setExpanded] = useState(false);
  const mainRef = useRef();
  const focusMain = useCallback(() => {
    const navigator = mainRef.current.getNavigator();
    mainRef.current.focus();
    navigator.forceFocus(mainRef.current.focusableId);
  }, []);
  const onChildrenEscapeDown = useCallback(() => {
    setExpanded(false);
    setTimeout(focusMain, 0);
  });
  return (
    <React.Fragment>
      <VerticalList>
        <FocusComponent
          onEnterDown={() => setExpanded(true)}
          ref={mainRef}
          focusId="2-Expandable"
        >
          Click to expand
          {expanded && <button onClick={() => setExpanded(false)}>X</button>}
        </FocusComponent>

        {expanded && (
          <VerticalList
            lockFocus
            onChildrenEscapeDown={onChildrenEscapeDown}
            style={{ display: "flex", flexDirection: "column", paddingLeft: 8 }}
            focusId="Expandable-List"
          >
            <FocusComponent focusId="2-sub-1" forceFocus>
              Sub Item 1
            </FocusComponent>
            <FocusComponent focusId="2-sub-2">Sub Item 2</FocusComponent>
            <FocusComponent focusId="2-sub-3">Sub Item 3</FocusComponent>
          </VerticalList>
        )}
      </VerticalList>
    </React.Fragment>
  );
}

function NestedLockDemo() {
  return (
    <Navigation>
      <VerticalList
        style={{ display: "flex", flexDirection: "column" }}
        focusId="MainList"
      >
        <FocusComponent onEnterDown={onEnterDown} focusId="First">
          First
        </FocusComponent>
        <FocusComponent onEnterDown={onEnterDown} focusId="second">
          Second
        </FocusComponent>
        <SubList />
        <FocusComponent focusId="Forth">Forth</FocusComponent>
        <FocusComponent focusId="Fifth">Fifth</FocusComponent>

        <FocusComponent focusId="Six">Six</FocusComponent>
        <button onClick={() => logTree(window.navigationRoot)}>Log Tree</button>
      </VerticalList>
    </Navigation>
  );
}

function SubForm() {
  const [expanded, setExpanded] = useState(false);
  const mainRef = useRef();
  const focusMain = useCallback(() => {
    const navigator = mainRef.current.getNavigator();
    mainRef.current.focus();
    navigator.forceFocus(mainRef.current.focusableId);
  }, []);
  const onChildrenEscapeDown = useCallback(() => {
    setExpanded(false);
    setTimeout(focusMain, 0);
  });
  return (
    <React.Fragment>
      <VerticalList>
        <FocusComponent
          onEnterDown={() => setExpanded(true)}
          ref={mainRef}
          focusId="2-Expandable"
        >
          Click to expand
          {expanded && <button onClick={() => setExpanded(false)}>X</button>}
        </FocusComponent>

        {expanded && (
          <FocusLock>
            <VerticalList
              lockFocus
              onChildrenEscapeDown={onChildrenEscapeDown}
              focusId="Expandable-List"
            >
              <FocusComponent
                focusId="focus-form"
                forceFocus
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingLeft: 8,
                  width: 400
                }}
              >
                <input type="text" style={{ margin: 8 }} />
                <textarea rows="4" style={{ margin: 8 }} />
                <button style={{ margin: 8 }}>Submit</button>
              </FocusComponent>
            </VerticalList>
          </FocusLock>
        )}
      </VerticalList>
    </React.Fragment>
  );
}

function NestedLockFormDemo() {
  return (
    <Navigation>
      <VerticalList
        style={{ display: "flex", flexDirection: "column" }}
        focusId="MainList"
      >
        <FocusComponent onEnterDown={onEnterDown} focusId="First">
          First
        </FocusComponent>
        <FocusComponent onEnterDown={onEnterDown} focusId="second">
          Second
        </FocusComponent>
        <SubForm />
        <FocusComponent focusId="Forth">Forth</FocusComponent>
        <FocusComponent focusId="Fifth">Fifth</FocusComponent>

        <FocusComponent focusId="Six">Six</FocusComponent>
        <button onClick={() => logTree(window.navigationRoot)}>Log Tree</button>
      </VerticalList>
    </Navigation>
  );
}

storiesOf("Focus", module)
  .add("List Demo", () => <ListDemo />)
  .add("Nested Demo", () => <NestedDemo />)
  .add("Nested Lock Demo", () => <NestedLockDemo />)
  .add("Nested Lock Form", () => <NestedLockFormDemo />);
