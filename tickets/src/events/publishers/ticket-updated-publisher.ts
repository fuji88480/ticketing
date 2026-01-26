import { Publisher, Subjects, TicketUpdatedEvent } from '@bosstickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
