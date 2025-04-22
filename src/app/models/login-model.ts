

export interface Login{
    username:string,
    password:string
}


export interface LoginResponse{
    refreshToken:string,
    jwt:string,
    msg:string,
    status:boolean,
    username:string
}

