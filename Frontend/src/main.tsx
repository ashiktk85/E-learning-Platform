import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import store, { persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { CourseProvider } from "./context/courseContext.tsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "sonner";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CourseProvider>
          <Toaster richColors position="top-center" />
          <App />
        </CourseProvider>
      </PersistGate>
    </Provider>
  </QueryClientProvider>
  
);
