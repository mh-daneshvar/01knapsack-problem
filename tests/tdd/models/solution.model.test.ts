import ItemModel     from '../../../src/models/Item.model'
import SolutionModel from '../../../src/models/solution.model'

describe('Solution Model Class', () => {

  it('output of printInfo', () => {
    console.log = jest.fn();

    const item = { name: 'something', value: 10, weight: 20 }
    const itemModel = new ItemModel(item.name, item.value, item.weight);

    const items = [itemModel, itemModel]
    const expectedOutput = '- ' + item.name + ' [value = ' + item.value + ', weight = ' + item.weight + ']';

    const solutionModel = new SolutionModel(items, 200)
    solutionModel.printInfo();

    expect(console.log).toHaveBeenLastCalledWith(expectedOutput);
  })

  it('times of call of printInfo', () => {
    console.log = jest.fn();

    const item = { name: 'something', value: 10, weight: 20 }
    const itemModel = new ItemModel(item.name, item.value, item.weight);

    const items = [itemModel, itemModel]
    const solutionModel = new SolutionModel(items, 200)
    solutionModel.printInfo();

    expect(console.log).toHaveBeenCalledTimes(items.length);
  })

})
