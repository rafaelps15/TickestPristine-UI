import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RolesService } from "../../../../application/services/roles.service";
import { UsersService } from "../../../../application/services/users.service";

/**
 * Componente de Interface do Usuário para o Cadastro de novos usuários.
 * É um 'Smart Component' que interage com os serviços de aplicação para
 * coletar dados do formulário e processar o registro.
 */
@Component({
    selector: 'app-user-register',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './user-register.component.html',
    styleUrl: './user-register.component.css'
})
export class UserRegisterComponent implements OnInit {
    private fb = inject(FormBuilder);
    protected rolesService = inject(RolesService);
    protected usersService = inject(UsersService);

    /**
     * Definição do formulário reativo com validações integradas.
     * Utiliza a estrutura do CreateUserRequest para garantir compatibilidade.
     */
    form: FormGroup = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [
            Validators.required, 
            Validators.minLength(8),
            // Regex para exigir pelo menos um caractere especial
            Validators.pattern(/[!@#$%^&*(),.?":{}|<>]/)
        ]],
        roleId: ['', Validators.required]
    });

    ngOnInit(): void {
        // Carrega as opções de papéis (roles) assim que o componente inicia
        this.rolesService.loadRoles();
    }

    /**
     * Processa o envio do formulário.
     * Realiza a conversão necessária dos dados para o formato esperado pelo serviço.
     */
    onSubmit(): void {
        if (this.form.valid) {
            const {name, email, password, roleId} = this.form.getRawValue();

            this.usersService.createUser({
                name: name!,
                email: email,
                password: password!,
                roleId: [Number(roleId)]
            });
        }
    }
}