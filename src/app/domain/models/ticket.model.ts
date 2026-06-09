import { TicketPriority } from '../enums/ticket-priority.enum';
import { TicketStatus } from '../enums/ticket-status.enum';


/** Modelo de dados do ticket. */
export interface Ticket {
    id: number;
    title: string;
    description: string;
    priority: TicketPriority;
    status: TicketStatus;
    departmentId: number;
    departmentDescription: string;
    requesterName: string;
    requesterEmail: string;
    createdAt: Date;
    updatedAt: Date;
}