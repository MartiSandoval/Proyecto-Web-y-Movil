const { supabase } = require("../../../../core/database/supabaseClient");
const cache = require("../../../../core/cache/inMemoryCache");

const CACHE_KEY = "sucursales:activas";
const CACHE_TTL = 10 * 60 * 1000; // 10 minutos

async function findAllActivas() {
  const cached = cache.get(CACHE_KEY);
  if (cached) return cached;

  const { data, error } = await supabase
    .from("sucursales")
    .select("id, nombre, tipo, direccion, telefono, email")
    .eq("activa", true);
  if (error) throw error;
  cache.set(CACHE_KEY, data, CACHE_TTL);
  return data;
}

async function insertSucursal({ nombre, tipo, direccion, telefono, email }) {
  const { data, error } = await supabase
    .from("sucursales")
    .insert({ nombre, tipo, direccion, telefono, email })
    .select("id, nombre, tipo")
    .single();
  if (error) throw error;
  cache.invalidate(CACHE_KEY);
  return data;
}

async function updateSucursal(id, { nombre, tipo, direccion, telefono, email }) {
  const { data, error } = await supabase
    .from("sucursales")
    .update({ nombre, tipo, direccion, telefono, email })
    .eq("id", id)
    .select("id, nombre")
    .single();
  if (error) throw error;
  cache.invalidate(CACHE_KEY);
  return data;
}

async function deleteSucursal(id) {
  const { data, error } = await supabase
    .from("sucursales")
    .delete()
    .eq("id", id)
    .select("id")
    .single();
  if (error) throw error;
  cache.invalidate(CACHE_KEY);
  return data;
}

module.exports = { findAllActivas, insertSucursal, updateSucursal, deleteSucursal };
