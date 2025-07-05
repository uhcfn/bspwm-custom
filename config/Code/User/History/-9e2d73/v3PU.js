document.querySelectorAll('nav button').forEach(btn => {
	btn.addEventListener('click', () => {
		const target = btn.dataset.target;

		// Меняем активную кнопку
		document
			.querySelectorAll('nav button')
			.forEach(b => b.classList.remove('active'));
		btn.classList.add('active');

		// Показываем нужный раздел
		document.querySelectorAll('.section').forEach(section => {
			section.classList.remove('active');
			if (section.id === target) section.classList.add('active');
		});
	});
});
