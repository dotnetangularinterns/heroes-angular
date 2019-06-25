import { Router } from '@angular/router';

export class HttpErrorHandler {

    constructor(private router: Router) {}

    public handleError(err: any) {
        this.router.navigateByUrl('error/404');
        // let message = err.message;
        // message = message.split(' ').slice(5).toString().replace(/,/g, ' ');
        // alert('ooopsie doopsie\n' + message);
    }
}
