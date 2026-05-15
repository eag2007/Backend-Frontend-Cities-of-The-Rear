import React from "react";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { Outlet } from "react-router";
import { UserProvider } from "./Context/useAuth";

type Props = {};

const App = (props: Props) => {
  return (
    <div>
      <UserProvider>
        <Header />
        <Outlet />
        <Footer />
      </UserProvider>
    </div>
  );
};

export default App;
