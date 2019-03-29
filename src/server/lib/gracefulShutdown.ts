import { Server } from 'http';

function getShutdownHandler(server: Server): () => void {
	let sockets: any = {};
	let nextSocketId = 0;
	server.on('connection', function onServerConnection(socket) {
		const socketId = nextSocketId++;
		sockets[socketId] = socket;

		socket.once('close', function onSocketClose() {
			delete sockets[socketId];
		});
	});

	function shutdown() {
		waitForSocketsToClose(10);

		server.close(function onServerClosed(err?: Error) {
			if (err) {
				console.error(err);
				process.exitCode = 1;
			}
			process.exit();
		});
	}

	function waitForSocketsToClose(counter: number) {
		if (counter > 0) {
			console.log(`==> Waiting up to ${counter} ${counter !== 1 ? 'seconds' : 'second'} for all connections to close...`);
			setTimeout(waitForSocketsToClose, 1000, counter - 1);
			return;
		}
		
		console.log("==> Forcing all connections to close now");
		for (const socketId in sockets) {
			sockets[socketId].destroy();
		}
	}

	return shutdown;
}

export default getShutdownHandler;