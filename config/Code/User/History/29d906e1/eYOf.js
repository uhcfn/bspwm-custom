const destructionTasks = [
	'Переустанови систему. Без причины. Просто потому что можешь.',
	'Удали один старый файл, о котором давно забыл. Освободи место — в голове.',
	'Отключи интернет на сутки. Наблюдай, что начнёт зудеть.',
	'Промолчи весь день. Ни слова. Пусть мир говорит сам с собой.',
	'Сломай шаблон в своём графике. Встань в 4 утра и начни писать манифест.',
	'Отдай личную вещь незнакомцу. И не жди благодарности.',
	'Подделай документ и положи в общественное место. Смотри, как это разовьётся.',
];

const terminal = document.getElementById('terminal');
let inChallenge = false;

function print(text = '') {
	const block = document.createElement('pre');
	block.textContent = text;
	terminal.appendChild(block);
	terminal.scrollTop = terminal.scrollHeight;
}

function getRandomTask() {
	return destructionTasks[Math.floor(Math.random() * destructionTasks.length)];
}

function renderInput() {
	const inputRow = document.createElement('div');
	inputRow.className = 'terminal-input-row';
	inputRow.innerHTML = `
    <span class="terminal-prompt">user@razgrom:~$ </span>
    <input type="text" class="terminal-input" autofocus />
  `;
	terminal.appendChild(inputRow);
	const input = inputRow.querySelector('input');
	input.focus();

	input.addEventListener('keydown', e => {
		if (e.key === 'Enter') {
			const command = input.value.trim();
			input.disabled = true;
			input.remove();
			const staticLine = document.createElement('span');
			staticLine.textContent = command;
			inputRow.appendChild(staticLine);
			handleCommand(command);
		}
	});
}

function handleCommand(command) {
	setTimeout(() => {
		if (inChallenge) {
			if (command === 'agree' || command === 'disagree') {
				print('Ответ принят. Возврат...');
				setTimeout(() => {
					window.location.href = 'index.html';
				}, 3000);
				return;
			} else {
				print("Введите 'agree' или 'disagree'.");
			}
			setTimeout(renderInput, 200);
			return;
		}

		switch (command) {
			case 'help':
				print(
					'Доступные команды:\n  generate — получить план\n  clear — очистить экран\n  help — справка\n  quit — выйти (невозможно)'
				);
				break;
			case 'generate':
				showSpinner(() => {
					const t = getRandomTask();
					print(
						`Твоя задача на неделю:\n— ${t}\n\nВы принимаете вызов?\n> agree / disagree`
					);
					inChallenge = true;
					setTimeout(renderInput, 1000);
				}, 3000); // <- спиннер будет длиться 1.5 секунды
				break;

			case 'clear':
				terminal.innerHTML = '';
				break;
			case 'quit':
				print('Никто не выходит.');
				break;
			default:
				print('Неизвестная команда. help для списка.');
		}

		setTimeout(renderInput, 200);
	}, 200);
}

window.onload = () => {
	renderInput();
};

function showSpinner(callback, duration = 1000) {
	const spinnerFrames = ['-', '\\', '|', '/'];
	let frame = 0;

	const spinnerLine = document.createElement('pre');
	spinnerLine.textContent = '[ ' + spinnerFrames[frame] + ' ] Загрузка...';
	terminal.appendChild(spinnerLine);

	const interval = setInterval(() => {
		frame = (frame + 1) % spinnerFrames.length;
		spinnerLine.textContent = '[ ' + spinnerFrames[frame] + ' ] Загрузка...';
	}, 120);

	setTimeout(() => {
		clearInterval(interval);
		spinnerLine.remove(); // удалить спиннер
		callback(); // выполнить то, что было после загрузки
	}, duration);
}
