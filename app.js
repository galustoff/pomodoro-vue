const app = Vue.createApp({
    data() {
        return {
            minutes: "00",
            seconds: "00",
            timeStamp: 0,
            inputPlcHldr: "Enter seconds (600 max):",
            timeUpMsg: "",
            input: null,
            timerId: null,
        };
    },

    methods: {
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

        start() {
            if (!this.timerId) {
                this._clearInput();
                this._hideMsg();
                this.timerId = setInterval(this._changeTime, 1000);
            }
        },

        stop() {
            clearInterval(this.timerId);
            this.timerId = null;
        },

        clear() {
            this._clearInput();
            this._cancelTime();
            this._hideMsg();
            this.stop();
        },

        _setTime(stamp) {
            this.timeStamp = stamp;
            this.minutes = this._stringify(Math.floor(stamp / 60));
            this.seconds = this._stringify(stamp % 60);
        },

        _stringify(num) {
            return (num < 10) ? `0${num}` : `${num}`;
        },

        _clearInput() {
            if (this.input) this.input.value = "";
        },

        _cancelTime() {
            this.minutes = "00";
            this.seconds = "00";
            this.timeStamp = 0;
        },

        _changeTime() {
            if (this.timeStamp > 1) {
                this._setTime(--this.timeStamp);
            } else {
                this.stop();
                this._cancelTime();
                this._showMsg();
            }
        },

        _showMsg() {
            this.timeUpMsg = "Time is up!";
        },

        _hideMsg() {
            this.timeUpMsg = "";
        },
    },
});

app.mount("#app");
