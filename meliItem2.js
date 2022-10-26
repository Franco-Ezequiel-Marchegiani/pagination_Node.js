const axios = require ('axios');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const credenciales = require('../../credentials/google.json') //assert { type: "json" };
//const {Config} = require('../config/index.js');
require('dotenv').config();

let urlTodasPublicaciones = "https://api.mercadolibre.com/users/394109866/items/search"
let headerTodasPublicaciones = {Authorization:"Bearer APP_USR-7901019873881213-102608-dd80ddabc90aa72a16c7d42ed8a06ed9-394109866"}
let paramsTodasPublicaciones = {limit:'50',offset:0, total: 117}


const callMeli = async (urlTodasPublicaciones,head, paramsTodasPublicaciones) => {
    let response = await axios({ 
        method:'get', 
        url: urlTodasPublicaciones, 
        headers: head, 
        params : paramsTodasPublicaciones})         //Llamada a la API por producto (Venti)
    try{
            
        //Inicia función para pasar la info al Sheet
        (async () =>{
                    
            async function exportaSheet(){
                const documento = new GoogleSpreadsheet(googleId);
                await documento.useServiceAccountAuth(credenciales);
                await documento.loadInfo();

                const sheet =documento.sheetsByIndex[0];                                        //Selecciona la hoja a la cual plasmará el contenido, el valor se lo pasa por parámetro para no repetir
                await sheet.clearRows();                                                        //Limpia las columnas
                
                await sheet.addRows(arrayElementosObjeto);                                           //Añade la información del array
            };
            // exportaSheet()
            let page = Math.ceil(response.data.paging.total / response.data.paging.limit )
            console.log(page);
            allitems = [];
            for(let i=0; i<page;i++) {
                const page_items = await axios ({
                    method:'get', 
                    url: urlTodasPublicaciones+`?offset=${i * 50}`,
                    headers: head, 
                })
                allitems.push(...page_items.data.results)

            }
            console.log(allitems)
        })();
    }
    catch(error){
        console.log(error)
    }
}
var of = 0;
callMeli(urlTodasPublicaciones, headerTodasPublicaciones,paramsTodasPublicaciones)
