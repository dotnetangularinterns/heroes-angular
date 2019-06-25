import { Router } from '@angular/router';

export class HttpErrorHandler {

    constructor(private router: Router) {}

    public handleError(err: any) {
        console.log(err.status);
        if (err.status === 404) {
            this.router.navigateByUrl('error/404');
        } else {
            this.router.navigateByUrl('error/400');
        }
        // let message = err.message;
        // message = message.split(' ').slice(5).toString().replace(/,/g, ' ');
        // alert('ooopsie doopsie\n' + message);
    }
}
