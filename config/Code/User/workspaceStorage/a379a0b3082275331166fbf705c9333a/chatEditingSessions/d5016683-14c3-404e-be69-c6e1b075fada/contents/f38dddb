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
	const block = document.createElement('pre');
	terminal.appendChild(block);
	let i = 0;
	let cursorVisible = true;
	let cursor = '\u2588'; // █
	const speed = 6;

	function printChar() {
		if (i <= text.length) {
			block.innerHTML =
				text.slice(0, i) +
				(cursorVisible
					? `<span class="terminal-cursor">${cursor}</span>`
					: '<span class="terminal-cursor" style="background:transparent"></span>');
			i++;
			setTimeout(printChar, speed + Math.random() * 10);
		} else {
			block.innerHTML = text;
			if (callback) callback();
			showInput();
		}
	}

	let blink = setInterval(() => {
		cursorVisible = !cursorVisible;
	}, 180);

	printChar();
	setTimeout(() => clearInterval(blink), speed * text.length + 800);
}

function renderInput() {
	if (!inputBlock) {
		inputBlock = document.createElement('pre');
		inputBlock.className = 'terminal-input-row';
		terminal.appendChild(inputBlock);
	}
	inputBlock.innerHTML =
		`<span class="terminal-prompt">user@razgrom:~$ </span>` +
		inputBuffer.replace(/</g, '&lt;').replace(/>/g, '&gt;') +
		'<span class="terminal-cursor">█</span>';
	focusTerminalInput();
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
			cursor.style.background = cursor.style.background === 'transparent' ? 'white' : 'transparent';
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
		const command = inputBuffer.trim();
		hideInput();
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
			typeText('Доступные команды:\n  generate — получить план\n  clear — очистить экран\n  help — справка\n  quit — выйти (невозможно)');
			break;
		case 'generate':
			const t = getRandomTask();
			typeText('Твоя задача на неделю:\n— ' + t + '\n\nВы принимаете вызов?\n> agree / disagree');
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
