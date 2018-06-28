import * as React from 'react'
import { SceneNodeBuilder } from '@gog/scene'
import { CreateScaleArgs } from '@gog/interfaces'
import { SceneNodeBuilderConsumer } from '../Context'

export interface ScaleProps {
	name: string
	table: string
	create: (args: any) => any
}

export class Scale extends React.PureComponent<ScaleProps> {
	protected apiInstance: SceneNodeBuilder | undefined

	public render() {
		return (
			<SceneNodeBuilderConsumer>
				{api => {
					this.apiInstance = api
					this.addScale()
					return null
				}}
			</SceneNodeBuilderConsumer>
		)
	}

	protected get api(): SceneNodeBuilder {
		if (!this.apiInstance) {
			throw new Error('api must be defined')
		}

		return this.apiInstance as SceneNodeBuilder
	}

	protected addScale() {
		this.api.scale((args: CreateScaleArgs) => this.props.create(args))
	}
}
