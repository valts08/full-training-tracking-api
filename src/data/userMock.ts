import type { UserUpdateType, UserCreateType } from "../validation/validateUser.ts";

const users: UserCreateType[] | UserUpdateType[] = [
    {
        id: '1',
        username: 'a'
    },
    {
        id: '2',
        username: 'b'
    },
    {
        id: '3',
        username: 'c'
    },
    {
        id: '4',
        username: 'd'
    }
]

export default users