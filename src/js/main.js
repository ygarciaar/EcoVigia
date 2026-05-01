import { flota, alertas } from "./data.js";
import {
  ordenarAlertasPorPrioridad,
  esDronElegible,
  copiarArreglo,
  imprimirAsignaciones,
  imprimirNoAtendidas,
  imprimirAlertaMantenimiento
} from "./utils.js";

let disponible = [];
for (let i = 0; i < flota.length; i++) {
  disponible[i] = esDronElegible(flota[i]);
}

let alertasOrdenadas = copiarArreglo(alertas);
ordenarAlertasPorPrioridad(alertasOrdenadas);

let asignaciones      = [];
let asignacionesCount = 0;
let noAtendidas       = [];
let noAtendidasCount  = 0;

for (let i = 0; i < alertasOrdenadas.length; i++) {
  let alerta = alertasOrdenadas[i];

  let aguaAcumulada        = 0;
  let dronesAsignados      = [];
  let dronesCount          = 0;
  let indicesSeleccionados = [];
  let indicesCount         = 0;

  for (let j = 0; j < flota.length; j++) {
    if (aguaAcumulada >= alerta.aguaRequerida) break;
    if (disponible[j]) {
      aguaAcumulada                      += flota[j].agua;
      dronesAsignados[dronesCount]        = flota[j].id;
      dronesCount++;
      indicesSeleccionados[indicesCount]  = j;
      indicesCount++;
      disponible[j] = false;
    }
  }

  if (aguaAcumulada >= alerta.aguaRequerida) {
    asignaciones[asignacionesCount] = {
      sector:        alerta.sector,
      severidad:     alerta.severidad,
      aguaRequerida: alerta.aguaRequerida,
      aguaCubierta:  aguaAcumulada,
      drones:        dronesAsignados,
      dronesCount:   dronesCount
    };
    asignacionesCount++;
    for (let k = 0; k < indicesCount; k++) {
      flota[indicesSeleccionados[k]].estado = "en vuelo";
    }
  } else {
    for (let k = 0; k < indicesCount; k++) {
      disponible[indicesSeleccionados[k]] = true;
    }
    noAtendidas[noAtendidasCount] = alerta;
    noAtendidasCount++;
  }
}

console.log("╔══════════════════════════════════════════════╗");
console.log("║      🚁  REPORTE FINAL — ECOVIGÍA  🚁        ║");
console.log("╚══════════════════════════════════════════════╝");

imprimirAsignaciones(asignaciones, asignacionesCount);
imprimirNoAtendidas(noAtendidas, noAtendidasCount);
imprimirAlertaMantenimiento(flota);

console.log("\n══════════════════════════════════════════════");
console.log("  Fin del reporte EcoVigía.");
console.log("══════════════════════════════════════════════\n");