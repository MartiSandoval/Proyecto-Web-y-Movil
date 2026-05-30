require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_KEY;

if (!url || !key) {
  throw new Error("SUPABASE_URL y SUPABASE_SERVICE_KEY son requeridos");
}

const supabase = createClient(url, key);

module.exports = { supabase };
