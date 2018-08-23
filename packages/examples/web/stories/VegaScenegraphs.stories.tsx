// tslint:disable jsx-no-array-literal-props
import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { SGChart } from './util'
import { testCharts } from '@markable/testdata'

let stories = storiesOf('Vega Examples (Captured Scenegraphs)', module)
testCharts.forEach(tc => {
	stories = stories.add(tc.title, () => (
		<SGChart
			data={tc.scenegraph}
			height={tc.dimensions.height}
			width={tc.dimensions.width}
			origin={tc.dimensions.origin}
		/>
	))
})