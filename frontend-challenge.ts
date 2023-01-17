// ORIGINAL FILE

/* 
    Write a SPA with React.js or Vue.js that: 
    - implement the BackendService snippets to get the metrics from the server (use "challengeApiKey" as the apiKey ).
    - on one page allows the user to view, add, edit and delete the metrics.
    - on another page show the user the metrics as you prefer.
    - preferably avoid using css frameworks like bootstrap.
    - write meaningful tests (bonus points).
    - create a git repository and share it with us.
    Structure the code as you would do for a production application, expecting in the future that the BackendService will provide new kind of Metric class.
*/

class Metric{
	id: string;
	code: string;
	amounts: number[] | null;
	date: Date;

    constructor(id:string, code: string, amounts: number[] | null, date: Date) {
        this.id = id; 
        this.code = code; 
        this.amounts = amounts; 
        this.date = date;    
    }
}

const metrics : Metric[] = [
    new Metric("4bd", "Alpha", [123,23], new Date(2011,10,30)),
    new Metric("bez", "Beta", null, new Date(2022,2,28)),
    new Metric("s31", "Gamma", [0,1,2,3], new Date(2023,1,3)),
    new Metric("fg4", "Delta", [23,0,100], new Date(2013,5,4)),
    new Metric("hj6", "Epsilon", [0], new Date(2020,2,8)),
    new Metric("j66", "Zeta", [15,2,54,3,1,3,6,32], new Date(2021,2,3)),
];

const CHALLENGE_API_KEY = "challengeApiKey";

export default class BackendService {
	apiKey : string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    async getMetrics(): Promise<Metric[]> {
        await this.delay(1000);
        if(this.apiKey !== CHALLENGE_API_KEY) { return Promise.reject("API Key is not valid!"); }
        return Promise.resolve(metrics);
    }

    async getMetric(id: string): Promise<Metric | undefined> {
        await this.delay(1000);
        if(this.apiKey !== CHALLENGE_API_KEY) { return Promise.reject("API Key is not valid!"); }
        return Promise.resolve(metrics.find(m => m.id === id));
    }

    async addMetric(metric: Metric): Promise<boolean> {
        await this.delay(1000);
        if(this.apiKey !== CHALLENGE_API_KEY) { return Promise.reject("API Key is not valid!"); }
        metrics.push(metric);
        return Promise.resolve(true);
    }

    async updateMetric(metric: Metric): Promise<boolean> {
        await this.delay(1000);
        if(this.apiKey !== CHALLENGE_API_KEY) { return Promise.reject("API Key is not valid!"); }
        const index = metrics.findIndex(m => m.id === metric.id);
        if (index >= 0) {
            metrics[index] = metric;
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }

    async deleteMetric(id: string): Promise<boolean> {
        await this.delay(1000);
        if(this.apiKey !== CHALLENGE_API_KEY) { return Promise.reject("API Key is not valid!"); }
        const index = metrics.findIndex(m => m.id === id);
        if (index >= 0) {
            metrics.splice(index, 1);
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }

    async delay(time: number) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
}