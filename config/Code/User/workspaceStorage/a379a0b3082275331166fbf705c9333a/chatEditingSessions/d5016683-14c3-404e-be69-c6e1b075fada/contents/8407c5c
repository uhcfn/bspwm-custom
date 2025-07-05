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

function getPrompt() {
	return 'user@razgrom:~$ ';
}

function print(text = '') {
	const block = document.createElement('pre');
	block.textContent = getPrompt() + text;
	terminal.appendChild(block);
	terminal.scrollTop = terminal.scrollHeight;
}

function typeText(text = '', callback) {
	const block = document.createElement('pre');
	terminal.appendChild(block);
	let i = 0;
	let cursorVisible = true;
	// Толстый курсор
	let cursor = '\u2588'; // █
	const speed = 6; // Чем меньше, тем быстрее

	function printChar() {
		if (i <= text.length) {
			block.innerHTML = getPrompt() +
				text.slice(0, i) +
				(cursorVisible ? `<span class="terminal-cursor">${cursor}</span>` : '<span class="terminal-cursor" style="background:transparent"></span>');
			i++;
			setTimeout(printChar, speed + Math.random() * 10);
		} else {
			block.innerHTML = getPrompt() + text;
			if (callback) callback();
		}
	}

	let blink = setInterval(() => {
		cursorVisible = !cursorVisible;
	}, 180);

	printChar();
	setTimeout(() => clearInterval(blink), speed * text.length + 800);
}

function systemPrint(text = '', cb) {
	// Для системных сообщений (без user@razgrom:~$), без анимации для декора
	if (text.startsWith('┌') || text.startsWith('└') || text.startsWith('│') || text.startsWith('├')) {
		const block = document.createElement('pre');
		block.textContent = text;
		terminal.appendChild(block);
		terminal.scrollTop = terminal.scrollHeight;
		if (cb) cb();
		return;
	}
	// Обычный анимированный вывод
	const block = document.createElement('pre');
	let i = 0;
	let cursorVisible = true;
	let cursor = '\u2588';
	const speed = 6;

	function printChar() {
		if (i <= text.length) {
			block.innerHTML = text.slice(0, i) + (cursorVisible ? `<span class="terminal-cursor">${cursor}</span>` : '<span class="terminal-cursor" style="background:transparent"></span>');
			i++;
			setTimeout(printChar, speed + Math.random() * 10);
		} else {
			block.innerHTML = text;
			if (cb) cb();
		}
	}

	let blink = setInterval(() => {
		cursorVisible = !cursorVisible;
	}, 180);

	terminal.appendChild(block);
	terminal.scrollTop = terminal.scrollHeight;
	printChar();
	setTimeout(() => clearInterval(blink), speed * text.length + 800);
}

function printWelcome() {
	systemPrint(
		'┌──────────────────────────────────────────────────────────┐\n' +
			'│                    ПЛАН "РАЗГРОМ"                       │\n' +
			'├──────────────────────────────────────────────────────────┤\n' +
			'│  Добро пожаловать в терминал. help — список команд.      │\n' +
			'└──────────────────────────────────────────────────────────┘'
	);
}

printWelcome();

function renderInput() {
	if (!inputBlock) {
		inputBlock = document.createElement('pre');
		inputBlock.className = 'terminal-input-row';
		terminal.appendChild(inputBlock);
	}
	if (!inputCursor) {
		inputCursor = document.createElement('span');
		inputCursor.className = 'terminal-cursor';
		inputCursor.textContent = '\u2588';
		inputBlock.appendChild(inputCursor);
	}
	inputBlock.innerHTML = `<span class="terminal-prompt">${getPrompt()}</span>` +
		inputBuffer.replace(/</g, '&lt;').replace(/>/g, '&gt;') +
		'<span class="terminal-cursor">█</span>';
	focusTerminalInput();
}

function removeInput() {
	if (inputBlock) {
		inputBlock.innerHTML = `<span class="terminal-prompt">${getPrompt()}</span>` +
			inputBuffer.replace(/</g, '&lt;').replace(/>/g, '&gt;');
		inputBlock = null;
		inputCursor = null;
		inputBuffer = '';
	}
}

function activateInput() {
	inputActive = true;
	inputBuffer = '';
	inputBlock = null;
	inputCursor = null;
	renderInput();
	document.addEventListener('keydown', handleInputKey);
}

function deactivateInput() {
	inputActive = false;
	document.removeEventListener('keydown', handleInputKey);
	removeInput();
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
		const command = inputBuffer.trim();
		removeInput();
		if (command) print(command);
		inputBuffer = '';
		processCommand(command);
		e.preventDefault();
	}
}

function processCommand(command) {
	if (inChallenge) {
		if (command === 'agree' || command === 'disagree') {
			systemPrint('Ответ принят. Возврат...\n');
			setTimeout(() => {
				window.location.href = 'index.html';
			}, 3000);
		} else {
			systemPrint("Введите 'agree' или 'disagree'.");
		}
		activateInput();
		return;
	}
	switch (command) {
		case 'help':
			systemPrint(
				'Доступные команды:\n  generate — получить план\n  clear — очистить экран\n  help — справка\n  quit — выйти (невозможно)'
			);
			break;
		case 'generate':
			const t = getRandomTask();
			systemPrint(
				'Твоя задача на неделю:\n— ' + t + '\n\nВы принимаете вызов?\n> agree / disagree'
			);
			inChallenge = true;
			break;
		case 'clear':
			terminal.innerHTML = '';
			break;
		case 'quit':
			systemPrint('Никто не выходит.');
			break;
		default:
			systemPrint('Неизвестная команда. help для списка.');
	}
	activateInput();
}

window.onload = () => {
	activateInput();
};
