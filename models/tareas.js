import Tarea from './tarea.js'

export default class Tareas {

  _listado = {}

  constructor() {
    this._listado = {}
  }

  get listadoArr() {
    const listado = []
  
    Object.keys(this._listado).forEach( key => {
      listado.push( this._listado[key] )
    })

    return listado
  }

  get listadoFormateado() {
    return this.listadoArr.map( (tarea, i) => {
      const idx = `${i + 1}.`.green

      const { desc, completadaEn } = tarea

      const estado = completadaEn ? `${`Completado`.green} ${`(${completadaEn})`.cyan }` : 'Pendiente'.yellow

      return { ...tarea, formato: `${desc} :: ${estado}`}
    })
  }

  crearTarea( desc = '' ) {
    const tarea = new Tarea(desc)
    this._listado[tarea.id] = tarea
  }

  cargarTareasFromArray( tareas = [] ) {
    tareas.forEach( tarea => {
      this._listado[tarea.id] = tarea
    })
  }

  listadoCompleto() {
    this.listadoFormateado.map( ({formato}, i) => console.log(`   ${`${i + 1}.`.green} ${formato}`) )
  }

  listadoCompletadasPendientes( completa = true ) {
    return this.listadoFormateado
      .filter( tarea => ( tarea.completadaEn === null ) !== completa)
  }

  borrarTarea( id = '') {
    if( this._listado[id] ){
      delete this._listado[id]
    }
  }

  toggleCompletadas( ids = [] ){
    this.listadoArr.forEach( ({ id }) => {

      if( ids.includes(id) ) {
        this._listado[id].completadaEn ??= new Date().toISOString()
        return;
      }

      this._listado[id].completadaEn = null

    })
  }
}