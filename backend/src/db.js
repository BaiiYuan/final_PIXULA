const users = [
  {
    id: '01',
    account: 'qqq',
    password: 'aaa'
  },
  {
    id: '02',
    account: 'abcabc',
    password: 'qwertyuiop'
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
    imageOriginal: 'https://i.imgur.com/VF4ZK6x.jpg',
    imageTransfer: 'https://i.imgur.com/VF4ZK6x.jpg',
    imageFinal: 'https://i.imgur.com/VF4ZK6x.jpg',
    blur: 0,
    brightness: 1,
    contrast: 1,
    grayscale: 0,
    hue_rotate: 0,
    invert: 0,
    opacity: 1,
    saturate: 1,
    sepia: 0,
    public: true,
    date: "1561192943005"
  },
  {
    id: '2',
    author: '02',
    title: 'two',
    description: 'testing',
    imageOriginal: 'https://i.imgur.com/rIgU6df.jpg',
    imageTransfer: 'https://i.imgur.com/rIgU6df.jpg',
    imageFinal: 'https://i.imgur.com/rIgU6df.jpg',
    blur: 0,
    brightness: 1,
    contrast: 1,
    grayscale: 0,
    hue_rotate: 0,
    invert: 0,
    opacity: 1,
    saturate: 1,
    sepia: 0,
    public: false,
    date: "1561192943014"
  },
  {
    id: '3',
    author: 'su',
    title: 'three',
    description: 'testing',
    imageOriginal: 'https://i.imgur.com/tDwPQWl.jpg',
    imageTransfer: 'https://i.imgur.com/tDwPQWl.jpg',
    imageFinal: 'https://i.imgur.com/tDwPQWl.jpg',
    blur: 3,
    brightness: 1.5,
    contrast: 1,
    grayscale: 0,
    hue_rotate: 0,
    invert: 0,
    opacity: 1,
    saturate: 1,
    sepia: 0,
    public: true,
    date: "1561192943019"
  },
  {
    id: '4',
    author: '02',
    title: 'four',
    description: 'testing',
    imageOriginal: 'https://i.imgur.com/nVbLKWL.jpg',
    imageTransfer: 'https://i.imgur.com/nVbLKWL.jpg',
    imageFinal: 'https://i.imgur.com/nVbLKWL.jpg',
    blur: 0,
    brightness: 1,
    contrast: 1,
    grayscale: 0,
    hue_rotate: 0,
    invert: 0,
    opacity: 1,
    saturate: 1,
    sepia: 0,
    public: false,
    date: "1561192943021"
  },{
    id: '5',
    author: '02',
    title: 'five',
    description: 'testing',
    imageOriginal: 'https://i.imgur.com/VF4ZK6x.jpg',
    imageTransfer: 'https://i.imgur.com/VF4ZK6x.jpg',
    imageFinal: 'https://i.imgur.com/VF4ZK6x.jpg',
    blur: 0,
    brightness: 1,
    contrast: 1,
    grayscale: 0,
    hue_rotate: 0,
    invert: 0,
    opacity: 1,
    saturate: 1,
    sepia: 0,
    public: false,
    date: "1561192943038"
  },{
    id: '6',
    author: '01',
    title: 'five',
    description: 'testing',
    imageOriginal: 'https://i.imgur.com/LZUEDmb.jpg',
    imageTransfer: 'https://i.imgur.com/LZUEDmb.jpg',
    imageFinal: 'https://i.imgur.com/LZUEDmb.jpg',
    blur: 0,
    brightness: 1.5,
    contrast: 1,
    grayscale: 0,
    hue_rotate: 0,
    invert: 0,
    opacity: 1,
    saturate: 1,
    sepia: 0,
    public: true,
    date: "1561192943049"
  },{
    id: '7',
    author: '01',
    title: 'five',
    description: 'testing',
    imageOriginal: 'https://i.imgur.com/Epv1eim.jpg',
    imageTransfer: 'https://i.imgur.com/Epv1eim.jpg',
    imageFinal: 'https://i.imgur.com/Epv1eim.jpg',
    blur: 0,
    brightness: 1,
    contrast: 1,
    grayscale: 0,
    hue_rotate: 0,
    invert: 0,
    opacity: 1,
    saturate: 1,
    sepia: 0,
    public: false,
    date: "1561192943065"
  },{
    id: '8',
    author: '01',
    title: 'five',
    description: 'testing',
    imageOriginal: 'https://i.imgur.com/TyjD0Wql.jpg',
    imageTransfer: 'https://i.imgur.com/TyjD0Wql.jpg',
    imageFinal: 'https://i.imgur.com/TyjD0Wql.jpg',
    blur: 0,
    brightness: 1,
    contrast: 1,
    grayscale: 0,
    hue_rotate: 0,
    invert: 0,
    opacity: 1,
    saturate: 1,
    sepia: 0,
    public: true,
    date: "1561192943093"
  }
]

const db = {
  users,
  projects
}

export { db as default }
