import React, { useState } from "react";
import { buttons } from "./buttons";
import "./Calculator.scss";

const Calculator = () => {
  const [action, setAction] = useState({
    symbol: "",
    firstNumber: 0,
    secondNumber: 0,
  });

  // buttons.maps((button) => {
  //   console.log(button.class);
  // });
  const negativePositive = () => {
    if (action.secondNumber) {
      setAction({
        ...action,
        secondNumber: action.secondNumber * -1,
      });
    } else if (action.firstNumber) {
      setAction({
        ...action,
        firstNumber: action.firstNumber * -1,
      });
    }
  };

  const percentage = () => {
    if (action.secondNumber) {
      setAction({
        ...action,
        secondNumber: action.secondNumber / 100,
      });
    } else if (action.firstNumber) {
      setAction({
        ...action,
        firstNumber: action.firstNumber / 100,
      });
    }
  };

  const decimal = () => {
    console.log("decimal");
  };

  const clear = () => {
    if (action.secondNumber) {
      setAction({
        ...action,
        secondNumber: 0,
      });
    } else if (action.firstNumber) {
      setAction({
        ...action,
        firstNumber: 0,
        symbol: "",
      });
    }
  };

  const calculate = (firstNumber, secondNumber, symbol) => {
    switch (action.symbol) {
      case "+":
        setAction({
          firstNumber: firstNumber + secondNumber,
          secondNumber: 0,
          symbol,
        });
        break;
      case "-":
        setAction({
          firstNumber: firstNumber - secondNumber,
          secondNumber: 0,
          symbol,
        });
        break;
      case "/":
        setAction({
          firstNumber: firstNumber / secondNumber,
          secondNumber: 0,
          symbol,
        });
        break;
      case "*":
        setAction({
          firstNumber: firstNumber * secondNumber,
          secondNumber: 0,
          symbol,
        });
        break;
    }
  };

  const clickHandler = (event) => {
    const value = event.target.dataset.value;
    const type = event.target.dataset.type;

    if (type === "number" && action.symbol && action.firstNumber) {
      const newNumber = action.secondNumber + value;
      setAction({
        ...action,
        secondNumber: parseInt(newNumber),
      });
    } else if (type === "number") {
      const newNumber = action.firstNumber + value;
      setAction({
        ...action,
        firstNumber: parseInt(newNumber),
      });
    } else if (type === "symbol") {
      if (action.secondNumber && action.firstNumber) {
        calculate(action.firstNumber, action.secondNumber, value);
      } else {
        setAction({
          ...action,
          symbol: value,
        });
      }
    } else if (type === "percentage") {
      percentage();
    } else if (type === "negativePositive") {
      negativePositive();
    } else if (type === "decimal") {
      decimal();
    } else if (type === "clear") {
      clear();
    }
  };

  return (
    <div className={"layout"}>
      <header className={"result"}>
        {action.secondNumber || action.firstNumber}
      </header>
      <section className="pad">
        <ul>
          {buttons.map((button) => {
            return (
              <li key={button.label} className={button.class}>
                <span
                  data-type={button.type}
                  data-value={button.label}
                  onClick={clickHandler}
                >
                  {button.label}
                </span>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export default Calculator;
