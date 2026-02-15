document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('formValid', function(event) {
        const formData = event.detail;
        console.clear();
        console.log('ФИО:', formData.fullname);
        console.log('Телефон:', formData.phone);
        console.log('Email:', formData.email);
        console.log('Сообщение:', formData.message || '(не заполнено)');
        const timestamp = new Date().toLocaleString();
        console.log('Время отправки:', timestamp);
    });
});