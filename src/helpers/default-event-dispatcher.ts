import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import {
  ICommand,
  ICommandBus,
  IEvent,
  IEventDispatcher,
  IEventHandler,
} from '../interfaces';

export class DefaultEventDispatcher<EventBase extends IEvent = IEvent>
  implements IEventDispatcher<EventBase> {
  processSaga(
    materializedSaga: Observable<ICommand>,
  ): Observable<ICommand> | Promise<Observable<ICommand>> {
    return materializedSaga.pipe(filter(e => !!e));
  }

  fireEventHandler(
    event: EventBase,
    handler: IEventHandler<EventBase>,
    name: string,
  ): void | Promise<void> {
    handler.handle(event);
  }

  fireSaga(command: ICommand, commandBus: ICommandBus): void | Promise<void> {
    commandBus.execute(command);
  }
}
