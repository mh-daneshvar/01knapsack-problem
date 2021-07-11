import ItemModel from './Item.model'
import BaseModel from './base.model'

export default class SolutionModel extends BaseModel {

  private readonly items: ItemModel[];
  private readonly maximumPossibleValue: number;

  /**
   * Constructor
   *
   * @param items: all given items
   * @param value: the maximum possible value that someone can carry by this bag
   */
  public constructor(items: ItemModel[], value: number) {
    super()
    this.items = items;
    this.maximumPossibleValue = value;
  }

  /**
   *
   */
  public printInfo(): void {
    this.items.forEach(item => {
      console.log('- ' + item.printInfo());
    })
  }

}
