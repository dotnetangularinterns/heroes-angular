import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { MessageService } from './message.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private injector: Injector) {}

    handleError(error) {
        console.log('Some error');
        const loggingService = this.injector.get(MessageService);
        const message = error.message ? error.message : error.toString();

        loggingService.add(message);

        throw error;
    }

}