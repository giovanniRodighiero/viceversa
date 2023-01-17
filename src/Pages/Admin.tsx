import React from "react";
import { useErrorHandler } from "react-error-boundary";

import MetricWidget from "../components/MetricWidget";
import MetricWidgetForm from "../components/MetricWidgetForm";

import { Metric } from "../types";
import Api from "../services/Api";

function Admin() {
    const handleApiError = useErrorHandler();

    const [isAdding, setIsAdding] = React.useState<boolean>(false);
    const [editingId, setEditingId] = React.useState<string>("");
    const [isEditingLoading, setIsEditingLoading] =
        React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [metrics, setMetrics] = React.useState<Metric[]>([]);

    React.useEffect(() => {
        fetchMetrics();
    }, []);

    const fetchMetrics = () => {
        setIsLoading(true);
        Api.getMetrics()
            .then(setMetrics)
            .catch(() => handleApiError(new Error("APIKEY"))) // To simplify, I'm assuming that the only exception thrown here is APIKEY related
            .finally(() => setIsLoading(false));
    };

    const onDelete = async (id: string) => {
        setIsEditingLoading(true);
        await Api.deleteMetric(id);
        setIsEditingLoading(false);
    };
    const onEditOpen = (id: string) => () => setEditingId(id);
    const onEditCancel = () => setEditingId("");
    const onEditSave = async (newMetric: Metric) => {
        setIsEditingLoading(true);
        await Api.updateMetric(newMetric);
        setEditingId("");
        setIsEditingLoading(false);
    };

    const onAddOne = () => setIsAdding(true);
    const onAddCancel = () => setIsAdding(false);
    const onAddSave = async (newMetric: Metric) => {
        setIsEditingLoading(true);
        await Api.addMetric(newMetric);
        setIsAdding(false);
        setIsEditingLoading(false);
    };

    return (
        <main>
            <section>
                <h1>Edit your metrics</h1>
            </section>
            <section>
                {isLoading && <p>loading</p>}
                {!isLoading && !metrics.length && (
                    <p>
                        there are no metrics available, but you can add one
                        below
                    </p>
                )}
                {!isLoading && metrics.length && (
                    <>
                        <ul>
                            {metrics.map(metric => (
                                <li key={metric.id}>
                                    {editingId === metric.id && (
                                        <MetricWidgetForm
                                            actionDisabled={isEditingLoading}
                                            originalMetric={metric}
                                            onSaveChanges={onEditSave}
                                            onCancelChanges={onEditCancel}
                                        />
                                    )}
                                    {editingId !== metric.id && (
                                        <div className="metric-row">
                                            <MetricWidget metric={metric} />
                                            <div className="metric-row__btns">
                                                <button
                                                    className="button"
                                                    disabled={isEditingLoading}
                                                    onClick={onEditOpen(
                                                        metric.id
                                                    )}
                                                >
                                                    edit
                                                </button>
                                                <button
                                                    className="button button--danger"
                                                    disabled={isEditingLoading}
                                                    onClick={() =>
                                                        onDelete(metric.id)
                                                    }
                                                >
                                                    delete
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                        {!isAdding && (
                            <button className="button" onClick={onAddOne}>
                                add new one
                            </button>
                        )}
                        {isAdding && (
                            <div>
                                <MetricWidgetForm
                                    isNew
                                    onCancelChanges={onAddCancel}
                                    onSaveChanges={onAddSave}
                                />
                            </div>
                        )}
                    </>
                )}
            </section>
        </main>
    );
}

export default Admin;
