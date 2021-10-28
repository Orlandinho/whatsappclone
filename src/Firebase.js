const firebase = require('firebase');
require('firebase/firestore');

export class Firebase {

    constructor() {

        this._config = {
            apiKey: "AIzaSyDgI-pzSHjd9c7XWOFhOCxvGNSLTucLqPI",
            authDomain: "whatsapp-clone-c8bb8.firebaseapp.com",
            projectId: "whatsapp-clone-c8bb8",
            storageBucket: "whatsapp-clone-c8bb8.appspot.com",
            messagingSenderId: "794248980756",
            appId: "1:794248980756:web:e139cbd946880974b03a01",
            measurementId: "G-B9X7N360DY"
        }

        this.init();
    }

    init() {

        // Initialize Firebase
        if (!this._initialized) {

            firebase._initializeApp(this._config);

            this._initialized = true;
        }
    }

    static db() {
        return firebase.firestore();
    }

    static hd() {
        return firebase.storage();
    }

    /**
     * @returns {Promise} Autenticação no Firebase (Usuário + Token).
     */
    initAuth() {
        return new Promise((s, f) => {
            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth()
                .signInWithPopup(provider)
                .then(result => {

                    let token = result.credential.accessToken;
                    let user = result.user;

                    s({ user, token });
                })
                .catch(err => { f(err) });
        });
    }
}