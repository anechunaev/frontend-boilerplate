import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import RoutingTable from '../../routingTable';

export interface IProps {
	routingTable: typeof RoutingTable;
}

export default function Menu(props: IProps) {
	const { routingTable, ...rest } = props;
	return (
		<div {...rest}>
			{routingTable.map((route, index, src) => (
				<span key={`item${index}`}>
					<RouterLink to={route.path}>
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