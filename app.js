import 'colors'

import { 
  inquirerMenu, 
  pausa,
  leerInput,
  listadoBorrar,
  confirmar,
  mostrarListadoCheckList
} from './helpers/inquirer.js'

import Tareas from './models/tareas.js'
import { guardarDB, initDB, leerDB } from './helpers/dataManagement.js'

const main = async () => {

  initDB()
  
  let opt = ''

  const tareas = new Tareas()

  const tareasDB = leerDB()

  if (tareasDB) {
    tareas.cargarTareasFromArray(tareasDB)
  }

  do {
    
    opt = await inquirerMenu()


    if ( opt === 1 ) {
      const desc = await leerInput('Descripcion: ')
      tareas.crearTarea( desc )
    }

    if ( opt === 2 ) {
      console.log()
      tareas.listadoCompleto()
    }
    
    if ( opt === 3 ) {
      console.log()
      tareas.listadoCompletadasPendientes()
        .map( ({formato}, i) => console.log(`   ${`${i + 1}.`.green} ${formato}`) )
    }
    
    if ( opt === 4 ) {
      console.log()
      tareas.listadoCompletadasPendientes(false)
        .map( ({formato}, i) => console.log(`   ${`${i + 1}.`.green} ${formato}`) )
    }

    if ( opt === 5) {
      console.log()
      const ids = await mostrarListadoCheckList(tareas.listadoFormateado)

      tareas.toggleCompletadas(ids)
    }
    
    if ( opt === 6 ) {
      const id = await listadoBorrar(tareas.listadoFormateado)

      if ( id !== 0 ){
        const ok = await confirmar('¿Seguro que quieres borrar esta tarea?, ¡esto es permante!')
  
        if ( ok ){
          tareas.borrarTarea(id)
          console.log('Tarea Borrada'.green)
        }
      }

    }

    guardarDB( tareas.listadoArr )

    if ( opt !== 0) {
      await pausa()
    }

  } while (opt !== 0)
  
  console.clear()

}

main()