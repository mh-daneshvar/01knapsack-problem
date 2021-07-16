import ItemModel        from './models/item.model'
import Context          from './strategies/context'
import Strategies       from './strategies/strategies.enum'
import SolutionModel    from './models/solution.model'
import FileParserHelper from './helpers/fileParser.helper'

export default class Pack {

  private static solution: SolutionModel

  /**
   *
   * @param fileAddress
   */
  public static pack(fileAddress: string): string {
    const fileHelper = new FileParserHelper(fileAddress)
    const problems = fileHelper.parseFile()

    let results: string[] = []
    problems.forEach(problem => {
      const result = Pack.calculateSolution(Strategies.TABULATION, problem.items, problem.capacity).getResult()
      results.push(result)
    })

    return results.join('\n')
  }

  /**
   *
   * @param strategyName
   * @param items
   * @param capacity
   */
  public static calculateSolution(strategyName: Strategies, items: ItemModel[], capacity: number): SolutionModel {
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
   * in development time, you can use this method to print the solution
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
      throw Error('Invalid strategy!')
    }
    if (!items || items.length < 1) {
      throw Error('Invalid items! You should enter at least 1 item.')
    }
    if (items.length > 15) {
      const message = `Invalid items [${ items.length }]: 
      The maximum count of items should equal or less than 15.`
      throw new Error(message)
    }
    if (!capacity || capacity < 0 || capacity > 10000) {
      const message = `Invalid capacity [${ capacity }]: 
      Capacity should be more than 0 and less than 100.`
      throw new Error(message)
    }
    items.forEach((item: ItemModel) => {
      if (item.weight > 10000 || item.value > 100) {
        const message = `Invalid item [${ item.name }]: 
        The maximum weight and cost of an item should be equal or less than 100.`
        throw new Error(message)
      }
    })
  }
}
