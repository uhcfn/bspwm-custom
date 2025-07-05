const destructionTasks = [
	'Переустанови систему. Без причины. Просто потому что можешь.',
	'Удали один старый файл, о котором давно забыл. Освободи место — в голове.',
	'Отключи интернет на сутки. Наблюдай, что начнёт зудеть.',
	'Промолчи весь день. Ни слова. Пусть мир говорит сам с собой.',
	'Сломай шаблон в своём графике. Встань в 4 утра и начни писать манифест.',
	'Отдай личную вещь незнакомцу. И не жди благодарности.',
	'Подделай документ и положи в общественное место. Смотри, как это разовьётся.',
];

function getRandomTask() {
	return destructionTasks[Math.floor(Math.random() * destructionTasks.length)];
}

const terminal = document.getElementById('terminal');
let inChallenge = false;
let inputActive = false;
let inputBuffer = '';
let inputBlock = null;
let inputCursor = null;

function focusTerminalInput() {
	if (inputBlock) {
		inputBlock.scrollIntoView({ block: 'end' });
	}
}

function print(text = '') {
	const block = document.createElement('pre');
	// Если text содержит html-теги, выводим как html, иначе как textContent
	if (/<[a-z][\s\S]*>/i.test(text)) {
		block.innerHTML = text;
	} else {
		block.textContent = text;
	}
	terminal.appendChild(block);
	terminal.scrollTop = terminal.scrollHeight;
}

function typeText(text = '', callback) {
	const lines = text.split('\n');
	let lineIdx = 0;
	let block = null;
	let cursor = '\u2588';
	let cursorPos = 0;
	let cursorVisible = true;
	const cursorSpeed = 18; // скорость перемещения курсора по строке
	const lineDelay = 1000; // задержка между строками

	function printLineWithCursor(line, done) {
		block = document.createElement('pre');
		terminal.appendChild(block);
		cursorPos = 0;
		cursorVisible = true;

		function moveCursor() {
			if (cursorPos <= line.length) {
				block.innerHTML =
					line.slice(0, cursorPos) +
					`<span class="terminal-cursor${
						cursorVisible ? '' : ' blink'
					}">${cursor}</span>` +
					line.slice(cursorPos);
				cursorPos++;
				setTimeout(moveCursor, cursorSpeed);
			} else {
				block.innerHTML = line;
				if (done) done();
			}
		}

		moveCursor();
	}

	hideInputPrompt();

	setTimeout(function nextLine() {
		if (lineIdx < lines.length) {
			printLineWithCursor(lines[lineIdx], () => {
				lineIdx++;
				setTimeout(nextLine, lineDelay);
			});
		} else {
			if (callback) setTimeout(callback, 1000); // поле ввода появляется через 1 сек после печати
			showInputPrompt();
		}
	}, 1000);
}

function renderInput(visible = true) {
	if (!inputBlock) {
		inputBlock = document.createElement('pre');
		inputBlock.className = 'terminal-input-row';
		terminal.appendChild(inputBlock);
	}
	if (visible) {
		inputBlock.innerHTML =
			`<span class="terminal-prompt">user@razgrom:~$ </span>` +
			inputBuffer.replace(/</g, '&lt;').replace(/>/g, '&gt;') +
			'<span class="terminal-cursor">█</span>';
	} else {
		inputBlock.innerHTML = '';
	}
	focusTerminalInput();
}

function hideInputPrompt() {
	if (inputBlock) {
		renderInput(false);
	}
}
function showInputPrompt() {
	if (inputBlock) {
		renderInput(true);
	}
}

function hideInput() {
	if (inputBlock) {
		inputBlock.style.display = 'none';
	}
}
function showInput() {
	if (inputBlock) {
		inputBlock.style.display = '';
	}
}

let inputBlinkInterval = null;
function startInputBlink() {
	if (inputBlinkInterval) clearInterval(inputBlinkInterval);
	inputBlinkInterval = setInterval(() => {
		if (!inputBlock) return;
		const cursor = inputBlock.querySelector('.terminal-cursor');
		if (cursor) {
			cursor.classList.toggle('blink');
		}
	}, 500);
}
function stopInputBlink() {
	if (inputBlinkInterval) clearInterval(inputBlinkInterval);
}

function activateInput() {
	inputActive = true;
	inputBuffer = '';
	inputBlock = null;
	renderInput();
	document.addEventListener('keydown', handleInputKey);
	startInputBlink();
}

function deactivateInput() {
	inputActive = false;
	document.removeEventListener('keydown', handleInputKey);
	removeInput();
	stopInputBlink();
}

function handleInputKey(e) {
	if (!inputActive) return;
	if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
		inputBuffer += e.key;
		renderInput();
		e.preventDefault();
	} else if (e.key === 'Backspace') {
		inputBuffer = inputBuffer.slice(0, -1);
		renderInput();
		e.preventDefault();
	} else if (e.key === 'Enter') {
		hideInputPrompt();
		const command = inputBuffer.trim();
		if (command) print(`user@razgrom:~$ ${command}`);
		inputBuffer = '';
		processCommand(command);
		stopInputBlink();
		e.preventDefault();
	}
}

function processCommand(command) {
	if (inChallenge) {
		if (command === 'agree' || command === 'disagree') {
			typeText('Ответ принят. Возврат...\n');
			setTimeout(() => {
				window.location.href = 'index.html';
			}, 3000);
		} else {
			typeText("Введите 'agree' или 'disagree'.");
		}
		activateInput();
		return;
	}
	switch (command) {
		case 'help':
			typeText(
				'Доступные команды:\n  generate — получить план\n  clear — очистить экран\n  help — справка\n  quit — выйти (невозможно)'
			);
			break;
		case 'generate':
			const t = getRandomTask();
			typeText(
				'Твоя задача на неделю:\n— ' +
					t +
					'\n\nВы принимаете вызов?\n> agree / disagree'
			);
			inChallenge = true;
			break;
		case 'clear':
			terminal.innerHTML = '';
			break;
		case 'quit':
			typeText('Никто не выходит.');
			break;
		default:
			typeText('Неизвестная команда. help для списка.');
	}
	activateInput();
}

function removeInput() {
	if (inputBlock) {
		inputBlock.remove();
		inputBlock = null;
		inputCursor = null;
		inputBuffer = '';
	}
}

window.onload = () => {
	activateInput();
};
