import React, { MouseEventHandler, useState } from "react";
import "./styles/variables.css";
import "./styles/reset.css";
import "./styles/typography.css";
import "./styles/base.css";
import AppContainer from "./components/AppContainer";
import InputBlock from "./components/InputBlock";
import ClassList from "./components/ClassList";
import Button from "./components/Button";
import Toggle from "./components/Toggle";

const horizontalContainerStyle = {
  display: "flex",
  flexDirection: "row" as "row",
  width: "100%",
  marginTop: 20,
};

function App() {
  const [unitSystem, setUnitSystem] = useState("metric");

  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState("");

  const isEmpty = (value: string) => {
    return !parseFloat(value);
  };

  const isDefined = (value: string) => {
    return !Number.isNaN(parseFloat(value)) && parseFloat(value) !== 0;
  };

  const isHeightDefined = () => {
    if (unitSystem === "metric") return isDefined(height);
    return isDefined(feet) && isDefined(inches);
  };

  const isHeightEmpty = () => {
    if (unitSystem === "metric") return isEmpty(height);
    return isEmpty(feet) && isEmpty(inches);
  };

  const getHeight = () => {
    if (unitSystem === "metric") return Number(height);

    const feetToMeters = Number(feet) / 3.2808;
    const inchesToMeters = Number(inches) / 39.37;
    const result = (feetToMeters + inchesToMeters) * 100;

    return result;
  };

  const setComplexHeight = (result: string) => {
    if (unitSystem === "metric") setHeight(result);

    if (unitSystem === "imperial") {
      const toAllInches = Number(result) / 2.54;
      const toFeet = Math.floor(toAllInches / 12);
      const remainingInches = toAllInches - toFeet * 12;
      setFeet(toFeet.toFixed(0));
      setInches(remainingInches.toFixed(0));
    }
  };

  const feetOnchangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setFeet(event.currentTarget.value);
  };

  const inchesOnchangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setInches(event.currentTarget.value);
  };

  const heightOnchangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setHeight(event.currentTarget.value);
  };

  const weightOnchangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setWeight(event.currentTarget.value);
  };

  const bmiOnchangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setBmi(event.currentTarget.value);
  };

  const buttonOnClickHandler = () => {
    // Height
    if (isDefined(bmi) && isDefined(weight) && isHeightEmpty()) {
      const result = (Math.sqrt(Number(weight) / Number(bmi)) * 100).toFixed(0);
      setComplexHeight(result);
    }

    // Weight
    if (isDefined(bmi) && isHeightDefined() && isEmpty(weight)) {
      const result = ((Number(bmi) * getHeight() ** 2) / 10000).toFixed(0);
      setWeight(result);
    }

    // BMI
    if (isHeightDefined() && isDefined(weight) && isEmpty(bmi)) {
      const result = ((Number(weight) / getHeight() ** 2) * 10000).toFixed(0);
      setBmi(result);
    }
  };

  const unitSystemOptions = [
    { value: "metric", name: "METRIC" },
    { value: "imperial", name: "IMPERIAL" },
  ];

  const unitSystemHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
    const target = event.target as HTMLButtonElement;
    setUnitSystem(target.value);
  };

  return (
    <AppContainer>
      <Toggle
        options={unitSystemOptions}
        handler={unitSystemHandler}
        selected={unitSystem}
      />
      {unitSystem === "metric" && (
        <InputBlock
          name="HEIGHT"
          value={height}
          handler={heightOnchangeHandler}
          style={{ marginTop: "2rem" }}
        />
      )}
      {unitSystem === "imperial" && (
        <div style={horizontalContainerStyle}>
          <InputBlock
            name="FEET"
            value={feet}
            handler={feetOnchangeHandler}
            style={{ marginRight: "10px", flexGrow: 1 }}
          />
          <InputBlock
            name="INCHES"
            value={inches}
            handler={inchesOnchangeHandler}
            style={{ marginLeft: "10px", flexGrow: 1 }}
          />
        </div>
      )}
      <div style={horizontalContainerStyle}>
        <InputBlock
          name="WEIGHT"
          value={weight}
          handler={weightOnchangeHandler}
          style={{ marginRight: "10px", flexGrow: 1 }}
        />
        <InputBlock
          name="BMI"
          value={bmi}
          handler={bmiOnchangeHandler}
          style={{ marginLeft: "10px", flexGrow: 1 }}
        />
      </div>

      <ClassList style={{ marginTop: "2rem" }} />

      <Button handler={buttonOnClickHandler} style={{ marginTop: "2rem" }} />
    </AppContainer>
  );
}

export default App;
