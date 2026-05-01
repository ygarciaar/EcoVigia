export function obtenerPrioridad(severidad) {
  if (severidad === "roja")     return 3;
  if (severidad === "naranja")  return 2;
  if (severidad === "amarilla") return 1;
  return 0;
}

export function ordenarAlertasPorPrioridad(arregloAlertas) {
  let n = arregloAlertas.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      let prioActual    = obtenerPrioridad(arregloAlertas[j].severidad);
      let prioSiguiente = obtenerPrioridad(arregloAlertas[j + 1].severidad);
      if (prioActual < prioSiguiente) {
        let temp              = arregloAlertas[j];
        arregloAlertas[j]     = arregloAlertas[j + 1];
        arregloAlertas[j + 1] = temp;
      }
    }
  }
  return arregloAlertas;
}

export function esDronElegible(dron) {
  return dron.estado === "en base" && dron.bateria > 20;
}

export function copiarArreglo(arr) {
  let copia = [];
  for (let i = 0; i < arr.length; i++) {
    copia[i] = arr[i];
  }
  return copia;
}

export function imprimirAsignaciones(asignaciones, asignacionesCount) {
  console.log("\n✅ DRONES ASIGNADOS A INCENDIOS");
  console.log("─────────────────────────────────────────────");

  if (asignacionesCount === 0) {
    console.log("   Ningún incendio pudo ser atendido.");
    return;
  }

  for (let i = 0; i < asignacionesCount; i++) {
    let a = asignaciones[i];
    console.log("\n  📍 Sector    : " + a.sector);
    console.log("     Severidad : " + a.severidad.toUpperCase());
    console.log("     Agua req. : " + a.aguaRequerida + " L");
    console.log("     Agua env. : " + a.aguaCubierta  + " L");
    console.log("     Drones    :");
    for (let j = 0; j < a.dronesCount; j++) {
      console.log("       → " + a.drones[j]);
    }
  }
}

export function imprimirNoAtendidas(noAtendidas, noAtendidasCount) {
  console.log("\n❌ ALERTAS NO ATENDIDAS (recursos insuficientes)");
  console.log("─────────────────────────────────────────────");

  if (noAtendidasCount === 0) {
    console.log("   Todas las alertas fueron cubiertas. ✔");
    return;
  }

  for (let i = 0; i < noAtendidasCount; i++) {
    let a = noAtendidas[i];
    console.log(
      "  ⚠️  " + a.sector +
      " [" + a.severidad.toUpperCase() + "]" +
      " — Requería " + a.aguaRequerida + " L"
    );
  }
}

export function imprimirAlertaMantenimiento(flota) {
  console.log("\n🔧 ALERTA DE MANTENIMIENTO (batería ≤ 20 %)");
  console.log("─────────────────────────────────────────────");

  let hayDrones = false;

  for (let i = 0; i < flota.length; i++) {
    if (flota[i].bateria <= 20) {
      console.log(
        "  🔴 " + flota[i].id +
        " — Batería: " + flota[i].bateria +
        " % | Estado: " + flota[i].estado
      );
      hayDrones = true;
    }
  }

  if (!hayDrones) {
    console.log("   Todos los drones tienen batería suficiente. ✔");
  }
}