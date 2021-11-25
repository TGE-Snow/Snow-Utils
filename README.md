# Snow-Utils
 
## vue-js-Camera
- 	Dependent:	Vue 3.x
- 	Introduction:	利用 input:file 实现拍照,录像,录音. 返回是否操作及报错;
- 	Compatibility: 	Chrome,Firefox
- 	Quickstart: 	
		import { readCamera} from '...vue-js-Camera'

		readCamera(option).then(v=>{
			v == null //没有操作直接返回
			v.state = false //操作报错
			v.state = true //操作成功
			v.file //操作文件
		})