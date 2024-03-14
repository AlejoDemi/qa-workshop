import { render } from '@testing-library/react'

const customRender = (ui, options = {}) => {
	return render(
		ui,
		{
			wrapper: ({ children }) => children,
			...options
		}
	)
}

export * from '@testing-library/react'
// override render export
export { customRender as render }