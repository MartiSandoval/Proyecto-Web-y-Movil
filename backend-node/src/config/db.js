require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

const useMock = process.env.USE_MOCK !== "false";

let supabase = null;

if (!useMock) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) {
    throw new Error("SUPABASE_URL y SUPABASE_SERVICE_KEY son requeridos cuando USE_MOCK=false");
  }
  supabase = createClient(url, key);
}

module.exports = { supabase, useMock };
