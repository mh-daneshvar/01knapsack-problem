import Pack       from '../../src/Pack'
import Strategies from '../../src/strategies/strategies.enum'
import FileHelper from '../../src/helpers/file.helper'

const fileAddress = './tests/example_input'
beforeAll(() => {
  new FileHelper(fileAddress).writeFile(`81 : (1,53.38,€45) (2,88.62,€98) (3,78.48,€3) (4,72.30,€76) (5,30.18,€9) (6,46.34,€48)
8 : (1,15.3,€34)
75 : (1,85.31,€29) (2,14.55,€74) (3,3.98,€16) (4,26.24,€55) (5,63.69,€52) (6,76.25,€75) (7,60.02,€74) (8,93.18,€35) (9,89.95,€78)
56 : (1,90.72,€13) (2,33.80,€40) (3,43.15,€10) (4,37.97,€16) (5,46.81,€36) (6,48.77,€79) (7,81.80,€45) (8,19.36,€79) (9,6.76,€64)
`)
})

describe('Pack Class', () => {

  /*
   * ------------------------------------------------------
   * Test Cases for pack Method
   * ------------------------------------------------------
   */
  describe('pack method', () => {
    it('check the represented solution for normalItems', () => {
      const solution = Pack.pack(fileAddress)
      const exceptedResult = '4\n-\n7,2\n8,9'
      expect(solution).toBe(exceptedResult)
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
