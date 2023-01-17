import React from "react";

import { Metric } from "../../types";

interface MetricWidgetFormProps {
    isNew?: boolean; // Should be able to edit the id field or not
    originalMetric: Metric;
    actionDisabled?: boolean;
    onCancelChanges: () => void;
    onSaveChanges: (metric: Metric) => Promise<void>;
}

type MetricEdit = Omit<Metric, "amounts"> & {
    hasChanges: boolean;
    amounts: string;
};

/**
 *  Displays the inputs needed to edit a Metric
 */
function MetricWidgetForm({
    isNew = false,
    originalMetric,
    actionDisabled = false,
    onCancelChanges,
    onSaveChanges,
}: MetricWidgetFormProps) {
    const amountRef = React.useRef<HTMLInputElement>(null);
    const [metric, setMetric] = React.useState<MetricEdit>({
        ...originalMetric,
        hasChanges: false,
        amounts: originalMetric.amounts ? originalMetric.amounts.join(",") : "",
    });

    const isAmountValid = amountRef.current?.validity.valid ?? true;

    const onIdChange: React.ChangeEventHandler<HTMLInputElement> = event =>
        setMetric(prev => ({
            ...prev,
            hasChanges: true,
            id: event.target.value,
        }));
    const onCodeChange: React.ChangeEventHandler<HTMLInputElement> = event =>
        setMetric(prev => ({
            ...prev,
            hasChanges: true,
            code: event.target.value,
        }));
    const onDateChange: React.ChangeEventHandler<HTMLInputElement> = event =>
        setMetric(prev => ({
            ...prev,
            hasChanges: true,
            date: new Date(event.target.value),
        }));
    const onAmountsChange: React.ChangeEventHandler<HTMLInputElement> = event =>
        setMetric(prev => ({
            ...prev,
            hasChanges: true,
            amounts: event.target.value,
        }));
    const onSave = () => {
        let amounts = metric.amounts;
        if (amounts.endsWith(","))
            amounts = amounts.slice(0, amounts.length - 1);

        onSaveChanges({
            id: metric.id,
            code: metric.code,
            date: metric.date,
            amounts: amounts.split(",").map(val => parseInt(val)),
        });
    };

    return (
        <article className="metric-widget-form">
            {isNew && (
                <div className="input-group">
                    <label htmlFor="id" className="input-group__label">
                        ID
                    </label>
                    <input
                        className="input-group__input"
                        type="text"
                        id="id"
                        value={metric.id}
                        onChange={onIdChange}
                    />
                </div>
            )}
            <div className="input-group">
                <label htmlFor="code" className="input-group__label">
                    Code
                </label>
                <input
                    className="input-group__input"
                    type="text"
                    id="code"
                    value={metric.code}
                    onChange={onCodeChange}
                />
            </div>
            <div className="input-group">
                <label htmlFor="value" className="input-group__label">
                    Value
                </label>
                <input
                    className="input-group__input"
                    ref={amountRef}
                    type="text"
                    pattern="^[0-9,]*$"
                    id="value"
                    value={metric.amounts}
                    onChange={onAmountsChange}
                />
                {!isAmountValid && (
                    <p className="input-group__tip">
                        Only numbers separeted by comma: 12,3,123
                    </p>
                )}
            </div>
            <div className="input-group">
                <label htmlFor="date" className="input-group__label">
                    Date
                </label>
                <input
                    className="input-group__input"
                    type="date"
                    id="date"
                    value={metric.date.toISOString().substring(0, 10)}
                    onChange={onDateChange}
                />
            </div>
            <div className="input-group--btns">
                <button
                    className="button button--ghost"
                    disabled={actionDisabled}
                    onClick={onCancelChanges}
                >
                    cancel
                </button>
                <button
                    className="button"
                    disabled={
                        actionDisabled || !isAmountValid || !metric.hasChanges
                    }
                    onClick={onSave}
                >
                    save changes
                </button>
            </div>
        </article>
    );
}

export default MetricWidgetForm;
