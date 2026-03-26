import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, 'data', 'products.json');

app.use(cors());
app.use(express.json());

// Helper to read data
const readData = () => {
    if (!fs.existsSync(DATA_FILE)) {
        return { categories: [], products: [] };
    }
    const raw = fs.readFileSync(DATA_FILE);
    return JSON.parse(raw);
};

// Helper to write data
const writeData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// API Routes
app.get('/api/products', (req, res) => {
    const data = readData();
    res.json(data);
});

app.post('/api/products', (req, res) => {
    const data = readData();
    const newProduct = { id: Date.now(), ...req.body };
    data.products.push(newProduct);
    writeData(data);
    res.status(201).json(newProduct);
});

// Basic Server Info
app.get('/', (req, res) => {
    res.send('Restaurant CMS Backend Running');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
