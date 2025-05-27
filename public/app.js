// Proyecto Calidad de Software - JavaScript Frontend
// Implementación de Calculator y ValidationUtils para la web

// Simulación de las clases del backend (normalmente se importarían desde módulos compilados)
class Calculator {
    add(a, b) {
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new Error('Ambos argumentos deben ser números');
        }
        if (!Number.isFinite(a) || !Number.isFinite(b)) {
            throw new Error('Los números deben ser finitos');
        }
        return a + b;
    }

    subtract(a, b) {
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new Error('Ambos argumentos deben ser números');
        }
        if (!Number.isFinite(a) || !Number.isFinite(b)) {
            throw new Error('Los números deben ser finitos');
        }
        return a - b;
    }

    multiply(a, b) {
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new Error('Ambos argumentos deben ser números');
        }
        if (!Number.isFinite(a) || !Number.isFinite(b)) {
            throw new Error('Los números deben ser finitos');
        }
        return a * b;
    }

    divide(a, b) {
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new Error('Ambos argumentos deben ser números');
        }
        if (!Number.isFinite(a) || !Number.isFinite(b)) {
            throw new Error('Los números deben ser finitos');
        }
        if (b === 0) {
            throw new Error('División por cero no permitida');
        }
        return a / b;
    }

    power(base, exponent) {
        if (typeof base !== 'number' || typeof exponent !== 'number') {
            throw new Error('Ambos argumentos deben ser números');
        }
        if (!Number.isFinite(base) || !Number.isFinite(exponent)) {
            throw new Error('Los números deben ser finitos');
        }
        return Math.pow(base, exponent);
    }

    sqrt(value) {
        if (typeof value !== 'number') {
            throw new Error('El argumento debe ser un número');
        }
        if (!Number.isFinite(value)) {
            throw new Error('El número debe ser finito');
        }
        if (value < 0) {
            throw new Error('No se puede calcular la raíz cuadrada de un número negativo');
        }
        return Math.sqrt(value);
    }
}

class ValidationUtils {
    static validateEmail(email) {
        if (!email || typeof email !== 'string') {
            throw new Error('Email es requerido y debe ser una cadena');
        }

        const trimmedEmail = email.trim();

        if (trimmedEmail.length === 0) {
            throw new Error('Email no puede estar vacío');
        }

        // Patrón más restrictivo para email
        const emailPattern = /^[a-zA-Z0-9]([a-zA-Z0-9._-]*[a-zA-Z0-9])?@[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+$/;

        if (!emailPattern.test(trimmedEmail)) {
            throw new Error('Formato de email inválido');
        }

        // Verificaciones adicionales
        if (trimmedEmail.length > 254) {
            throw new Error('Email demasiado largo');
        }

        const [localPart, domainPart] = trimmedEmail.split('@');

        if (localPart.length > 64) {
            throw new Error('Parte local del email demasiado larga');
        }

        if (localPart.startsWith('.') || localPart.endsWith('.')) {
            throw new Error('La parte local no puede comenzar o terminar con punto');
        }

        if (localPart.includes('..')) {
            throw new Error('La parte local no puede contener puntos consecutivos');
        }

        return true;
    }

    static validatePassword(password) {
        if (!password || typeof password !== 'string') {
            throw new Error('Contraseña es requerida y debe ser una cadena');
        }

        if (password.length < 8) {
            throw new Error('La contraseña debe tener al menos 8 caracteres');
        }

        if (!/[A-Z]/.test(password)) {
            throw new Error('La contraseña debe contener al menos una letra mayúscula');
        }

        if (!/[a-z]/.test(password)) {
            throw new Error('La contraseña debe contener al menos una letra minúscula');
        }

        if (!/\d/.test(password)) {
            throw new Error('La contraseña debe contener al menos un número');
        }

        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
            throw new Error('La contraseña debe contener al menos un carácter especial');
        }

        return true;
    }

    static validateRequired(value, fieldName = 'Campo') {
        if (value === null || value === undefined) {
            throw new Error(`${fieldName} es requerido`);
        }

        if (typeof value === 'string' && value.trim().length === 0) {
            throw new Error(`${fieldName} no puede estar vacío`);
        }

        return true;
    }
}

// Instancia global de calculator
const calculator = new Calculator();

// Variables para la calculadora visual
let currentInput = '0';
let previousInput = '';
let operator = null;
let waitingForOperand = false;

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
    updateCalculatorDisplay();
});

function initializeApp() {
    // Configurar navegación entre secciones
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetSection = button.getAttribute('data-section');

            // Remover clase activa de todos los botones y secciones
            navButtons.forEach(btn => btn.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));

            // Activar botón y sección correspondiente
            button.classList.add('active');
            document.getElementById(targetSection).classList.add('active');
        });
    });

    // Configurar validaciones en tiempo real
    setupRealTimeValidation();
}

function setupRealTimeValidation() {
    // Email validation
    const emailInput = document.getElementById('email-input');
    if (emailInput) {
        emailInput.addEventListener('input', (e) => validateEmailReal(e.target.value));
    }

    // Password validation
    const passwordInput = document.getElementById('password-input');
    if (passwordInput) {
        passwordInput.addEventListener('input', (e) => validatePasswordReal(e.target.value));
    }

    // Required fields validation
    const nameInput = document.getElementById('required-name');
    const surnameInput = document.getElementById('required-surname');

    if (nameInput) {
        nameInput.addEventListener('input', (e) => validateRequiredReal('name', e.target.value));
    }

    if (surnameInput) {
        surnameInput.addEventListener('input', (e) => validateRequiredReal('surname', e.target.value));
    }
}

// === FUNCIONES DE CALCULADORA VISUAL ===

function updateCalculatorDisplay() {
    const display = document.getElementById('calc-display');
    const history = document.getElementById('calc-history');

    if (display) {
        display.textContent = currentInput;
    }

    if (history && previousInput && operator) {
        history.textContent = `${previousInput} ${getOperatorSymbol(operator)}`;
    } else if (history) {
        history.textContent = '';
    }
}

function getOperatorSymbol(op) {
    const symbols = {
        '+': '+',
        '-': '-',
        '*': '×',
        '/': '÷'
    };
    return symbols[op] || op;
}

function appendNumber(number) {
    if (waitingForOperand) {
        currentInput = number;
        waitingForOperand = false;
    } else {
        currentInput = currentInput === '0' ? number : currentInput + number;
    }
    updateCalculatorDisplay();
}

function appendOperator(nextOperator) {
    const inputValue = parseFloat(currentInput);

    if (previousInput === '') {
        previousInput = inputValue;
    } else if (operator) {
        const currentValue = previousInput || 0;
        const result = performCalculation(currentValue, inputValue, operator);

        currentInput = String(result);
        previousInput = result;
    }

    waitingForOperand = true;
    operator = nextOperator;
    updateCalculatorDisplay();
}

function calculate() {
    const inputValue = parseFloat(currentInput);

    if (previousInput !== '' && operator) {
        const currentValue = previousInput || 0;
        const result = performCalculation(currentValue, inputValue, operator);

        currentInput = String(result);
        previousInput = '';
        operator = null;
        waitingForOperand = false;
        updateCalculatorDisplay();
    }
}

function performCalculation(a, b, op) {
    try {
        switch (op) {
            case '+':
                return calculator.add(a, b);
            case '-':
                return calculator.subtract(a, b);
            case '*':
                return calculator.multiply(a, b);
            case '/':
                return calculator.divide(a, b);
            default:
                return b;
        }
    } catch (error) {
        showNotification(error.message, 'error');
        return 0;
    }
}

function clearCalculator() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    waitingForOperand = false;
    updateCalculatorDisplay();
}

function clearEntry() {
    currentInput = '0';
    updateCalculatorDisplay();
}

function backspace() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = '0';
    }
    updateCalculatorDisplay();
}

// === FUNCIONES DE OPERACIONES BÁSICAS ===

function performBasicOperation() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const operation = document.getElementById('operation').value;
    const resultDiv = document.getElementById('basic-result');

    try {
        let result;
        let operationName;

        switch (operation) {
            case 'add':
                result = calculator.add(num1, num2);
                operationName = 'Suma';
                break;
            case 'subtract':
                result = calculator.subtract(num1, num2);
                operationName = 'Resta';
                break;
            case 'multiply':
                result = calculator.multiply(num1, num2);
                operationName = 'Multiplicación';
                break;
            case 'divide':
                result = calculator.divide(num1, num2);
                operationName = 'División';
                break;
            default:
                throw new Error('Operación no válida');
        }

        showResult(resultDiv, `${operationName}: ${num1} ${getOperatorSymbol(operation.replace('add', '+').replace('subtract', '-').replace('multiply', '*').replace('divide', '/'))} ${num2} = <strong>${result}</strong>`, 'success');
    } catch (error) {
        showResult(resultDiv, `Error: ${error.message}`, 'error');
    }
}

function calculatePower() {
    const base = parseFloat(document.getElementById('power-base').value);
    const exponent = parseFloat(document.getElementById('power-exp').value);
    const resultDiv = document.getElementById('power-result');

    try {
        const result = calculator.power(base, exponent);
        showResult(resultDiv, `Potencia: ${base}<sup>${exponent}</sup> = <strong>${result}</strong>`, 'success');
    } catch (error) {
        showResult(resultDiv, `Error: ${error.message}`, 'error');
    }
}

function calculateSqrt() {
    const number = parseFloat(document.getElementById('sqrt-num').value);
    const resultDiv = document.getElementById('sqrt-result');

    try {
        const result = calculator.sqrt(number);
        showResult(resultDiv, `Raíz cuadrada: √${number} = <strong>${result}</strong>`, 'success');
    } catch (error) {
        showResult(resultDiv, `Error: ${error.message}`, 'error');
    }
}

// === FUNCIONES DE VALIDACIÓN ===

function validateEmail() {
    const email = document.getElementById('email-input').value;
    const resultDiv = document.getElementById('email-result');

    try {
        ValidationUtils.validateEmail(email);
        showResult(resultDiv, `✓ Email válido: <strong>${email}</strong>`, 'success');
    } catch (error) {
        showResult(resultDiv, `✗ ${error.message}`, 'error');
    }
}

function validateEmailReal(email) {
    const input = document.getElementById('email-input');
    const validation = document.getElementById('email-validation');

    if (!email.trim()) {
        hideValidation(input, validation);
        return;
    }

    try {
        ValidationUtils.validateEmail(email);
        showValidation(input, validation, '✓ Email válido', 'success');
    } catch (error) {
        showValidation(input, validation, `✗ ${error.message}`, 'error');
    }
}

function validatePassword() {
    const password = document.getElementById('password-input').value;
    const resultDiv = document.getElementById('password-result');

    try {
        ValidationUtils.validatePassword(password);
        showResult(resultDiv, '✓ Contraseña segura y válida', 'success');
    } catch (error) {
        showResult(resultDiv, `✗ ${error.message}`, 'error');
    }
}

function validatePasswordReal(password) {
    const input = document.getElementById('password-input');
    const validation = document.getElementById('password-validation');

    // Actualizar criterios visuales
    updatePasswordCriteria(password);

    if (!password.trim()) {
        hideValidation(input, validation);
        return;
    }

    try {
        ValidationUtils.validatePassword(password);
        showValidation(input, validation, '✓ Contraseña segura', 'success');
    } catch (error) {
        showValidation(input, validation, `✗ ${error.message}`, 'error');
    }
}

function updatePasswordCriteria(password) {
    const criteria = {
        'length-check': password.length >= 8,
        'uppercase-check': /[A-Z]/.test(password),
        'lowercase-check': /[a-z]/.test(password),
        'number-check': /\d/.test(password),
        'special-check': /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    };

    Object.entries(criteria).forEach(([id, passed]) => {
        const element = document.getElementById(id);
        if (element) {
            element.style.color = passed ? 'var(--success-color)' : 'var(--error-color)';
            element.style.fontWeight = passed ? 'bold' : 'normal';
        }
    });
}

function validateRequiredReal(fieldName, value) {
    const input = document.getElementById(`required-${fieldName}`);
    const validation = document.getElementById(`${fieldName}-validation`);

    if (!value || !value.trim()) {
        showValidation(input, validation, `✗ ${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} es requerido`, 'error');
        return;
    }

    try {
        ValidationUtils.validateRequired(value, fieldName.charAt(0).toUpperCase() + fieldName.slice(1));
        showValidation(input, validation, `✓ ${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} válido`, 'success');
    } catch (error) {
        showValidation(input, validation, `✗ ${error.message}`, 'error');
    }
}

function validateAllRequired() {
    const name = document.getElementById('required-name').value;
    const surname = document.getElementById('required-surname').value;
    const resultDiv = document.getElementById('required-result');

    const errors = [];

    try {
        ValidationUtils.validateRequired(name, 'Nombre');
    } catch (error) {
        errors.push(error.message);
    }

    try {
        ValidationUtils.validateRequired(surname, 'Apellido');
    } catch (error) {
        errors.push(error.message);
    }

    if (errors.length === 0) {
        showResult(resultDiv, `✓ Formulario válido:<br><strong>Nombre:</strong> ${name}<br><strong>Apellido:</strong> ${surname}`, 'success');
    } else {
        showResult(resultDiv, `✗ Errores encontrados:<br>• ${errors.join('<br>• ')}`, 'error');
    }
}

// === FUNCIONES DE MÉTRICAS Y HERRAMIENTAS ===

function runTests() {
    const resultDiv = document.getElementById('test-results');
    showResult(resultDiv, 'Ejecutando tests...', 'warning');

    // Simular ejecución de tests
    setTimeout(() => {
        showResult(resultDiv, `
            <strong>Tests ejecutados exitosamente:</strong><br>
            • Calculator tests: ✓ 20 passed<br>
            • ValidationUtils tests: ✓ 19 passed<br>
            • Total: <strong>39/39 tests passed</strong><br>
            • Cobertura: <strong>85%</strong>
        `, 'success');

        // Actualizar métricas
        document.getElementById('test-count').textContent = '39';
        document.getElementById('test-coverage').textContent = '85%';
    }, 2000);
}

function runLinting() {
    const resultDiv = document.getElementById('lint-results');
    showResult(resultDiv, 'Analizando código con ESLint...', 'warning');

    setTimeout(() => {
        showResult(resultDiv, `
            <strong>Análisis de código completado:</strong><br>
            • 0 errores encontrados<br>
            • 0 advertencias<br>
            • Complejidad ciclomática: 2.1<br>
            • ✓ Código cumple con estándares de calidad
        `, 'success');

        document.getElementById('eslint-issues').textContent = '0';
        document.getElementById('complexity').textContent = '2.1';
    }, 1500);
}

function formatCode() {
    const resultDiv = document.getElementById('format-results');
    showResult(resultDiv, 'Formateando código con Prettier...', 'warning');

    setTimeout(() => {
        showResult(resultDiv, `
            <strong>Formateo completado:</strong><br>
            • 12 archivos procesados<br>
            • 3 archivos modificados<br>
            • ✓ Código formateado según estándares
        `, 'success');
    }, 1000);
}

// === FUNCIONES AUXILIARES ===

function showResult(element, message, type) {
    element.innerHTML = message;
    element.className = `result show ${type}`;
}

function showValidation(input, validation, message, type) {
    validation.textContent = message;
    validation.className = `validation-message show ${type}`;
    input.className = input.className.replace(/\b(success|error)\b/g, '') + ` ${type}`;
}

function hideValidation(input, validation) {
    validation.className = 'validation-message';
    input.className = input.className.replace(/\b(success|error)\b/g, '');
}

function showNotification(message, type = 'info') {
    // Crear notificación temporal
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'error' ? 'var(--error-color)' : 'var(--primary-color)'};
        color: white;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Agregar estilos para las animaciones de notificación
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Función para manejar teclado en calculadora
document.addEventListener('keydown', function (event) {
    const activeSection = document.querySelector('.section.active');
    if (activeSection && activeSection.id === 'calculator') {
        const key = event.key;

        if ('0123456789'.includes(key)) {
            appendNumber(key);
        } else if (key === '.') {
            if (!currentInput.includes('.')) {
                appendNumber('.');
            }
        } else if (key === '+') {
            appendOperator('+');
        } else if (key === '-') {
            appendOperator('-');
        } else if (key === '*') {
            appendOperator('*');
        } else if (key === '/') {
            event.preventDefault();
            appendOperator('/');
        } else if (key === 'Enter' || key === '=') {
            event.preventDefault();
            calculate();
        } else if (key === 'Escape' || key === 'c' || key === 'C') {
            clearCalculator();
        } else if (key === 'Backspace') {
            backspace();
        }
    }
});

// Mostrar mensaje de bienvenida
setTimeout(() => {
    showNotification('¡Bienvenido al Demo de Calidad de Software! Explora las diferentes secciones.', 'success');
}, 1000);
