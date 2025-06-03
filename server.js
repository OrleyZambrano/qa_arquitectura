const express = require('express');
const path = require('path');

const app = express();
//app.disable('x-powered-by'); //solución para evitar el header x-powered-by
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para servir las clases compiladas (si existieran)
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Servidor de demo funcionando correctamente',
    timestamp: new Date().toISOString(),
    features: [
      'Calculator operations',
      'Validation utilities',
      'Quality metrics display',
      'Interactive testing tools',
    ],
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log('📊 Demo de Calidad de Software disponible');
  console.log('🔧 Presiona Ctrl+C para detener el servidor');
});

module.exports = app;
