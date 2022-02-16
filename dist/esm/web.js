import { WebPlugin } from '@capacitor/core';
import { FacebookAuthProvider, getAuth, GoogleAuthProvider, OAuthCredential, OAuthProvider, signInWithPopup, 
// signInWithCustomToken,
signInWithEmailAndPassword } from 'firebase/auth';
export class FirebaseAuthenticationWeb extends WebPlugin {
    constructor() {
        super();
        const auth = getAuth();
        auth.onAuthStateChanged(user => this.handleAuthStateChange(user));
    }
    async getCurrentUser() {
        const auth = getAuth();
        const userResult = this.createUserResult(auth.currentUser);
        const result = {
            user: userResult,
        };
        return result;
    }
    async getIdToken() {
        var _a;
        const auth = getAuth();
        const idToken = await ((_a = auth.currentUser) === null || _a === void 0 ? void 0 : _a.getIdToken());
        const result = {
            token: idToken || '',
        };
        return result;
    }
    async setLanguageCode(options) {
        const auth = getAuth();
        auth.languageCode = options.languageCode;
    }
    async signInWithApple() {
        const provider = new OAuthProvider('apple.com');
        const auth = getAuth();
        const result = await signInWithPopup(auth, provider);
        const credential = OAuthProvider.credentialFromResult(result);
        return this.createSignInResult(result.user, credential);
    }
    async signInWithFacebook() {
        const provider = new FacebookAuthProvider();
        const auth = getAuth();
        const result = await signInWithPopup(auth, provider);
        const credential = FacebookAuthProvider.credentialFromResult(result);
        return this.createSignInResult(result.user, credential);
    }
    async signInWithGithub() {
        const provider = new OAuthProvider('github.com');
        const auth = getAuth();
        const result = await signInWithPopup(auth, provider);
        const credential = OAuthProvider.credentialFromResult(result);
        return this.createSignInResult(result.user, credential);
    }
    async signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        return this.createSignInResult(result.user, credential);
    }
    async signInWithMicrosoft() {
        const provider = new OAuthProvider('microsoft.com');
        const auth = getAuth();
        const result = await signInWithPopup(auth, provider);
        const credential = OAuthProvider.credentialFromResult(result);
        return this.createSignInResult(result.user, credential);
    }
    async signInWithPlayGames() {
        throw new Error('Not available on web.');
    }
    async signInWithTwitter() {
        const provider = new OAuthProvider('twitter.com');
        const auth = getAuth();
        const result = await signInWithPopup(auth, provider);
        const credential = OAuthProvider.credentialFromResult(result);
        return this.createSignInResult(result.user, credential);
    }
    async signInWithYahoo() {
        const provider = new OAuthProvider('yahoo.com');
        const auth = getAuth();
        const result = await signInWithPopup(auth, provider);
        const credential = OAuthProvider.credentialFromResult(result);
        return this.createSignInResult(result.user, credential);
    }
    async signInWithPhoneNumber(_options) {
        throw new Error('Not implemented on web.');
    }
    async signInWithCustomToken(options) {
        console.log('custom token');
        const auth = getAuth();
        const result = await signInWithEmailAndPassword(auth, options.email, options.password);
        return this.createSignInResult(result.user, null);
    }
    async signInWithEmailAndPassword(options) {
        console.log('signing in with email...');
        const auth = getAuth();
        const result = await signInWithEmailAndPassword(auth, options.email, options.password);
        return this.createSignInResult(result.user, null);
    }
    async signOut() {
        const auth = getAuth();
        await auth.signOut();
    }
    async useAppLanguage() {
        const auth = getAuth();
        auth.useDeviceLanguage();
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
        if (credential instanceof OAuthCredential) {
            result.accessToken = credential.accessToken;
            result.idToken = credential.idToken;
            result.secret = credential.secret;
        }
        return result;
    }
}
//# sourceMappingURL=web.js.map