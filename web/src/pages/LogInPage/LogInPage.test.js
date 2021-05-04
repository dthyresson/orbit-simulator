import { render } from '@redwoodjs/testing'

import LogInPage from './LogInPage'

describe('LogInPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LogInPage />)
    }).not.toThrow()
  })
})
