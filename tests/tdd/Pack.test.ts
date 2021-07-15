import Pack          from '../../src/Pack'
import ItemModel     from '../../src/models/Item.model'
import Strategies    from '../../src/strategies/strategies.enum'

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
    it('check the represented solution for normalItems', () => {
      // we take the same instance of the problem displayed in the image
      const items = [
        new ItemModel('element 9', 64, 676),
        new ItemModel('element 8', 79, 1936),
        new ItemModel('element 2', 40, 3380),
        new ItemModel('element 4', 16, 3797),
        new ItemModel('element 3', 10, 4315),
        new ItemModel('element 5', 36, 4681),
        new ItemModel('element 6', 79, 4877),
        new ItemModel('element 7', 45, 8180),
        new ItemModel('element 1', 13, 9072)
      ]

      const solutionModel = Pack.pack(Strategies.TABULATION, items, 5200)
      const exceptedResult = {
        'items': [
          {
            'name': 'element 8',
            'value': 79,
            'weight': 1936
          },
          {
            'name': 'element 9',
            'value': 64,
            'weight': 676
          }
        ],
        'maximumPossibleValue': 143
      }

      expect(solutionModel).toMatchObject(exceptedResult)
    });
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
