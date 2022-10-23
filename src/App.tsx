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

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState("");

  const isEmpty = (value: string) => {
    return !parseFloat(value);
  };

  const isDefined = (value: string) => {
    return !Number.isNaN(parseFloat(value)) && parseFloat(value) !== 0;
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
    if (isDefined(bmi) && isDefined(weight) && isEmpty(height)) {
      const result = (Math.sqrt(Number(weight) / Number(bmi)) * 100).toFixed(0);
      setHeight(result);
    }

    // Weight
    if (isDefined(bmi) && isDefined(height) && isEmpty(weight)) {
      const result = ((Number(bmi) * Number(height) ** 2) / 10000).toFixed(0);
      setWeight(result);
    }

    // BMI
    if (isDefined(height) && isDefined(weight) && isEmpty(bmi)) {
      const result = ((Number(weight) / Number(height) ** 2) * 10000).toFixed(
        0
      );
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
      <Toggle options={unitSystemOptions} handler={unitSystemHandler} selected={unitSystem} />
      <InputBlock
        name="HEIGHT"
        value={height}
        handler={heightOnchangeHandler}
        style={{ marginTop: "2rem" }}
      />
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
