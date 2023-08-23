import 'colors'
import inquirer from 'inquirer'

const preguntas = [
  {
    type: 'list',
    name: 'opcion',
    message: '¿Que desea hacer?',
    choices: [
      {
        value: 1,
        name: ` ${ '•'.green }  Crear tarea`,
      },
      {
        value: 2,
        name: ` ${ '•'.green }  Listar tareas`,
      },
      {
        value: 3,
        name: ` ${ '•'.green }  Listar tareas completadas`,
      },
      {
        value: 4,
        name: ` ${ '•'.green }  Listar tareas pendientes`,
      },
      {
        value: 5,
        name: ` ${ '•'.green }  Completar tarea(s)`,
      },
      {
        value: 6,
        name: ` ${ '•'.green }  Borrar tarea`,
      },
      {
        value: 0,
        name: ` ${ '•'.green }  Salir`,
      },
  
    ]
  }
]

export const inquirerMenu = async () => {
  console.clear()
  console.log('Seleccione una opcion\n'.cyan)

  const { opcion } = await inquirer.prompt(preguntas)

  return opcion
}


export const pausa = async () => {
  console.log('\n')
  await inquirer.prompt([{
    type: 'input',
    name: 'input',
    message: `Presione ${ 'ENTER'.green } para continuar`
  }])

}


export const leerInput = async ( message ) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate( value ) {
        if( value.length === 0){
          return 'Necesita ingresar un valor'.red
        }
        return true
      }
    }
  ]

  const { desc } = await inquirer.prompt(question)

  return desc
}

export const listadoBorrar = async ( tareas = []) => {

  const choices = tareas.map( ({ id, formato }, i) => ({
    value: id,
    name: `   ${`${i + 1}.`.green} ${formato}`
  }))

  choices.unshift({
    value: 0,
    name: '   CANCELAR\n'.red
  })

  const question = {
    type: 'list',
    name: 'tareaSeleccionada',
    message: '¿Que tarea desea borrar?',
    choices
  }

  const { tareaSeleccionada } = await inquirer.prompt(question)

  return tareaSeleccionada
}

export const mostrarListadoCheckList = async ( tareas = []) => {

  const choices = tareas.map( ({ id, formato, completadaEn }, i) => ({
    value: id,
    name: formato,
    checked: completadaEn !== null
  }))

  const question = {
    type: 'checkbox',
    name: 'tareasSeleccionadas',
    message: 'Selecciones',
    choices
  }

  const { tareasSeleccionadas } = await inquirer.prompt(question)

  return tareasSeleccionadas
}

export const confirmar = async ( message ) => {
  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ]

  const { ok } = await inquirer.prompt(question)

  return ok
}