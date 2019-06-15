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
  },
  {
    id: 'su',
    account: 'yoshonabee',
    password: 'bysuck'
  }
]

const projects = [
  {
    id: '1',
    author: 'su',
    title: 'one',
    description: 'testing',
    image_id: 'https://i.imgur.com/VF4ZK6x.jpg',
    blur: 1,
    brightness: 1,
    contrast: 1,
    grayscale: 1,
    hue_rotate: 1,
    invert: 1,
    opacity: 1,
    saturate: 1,
    sepia: 1,
  },
  {
    id: '2',
    author: '01',
    title: 'two',
    description: 'testing',
    image_id: 'https://i.imgur.com/rIgU6df.jpg',
    blur: 1,
    brightness: 1,
    contrast: 1,
    grayscale: 1,
    hue_rotate: 1,
    invert: 1,
    opacity: 1,
    saturate: 1,
    sepia: 1,
  },
  {
    id: '3',
    author: 'su',
    title: 'three',
    description: 'testing',
    image_id: 'https://i.imgur.com/tDwPQWl.jpg',
    blur: 1,
    brightness: 1,
    contrast: 1,
    grayscale: 1,
    hue_rotate: 1,
    invert: 1,
    opacity: 1,
    saturate: 1,
    sepia: 1,
  },
  {
    id: '4',
    author: '02',
    title: 'four',
    description: 'testing',
    image_id: 'https://i.imgur.com/nVbLKWL.jpg',
    blur: 1,
    brightness: 1,
    contrast: 1,
    grayscale: 1,
    hue_rotate: 1,
    invert: 1,
    opacity: 1,
    saturate: 1,
    sepia: 1,
  },{
    id: '5',
    author: '02',
    title: 'five',
    description: 'testing',
    image_id: 'https://i.imgur.com/VF4ZK6x.jpg',
    blur: 1,
    brightness: 1,
    contrast: 1,
    grayscale: 1,
    hue_rotate: 1,
    invert: 1,
    opacity: 1,
    saturate: 1,
    sepia: 1,
  }
]

const db = {
  users,
  projects
}

export { db as default }
