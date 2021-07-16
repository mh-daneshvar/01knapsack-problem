import FileHelper from './file.helper'
import ItemModel  from '../models/Item.model'

export default class FileParserHelper {

  private readonly fileHelper: FileHelper

  /**
   *
   * @param fileAddress
   */
  constructor(fileAddress: string) {
    this.fileHelper = new FileHelper(fileAddress)
  }

  /**
   *
   */
  public parseFile(): {
    capacity: number,
    items: ItemModel[]
  }[] {
    const output: {
      capacity: number,
      items: ItemModel[]
    }[] = []
    const content = this.fileHelper.readFile()

    if (content) {
      // filter is using for preventing blank lines
      const lines = content.split('\n').filter(data => data)

      /*
       * every line is something like:
       * 81 : (1,53.38,€45) (2,88.62,€98) (3,78.48,€3) (4,72.30,€76)
       */
      lines.forEach(line => {
        const splittedLine = line.split(':')

        // Based on above sample, capacity will be 81
        let capacity: number = 0
        if (splittedLine[0]) {
          capacity = +(splittedLine[0].trim()) || 0
        } else {
          throw Error('Could not read the file, because it has wrong format3!')
        }

        // Based on above sample, rawItems will be like (1,53.38,€45) (2,88.62,€98) (3,78.48,€3) (4,72.30,€76)
        let items: any = []
        const rawItems = splittedLine[1].replace(/ /g, '')
        if (rawItems) {
          items = rawItems.split(/[()]+/).filter(e => e).map(rawItem => {
            const splittedItem = rawItem.split(',')
            if (splittedItem.length === 3) {
              const name = splittedItem[0]
              // We have to do that because sometimes cpu can not calculate correct value of multiple
              const weight = Math.round((+(parseFloat(splittedItem[1]).toFixed(2))) / 100 * 10000)
              const value = parseFloat(splittedItem[2].replace('€', ''))
              return new ItemModel(name, value, weight)
            } else {
              throw Error('Could not read the file, because it has wrong format2!')
            }
          });
        } else {
          throw Error('Could not read the file, because it has wrong format1!')
        }

        output.push({ capacity: capacity * 100, items })
      })
    }

    return output
  }

  /**
   *
   * @param content
   */
  public writeResult(content: string) {
    const outputFileAddress = this.fileHelper.getFilePath().replace('input', 'output')
    this.fileHelper.setFilePath(outputFileAddress);
    this.fileHelper.writeFile(content)
  }

}
