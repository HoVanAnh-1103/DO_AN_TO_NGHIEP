import { Role } from "src/modules/role/entities/role.entity";


export class CreateUserDto {
    id?: number;
    fullName: string;
    email: string;
    phone: string;
    roles?: Array<Role>;
    password?: string;
}
