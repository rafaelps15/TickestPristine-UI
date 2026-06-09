import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { TicketRepository } from '../../domain/interfaces/ticket.repository';
import { Ticket } from '../../domain/models/ticket.model';
import { TicketStatus } from '../../domain/enums/ticket-status.enum';

import { ApiResultDto } from '../dtos/api-result.dto';

/** Implementação HTTP do repositório de tickets. */
@Injectable({
    providedIn: 'root'
})
export class TicketHttpRepository extends TicketRepository {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = 'http://localhost:5195/api/tickets';

    getDashBoardTickets() {
        return this.http
            .get<ApiResultDto<Ticket[]>>(`${this.apiUrl}/dashboard`)
            .pipe(map(result => result.value));
    }

    getTickeMessages(ticketId: number) {
        return this.http
            .get<ApiResultDto<unknown[]>>(`${this.apiUrl}/${ticketId}/messages`)
            .pipe(map(result => result.value));
    }

    updateTicketStatus(id: number, status: TicketStatus) {
        return this.http
            .put<ApiResultDto<void>>(`${this.apiUrl}/${id}/status`, { status });

    }
}   