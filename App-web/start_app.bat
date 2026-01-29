@echo off
title SGIC Monitor - Launcher

REM Iniciar Backend
echo Iniciando Backend (Python/FastAPI)...
start "SGIC Backend" cmd /k "python backend/main.py"

REM Esperar unos segundos
timeout /t 3

REM Iniciar Frontend
echo Iniciando Frontend (Vite)...
start "SGIC Frontend" cmd /k "cd front && npm run dev"

echo Sistema iniciado. Cierre esta ventana para cerrar todo? No, debe cerrar cada ventana manualmente.
pause
