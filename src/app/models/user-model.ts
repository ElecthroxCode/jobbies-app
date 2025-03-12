
export interface User {
    id:        string;
    fullname:  string;
    email:     string;
    isEnabled: boolean;
    roles:     Role[];
    jobs:      Job[];
}

export interface Job {
    id:          string;
    nameCompany: string;
    rolJob:      string;
    url:         string;
    status:      string;
    date:        Date;
}

export interface Role {
    name:        string;
    permissions: string[];
}

