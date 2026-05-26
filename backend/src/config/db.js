// backend/src/config/db.js
import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // Esto es obligatorio para conectarse a Supabase desde local
    }
});

// Probamos la conexión al iniciar
pool.connect()
    .then(() => console.log('✅ Conectado a la base de datos de Supabase exitosamente'))
    .catch((err) => console.error('❌ Error conectando a la base de datos:', err.message));

export default pool;