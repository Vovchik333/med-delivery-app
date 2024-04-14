import { UserType } from "../../../src/common/enums/user/user-type.enum";

const ADMIN_USER = {
    name: "Vova",
    email: "vova234@gmail.com",
    password: 'vova234',
    phone: "380975647321",
    address: "Naukova Street 34",
    type: UserType.ADMIN
};

const REGULAR_USER = {
    name: "Vova",
    email: "vova234@gmail.com",
    password: 'vova234',
    phone: "380975647321",
    address: "Naukova Street 34",
    type: UserType.REGULAR
};

export {
    ADMIN_USER,
    REGULAR_USER
}