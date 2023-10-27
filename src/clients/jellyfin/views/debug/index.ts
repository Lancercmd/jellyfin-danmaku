//typescript define an async function to show debug info in console or on the screen
export class DebugInfo {
    location: string = 'console';
    logLines: number = 0;
    logQueue: string[] = [];
    
    constructor(location: string) {
        if (location == 'console' || location == 'ui')
            this.location = location;
    }

    async showDebugInfo(msg: string) {
        if (this.location == 'console') {
            console.log(msg);
        } else {
            let span = document.getElementById('debugInfo');
            while (!span) {
                await new Promise((resolve) => {
                    setTimeout(resolve, 100);
                });
                span = document.getElementById('debugInfo');
            }
            if (this.logLines < 10) {
                this.logLines++;
                this.logQueue.push(msg);
            } else {
                this.logQueue.shift();
                this.logQueue.push(msg);
            }
            span.innerText = this.logQueue.join('\n');
        }
    }
}