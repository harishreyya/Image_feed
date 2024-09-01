import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import Passwordless from "supertokens-auth-react/recipe/passwordless";
import Session from "supertokens-auth-react/recipe/session";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { PasswordlessPreBuiltUI } from 'supertokens-auth-react/recipe/passwordless/prebuiltui';
import { Home } from './Components/Home';
import ProtectedRoute from './Components/ProtectedRoute';

SuperTokens.init({
    appInfo: {
        appName: "superToken",
        apiDomain: "http://localhost:5002",
        websiteDomain: "http://localhost:3000",
        apiBasePath: "/auth",
        websiteBasePath: "/auth"
    },
    recipeList: [
        Passwordless.init({
            contactMethod: "EMAIL"
        }),
        Session.init()
    ]
});

function App() {
    return (
        <SuperTokensWrapper>
            <BrowserRouter>
                <Routes>
                    {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"), [PasswordlessPreBuiltUI])}
                    <Route path='/' element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    } /></Routes>
            </BrowserRouter>
        </SuperTokensWrapper>
    );
}


export default App;
