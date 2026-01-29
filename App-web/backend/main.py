# main.py
import asyncio
import json
import os
import sys

# Agregar fallback al path local si es necesario
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from threading import Thread
from ping import MerakiMonitor

app = FastAPI()

# Permitir CORS para desarrollo
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

clients = set()
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATE_FILE = os.path.join(BASE_DIR, "estado.json")
CONFIG_FILE = os.path.join(BASE_DIR, "config.json")

# Instancia del monitor
monitor = MerakiMonitor(config_file=CONFIG_FILE, estado_file=STATE_FILE)

def guardar_estado(estado: dict):
    try:
        with open(STATE_FILE, "w", encoding="utf-8") as f:
            json.dump(estado, f, indent=4, ensure_ascii=False)
    except Exception as e:
        print(f"Error guardando estado: {e}")

def cargar_estado() -> dict:
    if os.path.exists(STATE_FILE):
        try:
            with open(STATE_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            print(f"Error cargando estado: {e}")
    return monitor.obtener_estado()

def start_monitor():
    monitor.ejecutar()

# Iniciar monitor en segundo plano
monitor_thread = Thread(target=start_monitor, daemon=True)
monitor_thread.start()

@app.websocket("/ws")
async def websocket_endpoint(ws: WebSocket):
    await ws.accept()
    clients.add(ws)
    try:
        await ws.send_text(json.dumps(cargar_estado(), ensure_ascii=False))
        while True:
            await asyncio.sleep(1)
    except Exception:
        pass
    finally:
        clients.remove(ws)

async def broadcast_loop():
    while True:
        await asyncio.sleep(monitor.config.get("intervalo_ping", 5))
        estado = monitor.obtener_estado()
        guardar_estado(estado)
        
        if clients:
            data = json.dumps(estado, ensure_ascii=False)
            remove_clients = []
            for ws in clients:
                try:
                    await ws.send_text(data)
                except:
                    remove_clients.append(ws)
            for ws in remove_clients:
                clients.remove(ws)

@app.on_event("startup")
async def startup_event():
    asyncio.create_task(broadcast_loop())

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=False)
