import ItemModel  from './src/models/item.model';
import Pack       from './src/Pack'
import Strategies from './src/strategies/strategies.enum'

// we take the same instance of the problem displayed in the image
const items = [
  new ItemModel('element 1', 13, 9072),
  new ItemModel('element 2', 40, 3380),
  new ItemModel('element 3', 10, 4315),
  new ItemModel('element 4', 16, 3797),
  new ItemModel('element 5', 36, 4681),
  new ItemModel('element 6', 79, 4877),
  new ItemModel('element 7', 45, 8180),
  new ItemModel('element 8', 79, 1936),
  new ItemModel('element 9', 64, 676)
]

Pack.pack(Strategies.TABULATION, items, 5200)
