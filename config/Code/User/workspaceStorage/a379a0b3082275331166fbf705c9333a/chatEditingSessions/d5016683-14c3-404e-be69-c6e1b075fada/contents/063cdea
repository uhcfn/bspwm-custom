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
const input = document.getElementById('terminalInput');
let inChallenge = false;

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

input.addEventListener('keydown', e => {
	if (e.key === 'Enter') {
		e.preventDefault();
		const command = input.value.trim();
		if
