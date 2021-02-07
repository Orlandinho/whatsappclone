export class CameraController {

    constructor(videoEl){

        this._videoEl = videoEl;

        //permissão para acessar a camera do dispositivo sendo usado pelo usuário
        navigator.mediaDevices.getUserMedia({
            video:true
        }).then(stream => {

            let mediaStream = new MediaStream(stream);
            this._videoEl.srcObject = mediaStream;
            this._videoEl.play();

        }).catch(err => {

            console.error(err);
        });
    }
}