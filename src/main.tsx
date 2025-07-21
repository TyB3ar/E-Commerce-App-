import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./css/index.css"; 

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </Provider>
);