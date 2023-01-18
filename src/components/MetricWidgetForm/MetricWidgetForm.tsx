import React from "react";

import { Metric } from "../../types";

type MetricEdit = Omit<Metric, "amounts"> & {
    hasChanges: boolean;
    amounts: string;
};

interface MetricWidgetFormProps {
    actionDisabled?: boolean;
    onCancelChanges: () => void;
    onSaveChanges: (metric: Metric) => Promise<void>;
}

export interface MetricWidgetFormEditProps extends MetricWidgetFormProps {
    isNew?: undefined | false;
    originalMetric: Metric;
}

export interface MetricWidgetFormNewProps extends MetricWidgetFormProps {
    isNew: true;
    originalMetric?: undefined;
}

/**
 *  Displays the inputs needed to edit a Metric
 */
function MetricWidgetForm({
    isNew,
    originalMetric,
    actionDisabled = false,
    onCancelChanges,
    onSaveChanges,
}: MetricWidgetFormEditProps | MetricWidgetFormNewProps) {
    const amountRef = React.useRef<HTMLInputElement>(null);
    const formRef = React.useRef<HTMLFormElement>(null);
    const [metric, setMetric] = React.useState<MetricEdit>(
        isNew
            ? {
                  hasChanges: false,
                  id: "",
                  code: "",
                  amounts: "",
                  date: new Date(),
              }
            : {
                  ...originalMetric,
                  hasChanges: false,
                  amounts: originalMetric.amounts
                      ? originalMetric.amounts.join(",")
                      : "",
              }
    );

    const isAmountValid = amountRef.current?.validity.valid ?? true;

    // I'm not checking for the same value in multiple Metrics because that's suppose to happen in the BEService
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
    const onSave: React.FormEventHandler = event => {
        event.preventDefault();
        if (!formRef.current?.checkValidity()) return;

        let amounts: Metric["amounts"];
        if (!metric.amounts.length) amounts = null;
        else if (metric.amounts.endsWith(","))
            amounts = metric.amounts
                .substring(0, metric.amounts.length - 1)
                .split(",")
                .map(val => parseInt(val));
        else amounts = metric.amounts.split(",").map(val => parseInt(val));

        onSaveChanges({
            id: metric.id,
            code: metric.code,
            date: metric.date,
            amounts,
        });
    };

    return (
        <article className="metric-widget-form">
            {isNew && (
                <p className="metric-widget-form__title">
                    Creating a new metric
                </p>
            )}
            {!isNew && (
                <p className="metric-widget-form__title">
                    Editing metric: {metric.id}
                </p>
            )}
            {isNew && (
                <div className="input-group">
                    <label htmlFor="id" className="input-group__label">
                        ID *
                    </label>
                    <input
                        required
                        className="input-group__input"
                        type="text"
                        id="id"
                        value={metric.id}
                        onChange={onIdChange}
                    />
                </div>
            )}
            <form ref={formRef} onSubmit={onSave}>
                <div className="input-group">
                    <label htmlFor="code" className="input-group__label">
                        Code *
                    </label>
                    <input
                        required
                        className="input-group__input"
                        type="text"
                        id="code"
                        value={metric.code}
                        onChange={onCodeChange}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="amounts" className="input-group__label">
                        Amounts
                    </label>
                    <input
                        className="input-group__input"
                        ref={amountRef}
                        type="text"
                        pattern="^[0-9,]*$"
                        id="amounts"
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
                        Date *
                    </label>
                    <input
                        required
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
                        type="submit"
                        className="button"
                        disabled={
                            actionDisabled ||
                            !metric.hasChanges ||
                            !isAmountValid
                        }
                    >
                        save changes
                    </button>
                </div>
            </form>
        </article>
    );
}

export default MetricWidgetForm;
