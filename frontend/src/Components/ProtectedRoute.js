import React from 'react';
import { SessionAuth } from "supertokens-auth-react/recipe/session";

const ProtectedRoute = ({ children }) => {
    return (
        <SessionAuth>
            {children}
        </SessionAuth>
    );
};

export default ProtectedRoute;
