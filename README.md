# Proyecto de Calidad de Software

Este proyecto demuestra las mejores prácticas y herramientas para mantener alta calidad en el desarrollo de software.

## 🚀 Características

- **TypeScript**: Tipado estático para prevenir errores
- **ESLint**: Análisis estático de código para detectar problemas
- **Prettier**: Formateo automático de código
- **Jest**: Framework de testing con cobertura de código
- **Husky**: Git hooks para mantener calidad en cada commit
- **Lint-staged**: Ejecuta linting solo en archivos modificados
- **Frontend Interactivo**: Interfaz web moderna para demostrar funcionalidades
- **Express Server**: Servidor web para servir la aplicación frontend

## 📦 Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd qa_arquitectura

# Instalar dependencias
npm install

# Configurar git hooks
npm run prepare
```

## 🛠️ Scripts Disponibles

### Desarrollo
- `npm run dev` - Ejecuta el proyecto en modo desarrollo
- `npm run build` - Compila TypeScript a JavaScript
- `npm start` - Ejecuta la versión compilada

### Frontend
- `npm run server` - Inicia el servidor web en http://localhost:3000
- `npm run server:dev` - Inicia el servidor con auto-reload
- `npm run frontend` - Alias para iniciar el servidor

### Testing
- `npm test` - Ejecuta todos los tests
- `npm run test:watch` - Ejecuta tests en modo watch
- `npm run test:coverage` - Ejecuta tests con reporte de cobertura

### Calidad de Código
- `npm run lint` - Ejecuta ESLint para detectar problemas
- `npm run lint:fix` - Ejecuta ESLint y corrige problemas automáticamente
- `npm run format` - Formatea el código con Prettier
- `npm run format:check` - Verifica si el código está formateado correctamente
- `npm run quality:check` - Ejecuta todas las verificaciones de calidad

## 🌐 Demo Interactivo

Para probar la aplicación completa:

1. **Iniciar el servidor:**
   ```bash
   npm run server
   ```

2. **Abrir en el navegador:**
   - Navega a [http://localhost:3000](http://localhost:3000)
   - La aplicación incluye 4 secciones principales:
     - **Calculadora**: Operaciones matemáticas con validación
     - **Validaciones**: Sistema de validación de datos en tiempo real
     - **Métricas**: Indicadores de calidad del proyecto
     - **Herramientas**: Información sobre el stack tecnológico

3. **Funcionalidades disponibles:**
   - Calculadora visual con teclado y mouse
   - Operaciones básicas y avanzadas (potencia, raíz cuadrada)
   - Validación de email con retroalimentación en tiempo real
   - Validación de contraseñas con criterios de seguridad
   - Validación de campos requeridos
   - Simulación de ejecución de tests y análisis de código

## 📁 Estructura del Proyecto

```
qa_arquitectura/
├── src/
│   ├── __tests__/          # Tests unitarios
│   │   ├── calculator.test.ts
│   │   └── validation.test.ts
│   ├── calculator.ts       # Clase Calculator con operaciones matemáticas
│   ├── validation.ts       # Utilidades de validación
│   └── index.ts           # Punto de entrada principal
├── public/                 # Frontend web
│   ├── index.html         # Interfaz web principal
│   ├── styles.css         # Estilos CSS modernos
│   └── app.js             # Lógica JavaScript del frontend
├── coverage/              # Reportes de cobertura de tests
├── dist/                  # Código TypeScript compilado
├── server.js              # Servidor Express para el frontend
├── .eslintrc.js           # Configuración de ESLint
├── .prettierrc            # Configuración de Prettier
├── .lintstagedrc          # Configuración de lint-staged
├── jest.config.js         # Configuración de Jest
├── tsconfig.json          # Configuración de TypeScript
└── package.json           # Dependencias y scripts
```

## 🧪 Ejemplos de Uso

### Calculator
```typescript
import { Calculator } from './calculator';

const calc = new Calculator();
console.log(calc.add(5, 3)); // 8
console.log(calc.divide(10, 2)); // 5
console.log(calc.sqrt(16)); // 4
```

### Validation
```typescript
import { ValidationUtils } from './validation';

// Validar email
const isValid = ValidationUtils.isValidEmail('user@example.com'); // true

// Validar contraseña
const result = ValidationUtils.validatePassword('MyPassword123!');
console.log(result.isValid); // true
```

## 📊 Métricas de Calidad

### Cobertura de Código
- **Objetivo**: Mínimo 70% de cobertura
- **Configuración**: Definida en `jest.config.js`
- **Comando**: `npm run test:coverage`

### Reglas de ESLint
- Complejidad máxima: 10
- Máximo 50 líneas por función
- Máximo 4 niveles de anidación
- Variables no utilizadas: Error
- Funciones sin tipo de retorno: Warning

### Estándares de Prettier
- Punto y coma: Requerido
- Comillas simples
- Ancho máximo de línea: 80 caracteres
- Indentación: 2 espacios

## 🔧 Herramientas de Desarrollo Recomendadas

### VS Code Extensions
- **ESLint**: Integración de ESLint
- **Prettier**: Formateo automático
- **Jest**: Soporte para testing
- **TypeScript Importer**: Auto-importación

### Configuración VS Code
Agrega al `.vscode/settings.json`:
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

## 🎯 Mejores Prácticas Implementadas

### 1. **Principios SOLID**
- Responsabilidad única: Cada clase tiene un propósito específico
- Abierto/Cerrado: Extensible sin modificar código existente
- Sustitución de Liskov: Interfaces consistentes
- Segregación de interfaces: Interfaces específicas
- Inversión de dependencias: Abstracción sobre concreción

### 2. **Testing**
- Tests unitarios completos
- Casos de prueba para escenarios positivos y negativos
- Manejo de errores y casos límite
- Cobertura de código mínima del 70%

### 3. **Documentación**
- JSDoc para todas las funciones públicas
- README detallado
- Comentarios explicativos en código complejo
- Ejemplos de uso claros

### 4. **Validación de Entrada**
- Validación de tipos de datos
- Manejo de casos límite
- Mensajes de error descriptivos
- Prevención de inyección de código

## 🚨 Git Hooks (Husky)

El proyecto está configurado con git hooks que ejecutan automáticamente:

### Pre-commit
- Ejecuta ESLint en archivos modificados
- Aplica formateo con Prettier
- Ejecuta tests relacionados

### Pre-push
- Ejecuta suite completa de tests
- Verifica cobertura de código
- Valida que no hay errores de linting

## 📈 Monitoreo Continuo

### SonarQube (Configuración opcional)
Para análisis de calidad avanzado, puedes configurar SonarQube:

1. Instalar SonarQube Scanner
2. Crear `sonar-project.properties`
3. Configurar pipeline de CI/CD

### GitHub Actions (Configuración opcional)
Ejemplo de workflow para CI/CD:
```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm run quality:check
```

## 🎓 Aprendizaje

Este proyecto sirve como ejemplo educativo para:
- Configuración de herramientas de calidad
- Escritura de tests efectivos
- Implementación de principios SOLID
- Uso de TypeScript para prevenir errores
- Automatización de procesos de calidad

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📝 Licencia

ISC License - ve el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Soporte

Si tienes preguntas o sugerencias:
- Abre un issue en GitHub
- Revisa la documentación
- Consulta los ejemplos en el código

---

**¡Happy coding!** 🚀
