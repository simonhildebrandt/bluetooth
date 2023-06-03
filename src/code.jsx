import React from 'react';
import { Highlight, themes } from "prism-react-renderer"


const codeBlock1 = `
  navigator.bluetooth.getAvailability();
  // Promise with availability of Bluetooth stack

  navigator.bluetooth.getDevices();
  // Promise with list of paired, attached devices
`

const codeBlock2 = `
  navigator.bluetooth.requestDevice({
    filters: [
      { vendorId: 0x1209, productId: 0xa800 },
      { vendorId: 0x1209, productId: 0xa850 },
    ]
  });
  // or...
  navigator.bluetooth.requestDevice({
    acceptAllDevices: true,
    optionalServices: [SERVICE_UUID]
  });
  // Triggers browser Bluetooth device selection dialog
`

function Code({codeBlock}) {
  return <Highlight
    theme={themes.shadesOfPurple}
    code={codeBlock}
    language="jsx"
  >
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <pre style={style}>
        {tokens.map((line, i) => (
          <div key={i} {...getLineProps({ line })}>
            {line.map((token, key) => (
              <span key={key} {...getTokenProps({ token })} />
            ))}
          </div>
        ))}
      </pre>
    )}
  </Highlight>
}

const FirstCode = () => <Code codeBlock={codeBlock1}/>;
const SecondCode = () => <Code codeBlock={codeBlock2}/>;

export { FirstCode, SecondCode }
