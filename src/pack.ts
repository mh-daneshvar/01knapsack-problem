import ItemModel     from './models/item.model'
import Context       from './strategies/context'
import Strategies    from './strategies/strategies.enum'
import SolutionModel from './models/solution.model'

export default class Pack {

  private static solution: SolutionModel

  /**
   *
   * @param strategyName
   * @param items
   * @param capacity
   */
  public static pack(strategyName: Strategies, items: ItemModel[], capacity: number): SolutionModel {
    // Validate the given inputs
    Pack.validateInputs(strategyName, items, capacity);

    // Execute the strategy
    const strategy = new Context(items, capacity)
    strategy.setStrategy(strategyName)

    // Get the solution
    Pack.solution = strategy.executeStrategy()

    return Pack.solution
  }

  /**
   * print the solution
   *
   */
  public static display(): void {
    if (Pack.solution) {
      Pack.solution.printInfo()
    }
  }

  /**
   * print the solution
   *
   */
  public static getSolution(): SolutionModel {
    return Pack.solution
  }

  /**
   *
   * @param strategyName
   * @param items
   * @param capacity
   * @private
   */
  private static validateInputs(strategyName: Strategies, items: ItemModel[], capacity: number) {
    if (!strategyName) {
      throw new Error('Invalid strategy!')
    }
    if (!items || items.length < 1) {
      throw new Error('Invalid items! You should enter at least 1 item.')
    }
    if (!capacity || capacity < 0 || capacity > 100000) {
      throw new Error('Invalid capacity! Capacity should be more than 0 and less than 100.')
    }
  }
}
