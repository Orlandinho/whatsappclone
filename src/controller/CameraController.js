export class CameraController {

    constructor(videoEl){

        this._videoEl = videoEl;

        //permissão para acessar a camera do dispositivo sendo usado pelo usuário
        navigator.mediaDevices.getUserMedia({
            video:true
        }).then(stream => {

            let mediaStream = new MediaStream(stream);
            this._mediaStream = mediaStream;
            this._videoEl.srcObject = mediaStream;
            this._videoEl.play();

        }).catch(err => {

            console.error(err);
        });
    }

    stop(){

        this._mediaStream.getTracks().forEach(track => {

            track.stop()
        });
    }

    takePicture(mimeType = 'image/png'){

        let canvas = document.createElement('canvas');

        canvas.setAttribute('height', this._videoEl.videoHeight);
        canvas.setAttribute('width', this._videoEl.videoWidth);

        let context = canvas.getContext('2d');

        context.drawImage(this._videoEl, 0, 0, canvas.width, canvas.height);

        return canvas.toDataURL(mimeType);
    }
}