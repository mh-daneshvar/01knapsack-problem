import SolutionModel from '../models/solution.model'

export default interface Strategy {
  solve(): SolutionModel
}
