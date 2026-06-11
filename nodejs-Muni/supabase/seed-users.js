// Crea las cuentas de prueba para el revisor.
// Requiere backend-node/.env configurado con SUPABASE_URL y SUPABASE_SERVICE_KEY.
// Ejecutar una sola vez, después de schema.sql y seed.sql.
//
// Uso: node supabase/seed-users.js   (o: npm run seed:users)

require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')
const bcrypt = require('bcrypt')

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('ERROR: Faltan SUPABASE_URL o SUPABASE_SERVICE_KEY en backend-node/.env')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
})

const SALT_ROUNDS = 12

const TEST_USERS = [
  {
    email: 'ciudadano@prueba.cl',
    password: 'Test1234!',
    nombre: 'Juan Ciudadano',
    rut: '11111111-1',
    telefono: '912345678',
    rol: 'usuario',
    sucursal_nombre: null,
  },
  {
    email: 'funcionario@prueba.cl',
    password: 'Test1234!',
    nombre: 'Ana Funcionaria',
    rut: '22222222-2',
    telefono: '987654321',
    rol: 'funcionario',
    sucursal_nombre: 'DIDECO',
  },
]

async function getSucursalId(nombre) {
  if (!nombre) return null
  const { data, error } = await supabase
    .from('sucursales')
    .select('id')
    .eq('nombre', nombre)
    .single()
  if (error || !data) {
    console.warn(`  AVISO: No se encontró la sucursal "${nombre}". ¿Ejecutaste seed.sql?`)
    return null
  }
  return data.id
}

async function createTestUser(user) {
  console.log(`\nCreando cuenta: ${user.rut} (${user.rol})`)

  // Verificar si el RUT ya existe
  const { data: existing } = await supabase
    .from('perfiles')
    .select('id')
    .eq('rut', user.rut)
    .maybeSingle()

  if (existing) {
    console.log(`  Ya existe, se omite.`)
    return
  }

  // Crear usuario en auth.users (el trigger crea el perfil base automáticamente)
  let userId
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email: user.email,
    password: user.password,
    user_metadata: { nombre: user.nombre, rut: user.rut },
    email_confirm: true,
  })

  if (authError) {
    if (authError.message?.includes('already been registered')) {
      console.log(`  Email ya registrado, actualizando perfil existente...`)
      const { data: usersData } = await supabase.auth.admin.listUsers()
      const found = usersData?.users?.find(u => u.email === user.email)
      if (!found) {
        console.error(`  ERROR: No se pudo localizar el usuario por email.`)
        return
      }
      userId = found.id
    } else {
      console.error(`  ERROR al crear auth user: ${authError.message}`)
      return
    }
  } else {
    userId = authData.user.id
  }
  const sucursalId = await getSucursalId(user.sucursal_nombre)
  const passwordHash = await bcrypt.hash(user.password, SALT_ROUNDS)

  // Actualizar perfil con datos completos
  const { error: updateError } = await supabase
    .from('perfiles')
    .update({
      nombre: user.nombre,
      rut: user.rut,
      telefono: user.telefono,
      rol: user.rol,
      sucursal_id: sucursalId,
      password_hash: passwordHash,
    })
    .eq('id', userId)

  if (updateError) {
    console.error(`  ERROR al actualizar perfil: ${updateError.message}`)
    return
  }

  console.log(`  OK — RUT: ${user.rut} | Pass: ${user.password} | Rol: ${user.rol}`)
}

async function main() {
  console.log('=== Seed de cuentas de prueba ===')
  for (const user of TEST_USERS) {
    await createTestUser(user)
  }
  console.log('\nListo. Cuentas disponibles para el revisor:')
  console.log('  RUT 11111111-1 / Test1234!  →  rol usuario    (flujo ciudadano)')
  console.log('  RUT 22222222-2 / Test1234!  →  rol funcionario (panel de gestión)')
}

main().catch(err => {
  console.error('Error inesperado:', err)
  process.exit(1)
})
