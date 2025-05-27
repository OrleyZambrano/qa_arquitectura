@echo off
echo.
echo ================================
echo   QA ARQUITECTURA - DEMO
echo ================================
echo.
echo Iniciando proyecto de calidad de software...
echo.

REM Verificar si Node.js está instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js no está instalado
    echo Por favor instala Node.js desde https://nodejs.org/
    pause
    exit /b 1
)

REM Verificar si las dependencias están instaladas
if not exist "node_modules" (
    echo Instalando dependencias...
    npm install
    if %errorlevel% neq 0 (
        echo ERROR: Falló la instalación de dependencias
        pause
        exit /b 1
    )
)

echo.
echo ✅ Dependencias verificadas
echo.

REM Ejecutar tests rápidamente
echo Ejecutando tests...
npm test --silent
if %errorlevel% neq 0 (
    echo ⚠️  Algunos tests fallaron
) else (
    echo ✅ Todos los tests pasaron
)

echo.
echo 🚀 Iniciando servidor web en http://localhost:3000
echo.
echo Para detener el servidor presiona Ctrl+C
echo.

REM Iniciar el servidor
npm run server
