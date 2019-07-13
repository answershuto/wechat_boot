// console.log(wechaty, message)
console.log('message!!', message.text());

const contact = message.from();
const content = message.text();
if (content === '进群' && contact) {
	// let keyroom = await
	// console.log(keyroom);
	wechaty.Room.find({ topic: '前端技术优选一群' }).then((keyroom) => {
		console.log(keyroom);
		if (keyroom && contact) {
			keyroom.add(contact).then((result) => {
				keyroom.say('欢迎新朋友！', contact);
			});
		}
	});
}
if (content.indexOf('，现在可以开始聊天了') >= 0) {
	wechaty.Room.find({ topic: '前端技术优选一群' }).then((keyroom) => {
		console.log(keyroom);
		if (keyroom && contact) {
			keyroom.add(contact).then((result) => {
				keyroom.say('欢迎新朋友！', contact);
			});
		}
	});
}
if (content === '请创建一个群' && contact) {
	message.say('好的');
}
// if(content === '我要进群' && contact){
//     let keyroom = await wechaty.Room.find({ topic: '前端技术优选一群' })
//     console.log("=====>")
//     console.log(keyroom);
//     if (keyroom && contact) {
//         await keyroom.add(contact);
//         await keyroom.say('欢迎新朋友！', contact)
//     }
