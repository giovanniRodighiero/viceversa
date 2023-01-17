import React from "react";
import { useErrorHandler } from "react-error-boundary";

import { Metric } from "../types";
import Api from "../services/Api";

function Dashboard() {
    const handleApiError = useErrorHandler();

    const [loading, setLoading] = React.useState<boolean>(false);
    const [metrics, setMetrics] = React.useState<Metric[]>([]);

    React.useEffect(() => {
        fetchMetrics();
    }, []);

    const fetchMetrics = () => {
        setLoading(true);
        Api.getMetrics()
            .then(setMetrics)
            .catch(() => handleApiError(new Error("APIKEY"))) // To simplify, I'm assuming that the only exception thrown here is APIKEY related
            .finally(() => setLoading(false));
    };

    return (
        <main>
            <section>
                <h1>Your metrics</h1>
            </section>
            <section>
                <p>metrics</p>
            </section>
        </main>
    );
}

export default Dashboard;
