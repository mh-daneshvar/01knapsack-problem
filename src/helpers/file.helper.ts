import fs from 'fs'

export default class FileHelper {

  private filePath: string

  /**
   *
   * @param filePath
   */
  constructor(filePath: string) {
    this.filePath = filePath
  }

  /**
   *
   */
  public readFile(): string {
    const content = fs.readFileSync(this.filePath)
    if (content) {
      return content.toString()
    }
    return ''
  }

  /**
   *
   * @param content
   */
  public writeFile(content: string) {
    fs.writeFileSync(this.filePath, content)
  }

  /**
   *
   * @param newFilePath
   */
  public setFilePath(newFilePath: string) {
    this.filePath = newFilePath
  }

  /**
   *
   */
  public getFilePath(): string {
    return this.filePath
  }

}
