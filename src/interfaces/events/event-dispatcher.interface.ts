import { Observable } from 'rxjs';
import { ICommandBus, ICommand } from '..';
import { IEventHandler } from './event-handler.interface';
import { IEvent } from './event.interface';

export interface IEventDispatcher<EventBase extends IEvent = IEvent> {
  fireEventHandler(
    event: EventBase,
    handler: IEventHandler<EventBase>,
    name: string,
  ): void | Promise<void>;
  processSaga(
    materializedSaga: Observable<ICommand>,
  ): Observable<ICommand> | Promise<Observable<ICommand>>;
  fireSaga(command: ICommand, commandBus: ICommandBus): void | Promise<void>;
}
