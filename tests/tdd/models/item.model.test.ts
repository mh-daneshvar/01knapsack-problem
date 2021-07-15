import ItemModel from '../../../src/models/Item.model'

describe('Item Model Class', () => {

  it('output of printInfo', () => {
    const item = {
      name: 'something',
      value: 10,
      weight: 20
    }
    const expectedOutput = item.name + ' [value = ' + item.value + ', weight = ' + item.weight + ']';

    const itemModel = new ItemModel(item.name, item.value, item.weight);

    expect(itemModel.printInfo).toBe(expectedOutput);
  })

})
