import 'colors'

export const mostrarMenu = () => new Promise( resolve => {
  
  console.clear()
  console.log('Seleccione una opcion\n'.cyan)
 
  console.log(`\t${ '1.'.green } Crear tarea`)
  console.log(`\t${ '2.'.green } Listar tareas`)
  console.log(`\t${ '3.'.green } Listar tareas completadas`)
  console.log(`\t${ '4.'.green } Listar tareas pendientes`)
  console.log(`\t${ '5.'.green } Completar tarea(s)`)
  console.log(`\t${ '6.'.green } Borrar tarea`)
  console.log(`\t${ '0.'.green } Salir\n`)
  
  
  const readline = require('readline').createInterface({
    input: process.stdin,
    output:process.stdout,
  })
  
  readline.question('Seleccione una opcion: ', (opt) => {
    readline.close()
    resolve(opt)
  })
})

export const pausa = () => new Promise( resolve => {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output:process.stdout,
  })

  readline.question(`\nPresione ${ 'ENTER'.green } para continuar\n`, (opt) => {
    readline.close()
    resolve()
  })
})

