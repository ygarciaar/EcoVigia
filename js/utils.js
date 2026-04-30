export function obtenerPrioridad(severidad) {
  if (severidad === "roja") return 3;
  if (severidad === "naranja") return 2;
  if (severidad === "amarilla") return 1;
  return 0;
}

export function ordnarAlertasPorPrioridad(arregloAlertas) {
    let n = arregloAlertas.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
           let prioridadActual = obtenerPrioridad(arregloAlertas[j].severidad);
            let prioridadSiguiente = obtenerPrioridad(arregloAlertas[j + 1].severidad);
            if (prioridadActual < prioridadSiguiente) {
                let temp = arregloAlertas[j];
                arregloAlertas[j] = arregloAlertas[j + 1];
                arregloAlertas[j + 1] = temp;        
            }
        }
    }
    return arregloAlertas;
}