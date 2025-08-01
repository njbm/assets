(function (global) {
    const defaultOptions = {
        theme: 'light',
        accent: '#0984e3'
    };

    // Inject CSS styles into <head>
    function injectStyles(accent, theme) {
        if (document.getElementById('rcalc-style')) return;
        const style = document.createElement('style');
        style.id = 'rcalc-style';
        style.textContent = `
:root {
  --rcalc-accent: ${accent};
  --rcalc-bg: #fff;
  --rcalc-fg: #222;
  --rcalc-btn-bg: #e4e7ed;
  --rcalc-btn-hover: #b2bec3;
  --rcalc-btn-special: var(--rcalc-accent);
  --rcalc-btn-special-fg: #fff;
}
body.rcalc-dark, .rcalc-dark {
  --rcalc-bg: #222;
  --rcalc-fg: #f5f6fa;
  --rcalc-btn-bg: #34495e;
  --rcalc-btn-hover: #636e72;
}
.rcalc-calc {
  background: var(--rcalc-bg);
  color: var(--rcalc-fg);
  border-radius: 14px;
  box-shadow: 0 10px 40px rgba(44,62,80,.18);
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  width: 350px;
  max-width: 98vw;
  font-family: 'Segoe UI', Arial, sans-serif;
}
.rcalc-calc header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: .5rem;
}
.rcalc-calc input[type="text"] {
  width: 100%;
  height: 3rem;
  font-size: 1.6rem;
  border: 1px solid #eee;
  border-radius: 6px;
  margin-bottom: 1rem;
  padding: 0 14px;
  background: #f9fafb;
  color: var(--rcalc-fg);
  text-align: right;
  letter-spacing: 1px;
}
.rcalc-buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}
.rcalc-calc button {
  height: 48px;
  font-size: 1.1rem;
  background: var(--rcalc-btn-bg);
  color: var(--rcalc-fg);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background .14s, color .14s;
  outline: none;
}
.rcalc-calc button[data-action="equals"],
.rcalc-calc button[data-action="history"],
.rcalc-calc button[data-action="fun-mode"],
.rcalc-calc button[data-action="pi"] {
  background: var(--rcalc-btn-special);
  color: var(--rcalc-btn-special-fg);
}
.rcalc-calc button:active, .rcalc-calc button:focus {
  background: var(--rcalc-btn-hover);
}
.rcalc-calc #rcalc-theme-toggle {
  background: none;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
}
.rcalc-calc #rcalc-accent-picker {
  border: none;
  background: none;
  width: 32px;
  height: 32px;
  padding: 0;
  margin-left: 6px;
}
.rcalc-calc .rcalc-zero {
  grid-column: span 2;
}
.rcalc-calc #rcalc-history {
  max-height: 120px;
  overflow-y: auto;
  margin-top: 14px;
  background: #f4f5fa;
  border-radius: 6px;
  padding: 0.5em;
  font-size: .95em;
  color: #888;
}
.rcalc-calc #rcalc-fun-mode {
  position: fixed;
  top: 18%;
  left: 50%;
  transform: translate(-50%, 0);
  background: var(--rcalc-bg);
  color: var(--rcalc-fg);
  border-radius: 14px;
  box-shadow: 0 5px 20px rgba(44,62,80,.22);
  padding: 2em;
  z-index: 99999;
  display:none;
}
@media (max-width: 500px) {
  .rcalc-calc { width: 98vw; min-width: 0; }
}
    `;
        document.head.appendChild(style);
        if (theme === 'dark') document.body.classList.add('rcalc-dark');
    }

    // Calculator HTML template
    function getCalculatorHTML() {
        return `
<header>
  <h1 style="font-size:1.2em;margin:0;">Ultimate Calculator</h1>
  <div>
    <button id="rcalc-theme-toggle" aria-label="Toggle dark/light mode">🌓</button>
    <input type="color" id="rcalc-accent-picker" title="Pick Accent Color" />
  </div>
</header>
<input type="text" id="rcalc-display" readonly aria-label="Calculator display">
<div class="rcalc-buttons">
  <button data-action="clear" aria-label="Clear">C</button>
  <button data-action="delete" aria-label="Delete">⌫</button>
  <button data-action="percent" aria-label="Percent">%</button>
  <button data-action="divide" aria-label="Divide">÷</button>
  <button data-action="memory-clear" aria-label="Memory Clear">MC</button>
  <button data-action="memory-recall" aria-label="Memory Recall">MR</button>
  <button data-action="memory-add" aria-label="Memory Add">M+</button>
  <button data-action="memory-subtract" aria-label="Memory Subtract">M-</button>
  <button data-action="7">7</button>
  <button data-action="8">8</button>
  <button data-action="9">9</button>
  <button data-action="multiply" aria-label="Multiply">×</button>
  <button data-action="sqrt" aria-label="Square Root">√</button>
  <button data-action="power" aria-label="Power">xʸ</button>
  <button data-action="square" aria-label="Square">x²</button>
  <button data-action="paren-left" aria-label="Left Parenthesis">(</button>
  <button data-action="4">4</button>
  <button data-action="5">5</button>
  <button data-action="6">6</button>
  <button data-action="subtract" aria-label="Subtract">−</button>
  <button data-action="pi" aria-label="Pi">π</button>
  <button data-action="fun-mode" aria-label="Fun Mode">🎲</button>
  <button data-action="paren-right" aria-label="Right Parenthesis">)</button>
  <button data-action="plus-minus" aria-label="Plus/Minus">±</button>
  <button data-action="1">1</button>
  <button data-action="2">2</button>
  <button data-action="3">3</button>
  <button data-action="add" aria-label="Add">+</button>
  <button data-action="history" aria-label="Show History">🕑</button>
  <button data-action="0" class="rcalc-zero">0</button>
  <button data-action="dot" aria-label="Decimal">.</button>
  <button data-action="equals" class="equals" aria-label="Equals">=</button>
</div>
<div id="rcalc-history" aria-live="polite" hidden></div>
<div id="rcalc-fun-mode">
  <p id="rcalc-fun-message"></p>
  <button onclick="document.getElementById('rcalc-fun-mode').style.display='none';">Close</button>
</div>
    `;
    }

    // Calculator logic and features
    function initCalculator(target, options) {
        if (!target) return;
        const el = typeof target === "string" ? document.querySelector(target) : target;
        if (!el) return;
        el.classList.add('rcalc-calc');
        el.innerHTML = getCalculatorHTML();

        // Theme and accent
        injectStyles(options.accent, options.theme);

        const display = el.querySelector('#rcalc-display');
        const historyDiv = el.querySelector('#rcalc-history');
        const funModeDiv = el.querySelector('#rcalc-fun-mode');
        const funMessage = el.querySelector('#rcalc-fun-message');
        const themeToggle = el.querySelector('#rcalc-theme-toggle');
        const accentPicker = el.querySelector('#rcalc-accent-picker');
        let memory = 0;
        let history = [];
        let funFacts = [
            "Did you know? The number 42 is considered the answer to life, the universe, and everything!",
            "80085 looks funny on a calculator display. Try it out!",
            "π (Pi) is approximately 3.14159 and is used in circles everywhere.",
            "√2 is the first irrational number ever proved.",
            "The calculator as we know it was invented in the 1960s.",
            "Pressing 'C' clears the display. Try holding it for a secret!",
            "Try evaluating factorials by entering e.g. 5*4*3*2*1.",
            "Use the memory buttons to store and recall any number instantly!",
            "Change the accent color to personalize your calculator theme!",
            "Fun fact: Calculators used to be the size of a room!"
        ];

        // Accent color picker
        accentPicker.value = options.accent;
        accentPicker.addEventListener('input', e => {
            document.documentElement.style.setProperty('--rcalc-accent', e.target.value);
        });

        // Theme toggle
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('rcalc-dark');
            themeToggle.textContent = document.body.classList.contains('rcalc-dark') ? '☀️' : '🌓';
        });
        if (options.theme === 'dark') {
            setTimeout(() => {
                document.body.classList.add('rcalc-dark');
                themeToggle.textContent = '☀️';
            }, 0);
        }

        // Button click handling
        el.querySelectorAll('.rcalc-buttons button').forEach(btn => {
            btn.addEventListener('click', () => handleButton(btn.dataset.action || btn.textContent));
        });

        // Keyboard support
        document.addEventListener('keydown', function keyHandler(e) {
            if (!el.contains(document.activeElement)) return;
            if (e.key.match(/^\d$/)) handleButton(e.key);
            else if (e.key === '+') handleButton('add');
            else if (e.key === '-') handleButton('subtract');
            else if (e.key === '*') handleButton('multiply');
            else if (e.key === '/') handleButton('divide');
            else if (e.key === '.') handleButton('dot');
            else if (e.key === 'Enter' || e.key === '=') handleButton('equals');
            else if (e.key === 'Backspace') handleButton('delete');
            else if (e.key === 'Escape') handleButton('clear');
            else if (e.key === '(') handleButton('paren-left');
            else if (e.key === ')') handleButton('paren-right');
        });

        function handleButton(action) {
            switch (action) {
                case 'clear':
                    display.value = '';
                    break;
                case 'delete':
                    display.value = display.value.slice(0, -1);
                    break;
                case 'percent':
                    display.value += '%';
                    break;
                case 'divide':
                    display.value += '/';
                    break;
                case 'multiply':
                    display.value += '*';
                    break;
                case 'subtract':
                    display.value += '-';
                    break;
                case 'add':
                    display.value += '+';
                    break;
                case 'dot':
                    display.value += '.';
                    break;
                case 'sqrt':
                    display.value += '√(';
                    break;
                case 'power':
                    display.value += '**';
                    break;
                case 'square':
                    display.value += '**2';
                    break;
                case 'paren-left':
                    display.value += '(';
                    break;
                case 'paren-right':
                    display.value += ')';
                    break;
                case 'plus-minus':
                    if (display.value.startsWith('-')) display.value = display.value.slice(1);
                    else display.value = '-' + display.value;
                    break;
                case 'pi':
                    display.value += Math.PI.toFixed(8);
                    break;
                case 'memory-clear':
                    memory = 0;
                    break;
                case 'memory-recall':
                    display.value += memory;
                    break;
                case 'memory-add':
                    memory += Number(evalSafe(display.value));
                    break;
                case 'memory-subtract':
                    memory -= Number(evalSafe(display.value));
                    break;
                case 'equals':
                    let expr = display.value.replace(/√\(/g, 'Math.sqrt(');
                    try {
                        let result = evalSafe(expr);
                        if (result !== undefined && result !== null && result !== '') {
                            history.push(`${display.value} = ${result}`);
                            if (history.length > 10) history.shift();
                            display.value = result;
                            updateHistory();
                            checkFunFacts(result);
                        }
                    } catch {
                        display.value = 'Error';
                    }
                    break;
                case 'history':
                    historyDiv.hidden = !historyDiv.hidden;
                    break;
                case 'fun-mode':
                    showFunMode();
                    break;
                default:
                    display.value += action;
            }
        }

        function updateHistory() {
            historyDiv.innerHTML = history.slice().reverse().map(h => `<div>${h}</div>`).join('');
        }

        function evalSafe(expr) {
            if (/[^0-9+\-*/().%eEπ√ ]/.test(expr)) throw "Invalid input";
            expr = expr.replace(/π/g, Math.PI);
            return Function('"use strict";return (' + expr + ')')();
        }

        function showFunMode() {
            funMessage.textContent = funFacts[Math.floor(Math.random() * funFacts.length)];
            funModeDiv.style.display = 'block';
        }

        function checkFunFacts(result) {
            if (Number(result) === 42) showFunMode();
            if (display.value.replace(/\D/g, '') === '80085') showFunMode();
        }
    }

    global.RobustCalculator = {
        init: function (target, options = {}) {
            options = Object.assign({}, defaultOptions, options || {});
            initCalculator(target, options);
        }
    };

})(window);