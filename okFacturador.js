
const fs = require('fs/promises')
const path = require('path')
const direccion = path.join(__dirname, './FACTURAS/factura.txt')

const parseData = (dataPlana) => {
    const arrayDatos = dataPlana.split("\n")
    const objetoMapeado = {
        description: arrayDatos[0].split('\r')[0],
        name: arrayDatos[1].split('\r')[0],
        code: arrayDatos[2].split(' ')[1].split('\r')[0],
        cant: arrayDatos[3].split(' ')[1].split('\r')[0],
        value: parseInt(arrayDatos[4].split(' ')[1])
    }
    return objetoMapeado
}

const leerArchivo = async (nombreArchivo) => {
    const direccion= path.join(__dirname,`./FACTURAS/${nombreArchivo}`);
    const data = await fs.readFile(direccion, "utf-8")
    return parseData(data)
}

const leerdirectorio = async () => {
    const directorio = await fs.readdir(path.join(__dirname, './FACTURAS'))
    const resultado = directorio.map(leerArchivo)
    const datos= await Promise.all(resultado);
    return datos;
}

const obtenerTotal=async (arrayData)=>{
    const facturas = await leerdirectorio()
    const total= facturas.reduce((acc, actual, i)=>{
        return acc+actual.value
    },0)
    console.log(total);
}
obtenerTotal()