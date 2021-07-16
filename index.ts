import Pack             from './src/Pack'
import FileParserHelper from './src/helpers/fileParser.helper'

const fileAddress = './files/example_input'
const result = Pack.pack(fileAddress)
new FileParserHelper(fileAddress).writeResult(result)
