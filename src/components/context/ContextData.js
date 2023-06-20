import React, { useState } from 'react';
import AllData from "../../allData.json"

const initialContext = {};

const DataContext = React.createContext(initialContext);

function DataProvider({ children }) {
  const [data, setData] = useState(AllData.Data);
  const dataSet = data => {
    setData(data);
  };
  return (
    <DataContext.Provider value={{ data: data, setData: dataSet }}>
      {children}
    </DataContext.Provider>
  );
}

export { DataContext, DataProvider };
