import "./styles.css";
import { ChangeEvent, useState } from "react";
import UrlConverter from "./helpers/URLConverter";
import UrlValidator from "./helpers/UrlValidator";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [resultJson, setResultJson] = useState("");
  const [outputValue, setOutputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleConvertUrl = async () => {
    try {
      setIsLoading(true);
      setInputValue(decodeURIComponent(inputValue));
      const result = await UrlConverter.convertUrl(
        decodeURIComponent(inputValue)
      );

      setOutputValue(result.convertedUrl);
      setResultJson(JSON.stringify(result.result, null, 2));
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setOutputValue("");
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(outputValue);
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
          <input
            type="button"
            disabled={
              !inputValue.length || !UrlValidator.isPlpV3Url(inputValue)
            }
            onClick={handleConvertUrl}
            value="Convert"
          />
        )}
      </h3>
      {!errorMessage && outputValue ? (
        <div>
          <h2>Result:</h2>
          <pre>{resultJson}</pre>
          <h3>Old Link (V2):</h3>
          <p>{`${outputValue}`}</p>
          <input
            type="button"
            value="Copy to clipboard"
            onClick={handleCopyToClipboard}
          />
        </div>
      ) : (
        <p className="errorText">{errorMessage}</p>
      )}
    </div>
  );
};

export default App;
