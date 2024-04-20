class Telemetry {
    private data: any[];
    private id: number;

    constructor() {
        this.data = [];
        this.id = 0;
    }

    trackEvent(eventType: string, properties?: any) {
        const eventData = {
            id: this.id,
            eventType: eventType,
            timestamp: Date.now(),
            ...properties,
        };
        this.id++;
        this.data.push(eventData);
    }

    flush() {
        
        this.data.forEach((event)=>{
            window.localStorage.setItem(JSON.stringify(event.id), JSON.stringify(event));
        });
    }
}
const theTelemetry = new Telemetry()
export default theTelemetry;