const { useMock, supabase } = require("../config/db");

// Obtener todas las sucursales
async function getSucursales(req, res, next) {
  try {
    const { data, error } = await supabase
      .from("sucursales")
      .select("*")
      .eq("activa", true);
      
    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
}

// Crear una sucursal nueva
async function crearSucursal(req, res, next) {
  try {
    const { nombre, tipo, direccion, telefono, email } = req.body;

    if (!nombre) {
      const err = new Error("El nombre de la sucursal es obligatorio");
      err.status = 400;
      return next(err);
    }

    const { data, error } = await supabase
      .from("sucursales")
      .insert({ nombre, tipo, direccion, telefono, email })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
}

// PUT 
async function actualizarSucursal(req, res, next) {
  try {
    const { id } = req.params; 
    const { nombre, tipo, direccion, telefono, email } = req.body;

    // Validación básica
    if (!id) {
      const err = new Error("El ID de la sucursal es obligatorio");
      err.status = 400;
      return next(err);
    }

    const { data, error } = await supabase
      .from("sucursales")
      .update({ nombre, tipo, direccion, telefono, email })
      .eq("id", id) 
      .select()
      .single();

    if (error) throw error;
    res.status(200).json(data); // 200 OK
  } catch (err) {
    next(err);
  }
}

// DELETE 
async function eliminarSucursal(req, res, next) {
  try {
    const { id } = req.params; 

    if (!id) {
      const err = new Error("El ID de la sucursal es obligatorio");
      err.status = 400;
      return next(err);
    }

    const { data, error } = await supabase
      .from("sucursales")
      .delete() // La función delete va vacía
      .eq("id", id) 
      .select()
      .single();

    if (error) throw error;
    res.status(200).json({ 
      mensaje: "Sucursal eliminada con éxito", 
      sucursal_eliminada: data 
    }); // 200 OK
  } catch (err) {
    next(err);
  }
}


module.exports = { getSucursales, crearSucursal, actualizarSucursal, eliminarSucursal };