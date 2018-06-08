import { Path } from 'd3-path'
import { MarkType } from '@gog/mark-interfaces'
import { SGMark, SGAreaItem } from '@gog/scenegraph-interfaces'
import { VSvgNode } from '@gog/vdom-interfaces'
import { emitMarkGroup, commonProps, assertTypeIs } from './util'
import { area } from '../path'
import { VSvgMarkConverter } from './interfaces'

export class AreaRenderer implements VSvgMarkConverter {
	public static TARGET_MARK_TYPE = MarkType.Area

	public render(mark: SGMark<SGAreaItem>) {
		assertTypeIs(mark, AreaRenderer.TARGET_MARK_TYPE)

		const renderedItems: VSvgNode[] = []
		if (mark.items.map.length === 0) {
			return { nodes: [] }
		}

		const areaItems = mark.items.map(a => ({
			...a,
			height: a.y2 - a.y,
		}))
		const areaItem = {
			type: 'path',
			attrs: {
				d: area(areaItems, undefined).toString(),
			},
			metadata: areaItems[0].metadata,
			channels: areaItems[0].channels,
		}
		mark.items.forEach(
			item =>
				(areaItem.attrs = {
					...areaItem.attrs,
					...commonProps(item),
				}),
		)

		const nodes = emitMarkGroup(MarkType.Area, mark.role, [areaItem])
		return { nodes }
	}
}