import FileHelper from '../../../src/helpers/file.helper'
import fs         from 'fs'

const fileAddress = './tests/example_file'
const fileContent = 'hi'

beforeAll(() => {
  new FileHelper(fileAddress).writeFile(fileContent)
})

afterAll(() => {
  fs.unlinkSync(fileAddress)
})

describe('FileHelper class', () => {

  /**
   * By this test case we can check both of writing and reading functionalities,
   * because we've used "writeFile" method in beforeAll too.
   *
   */
  it('check read and write facilities', () => {
    const fileHelper = new FileHelper(fileAddress)
    const content = fileHelper.readFile()
    expect(content).toBe(fileContent)
  })

  it('set new file path', () => {
    const fileHelper = new FileHelper('something')
    fileHelper.setFilePath('something-else')
    expect(fileHelper.getFilePath()).toBe('something-else')
  })

})
