import React from "react";
import { ErrorBoundary as EB } from "react-error-boundary";

function Fallback({ error }: { error: Error }) {
    if (error.message === "APIKEY")
        return <p>Your apikey is invalid. You need a valid one to proceed</p>;
    return <p>An unexpected error occured</p>;
}

function ErrorBoundary({ children }: { children: React.ReactElement }) {
    return <EB FallbackComponent={Fallback}>{children}</EB>;
}

export default ErrorBoundary;
