document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('register-form');

	form.addEventListener('submit', e => {
		e.preventDefault();

		const inputs = form.querySelectorAll('input, select');
		let valid = true;
		inputs.forEach(input => {
			if (!input.value.trim()) {
				input.style.borderColor = 'red';
				valid = false;
			} else {
				input.style.borderColor = '#ccc';
			}
		});

		if (!valid) {
			alert('Пожалуйста, заполните все поля.');
			return;
		}

		const data = {
			name: inputs[0].value,
			email: inputs[1].value,
			phone: inputs[2].value,
			seminar: inputs[3].value,
		};

		console.log('Заявка отправлена:', data);
		alert('Спасибо за регистрацию! Мы свяжемся с вами.');
		form.reset();
	});
});
