type Picture = string

interface IPictureStore {
	savePicture(picture: Picture): void
	getPicture(id: string): Picture
}
class PictureStore1 implements IPictureStore {
	public savePicture(picture: Picture) {
		console.log('保存了图片', picture)
	}
	public getPicture(id: string):Picture {
		console.log('获取了图片', id)
		const resPic:Picture = '获取的图片'
		return resPic
	}
}


const testPicStore1 = new PictureStore1()
const picture1: Picture = '一张图片'

testPicStore1.savePicture(picture1)
testPicStore1.getPicture('id')


abstract class PictureStoreConfig {
	abstract savePicture(picture: Picture): void
	abstract getPicture(id: string): Picture
}

class PictureStore2 extends PictureStoreConfig {
	public savePicture(picture: Picture) {
		console.log('保存了图片', picture)
	}
	public getPicture(id: string):Picture {
		console.log('获取了图片', id)
		const resPic:Picture = '获取的图片'
		return resPic
	}
}


const testPicStore2 = new PictureStore2()
const picture2: Picture = '一张图片'

testPicStore2.savePicture(picture2)
testPicStore2.getPicture('id')
