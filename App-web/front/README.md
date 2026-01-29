# Sistema de Monitoreo SGIC

Sistema integral de monitoreo de sucursales que permite la visualización en tiempo real del estado de conexión de tiendas y servicios.

## Características Principales

*   **Monitoreo en Tiempo Real**: Estado Online/Offline de sucursales.
*   **Gestión de Alarmas**:
    *   Alarma sonora y popup tras 2 minutos de desconexión.
    *   Aviso sonoro de recuperación si la desconexión fue prolongada.
*   **Visualización de Incidentes**: Tarjetas rojas (offline) y verdes (recuperadas).
*   **WebSocket**: Comunicación bidireccional entre Backend (Python) y Frontend (React).

## Estructura del Proyecto

*   `frontend/src`: Código fuente de la interfaz (React + Vite).
*   `frontend/backend`: Scripts de monitoreo (Python) y configuración.
*   `frontend/public/sounds`: Archivos de audio para alarmas.

## Requisitos Previos

1.  **Node.js**: Para ejecutar el Frontend.
2.  **Python 3.8+**: Para ejecutar el Backend.
3.  **Dependencias de Python**:
    *   `fastapi`
    *   `uvicorn`
    *   `websockets` (incluido en fastapi)
    
    Puedes instalarlas con:
    ```bash
    pip install fastapi uvicorn
    ```

## Instalación y Ejecución

Sigue estos pasos para poner en marcha el sistema:

### 1. Instalación de Dependencias del Frontend
Abre una terminal en la carpeta `frontend` y ejecuta:
```bash
npm install
```

### 2. Configuración (Opcional)
El archivo `frontend/backend/config.json` contiene la lista de sucursales a monitorear con sus IPs y metadatos.

### 3. Ejecución Automática (Recomendado)
Para iniciar tanto el Backend como el Frontend simultáneamente, simplemente ejecuta el archivo batch incluido:

1.  Ve a la carpeta `frontend`.
2.  Haz doble clic en **`start_app.bat`**.

Esto abrirá dos ventanas de consola:
*   Una para el servidor Python (puerto 8000).
*   Otra para el servidor de desarrollo Vite (puerto 5173 o similar).

### Ejecución Manual

**Backend:**
```bash
# Desde la carpeta frontend
python backend/main.py
```

**Frontend:**
```bash
# Desde la carpeta frontend
npm run dev
```

## Uso del Sistema

*   El dashboard mostrará automáticamente el estado de las sucursales.
*   **Estados**:
    *   🟢 **Online**: Funcionamiento normal.
    *   🔴 **Offline**: Sin respuesta de ping.
    *   🟡 **Warning**: Alta latencia (si configurado).
    *   ✅ **Verde (Recuperado)**: Sucursal que volvió a estar online tras una caída > 2 minutos (visible por 1 minuto).
