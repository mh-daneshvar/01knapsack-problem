import BaseModel from './base.model'

export default class ItemModel extends BaseModel {

  public name: string
  public value: number
  public weight: number

  /**
   *
   * @param name
   * @param value
   * @param weight
   */
  public constructor(name: string, value: number, weight: number) {
    super()
    this.name = name;
    this.value = value;
    this.weight = weight;
  }

  /**
   *
   */
  public printInfo(): string {
    return this.name + ' [value = ' + this.value + ', weight = ' + this.weight + ']';
  }
}
