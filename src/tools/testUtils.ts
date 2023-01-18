import { render } from "@testing-library/react";
import { vi } from "vitest";

// I can define a custom render here for the future

// re-export everything
export * from "@testing-library/react";
export { default as userEvent } from "@testing-library/user-event";

// override render method
export { render };

// vitest main object
export { vi };
