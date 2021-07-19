import ItemModel          from '../../../../src/models/Item.model'
import TabulationStrategy from '../../../../src/strategies/tabulation-strategy/tabulation.strategy'

describe('Context Class', () => {

  let items: ItemModel[] = []
  let capacity: number
  let itemsCount: number

  beforeAll(() => {
    capacity = 56
    items = [
      new ItemModel('8', 79, 19.36),
      new ItemModel('6', 79, 48.77),
      new ItemModel('4', 16, 37.97),
      new ItemModel('3', 10, 43.15),
      new ItemModel('1', 13, 90.72),
      new ItemModel('2', 40, 33.80),
      new ItemModel('5', 36, 46.81),
      new ItemModel('7', 45, 81.80),
      new ItemModel('9', 64, 6.76)
    ]
    itemsCount = items.length
  })

  it('given items should sorted by ', () => {
    const tabulationStrategy = new TabulationStrategy(items, capacity)
    const expectedSortedArray: ItemModel[] = [
      new ItemModel('9', 64, 6.76),
      new ItemModel('8', 79, 19.36),
      new ItemModel('2', 40, 33.80),
      new ItemModel('4', 16, 37.97),
      new ItemModel('3', 10, 43.15),
      new ItemModel('5', 36, 46.81),
      new ItemModel('6', 79, 48.77),
      new ItemModel('7', 45, 81.80),
      new ItemModel('1', 13, 90.72)
    ]
    // @ts-ignore
    expect(tabulationStrategy.items).toBe(expectedSortedArray)
  })

  it('solve', () => {
    const tabulationStrategy = new TabulationStrategy(items, capacity)

  })
  it.todo('getMatrix')

})
