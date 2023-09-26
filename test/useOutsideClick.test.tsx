import React from "react";
import OutsideClickSample from "../example/component/OutsideClickSample"; // 请更正为你的组件路径
import { render, act } from '@testing-library/react';

describe("useOutsideClick", () => {

  it('it should close when clicking outside', () => {
    const { getByTestId, getByText } = render(<OutsideClickSample />);
    const outSideSection = getByTestId("outside");

    expect(getByText('Open')).toBeTruthy();

    act(() => {
      outSideSection.click();
    });

    expect(getByText('Closed')).toBeTruthy();
  });

  it('it should not close when clicking inside', () => {
    const { getByTestId, getByText } = render(<OutsideClickSample />);
    const inSide = getByTestId("inside");

    expect(getByText('Open')).toBeTruthy();

    act(() => {
      inSide.click();
    });

    expect(getByText('Open')).toBeTruthy();
  });

})

