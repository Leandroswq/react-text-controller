import React, { useState } from 'react';
import defaultStyle from './style.module.css';
import Draggable from 'react-draggable';

type State = {
  key: string;
  value: string;
  isActive: boolean;
};

type Styles = {
  container1ClassName: string | undefined;
  container2ClassName: string | undefined;
  headerClassName: string | undefined;
  textAreaClassName: string | undefined;
  confirmButtonClassName: string | undefined;
  sendButtonClassName: string | undefined;
  dataClassName: string | undefined;
  labelClassName: string | undefined;
};

type Props = {
  states: Array<State>;
  updateStates: React.Dispatch<any>;
  title: string;
  confirmButtonText: string;
  sendButtonText: string;
  sendButtonFunction: Function;
  container1ClassName: string | undefined;
  container2ClassName: string | undefined;
  headerClassName: string | undefined;
  textAreaClassName: string | undefined;
  confirmButtonClassName: string | undefined;
  sendButtonClassName: string | undefined;
  dataClassName: string | undefined;
  labelClassName: string | undefined;
};

function findActiveState(states: State[]): State | undefined {
  return states.find((state) => state.isActive);
}

function createStyle(classNames: Styles): Styles {
  const names = Object.keys(classNames);
  const style = {} as Styles;
  names.forEach((name) => {
    style[name as keyof Styles] =
      classNames[name as keyof Styles] !== undefined
        ? classNames[name as keyof Styles]
        : defaultStyle[name];
  });

  return style as Styles;
}

function TextController({
  states,
  updateStates,
  title,
  confirmButtonText,
  sendButtonText,
  sendButtonFunction,
  container1ClassName,
  container2ClassName,
  headerClassName,
  textAreaClassName,
  confirmButtonClassName,
  sendButtonClassName,
  dataClassName,
  labelClassName,
}: Props) {
  const [inputText, setInputText] = useState('');
  const style = createStyle({
    container1ClassName,
    container2ClassName,
    headerClassName,
    textAreaClassName,
    confirmButtonClassName,
    sendButtonClassName,
    dataClassName,
    labelClassName,
  } as Styles);

  function handleUpdateStates() {
    const activeState = findActiveState(states);
    if (activeState) {
      const editState = {
        key: activeState.key,
        value: inputText,
        isActive: false,
      };
      const stateUpdated = states.map((state) => {
        if (state.isActive) return editState;
        return state;
      });
      updateStates(stateUpdated);
      setInputText('');
    }
  }

  function handleActiveState(actualState: State) {
    const stateUpdated = states.map((state): State => {
      if (state.key === actualState.key)
        return { ...actualState, isActive: true };
      return { ...state, isActive: false };
    });

    updateStates(stateUpdated);
  }

  return (
    <Draggable handle="h2">
      <div
        className={`${style.container1ClassName} box no-cursor`}
        style={{ position: 'absolute', zIndex: '5' }}
      >
        <h2 className={style.headerClassName}>{title}</h2>
        <div className={style.container2ClassName}>
          <textarea
            value={inputText}
            onChange={({ target }) => setInputText(target.value)}
            className={style.textAreaClassName}
          />

          {states.map((state) => (
            <div className={style.dataClassName} key={state.key}>
              <label className={style.labelClassName} key={state.key}>
                <span>{state.key}</span>

                <input
                  type="radio"
                  checked={state.isActive}
                  onChange={() => handleActiveState(state)}
                />
              </label>
            </div>
          ))}
          <button
            className={style.confirmButtonClassName}
            type="button"
            onClick={() => handleUpdateStates()}
          >
            {confirmButtonText}
          </button>
          <button
            className={style.sendButtonClassName}
            type="button"
            onClick={() => sendButtonFunction()}
          >
            {sendButtonText}
          </button>
        </div>
      </div>
    </Draggable>
  );
}

TextController.defaultProps = {
  states: [],
  title: 'Drag here',
  confirmButtonText: 'Confirm',
  sendButtonText: 'Send',
  container1ClassName: undefined,
  container2ClassName: undefined,
  headerClassName: undefined,
  textAreaClassName: undefined,
  confirmButtonClassName: undefined,
  sendButtonClassName: undefined,
  dataClassName: undefined,
  labelClassName: undefined,
};

export default TextController;
