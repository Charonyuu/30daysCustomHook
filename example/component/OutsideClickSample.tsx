import * as React from 'react';
import { useOutsideClick } from '../../src';


function OutsideClickSample() {
  const [isOpen, setIsOpen] = React.useState(true);
  const handleOutsideClick = () => {
    setIsOpen(false);
  };
  const ref = useOutsideClick(handleOutsideClick);
  return (
    <section data-testid='outside'>
      <div data-testid='inside' ref={ref}>{isOpen ? "Open" : "Closed"}</div>
    </section>
  )
}

export default OutsideClickSample