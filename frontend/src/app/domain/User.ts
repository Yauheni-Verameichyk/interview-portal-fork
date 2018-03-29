import { DisciplineDTO } from '../api/models';

export class User {
        id: number;
        login: string;
        password: string;
        name: string;
        surname: string;
        phoneNumber: string;
        email: string;
        roleDisciplines: { [key: string]: DisciplineDTO[] };
}

