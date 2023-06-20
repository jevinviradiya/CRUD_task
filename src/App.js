
import './App.css';
import CreateData from './components/createData/CreateData';
import ListTable from './components/tableList/ListTable';
import { Navigate } from 'react-router-dom';
import { useRoutes } from "react-router-dom";

function App() {
  let element = useRoutes([
    { path: "/", element: <Navigate to="/list" />, exact: true },
    {
      path: "/list",
      children: [
        {
          path: "",
          element: <ListTable />,
          exact: true
        },
        {
          path: "edit/:id",
          element: <CreateData />,
          exact: true
        },
        { path: "create", element: <CreateData />, exact: true },
      ],
      exact: true
    },
  ]);
  
  return element;
}

export default App;
