export interface UserLogin {
    username: string,
    password: string
}
export interface User extends UserLogin {
    id: number,
    email: string,
    first_name: string,
    last_name: string

}

export interface UserResponse {
    user: User
    access: string
    refresh: string
}