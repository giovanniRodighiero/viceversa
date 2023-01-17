import React from "react";
import { useErrorHandler } from "react-error-boundary";

import MetricWidget from "../components/MetricWidget";

import { Metric } from "../types";
import Api from "../services/Api";

function Dashboard() {
    const handleApiError = useErrorHandler();

    const [isLoading, setisLoading] = React.useState<boolean>(false);
    const [metrics, setMetrics] = React.useState<Metric[]>([]);

    React.useEffect(() => {
        fetchMetrics();
    }, []);

    const fetchMetrics = () => {
        setisLoading(true);
        Api.getMetrics()
            .then(setMetrics)
            .catch(() => handleApiError(new Error("APIKEY"))) // To simplify, I'm assuming that the only exception thrown here is APIKEY related
            .finally(() => setisLoading(false));
    };

    return (
        <main>
            <section>
                <h1>Your metrics</h1>
            </section>
            <section>
                {isLoading && <p>loading</p>}
                {!isLoading && !metrics.length && (
                    <p>there are no metrics available</p>
                )}
                {!isLoading && metrics.length && (
                    <ul>
                        {metrics.map(metric => (
                            <li key={metric.id}>
                                <MetricWidget metric={metric} />
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    );
}

export default Dashboard;
