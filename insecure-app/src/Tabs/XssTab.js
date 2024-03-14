import React, { useState } from "react";
import { Input, Button } from "reakit";

export const XssTab = () => {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(true); // New state to track validation status.
  const [customizedBackground, setCustomizedBackground] = useState(
    '{ "style": { "backgroundColor": "red", "width": "100px", "height": "100px"}}'
  );
  const validateUrl = (url) => /^(https?:\/\/).*/.test(url);

    
  const [backgroundProps, setBackgroundProps] = useState({})
  
  const applyStyle = () => {
    try {
      const parsedJson = JSON.parse(customizedBackground);
      if (parsedJson.hasOwnProperty('dangerouslySetInnerHTML')) {
        console.warn('Found and removed dangerouslySetInnerHTML from input.');
        delete parsedJson.dangerouslySetInnerHTML; 
      }
  
      setBackgroundProps(parsedJson);
    } catch (e) {
      console.error(e);
      setBackgroundProps(undefined);
    }
  };
  

  const handleTestProfileLink = () => {
    if (validateUrl(value)) {
      window.open(value, "_blank");
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Set your profile link</h1>
      <Input
        style={{ width: "90%" }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button onClick={handleTestProfileLink}>Test profile link</Button>
      {!isValid && (
        <h4 style={{ color: "red" }}>
          Invalid URL. URLs must start with http:// or https://
        </h4>
      )}

      <h1>Customize your profile background</h1>
      <Input
        style={{ width: "90%" }}
        value={customizedBackground}
        onChange={(e) => setCustomizedBackground(e.target.value)}
      />
      <Button onClick={applyStyle}>Apply</Button>
      {!backgroundProps && <h4>Error setting styles</h4>}
      <div {...backgroundProps}></div>
    </div>
  );
};
