import { defineConfig } from "eslint/config";
import next from "eslint-config-next";
import reactCompiler from "eslint-plugin-react-compiler";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig([{
    extends: [...next],
    plugins: {
        "react-compiler": reactCompiler,
    },
    rules: {
        "react-compiler/react-compiler": "error",
    },
}]);
