export enum ROUTES_IDS {
    layout = "layout",
    admin = "admin",
    dashboard = "dashboard",
}

export interface Metric {
    id: string;
    code: string;
    amounts: number[] | null;
    date: Date;
}
