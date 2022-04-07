const app = Vue.createApp({
    data() {
        return {
            minutes: "00", // строковые представления
            seconds: "00",
            timeStamp: 0, // время в секундах
            inputPlaceholder: "Enter seconds (600 max):",
            timeUpMsg: "",
            input: null, // к input привяжем поле ввода, чтобы потом можно было очищать его value
            timerId: null, // сюда будем сохранять id от запуска setInterval
        };
    },

    methods: {
        // Обработка ввода и установка данных:

        /**
         * При первом ивенте (input) привязываемся к полю ввода.
         * Если строка удовлетворяет условиям, то значения в таймере
         * обновляются "на ходу".
         */
        handleInput(e) {
            if (!this.input) this.input = e.target;

            if (
                Number(this.input.value) &&
                this.input.value > 0 &&
                this.input.value <= 600
            ) {
                this._setTime(this.input.value);
            } else {
                this._setTime(0);
            }
        },

        // Устанавливаем время
        _setTime(stamp) {
            this.timeStamp = stamp;
            this.minutes = this._stringify(Math.floor(stamp / 60));
            this.seconds = this._stringify(stamp % 60);
        },

        // Добавляем нолики для красоты
        _stringify(num) {
            return num < 10 ? `0${num}` : `${num}`;
        },

        // Слушаем кнопки:

        // Пуск! (с защитой)
        start() {
            if (!this.timerId) {
                this._clearInput();
                this._hideMsg();
                this.timerId = setInterval(this._changeTime, 1000);
            }
        },

        // Стапэ!
        stop() {
            clearInterval(this.timerId);
            this.timerId = null;
        },

        // Чистим всё
        clear() {
            this._clearInput();
            this._cancelTime();
            this._hideMsg();
            this.stop();
        },

        // Рабочие функции:

        // Коллбэк для setInterval
        _changeTime() {
            if (this.timeStamp > 1) {
                this._setTime(--this.timeStamp);
            } else {
                this.stop();
                this._cancelTime();
                this._showMsg();
            }
        },

        // Сбрасываем время
        _cancelTime() {
            this.minutes = "00";
            this.seconds = "00";
            this.timeStamp = 0;
        },

        // Очищаем поле ввода
        _clearInput() {
            if (this.input) this.input.value = "";
        },

        // Выдаём сообщение, что время вышло
        _showMsg() {
            this.timeUpMsg = "Time is up!";
        },

        // Прячем сообщение
        _hideMsg() {
            this.timeUpMsg = "";
        },
    },
});

app.mount("#app");
