import Pack             from './src/Pack'
import FileParserHelper from './src/helpers/fileParser.helper'

import * as dotenv from 'dotenv'

dotenv.config()

const fileAddress = process.env.FILES_DIRECTORY + '/example_input'
const result = Pack.pack(fileAddress)
new FileParserHelper(fileAddress).writeResult(result)
