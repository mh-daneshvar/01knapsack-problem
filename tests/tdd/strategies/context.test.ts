import Context            from '../../../src/strategies/context'
import ItemModel          from '../../../src/models/Item.model'
import Strategies         from '../../../src/strategies/strategies.enum'
import TabulationStrategy from '../../../src/strategies/tabulation-strategy/tabulation.strategy'

describe('Context Class', () => {

  it('check setStrategy method', () => {
    const itemModel = new ItemModel('something', 10, 20);
    const items = [itemModel, itemModel]

    // @ts-ignore
    const context = new Context(items, 20);
    context.setStrategy(Strategies.TABULATION)

    const tabulationStrategy = new TabulationStrategy(items, 20)

    expect(context.getStrategy()).toMatchObject(tabulationStrategy)
  })

  it('set wrong strategy', () => {
    const itemModel = new ItemModel('something', 10, 20);
    const items = [itemModel, itemModel]

    // @ts-ignore
    const context = new Context(items, 20);

    const wrongStrategyName = '!@#$some-wrong-strategy'
    const exception = () => {
      context.setStrategy(wrongStrategyName)
    }

    expect(exception).toThrowError(`We don't support this strategy: ${ wrongStrategyName }`)
  })

  it('send \'undefined\' as strategyName', () => {
    const itemModel = new ItemModel('something', 10, 20);
    const items = [itemModel, itemModel]

    // @ts-ignore
    const context = new Context(items, 20);

    const exception = () => {
      // @ts-ignore
      context.setStrategy(undefined)
    }

    expect(exception).toThrowError(`You should specify the strategy for solving the problem!`)
  })


  it('send \'null\' as strategyName', () => {
    const itemModel = new ItemModel('something', 10, 20);
    const items = [itemModel, itemModel]

    // @ts-ignore
    const context = new Context(items, 20);

    const exception = () => {
      // @ts-ignore
      context.setStrategy(null)
    }

    expect(exception).toThrowError(`You should specify the strategy for solving the problem!`)
  })

  it('execute strategy, output must be kind of Solution Model', ()=>{
    const itemModel = new ItemModel('something', 10, 20);
    const items = [itemModel, itemModel]

    // @ts-ignore
    const context = new Context(items, 20);
    context.setStrategy(Strategies.TABULATION)

    const tabulationStrategy = new TabulationStrategy(items, 20)

    expect(context.getStrategy()).toMatchObject(tabulationStrategy)
  })

  it('execute strategy, must throw error if you didn\'t specify the correct strategy', ()=>{
    const itemModel = new ItemModel('something', 10, 20);
    const items = [itemModel, itemModel]

    // @ts-ignore
    const context = new Context(items, 20);
    context.setStrategy(Strategies.TABULATION)

    const tabulationStrategy = new TabulationStrategy(items, 20)

    expect(context.getStrategy()).toMatchObject(tabulationStrategy)
  })

})
