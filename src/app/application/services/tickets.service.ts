import { inject, Injectable, signal, computed } from '@angular/core';
import { TicketRepository } from '../../domain/interfaces/ticket.repository';
import { Ticket } from '../../domain/models/ticket.model';
import { TicketStatus } from '../../domain/enums/ticket-status.enum';

/** Serviço para gerenciamento de tickets. */
@Injectable({
    providedIn: 'root'
})
export class TicketsService {
    private readonly ticketRepository = inject(TicketRepository);

    // Lista de tickets.
    private readonly _tickets = signal<Ticket[]>([]);
    readonly tickets = this._tickets.asReadonly();

    // Total de tickets abertos.
    readonly openCount = computed(() => this._tickets().filter(ticket => ticket.status === TicketStatus.OPEN).length);

    // Busca tickets do dashboard.
    loadTickets() {
        this.ticketRepository.getDashBoardTickets().subscribe(tickets => {
            this._tickets.set(tickets);
        });
    }

    // Atualiza o status do ticket.
    changeTicketStatus(id: number, status: TicketStatus) {
        this.ticketRepository.updateTicketStatus(id, status).subscribe(res => {
            if (res.isSuccess) this.loadTickets();
        })
    }
}