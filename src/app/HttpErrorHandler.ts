export class HttpErrorHandler {

    constructor() {}

    public handleError(err: any) {
        let message = err.message;
        message = message.split(' ').slice(5).toString().replace(/,/g, ' ');
        alert('ooopsie doopsie\n' + message);
        console.log(err.message, '');
    }
}
