import ItemModel          from '../../../../src/models/Item.model'
import TabulationStrategy from '../../../../src/strategies/tabulation-strategy/tabulation.strategy'
import SolutionModel      from '../../../../src/models/solution.model'

describe('Context Class', () => {

  let items: ItemModel[] = []
  let capacity: number
  let itemsCount: number

  beforeAll(() => {
    capacity = 5600
    items = [
      new ItemModel('8', 79, 1936),
      new ItemModel('6', 79, 4877),
      new ItemModel('4', 16, 3797),
      new ItemModel('3', 10, 4315),
      new ItemModel('1', 13, 9072),
      new ItemModel('2', 40, 3380),
      new ItemModel('5', 36, 4681),
      new ItemModel('7', 45, 8180),
      new ItemModel('9', 64, 676)
    ]
    itemsCount = items.length
  })

  it('given items should sorted by ', () => {
    const tabulationStrategy = new TabulationStrategy(items, capacity)
    const expectedSortedArray: ItemModel[] = [
      new ItemModel('9', 64, 676),
      new ItemModel('8', 79, 1936),
      new ItemModel('2', 40, 3380),
      new ItemModel('4', 16, 3797),
      new ItemModel('3', 10, 4315),
      new ItemModel('5', 36, 4681),
      new ItemModel('6', 79, 4877),
      new ItemModel('7', 45, 8180),
      new ItemModel('1', 13, 9072)
    ]
    // @ts-ignore
    expect(tabulationStrategy.items.toString()).toBe(expectedSortedArray.toString())
  })

  it('solve', () => {
    const tabulationStrategy = new TabulationStrategy(items, capacity)
    const solution = tabulationStrategy.solve()
    const expectedSolution = new SolutionModel([
      new ItemModel('8', 79, 1936),
      new ItemModel('9', 64, 676)
    ], 143)
    expect(solution.toString()).toBe(expectedSolution.toString())
  })

})
