
export const elements = [
  {name: '火属性', id: 0, class: 'fire'},
  {name: '水属性', id: 1, class: 'water'},
  {name: '風属性', id: 2, class: 'wind'},
  {name: '共通', id: 99, class: 'common'}
];

export const rarities = ['A', 'S', 'SS', 'L'];

export const materials = [
  {id:0, name:'竜の爪（火）', rank: 0, element: 0, type: 'weapon'},
  {id:1, name:'竜の爪（水）', rank: 0, element: 1, type: 'weapon'},
  {id:2, name:'竜の爪（風）', rank: 0, element: 2, type: 'weapon'},
  {id:3, name:'竜の鱗（火）', rank: 1, element: 0, type: 'weapon'},
  {id:4, name:'竜の鱗（水）', rank: 1, element: 1, type: 'weapon'},
  {id:5, name:'竜の鱗（風）', rank: 1, element: 2, type: 'weapon'},
  {id:6, name:'竜の瞳（火）', rank: 2, element: 0, type: 'weapon'},
  {id:7, name:'竜の瞳（水）', rank: 2, element: 1, type: 'weapon'},
  {id:8, name:'竜の瞳（風）', rank: 2, element: 2, type: 'weapon'},
  {id:9, name:'竜の枷', rank: 99, element: 99, type: 'weapon'},
]

export const reqrueiedMaterials = {
  'A': {
    rank_0: 15,
    rank_1: 5,
    rank_2: 1,
    gold: 25000
  },
  'S': {
    rank_0: 45,
    rank_1: 20,
    rank_2: 5,
    gold: 70000
  },
  'SS': {
    rank_0: 0,
    rank_1: 40,
    rank_2: 15,
    rank_99: 5,
    gold: 200000
  }
};