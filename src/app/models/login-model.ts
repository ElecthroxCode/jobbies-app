

export interface Login{
    username:string,
    password:string
}


export interface LoginResponse{
    jwt:string,
    msg:string,
    status:boolean,
    username:string
}

