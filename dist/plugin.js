var capacitorFirebaseAuthentication = (function (exports, core, auth, auth$1) {
    'use strict';

    const FirebaseAuthentication = core.registerPlugin('FirebaseAuthentication', {
        web: () => Promise.resolve().then(function () { return web; }).then(m => new m.FirebaseAuthenticationWeb()),
    });

    class FirebaseAuthenticationWeb extends core.WebPlugin {
        constructor() {
            super();
            const auth$1 = auth.getAuth();
            auth$1.onAuthStateChanged(user => this.handleAuthStateChange(user));
        }
        async getCurrentUser() {
            const auth$1 = auth.getAuth();
            const userResult = this.createUserResult(auth$1.currentUser);
            const result = {
                user: userResult,
            };
            return result;
        }
        async getIdToken() {
            var _a;
            const auth$1 = auth.getAuth();
            const idToken = await ((_a = auth$1.currentUser) === null || _a === void 0 ? void 0 : _a.getIdToken());
            const result = {
                token: idToken || '',
            };
            return result;
        }
        async setLanguageCode(options) {
            const auth$1 = auth.getAuth();
            auth$1.languageCode = options.languageCode;
        }
        async signInWithApple() {
            const provider = new auth.OAuthProvider('apple.com');
            const auth$1 = auth.getAuth();
            const result = await auth.signInWithPopup(auth$1, provider);
            const credential = auth.OAuthProvider.credentialFromResult(result);
            return this.createSignInResult(result.user, credential);
        }
        async signInWithFacebook() {
            const provider = new auth.FacebookAuthProvider();
            const auth$1 = auth.getAuth();
            const result = await auth.signInWithPopup(auth$1, provider);
            const credential = auth.FacebookAuthProvider.credentialFromResult(result);
            return this.createSignInResult(result.user, credential);
        }
        async signInWithGithub() {
            const provider = new auth.OAuthProvider('github.com');
            const auth$1 = auth.getAuth();
            const result = await auth.signInWithPopup(auth$1, provider);
            const credential = auth.OAuthProvider.credentialFromResult(result);
            return this.createSignInResult(result.user, credential);
        }
        async signInWithGoogle() {
            const provider = new auth.GoogleAuthProvider();
            const auth$1 = auth.getAuth();
            const result = await auth.signInWithPopup(auth$1, provider);
            const credential = auth.GoogleAuthProvider.credentialFromResult(result);
            return this.createSignInResult(result.user, credential);
        }
        async signInWithMicrosoft() {
            const provider = new auth.OAuthProvider('microsoft.com');
            const auth$1 = auth.getAuth();
            const result = await auth.signInWithPopup(auth$1, provider);
            const credential = auth.OAuthProvider.credentialFromResult(result);
            return this.createSignInResult(result.user, credential);
        }
        async signInWithPlayGames() {
            throw new Error('Not available on web.');
        }
        async signInWithTwitter() {
            const provider = new auth.OAuthProvider('twitter.com');
            const auth$1 = auth.getAuth();
            const result = await auth.signInWithPopup(auth$1, provider);
            const credential = auth.OAuthProvider.credentialFromResult(result);
            return this.createSignInResult(result.user, credential);
        }
        async signInWithYahoo() {
            const provider = new auth.OAuthProvider('yahoo.com');
            const auth$1 = auth.getAuth();
            const result = await auth.signInWithPopup(auth$1, provider);
            const credential = auth.OAuthProvider.credentialFromResult(result);
            return this.createSignInResult(result.user, credential);
        }
        async signInWithPhoneNumber(_options) {
            throw new Error('Not implemented on web.');
        }
        async signInWithCustomToken(options) {
            const auth$1 = auth.getAuth();
            const result = await auth.signInWithCustomToken(auth$1, options.token);
            return this.createSignInResult(result.user, null);
        }
        async signInWithEmailAndPassword(options) {
            console.log('signing in with email...');
            const auth$1 = auth.getAuth();
            const result = await auth.signInWithEmailAndPassword(auth$1, options.email, options.password);
            return this.createSignInResult(result.user, null);
        }
        async sendPasswordResetEmail(options) {
            console.log('sending reset email...');
            const auth$1 = auth.getAuth();
            return auth.sendPasswordResetEmail(auth$1, options.email);
        }
        async createUserWithEmailAndPassword(options) {
            console.log('creating user');
            const auth$2 = auth.getAuth();
            const userCredentials = await auth.createUserWithEmailAndPassword(auth$2, options.email, options.password);
            await auth$1.sendEmailVerification(userCredentials.user);
            return this.createUserResult(userCredentials.user);
        }
        async signOut() {
            const auth$1 = auth.getAuth();
            await auth$1.signOut();
        }
        async useAppLanguage() {
            const auth$1 = auth.getAuth();
            auth$1.useDeviceLanguage();
        }
        handleAuthStateChange(user) {
            const userResult = this.createUserResult(user);
            const change = {
                user: userResult,
            };
            this.notifyListeners('authStateChange', change);
        }
        createSignInResult(user, credential) {
            const userResult = this.createUserResult(user);
            const credentialResult = this.createCredentialResult(credential);
            const result = {
                user: userResult,
                credential: credentialResult,
            };
            return result;
        }
        createUserResult(user) {
            if (!user) {
                return null;
            }
            const result = {
                displayName: user.displayName,
                email: user.email,
                emailVerified: user.emailVerified,
                isAnonymous: user.isAnonymous,
                phoneNumber: user.phoneNumber,
                photoUrl: user.photoURL,
                providerId: user.providerId,
                tenantId: user.tenantId,
                uid: user.uid,
            };
            return result;
        }
        createCredentialResult(credential) {
            if (!credential) {
                return null;
            }
            const result = {
                providerId: credential.providerId,
            };
            if (credential instanceof auth.OAuthCredential) {
                result.accessToken = credential.accessToken;
                result.idToken = credential.idToken;
                result.secret = credential.secret;
            }
            return result;
        }
    }

    var web = /*#__PURE__*/Object.freeze({
        __proto__: null,
        FirebaseAuthenticationWeb: FirebaseAuthenticationWeb
    });

    exports.FirebaseAuthentication = FirebaseAuthentication;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

}({}, capacitorExports, firebaseAuthExports, auth$1));
//# sourceMappingURL=plugin.js.map
