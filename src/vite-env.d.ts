/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_APIKEY: string;
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
