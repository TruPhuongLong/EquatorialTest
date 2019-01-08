class MainWorkers {
    startWorker = () => {
        if (typeof (Worker) !== "undefined") {
            if (typeof (this.w) == "undefined") {
                this.w = new Worker(worker_script);
            }
            this.w.onmessage = (m) => {
                console.log("msg from worker: ", m.data);
                window.alert('=====')
            };
            this.w.postMessage('im from main');
        } else {
            console.log("Sorry, your browser does not support Web Workers...")
        }
    }
    
    stopWorker = () => {
        this.w.terminate();
        this.w = undefined;
    }

    constructor(props){
        super(props)
        this.startWorker()
    }
}