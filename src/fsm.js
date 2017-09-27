class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (config == undefined)
            throw new Error("no config!");
        this.states = config.states;
        this.initialState = config.initial;
        this.clearHistory();
        this.changeState(config.initial);
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.currentState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (!(state in this.states))
            throw new Error("State is not present.");
        this.currentState = state;
        this.history.splice(this.historyPos + 1);
        this.history.push(state);
        this.historyPos++;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        let transitions = this.states[this.currentState].transitions;
        if (event in transitions)
            this.changeState(transitions[event]);
        else
            throw Error("Event is not present.");
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.changeState(this.initialState);
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let arr = [];
        if (event == undefined)
            arr = Object.keys(this.states);
        else
            for (let state in this.states)
                if (event in this.states[state].transitions)
                    arr.push(state);
        return arr;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.historyPos > 0) {
            this.historyPos--;
            this.currentState = this.history[this.historyPos];
            return true;
        } else
            return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.historyPos + 1 < this.history.length) {
            this.historyPos++;
            this.currentState = this.history[this.historyPos];
            return true;
        }
        else
            return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.history = [];
        this.historyPos = -1;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
