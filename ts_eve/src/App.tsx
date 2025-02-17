import "./App.css";
import Header from "./components/header/Header";
import SideNavContainer from "./components/nav/SideNavContainer";
import { OrderProvider } from "./services/OrderProvider";
import OrderContainer from "./components/orders/OrderContainer";
import { EveTypeProvider } from "./services/TypeProvider";

function App() {
  return (
    <>
      <EveTypeProvider>
        <OrderProvider>
          <Header />
          <div className="body">
            <SideNavContainer />
            <OrderContainer />
          </div>
        </OrderProvider>
      </EveTypeProvider>
    </>
  );
}

export default App;
