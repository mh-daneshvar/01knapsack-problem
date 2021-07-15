import Pack       from '../../src/Pack'
import ItemModel  from '../../src/models/Item.model'
import Strategies from '../../src/strategies/strategies.enum'

const normalItems: ItemModel[] = [
  new ItemModel('element 1', 13, 9072),
  new ItemModel('element 2', 40, 3380),
  new ItemModel('element 3', 64, 676)
]

describe('Pack Class', () => {

  /*
   * ------------------------------------------------------
   * Test Cases for pack Method
   * ------------------------------------------------------
   */
  describe('pack method', () => {
    it.todo('check the represented solution for normalItems');
  })

  /*
   * ------------------------------------------------------
   * Test Cases for validateInputs Method
   * ------------------------------------------------------
   */
  describe('validateInputs method', () => {
    describe('check invalid strategy', () => {
      it('undefined strategy name', () => {
        const validation = () => {
          // @ts-ignore
          Pack.validateInputs(undefined, emptyItems, 20)
        }
        expect(validation).toThrowError()
      })

      it('invalid strategy name', () => {
        const validation = () => {
          // @ts-ignore
          Pack.validateInputs('invalid-strategy', emptyItems, 20)
        }
        expect(validation).toThrowError()
      })
    })

    describe('check invalid items', () => {
      it('undefined items array', () => {
        const validation = () => {
          // @ts-ignore
          Pack.validateInputs(Strategies.TABULATION, undefined, 20)
        }
        expect(validation).toThrowError()
      })

      it('empty items array', () => {
        const validation = () => {
          // @ts-ignore
          Pack.validateInputs(Strategies.TABULATION, [], 20)
        }
        expect(validation).toThrowError()
      })
    })

    describe('check invalid capacity', () => {
      it('undefined capacity', () => {
        const validation = () => {
          // @ts-ignore
          Pack.validateInputs(Strategies.TABULATION, normalItems, undefined)
        }
        expect(validation).toThrowError()
      })

      it('null capacity', () => {
        const validation = () => {
          // @ts-ignore
          Pack.validateInputs(Strategies.TABULATION, normalItems, null)
        }
        expect(validation).toThrowError()
      })

      it('negative capacity', () => {
        const validation = () => {
          // @ts-ignore
          Pack.validateInputs(Strategies.TABULATION, normalItems, -10)
        }
        expect(validation).toThrowError()
      })

      it('too much capacity', () => {
        const validation = () => {
          // @ts-ignore
          Pack.validateInputs(Strategies.TABULATION, normalItems, 1000000) // todo: change the maximum capacity
        }
        expect(validation).toThrowError()
      })
    })
  })
})
