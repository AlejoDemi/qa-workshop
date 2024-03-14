import React, { useState } from "react";
import { Input, Button } from "reakit";

const URLInjection = () => {
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isValidUrl, setIsValidUrl] = useState(true);

  const validateUrl = (url) => {
    const isValid = url.startsWith("https://assets.pokemon.com/");
    setIsValidUrl(isValid);
    isValid ? setValue(url) && setSubmitted(true) : setSubmitted(false);
  };

  return (
    <div style={{ margin: "8px 24px" }}>
      <h1>Insert your image</h1>
      <form
        style={{ width: "100%" }}
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitted(true);
          validateUrl(e.target.elements.imageURL.value);
        }}
      >
        <Input
          name="imageURL"
          style={{ width: "100%" }}
          onChange={() => setIsValidUrl(true)}
        />
        {!isValidUrl && (
          <p style={{ color: "red" }}>
            Invalid image source. Only images from https://assets.pokemon.com/
            are allowed.
          </p>
        )}
        <Button type="submit" style={{ width: "50%" }}>
          Submit
        </Button>
      </form>

      {submitted && <img width={"90%"} height={"500px"} src={value} />}
    </div>
  );
};

export default URLInjection;
