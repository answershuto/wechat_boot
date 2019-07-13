import { Wechaty, Message, Room, Contact, Friendship } from 'wechaty';
import fs from 'fs';
import path from 'path';
const QrcodeTerminal = require('qrcode-terminal');

const wechaty = Wechaty.instance();

wechaty
	.on('scan', (url, code) => {
		let loginUrl = url.replace('qrcode', 'l');
		QrcodeTerminal.generate(loginUrl);
		console.log(url);
	})
	.on('friendship', async (friendship: Friendship) => {
		let logMsg;
		try {
			logMsg = '添加好友' + friendship.contact().name();
			console.log(logMsg);
			switch (friendship.type()) {
				case Friendship.Type.Receive:
					const result = await friendship.accept();
					break;
				case Friendship.Type.Confirm:
					logMsg = 'friend ship confirmed with ' + friendship.contact().name();
					break;
			}
		} catch (e) {
			logMsg = e.message;
		}
		console.log(logMsg);
	})
	// .on('friendship', (friendship: Friendship) => {
	// 	let y = fs.readFileSync(path.join(__dirname, './friendship.js'));
	// 	var hello = new Function('wechaty, friendship', y.toString());
	// 	hello(wechaty, friendship);
	// })
	.on('login', (user: any) => {
		let y = fs.readFileSync(path.join(__dirname, './login.js'));
		var hello = new Function('wechaty, user', y.toString());
		hello(wechaty, user);
	})
	.on('room-leave', (room: Room, leaverList: Contact[], remover?: Contact) => {
		let y = fs.readFileSync(path.join(__dirname, './room-leave.js'));
		var hello = new Function('wechaty, room, leaverList, remover', y.toString());
		hello(wechaty, room, leaverList, remover);
	})
	.on('message', async (message: Message) => {
		let y = fs.readFileSync(path.join(__dirname, './message.js'));
		var hello = new Function('wechaty, message', y.toString());
		hello(wechaty, message);
	})
	.start();

process.on('uncaughtException', () => {});

process.on('unhandledRejection', () => {});
