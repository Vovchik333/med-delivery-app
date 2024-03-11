import path from 'node:path';
import { fileURLToPath } from 'node:url';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const STATIC_PATH = path.join(dirname, '..', 'public');
const HTML_STATIC_PATH = path.join(STATIC_PATH, 'html');

const PORT = process.env.PORT || 8080;

const MONGO_URL = process.env.MONGO_DB_URL || '';

export {
    STATIC_PATH,
    HTML_STATIC_PATH,
    PORT,
    MONGO_URL
}