import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../application/services/auth.service';
import { Router } from '@angular/router';
import { TicketsService } from '../../../application/services/tickets.service';
import { TicketStatus } from '../../../domain/enums/ticket-status.enum';
import { Ticket } from '../../../domain/models/ticket.model';

/** UI da área restrita. */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly ticketsService = inject(TicketsService);

  readonly TicketStatus = TicketStatus;
  
  // Estado local.
  readonly filterText = signal('');
  readonly selectedTicket = signal<Ticket | null>(null);
  readonly currentMessages = signal<any[]>([]);
  readonly chatInput = signal('');

  // Sinais vindos do serviço.
  readonly tickets = this.ticketsService.tickets;
  readonly openCount = this.ticketsService.openCount;

  // Sumário para o banner.
  readonly summary = computed(() => ({
    openTickets: this.openCount(),
    completedThisMonth: this.tickets().filter(t => t.status === TicketStatus.RESOLVED).length
  }));

  // Filtro reativo.
  readonly filteredTickets = computed(() => {
    const term = this.filterText().toLowerCase();
    return this.tickets().filter(t =>
      t.title.toLowerCase().includes(term) ||
      t.id.toString().includes(term)
    );
  });

  ngOnInit() {
    this.ticketsService.loadTickets();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  handleOpenTicket(id: number) {
    const ticket = this.tickets().find(t => t.id === id);
    this.selectedTicket.set(ticket || null);
    // TODO: Carregar mensagens se necessário via serviço
    this.currentMessages.set([]); 
  }

  handleStatusUpdate(id: number, status: string) {
    this.ticketsService.changeTicketStatus(id, status as TicketStatus);
  }

  handleSendMessage() {
    if (!this.chatInput().trim()) return;
    
    // TODO: Implementar envio de mensagem via serviço
    const newMessage = {
      id: Date.now(),
      content: this.chatInput(),
      authorName: 'Me',
      isMe: true,
      createdAt: new Date()
    };

    this.currentMessages.update(msgs => [...msgs, newMessage]);
    this.chatInput.set('');
  }
}
