import { Group } from './group';

export type User = {
    firstname: string
    lastname: string
    birthday: Date
    profilePic?: File
    groups: Group[]
}