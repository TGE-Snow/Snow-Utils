import { watch, reactive } from '@vue/runtime-core';


export const readCamera = (options) => {
    let fileForm;
    let fileInput;
    const opts = Object.assign({}, options);

    const state = reactive({
        isfocus: false,
        isTrue: false,
    })


    const initCamera = () => {
        if (!fileForm) {
            fileForm = document.createElement('form')
            fileInput = document.createElement('input')
            fileForm.style = 'width:0px;height:0px;'
            fileInput.name = 'file'
            fileInput.type = 'file'


            switch (opts.type) {
                case "camcorder":
                    fileInput.capture = "camcorder";
                    fileInput.accept = "video/*"
                    break;
                case "microphone":
                    fileInput.capture = "microphone";
                    fileInput.accept = "audio/*"
                    break;
                default:
                    fileInput.capture = "camera";
                    fileInput.accept = "image/*"
                    break;
            }

            fileForm.appendChild(fileInput)
            document.body.appendChild(fileForm)
        }
    }
    initCamera();

    let ret = null;

    return new Promise((resolve, reject) => {
        let debounce = null;
        watch(() => {
            const { isfocus, isTrue } = state;
            return {
                isfocus, isTrue
            }
        }, () => {
            console.log(state.isTrue, state.isfocus);
            clearTimeout(debounce);
            debounce = setTimeout(() => {
                if (state.isTrue && state.isfocus) {
                    resolve(ret)
                }
            }, 500)

        });
        fileInput.onfocus = () => {
            if (!state.isfocus) {
                state.isfocus = true;
            } else {
                state.isTrue = true;
            }
        }
        fileInput.onchange = (evnt) => {
            state.isTrue = false;
            const { files } = evnt.target
            const file = files[0]
            let errorType = null;

            // 校验类型
            switch (opts.type) {
                case "camcorder":
                    if (file.type.indexOf('video/') == -1) {
                        alert("文件类型错误")
                        errorType = { status: false, file, message: "文件类型错误" }
                    }
                    break;
                case "microphone":
                    if (file.type.indexOf('audio/') == -1) {
                        alert("文件类型错误")
                        errorType = { status: false, file, message: "文件类型错误" }
                    }
                    break;
                default:
                    if (file.type.indexOf('image/') == -1) {
                        alert("文件类型错误")
                        errorType = { status: false, file, message: "文件类型错误" }
                    }
                    break;
            }
            if (errorType) {
                ret = errorType;
            } else {
                ret = { status: true, file };
            }
            state.isTrue = true;
        }
        fileForm.reset()
        fileInput.focus()
        fileInput.click()
    })
}