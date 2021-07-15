import TabulationStrategy from './tabulation-strategy/tabulation.strategy'
import ItemModel          from '../models/item.model'
import SolutionModel      from '../models/solution.model'
import Strategies         from './strategies.enum'
import Strategy           from './strategy.interface'

export default class Context {
  private strategy: Strategy | undefined;
  private readonly items: ItemModel[]
  private readonly capacity: number

  /**
   *
   * @param items
   * @param capacity
   */
  constructor(items: ItemModel[], capacity: number) {
    this.items = items
    this.capacity = capacity
  }

  /**
   * Mutator method for strategy
   *
   * @param strategyName
   */
  public setStrategy(strategyName: string) {
    if (!strategyName) {
      throw new Error(`You should specify the strategy for solving the problem!`)
    }

    const sanitizedStrategyName = strategyName.toUpperCase()
    if (!Object.values(Strategies).includes(sanitizedStrategyName as Strategies)) {
      throw new Error(`We don't support this strategy: ${ strategyName }`)
    }

    // TODO:
    //  after implementing the sets-strategy, you should implement the else block too.
    //  if you implemented more than 3 strategies, change the if-else block to switch-case
    if (strategyName === Strategies.TABULATION) {
      this.strategy = new TabulationStrategy(this.items, this.capacity)
    }
  }

  /**
   * Accessor method for strategy attribute
   *
   */
  public getStrategy(): Strategy | undefined {
    return this.strategy
  }

  /**
   * Execute current strategy
   *
   */
  public executeStrategy(): SolutionModel {
    if (this.strategy) {
      return this.strategy.solve()
    }
    throw new Error(`You should specify a strategy!`)
  }
}
