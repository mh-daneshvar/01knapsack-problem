import ItemModel  from './models/item.model'
import Context    from './strategies/context'
import Strategies from './strategies/strategies.enum'

export default class Pack {

  /**
   *
   * @param strategyName
   * @param items
   * @param capacity
   */
  public static pack(strategyName: Strategies, items: ItemModel[], capacity: number) {
    // Validate the given inputs
    Pack.validateInputs(strategyName, items, capacity);

    // Execute the strategy
    const strategy = new Context(items, capacity)
    strategy.setStrategy(strategyName)

    // Get the solution
    const solution = strategy.executeStrategy()

    // Do what you want
    if (solution) {
      solution.printInfo()
    }
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
