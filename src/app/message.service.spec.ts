import { MessageService } from './message.service';

describe('MessageService', () => {
    let service: MessageService;

    beforeEach(() => {
        service = new MessageService();
    });

    it('should have no messages at start', () => {
        expect(service.messages.length).toBe(0);
    });

    it('should add correct message when add is called', () => {
        service.add('Empty Message?');
        expect(service.messages[0]).toEqual('Empty Message?');
    });

    it('should remove all messages when clear is called', () => {
        service.clear();
        expect(service.messages.length).toBe(0);
    });

});
