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

function print(text = '') {
	const block = document.createElement('pre');
	block.textContent = `> ${text}`;
	terminal.appendChild(block);
	terminal.scrollTop = terminal.scrollHeight;
}

function typeText(text = '', callback) {
	const block = document.createElement('pre');
	terminal.appendChild(block);
	let i = 0;
	let cursorVisible = true;
	let cursor = '▍';

	function printChar() {
		if (i <= text.length) {
			block.textContent = text.slice(0, i) + (cursorVisible ? cursor : ' ');
			i++;
			setTimeout(printChar, 18 + Math.random() * 30);
		} else {
			block.textContent = text;
			if (callback) callback();
		}
	}

	// Мигающий курсор во время печати
	let blink = setInterval(() => {
		cursorVisible = !cursorVisible;
	}, 300);

	printChar();

	// Остановить мигание после печати
	setTimeout(() => clearInterval(blink), 18 * text.length + 1000);
}

function systemPrint(text = '', cb) {
	typeText(text, cb);
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
		const command = input.value.trim().toLowerCase();
		print(command);
		input.value = '';

		if (inChallenge) {
			if (command === 'agree' || command === 'disagree') {
				systemPrint('Ответ принят. Возврат...\n');
				setTimeout(() => {
					window.location.href = 'index.html';
				}, 3000);
			} else {
				systemPrint("Введите 'agree' или 'disagree'.");
			}
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
					'┌──────────────────────────────────────────────────────────┐\n' +
						'│  Твоя задача на неделю:                                 │\n' +
						'│                                                        │\n' +
						`│  — ${t.padEnd(54)}│\n` +
						'│                                                        │\n' +
						'└──────────────────────────────────────────────────────────┘\n' +
						'Вы принимаете вызов?\n> agree / disagree'
				);
				inChallenge = true;
				break;
			case 'clear':
				terminal.innerHTML = '';
				printWelcome();
				break;
			case 'quit':
				systemPrint('Никто не выходит.');
				break;
			default:
				systemPrint('Неизвестная команда. help для списка.');
		}
	}
});
