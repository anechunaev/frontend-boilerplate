import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import RoutingTable from '../../routingTable';

export interface IOuterProps {
	routingTable: typeof RoutingTable;
}

export interface IInnerProps extends IOuterProps {
	classes: Record<string, string>;
}

export default function Menu(props: IInnerProps) {
	const { routingTable, classes, ...rest } = props;
	return (
		<div {...rest}>
			{routingTable.map((route, index, src) => (
				<span key={`item${index}`}>
					<RouterLink to={route.path} className={classes.link}>
						{route.id}
					</RouterLink>
					{index < src.length - 1 && (
						<span>&emsp;&middot;&emsp;</span>
					)}
				</span>
			))}
		</div>
	);
}
