export class MessagesService {
    constructor() {
    }
    getMessages() {
        return new Promise((resolve, reject) => {
            resolve([{
                sender: '',
                message: '',
                date: new Date()
            }]);
        });
    }
    sendMessage(): Promise<void> {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
    customerExists() {
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    }
} 