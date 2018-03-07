import { DisciplineDTO } from "../api/models";

export class User {
        id: number;
        login: string;
        name: string;
        surname: string;
        phoneNumber?: string;
        roles: Array<string>
        roleDisciplines?: { [key: string]: DisciplineDTO[] 
        };
}

