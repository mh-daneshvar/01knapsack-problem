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
  it.todo('test parse file functionality')
  it.todo('test write result functionality')
})
