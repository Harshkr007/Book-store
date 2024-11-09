import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

//routing
import { RouterProvider } from "react-router-dom";
import router from "./routers/router.jsx";

//redux
import { Provider } from "react-redux";
import { store } from "./store/store.js";

//alert
import 'sweetalert2/dist/sweetalert2.js';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
