import { Component, OnInit, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from "@angular/forms";
import { RolesService } from "../../../../application/services/roles.service";
import { UsersService } from "../../../../application/services/users.service";
import { RouterModule } from '@angular/router';

/** UI de registro de usuários. */
@Component({
    selector: 'app-user-register',
    standalone: true,
    imports: [ReactiveFormsModule, RouterModule],
    templateUrl: './user-register.component.html',
    styleUrl: './user-register.component.css'
})
export class UserRegisterComponent implements OnInit {
    private readonly fb = inject(FormBuilder);
    protected readonly rolesService = inject(RolesService);
    protected readonly usersService = inject(UsersService);

    showPassword = signal(false);

    form = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/[!@#$%^&*(),.?":{}|<>]/)]],
        roleId: ['', Validators.required]
    });

    ngOnInit(): void {
        this.rolesService.loadRoles();
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
                password: raw.password!,
                roleId: [Number(raw.roleId)]
            });
        } else {
            this.form.markAllAsTouched();
        }
    }
}