export interface Post {
  userId: number
  id:     number
  title:  string
  body:   string
  reactions?: Reaction
}

interface Reaction {
  like: number
  unlike: number
}
