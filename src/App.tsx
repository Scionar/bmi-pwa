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
  const [pounds, setPounds] = useState("");

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState("");

  const toNumber = (value: string) => {
    return Number(value.replace(',', '.'));
  }

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

  const transformInchestoMeters = (feetValue: number, inchesValue: number) => {
    const feetToMeters = feetValue / 3.2808;
    const inchesToMeters = inchesValue / 39.37;
    return (feetToMeters + inchesToMeters) * 100;
  }

  const transformMetersToInches = (meterValue: number) => {
    const meterToInches = meterValue / 2.54;
    const metersToFeet = Math.floor(meterToInches / 12);
    const remainingInches = meterToInches - metersToFeet * 12;

    return {
      feet: metersToFeet,
      inches: remainingInches
    }
  }

  const transformKilosToPounds = (weightValue: number) => {
    return weightValue * 2.2046;
  }

  const transformPoundsToKilos = (poundsValue: number) => {
    return poundsValue / 2.2046;
  }

  const getHeight = () => {
    if (unitSystem === "metric") return toNumber(height);

    return transformInchestoMeters(toNumber(feet), toNumber(inches));
  };

  const setComplexHeight = (result: string) => {
    if (unitSystem === "metric") setHeight(result);

    if (unitSystem === "imperial") {
      const { feet: feetValue, inches: inchesValue } = transformMetersToInches(toNumber(result));
      setFeet(feetValue.toFixed(1));
      setInches(inchesValue.toFixed(1));
    }
  };

  const isWeightDefined = () => {
    if (unitSystem === "metric") return isDefined(weight);
    return isDefined(pounds);
  };

  const isWeightEmpty = () => {
    if (unitSystem === "metric") return isEmpty(weight);
    return isEmpty(pounds);
  };

  const getWeight = () => {
    if (unitSystem === "metric") return toNumber(weight);

    return toNumber(pounds) / 2.2046;
  };

  const setComplexWeight = (result: string) => {
    if (unitSystem === "metric") setWeight(result);

    if (unitSystem === "imperial") {
      const poundResult = toNumber(result) * 2.2046;
      setPounds(poundResult.toFixed(1));
    }
  };

  const feetOnchangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setFeet(event.currentTarget.value);
  };

  const inchesOnchangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setInches(event.currentTarget.value);
  };

  const poundsOnchangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setPounds(event.currentTarget.value);
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
    if (isDefined(bmi) && isWeightDefined() && isHeightEmpty()) {
      const result = (Math.sqrt(getWeight() / toNumber(bmi)) * 100).toFixed(1);
      setComplexHeight(result);
    }

    // Weight
    if (isDefined(bmi) && isHeightDefined() && isWeightEmpty()) {
      const result = ((toNumber(bmi) * getHeight() ** 2) / 10000).toFixed(1);
      setComplexWeight(result);
    }

    // BMI
    if (isHeightDefined() && isWeightDefined() && isEmpty(bmi)) {
      const result = ((getWeight() / getHeight() ** 2) * 10000).toFixed(1);
      setBmi(result);
    }
  };

  const unitSystemOptions = [
    { value: "metric", name: "METRIC" },
    { value: "imperial", name: "IMPERIAL" },
  ];

  const unitSystemHandler: MouseEventHandler<HTMLButtonElement> = (event) => {
    const target = event.target as HTMLButtonElement;

    // Height
    if (isHeightDefined()) {
      if (unitSystem === "metric") {
        const { feet: feetValue, inches: inchesValue } = transformMetersToInches(toNumber(height));
        setFeet(feetValue.toFixed(1));
        setInches(inchesValue.toFixed(1));
      }

      if (unitSystem === "imperial") {
        const heightValue = transformInchestoMeters(toNumber(feet), toNumber(inches));
        setHeight(heightValue.toFixed(1));
      }
    }

    // Weight
    if (isWeightDefined()) {
      if (unitSystem === "metric") {
        const poundsValue = transformKilosToPounds(toNumber(weight))
        setPounds(poundsValue.toFixed(1));
      }

      if (unitSystem === "imperial") {
        const kiloValue = transformPoundsToKilos(toNumber(pounds));
        setWeight(kiloValue.toFixed(1));
      }
    }

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
        {unitSystem === "metric" && (
          <InputBlock
            name="WEIGHT"
            value={weight}
            handler={weightOnchangeHandler}
            style={{ marginRight: "10px", flexGrow: 1 }}
          />
        )}
        {unitSystem === "imperial" && (
          <InputBlock
            name="POUNDS"
            value={pounds}
            handler={poundsOnchangeHandler}
            style={{ marginRight: "10px", flexGrow: 1 }}
          />
        )}
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
