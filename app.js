const app = Vue.createApp({
    data() {
        return {
            minutes: 0,
            seconds: 0,
            timeStamp: 0,
            inputPlcHldr: "Enter minutes (60 max):",
            input: null,
            timerId: null
        };
    },
    methods: {
        handleInput(e) {
            if (!this.input) this.input = e.target;

            if (Number(this.input.value) && this.input.value > 0 && this.input.value <= 60) {
                this._setTime(this.input.value * 60);
            } else {
                this._setTime(0);
            }
        },

        start() {
            this._clearInput();
            this.timerId = setInterval(this._changeTime, 1000);
        },

        stop() {
            clearInterval(this.timerId);
        },

        clear() {
            this._clearInput();
            this._clearDisplay();
            this.stop();
        },

        _setTime(stamp) {
            this.timeStamp = stamp;
            this.minutes = Math.floor(stamp / 60);
            this.seconds = stamp % 60;
        },

        _clearInput() {
            if (this.input) this.input.value = "";
        },

        _clearDisplay() {
            this.minutes = 0;
            this.seconds = 0;
        },

        _changeTime() {
            this._setTime(--this.timeStamp);
        },
    },
});

app.mount("#app");
