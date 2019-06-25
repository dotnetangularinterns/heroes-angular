export class HttpErrorHandler {

    constructor() {}

    public handleError(err: any) {
        alert(err.message);
        console.log(err.message);
    }
}