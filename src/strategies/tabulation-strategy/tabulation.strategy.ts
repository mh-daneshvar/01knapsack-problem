import Strategy      from '../strategy.interface'
import ItemModel     from '../../models/Item.model'
import SolutionModel from '../../models/solution.model'

export default class TabulationStrategy implements Strategy {

  private readonly items: ItemModel[];
  private readonly capacity: number;
  private readonly itemsCount: number;

  /**
   * Constructor
   *
   * @param items: all given items
   * @param capacity: the maximum capacity of bag
   */
  public constructor(items: ItemModel[], capacity: number) {
    this.items = TabulationStrategy.sortByWeight(items);
    this.capacity = capacity;
    this.itemsCount = items.length;
  }

  /**
   *
   */
  public solve(): SolutionModel {
    const matrix = this.getMatrix()

    const itemsSolution: any = []
    let res = matrix[this.itemsCount][this.capacity];
    let w = this.capacity;

    for (let i = this.itemsCount; i > 0 && res > 0; i--) {
      if (res != matrix[i - 1][w]) {
        itemsSolution.push(this.items[i - 1]);
        // we remove items value and weight
        res -= this.items[i - 1].value;
        w -= this.items[i - 1].weight;
      }
    }

    return new SolutionModel(itemsSolution, matrix[this.itemsCount][this.capacity]);
  }

  /**
   *
   * @private
   */
  private getMatrix(): number[][] {
    // We use a matrix to store the max value at each n-th item
    let matrix: any[] = [];
    matrix[0] = []

    // Build table matrix[][] in bottom up manner
    for (let i = 0; i <= this.itemsCount; i++) {
      matrix[i] = [];
      for (let w = 0; w <= this.capacity; w++) {
        if (i === 0 || w === 0) {
          matrix[i][w] = 0;
        } else if (this.items[i - 1].weight <= w) {
          matrix[i][w] = Math.max(
            matrix[i - 1][w],
            this.items[i - 1].value + matrix[i - 1][w - this.items[i - 1].weight]
          );
        } else {
          matrix[i][w] = matrix[i - 1][w];
        }
      }
    }

    return matrix
  }

  /**
   *
   * @param items
   * @private
   */
  private static sortByWeight(items: ItemModel[]) {
    for (let i = 0; i < items.length; i++) {
      for (let j = i; j < items.length; j++) {
        if (items[i].weight > items[j].weight) {
          const conj = items[j];
          items[j] = items[i];
          items[i] = conj;
        }
      }
    }
    return items
  }
}
