export class UserInfo {

  constructor(
    public  id: number,
    public name: string,
    public surname: string,
    public roles: Array<string>
  ) { }
}
