import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RolesService } from "../../../../application/services/roles.service";
import { UsersService } from "../../../../application/services/users.service";

/** Componente de UI para o registro de novos usuários. */
@Component({
    selector: 'app-user-register',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './user-register.component.html',
    styleUrl: './user-register.component.css'
})
export class UserRegisterComponent implements OnInit {
    private readonly fb = inject(FormBuilder);
    protected readonly rolesService = inject(RolesService);
    protected readonly usersService = inject(UsersService);

    form: FormGroup = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/[!@#$%^&*(),.?":{}|<>]/)]],
        roleId: ['', Validators.required]
    });

    ngOnInit(): void {
        this.rolesService.loadRoles();
    }

    onSubmit(): void {
        if (this.form.valid) {
            const raw = this.form.getRawValue();
            this.usersService.createUser({
                ...raw,
                roleId: [Number(raw.roleId)]
            });
        }
    }
}