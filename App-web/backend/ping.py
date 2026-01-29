# ping.py
import subprocess
import time
import json
import logging
from datetime import datetime
import threading
import os
from typing import Dict, Tuple

# Configuración de logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('meraki_monitor.log'),
        logging.StreamHandler()
    ]
)

class MerakiMonitor:
    def __init__(self, config_file: str = 'config.json', estado_file: str = 'estado.json'):
        self.config_file = config_file
        self.estado_file = estado_file
        self.config = self.load_config()
        self.status: Dict[str, Dict] = {}
        self.lock = threading.Lock()
        self.running = True
        self.init_status()
        self.cargar_estado_json()  # Cargar estado previo si existe

    # -----------------------------
    # Configuración
    # -----------------------------
    def load_config(self) -> Dict:
        default_config = {
            "locales": [
                {"nombre": "Local 1", "ip": "192.168.1.1", "ciudad": "Ciudad 1"},
                {"nombre": "Local 2", "ip": "192.168.1.2", "ciudad": "Ciudad 2"},
            ],
            "intervalo_ping": 5,
            "timeout": 2,
            "intentos": 3
        }
        if os.path.exists(self.config_file):
            try:
                with open(self.config_file, 'r') as f:
                    return json.load(f)
            except Exception as e:
                logging.error(f"Error al cargar configuración: {e}")
        with open(self.config_file, 'w') as f:
            json.dump(default_config, f, indent=4)
        logging.info(f"Archivo de configuración creado: {self.config_file}")
        return default_config

    # -----------------------------
    # Inicialización del estado
    # -----------------------------
    def init_status(self):
        for local in self.config["locales"]:
            self.status[local["nombre"]] = {
                "nombre": local["nombre"],
                "ip": local["ip"],
                "ciudad": local.get("ciudad", ""),
                "codigo_servicio": local.get("codigo_servicio", ""),
                "compania": local.get("compania", ""),
                "telefono_compania": local.get("telefono_compania", ""),
                "activo": True,
                "tiempo_respuesta": 0.0,
                "ultimo_check": None,
                "ultimo_cambio": None,
                "cambios": False
            }

    # -----------------------------
    # Persistencia
    # -----------------------------
    def guardar_estado_json(self):
        with self.lock:
            try:
                with open(self.estado_file, "w", encoding="utf-8") as f:
                    json.dump(self.status, f, indent=4, ensure_ascii=False)
            except Exception as e:
                logging.error(f"Error guardando estado: {e}")

    def cargar_estado_json(self):
        if os.path.exists(self.estado_file):
            try:
                with open(self.estado_file, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    with self.lock:
                        for nombre in self.status:
                            if nombre in data:
                                self.status[nombre].update(data[nombre])
                        # Opción: Si quisieras preservar estado de dispositivos que ya no están en config,
                        # podrías agregarlos, pero por ahora nos ceñimos estrictamente a lo que diga config.json.
            except Exception as e:
                logging.error(f"Error cargando estado previo: {e}")

    # -----------------------------
    # Ping
    # -----------------------------
    def ping_host(self, ip: str, intentos: int = 3) -> Tuple[bool, float]:
        param = "-n" if os.name == "nt" else "-c"
        timeout_param = "-w" if os.name == "nt" else "-W"
        for _ in range(intentos):
            try:
                result = subprocess.run(
                    ["ping", param, "1", timeout_param, str(self.config["timeout"]), ip],
                    capture_output=True,
                    text=True,
                    timeout=self.config["timeout"] + 1
                )
                if result.returncode == 0:
                    return True, self.extraer_tiempo(result.stdout)
            except subprocess.TimeoutExpired:
                return False, 0.0
            except Exception as e:
                logging.error(f"Error ping {ip}: {e}")
        return False, 0.0

    def extraer_tiempo(self, salida: str) -> float:
        """
        Extrae el tiempo de respuesta del ping en ms de manera robusta.
        Funciona para:
            - Windows (español / inglés)
            - Linux / Mac
        """
        import re

        # Buscar cualquier número seguido de "ms"
        match = re.search(r"(\d+(?:\.\d+)?)\s*ms", salida)
        if match:
            return float(match.group(1))

        # Buscar tiempo aproximado en español (Windows)
        match = re.search(r"Tiempo aproximado = (\d+)ms", salida, re.IGNORECASE)
        if match:
            return float(match.group(1))

        # Buscar "time=<num>ms" estilo Linux
        match = re.search(r"time[=<]\s*(\d+(?:\.\d+)?)\s*ms", salida, re.IGNORECASE)
        if match:
            return float(match.group(1))

        return 0.0

    # -----------------------------
    # Verificación de locales
    # -----------------------------
    def verificar_local(self, local: Dict):
        nombre = local["nombre"]
        ip = local["ip"]
        ciudad = local.get("ciudad", "")
        activo, tiempo = self.ping_host(ip, self.config["intentos"])
        with self.lock:
            anterior = self.status[nombre]["activo"]
            cambios = anterior != activo
            ultimo_cambio = self.status[nombre].get("ultimo_cambio")
            if cambios:
                ultimo_cambio = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

            self.status[nombre].update({
                "activo": activo,
                "tiempo_respuesta": tiempo,
                "ultimo_check": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                "ultimo_cambio": ultimo_cambio,
                "cambios": cambios
            })
            if cambios:
                logging.info(f"{nombre} ({ciudad}) cambio estado a {'ONLINE' if activo else 'OFFLINE'}")

    def verificar_todos(self):
        threads = []
        for local in self.config["locales"]:
            t = threading.Thread(target=self.verificar_local, args=(local,))
            t.start()
            threads.append(t)
        for t in threads:
            t.join()

    # -----------------------------
    # Estado
    # -----------------------------
    def obtener_estado(self) -> Dict:
        with self.lock:
            return dict(self.status)

    def mostrar_estado_terminal(self):
        os.system('cls' if os.name=="nt" else 'clear')
        print("="*80)
        print("MONITOR MERAKI - ESTADO EN TIEMPO REAL")
        print(f"Actualizado: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        print("="*80)
        with self.lock:
            for nombre, datos in sorted(self.status.items()):
                estado = "[ONLINE] " if datos["activo"] else "[OFFLINE]"
                tiempo = f"{datos['tiempo_respuesta']}ms" if datos['tiempo_respuesta'] > 0 else "-"
                cambios = " * CAMBIO" if datos['cambios'] else ""
                print(f"{estado} {nombre:20} ({datos['ciudad']:15}) | IP: {datos['ip']:15} | Tiempo: {tiempo:8} | Último check: {datos['ultimo_check']}{cambios}")
        total = len(self.status)
        online = sum(1 for d in self.status.values() if d["activo"])
        offline = total - online
        print("-"*80)
        print(f"RESUMEN: {online}/{total} ONLINE ({online/total*100:.1f}%) | {offline} OFFLINE")
        print(f"Próxima verificación en {self.config['intervalo_ping']} segundos...")
        print("="*80)

    # -----------------------------
    # Loop principal
    # -----------------------------
    def ejecutar(self):
        logging.info(f"Monitor iniciado ({len(self.config['locales'])} locales)")
        while self.running:
            try:
                inicio = time.time()
                self.verificar_todos()
                self.mostrar_estado_terminal()
                self.guardar_estado_json()
                
                # Calcular tiempo restante para cumplir el ciclo
                duracion = time.time() - inicio
                sleep_time = max(0, self.config["intervalo_ping"] - duracion)
                
                logging.debug(f"Ciclo completado en {duracion:.2f}s. Durmiendo {sleep_time:.2f}s")
                time.sleep(sleep_time)
            except KeyboardInterrupt:
                logging.info("Monitor detenido por el usuario")
                self.running = False
                break
            except Exception as e:
                logging.error(f"Error en ciclo principal: {e}")
                time.sleep(1)


if __name__ == "__main__":
    monitor = MerakiMonitor()
    monitor.ejecutar()
