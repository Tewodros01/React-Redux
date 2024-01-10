import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  reset,
  set,
  selectCounterValue,
} from "../slices/counterSlice";

const Counter: React.FC = () => {
  const dispatch = useDispatch();
  const counterValue = useSelector(selectCounterValue);

  const [inputValue, setInputValue] = useState<string>("");

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  const handleReset = () => {
    dispatch(reset());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSetCount = () => {
    const parsedValue = parseInt(inputValue);
    if (!isNaN(parsedValue)) {
      dispatch(set(parsedValue));
      setInputValue("");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded">
      <h2 className="text-2xl font-bold mb-4">Counter Value: {counterValue}</h2>

      <div className="flex space-x-4 mb-4">
        <button
          onClick={handleIncrement}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
        >
          Increment
        </button>
        <button
          onClick={handleDecrement}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          Decrement
        </button>
        <button
          onClick={handleReset}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Reset
        </button>
      </div>

      <div className="flex items-center">
        <input
          className="border p-2 mr-2"
          placeholder="Set counter"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button
          onClick={handleSetCount}
          className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded"
        >
          Set Count
        </button>
      </div>
    </div>
  );
};

export default Counter;
