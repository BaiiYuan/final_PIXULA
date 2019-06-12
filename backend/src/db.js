const users = [
  {
    id: '01',
    account: 'abcabc',
    password: 'qwertyuiop'
  },
  {
    id: '02',
    account: 'abcasdfarbc',
    password: 'qwasdfewertyuiop'
  },{
    id: '03',
    account: 'abcffabc',
    password: 'qwdswertyuiop'
  }
]

const images = [
  {
    id: '1',
    author: '01',
    filename: '1.jpg'
  },
  {
    id: '2',
    author: '01',
    filename: '2.jpg'
  },
  {
    id: '3',
    author: '02',
    filename: '3.jpg'
  },
  {
    id: '4',
    author: '03',
    filename: '4.jpg'
  },{
    id: '5',
    author: '03',
    filename: '5.jpg'
  }
]

const db = {
  users,
  images
}

export { db as default }
