export const afkManager = (func, timeout=1, interval=60000, ...args) => { 
    let IDLE_TIMEOUT = timeout; // delay собственно сам таймаут
    let idleCounter = 0;

    document.onmousemove = document.onkeydown = () => {
        // console.log(idleCounter, 'click!')
        idleCounter = 0
    }

    window.setInterval(() => {
        if (++idleCounter > IDLE_TIMEOUT) {
            // console.log(idleCounter, IDLE_TIMEOUT, 'timeout! афк')
            idleCounter = 0
            func(...args) // делать что надо   
        }
    }, interval);
}

