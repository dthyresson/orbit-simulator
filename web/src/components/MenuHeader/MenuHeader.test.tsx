import { render } from '@redwoodjs/testing'

import MenuHeader from './MenuHeader'

describe('MenuHeader', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MenuHeader />)
    }).not.toThrow()
  })
})
