import React from "react";

import { Metric } from "../../types";

function MetricWidget({ metric }: { metric: Metric }) {
    const formattedDate = metric.date.toISOString().substring(0, 10);
    return (
        <p>
            {metric.code} -{" "}
            {metric.amounts ? metric.amounts.join(", ") : "N.A."} -{" "}
            {formattedDate}
        </p>
    );
}

export default MetricWidget;
