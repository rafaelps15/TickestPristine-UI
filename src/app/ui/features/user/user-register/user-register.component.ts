import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from "@angular/forms";
import { RolesService } from "../../../../application/services/roles.service";
import { UsersService } from "../../../../application/services/users.service";
import { RouterModule } from '@angular/router';

/** UI de registro de usuários/colaboradores. */
@Component({
    selector: 'app-user-register',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './user-register.component.html',
    styleUrl: './user-register.component.css'
})
export class UserRegisterComponent implements OnInit {
    private readonly fb = inject(FormBuilder);
    protected readonly rolesService = inject(RolesService);
    protected readonly usersService = inject(UsersService);

    showPassword = signal(false);
    
    // Sinais para feedback de carregamento e erro (vindos do serviço futuramente)
    loading = signal(false);

    form = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        employeeCode: ['', [Validators.required]],
        departmentId: [''],
        sectorId: [''],
        specialtyId: [''],
        roleId: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });

    ngOnInit(): void {
        this.rolesService.loadRoles();
        // Aqui poderíamos carregar departamentos, setores e especialidades
    }

    togglePassword() {
        this.showPassword.update(v => !v);
    }

    onSubmit(): void {
        if (this.form.valid) {
            const raw = this.form.getRawValue();
            
            this.usersService.createUser({
                name: raw.name!,
                email: raw.email!,
                employeeCode: raw.employeeCode!,
                departmentId: raw.departmentId ? Number(raw.departmentId) : undefined,
                sectorId: raw.sectorId ? Number(raw.sectorId) : undefined,
                specialtyId: raw.specialtyId ? Number(raw.specialtyId) : undefined,
                roleId: [Number(raw.roleId)],
                password: raw.password!
            });
        } else {
            this.form.markAllAsTouched();
        }
    }
}