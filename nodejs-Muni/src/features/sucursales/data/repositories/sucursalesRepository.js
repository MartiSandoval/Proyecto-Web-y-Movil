const { supabase } = require("../../../../core/database/supabaseClient");

async function findAllActivas() {
  const { data, error } = await supabase
    .from("sucursales")
    .select("id, nombre, tipo, direccion, telefono, email")
    .eq("activa", true);
  if (error) throw error;
  return data;
}

async function insertSucursal({ nombre, tipo, direccion, telefono, email }) {
  const { data, error } = await supabase
    .from("sucursales")
    .insert({ nombre, tipo, direccion, telefono, email })
    .select("id, nombre, tipo")
    .single();
  if (error) throw error;
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
  return data;
}

module.exports = { findAllActivas, insertSucursal, updateSucursal, deleteSucursal };
