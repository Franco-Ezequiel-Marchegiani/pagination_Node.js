Guardo en nuevo repositorio este archivo con una paginación funcional de la api de MercadoLibre.
Crea una variable llamada page, y calcula el total de elementos, dividido por el limite (en este caso, 117 / 50).
Luego crea un array vacío, que sirve como contenedor.
Por último, creamos un for para recorrer las páginas, hacemos otra llamada a la api, y suplantamos su valor de offset acorde al límite.
Y por último, pusheamos el resultado al array que creamos previamente