import "./styles.css";
import { useState } from "react";
import BrandsService from "./services/brandsService";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="App">
      <h1>URL Converter V3 to V2</h1>
      {isLoading ? (
        <h5>Loading...</h5>
      ) : (
        <input type="button" value="test" onClick={handleConvertUrl} />
      )}
    </div>
  );
};

export default App;
