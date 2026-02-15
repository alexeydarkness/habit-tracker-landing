document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    if (!form) return;
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Очищаем предыдущие ошибки
        document.querySelectorAll('.is-invalid').forEach(el => {
            el.classList.remove('is-invalid');
        });
        
        let isValid = true;
        
        // 1. Проверка ФИО (не пустое, минимум 2 слова)
        const fullname = document.getElementById('fullname');
        const fullnameValue = fullname.value.trim();

        if (fullnameValue === '') {
            showError(fullname, 'Введите фамилию и имя');
            isValid = false;
        } else if (fullnameValue.split(' ').length < 2) {
            showError(fullname, 'Введите фамилию и имя');
            isValid = false;
        }

        // 2. Проверка телефона (не пустой, 10 цифр)
        const phone = document.getElementById('phone');
        const phoneValue = phone.value.trim();
        const phoneDigits = phoneValue.replace(/\D/g, '');

        if (phoneValue === '') {
            showError(phone, 'Введите номер телефона');
            isValid = false;
        } else if (phoneDigits.length < 10) {
            showError(phone, 'Введите 10 цифр номера');
            isValid = false;
        }
        
        // 3. Проверка email (не пустой, содержит @ и .)
        const email = document.getElementById('email');
        const emailValue = email.value.trim();

        if (emailValue === '') {
            showError(email, 'Введите email');
            isValid = false;
        } else if (!emailValue.includes('@') || !emailValue.includes('.')) {
            showError(email, 'Введите корректный email');
            isValid = false;
        }
        
        // 4. Проверка согласия
        const agreement = document.getElementById('agreement');
        if (!agreement.checked) {
            showError(agreement, 'Необходимо согласие на обработку данных');
            isValid = false;
        }
        
        // Если всё корректно - отправляем
        if (isValid) {
            const formData = {
                fullname: fullnameValue,
                phone: phoneValue,
                email: emailValue,
                message: document.getElementById('message').value.trim() || '(не заполнено)'
            };
            
            const event = new CustomEvent('formValid', { detail: formData });
            document.dispatchEvent(event);
            
            // Показываем успешное сообщение (Bootstrap alert)
            showSuccess('Форма успешно отправлена!');
            console.log('Данные формы:', formData);
            
            // Очищаем форму
            form.reset();
        }
    });
    
    // Функция показа ошибки для Bootstrap
    function showError(input, message) {
        // Добавляем класс ошибки
        input.classList.add('is-invalid');
        
        // Ищем или создаем блок с ошибкой
        let feedback = input.nextElementSibling;
        if (!feedback || !feedback.classList.contains('invalid-feedback')) {
            feedback = document.createElement('div');
            feedback.classList.add('invalid-feedback');
            input.parentNode.appendChild(feedback);
        }
        feedback.textContent = message;
        
        // Для чекбокса особый случай
        if (input.type === 'checkbox') {
            input.parentNode.classList.add('was-validated');
        }
    }
    
    // Функция показа успешного сообщения
    function showSuccess(message) {
        // Удаляем предыдущее сообщение, если есть
        const oldAlert = document.querySelector('.alert-success');
        if (oldAlert) oldAlert.remove();
        
        // Создаем новый alert
        const alert = document.createElement('div');
        alert.classList.add('alert', 'alert-success', 'mt-3');
        alert.textContent = message;
        
        // Вставляем после формы
        form.parentNode.insertBefore(alert, form.nextSibling);
        
        // Автоматически скрываем через 5 секунд
        setTimeout(() => alert.remove(), 5000);
    }
    
    // Сброс ошибки при вводе
    document.querySelectorAll('.form-control, .form-check-input').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('is-invalid');
            
            // Удаляем сообщение об ошибке
            const feedback = this.nextElementSibling;
            if (feedback && feedback.classList.contains('invalid-feedback')) {
                feedback.remove();
            }
        });
    });
});