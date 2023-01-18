import React from "react";
import { render, screen, userEvent } from "../../tools/testUtils";

import { Metric } from "../../types";
import MetricWidgetForm, {
    MetricWidgetFormEditProps,
    MetricWidgetFormNewProps,
} from "./MetricWidgetForm";

const mockMetric: Metric = {
    id: "aaa",
    code: "bbb",
    amounts: [1, 2],
    date: new Date("10/10/2011"),
};

const mockEditProps: MetricWidgetFormEditProps = {
    originalMetric: mockMetric,
    onCancelChanges: vi.fn(),
    onSaveChanges: vi.fn(),
};

const mockNewProps: MetricWidgetFormNewProps = {
    isNew: true,
    onCancelChanges: vi.fn(),
    onSaveChanges: vi.fn(),
};

describe("MetricWidgetForm", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("Should display filled code, amount and date form inputs for an existing metric, plus buttons", () => {
        render(<MetricWidgetForm {...mockEditProps} />);

        expect(screen.getByLabelText("Code *")).toBeInTheDocument();
        expect(screen.getByDisplayValue(mockMetric.code)).toBeInTheDocument();

        expect(screen.getByLabelText("Amounts")).toBeInTheDocument();
        expect(screen.getByDisplayValue("1,2")).toBeInTheDocument();

        expect(screen.getByLabelText("Date *")).toBeInTheDocument();
        expect(screen.getByDisplayValue("2011-10-09")).toBeInTheDocument();

        expect(
            screen.getByRole("button", { name: "cancel" })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: "save changes" })
        ).toBeInTheDocument();
    });

    it("Should display empty ID, code, amount and date form inputs for a new metric, plus buttons", () => {
        render(<MetricWidgetForm {...mockNewProps} />);

        expect(screen.getByLabelText("ID *")).toBeInTheDocument();
        expect(screen.queryByDisplayValue(mockMetric.id)).toBeNull();
        expect(
            screen.getByRole("textbox", { name: "ID *" })
        ).toBeInTheDocument();

        expect(screen.getByLabelText("Code *")).toBeInTheDocument();
        expect(screen.queryByDisplayValue(mockMetric.code)).toBeNull();
        expect(
            screen.getByRole("textbox", { name: "Code *" })
        ).toBeInTheDocument();

        expect(screen.getByLabelText("Amounts")).toBeInTheDocument();
        expect(screen.queryByDisplayValue("1,2")).toBeNull();
        expect(
            screen.getByRole("textbox", { name: "Amounts" })
        ).toBeInTheDocument();

        expect(screen.getByLabelText("Date *")).toBeInTheDocument();
        expect(screen.queryByDisplayValue("2011-10-09")).toBeNull();
        expect(
            screen.getByDisplayValue(new Date().toISOString().substring(0, 10))
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", { name: "cancel" })
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: "save changes" })
        ).toBeInTheDocument();
    });

    it("Should call the prop onCancelChanges when cancel is clicked", async () => {
        const user = userEvent.setup();
        render(<MetricWidgetForm {...mockNewProps} />);

        await user.click(screen.getByRole("button", { name: "cancel" }));
        expect(mockNewProps.onCancelChanges).toHaveBeenCalledTimes(1);
    });

    it("Should disable both buttons when actionDisabled is true", () => {
        render(<MetricWidgetForm {...mockEditProps} actionDisabled />);

        expect(screen.getByRole("button", { name: "cancel" })).toBeDisabled();
        expect(
            screen.getByRole("button", { name: "save changes" })
        ).toBeDisabled();
    });

    it("Should disable the save button when there are no changes and enable it when there are some", async () => {
        const user = userEvent.setup();
        render(<MetricWidgetForm {...mockEditProps} />);

        expect(
            screen.getByRole("button", { name: "save changes" })
        ).toBeDisabled();

        await user.type(screen.getByRole("textbox", { name: "Code *" }), "aaa");

        expect(
            screen.getByRole("button", { name: "save changes" })
        ).toBeEnabled();
    });

    it("Should disable the save button when the amount value is incorrect and re-enable it when it correct", async () => {
        const user = userEvent.setup();
        render(<MetricWidgetForm {...mockEditProps} />);

        const $input = screen.getByRole("textbox", { name: "Amounts" });

        expect(
            screen.getByRole("button", { name: "save changes" })
        ).toBeDisabled();
        expect(
            screen.queryByText("Only numbers separeted by comma: 12,3,123")
        ).toBeNull();

        await user.type($input, "aaa");
        expect(
            screen.getByRole("button", { name: "save changes" })
        ).toBeDisabled();
        expect(
            screen.getByText("Only numbers separeted by comma: 12,3,123")
        ).toBeVisible();

        await user.clear($input);
        expect(
            screen.getByRole("button", { name: "save changes" })
        ).toBeEnabled();
        expect(
            screen.queryByText("Only numbers separeted by comma: 12,3,123")
        ).toBeNull();

        await user.type($input, "11,12");
        expect(
            screen.getByRole("button", { name: "save changes" })
        ).toBeEnabled();
        expect(
            screen.queryByText("Only numbers separeted by comma: 12,3,123")
        ).toBeNull();
    });

    it("Should call the onSave function with the metric properly formatted", async () => {
        const user = userEvent.setup();
        render(<MetricWidgetForm {...mockEditProps} />);

        await user.clear(screen.getByRole("textbox", { name: "Code *" }));
        await user.type(
            screen.getByRole("textbox", { name: "Code *" }),
            "Omega"
        );
        await user.type(
            screen.getByRole("textbox", { name: "Amounts" }),
            "12,45,56,"
        );
        await user.click(screen.getByRole("button", { name: "save changes" }));

        expect(mockEditProps.onSaveChanges).toHaveBeenCalledWith({
            id: "aaa",
            code: "Omega",
            amounts: [1, 212, 45, 56],
            date: new Date("10/10/2011"),
        });
    });
});
