export default interface GroupsData {
  key?: string | null,
  id: number
  name: string,
  //members: Array<User>,
  description: string,
  image: string
  labels: Array<string>,
}