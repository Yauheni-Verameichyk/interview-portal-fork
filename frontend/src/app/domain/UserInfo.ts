export class UserInfo {

  constructor(
    public  id: number,
    public name: string,
    public surname: string,
    public roles: Array<string>
  ) { }

  public get getRoles(): Array<string> | string[] {
    return this.roles.map(role => {
      role =  role.replace(/_/g, ' ').toLowerCase();
      return role.charAt(0).toUpperCase() + role.slice(1);
    });
  }
}
