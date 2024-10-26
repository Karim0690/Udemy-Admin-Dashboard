export interface IUserCreate {
    Id?:string,
    FirstName :string,
    LastName :string,
    UserName :string,
    PhoneNumber :string,
    Email :string,
    Address :string,
    Password :string,
    Image :File|null,
}
