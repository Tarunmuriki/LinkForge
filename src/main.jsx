import React from "react";import {createRoot} from "react-dom/client";import {BrowserRouter} from "react-router-dom";import {QueryClient,QueryClientProvider} from "@tanstack/react-query";import AppRoutes from "./routes/AppRoutes";import "./index.css";
const qc=new QueryClient({defaultOptions:{queries:{staleTime:30000,refetchOnWindowFocus:false}}});
createRoot(document.getElementById("root")).render(<React.StrictMode><QueryClientProvider client={qc}><BrowserRouter><AppRoutes/></BrowserRouter></QueryClientProvider></React.StrictMode>);
