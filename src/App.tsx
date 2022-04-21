import "./styles.css";
import { ChangeEvent, useState } from "react";
import BrandsService from "./services/brandsService";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isError, setIsError] = useState(false);
  const [outputValue, setOutputValue] = useState('TODO: You will see the result here')

  const handleConvertUrl = async () => {
    try {
      setIsLoading(true);
      const { brands, brandLines } = await BrandsService.getBrands();

      console.log({ brands, brandLines });
    } catch (e) {
      alert(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="App">
      <h3>New Link (V3):</h3>
      <input
        className="textField"
        value={inputValue}
        onChange={handleInputValueChange}
      />
      <h3>
        {isLoading ? (
          `Loading...`
        ) : (
          <input type="button" disabled={!inputValue.length} onClick={handleConvertUrl} value="Convert" />
        )}
      </h3>
      <h3>Old Link (V2):</h3>
      <p className={isError ? 'errorText' : undefined}>{`${isError ? 'ERROR:' : ''} ${outputValue}`}</p>
    </div>
  );
};

export default App;
