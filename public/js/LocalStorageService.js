class LocalStorageService {

    set(key, obj, expireMinutes) {

        const nowInSeconds = parseInt(Date.now() / 1000);
        const expirationDate = (nowInSeconds + (expireMinutes * 60)) * 1000;

        const objectValue = JSON.stringify(obj);
        const storageObject = {
            value: objectValue,
            exp: expirationDate,
            ttl: expireMinutes
        };

        window.localStorage.setItem(key, JSON.stringify(storageObject));
    }

    get(key, revive = false) {

        const storageData = window.localStorage.getItem(key);
        if (!storageData) {
            return null;
        }

        let storageObject = undefined;
        try {
            storageObject = JSON.parse(storageData);
        }
        catch (e) {
            // Fail silently (maybe log this, but not serious)
            return null;
        }

        const now = Date.now();
        if (now > storageObject.exp) {
            return null;
        }

        const storageValue = JSON.parse(storageObject.value);
        if (revive) {
            this.set(key, storageValue, storageObject.ttl);
        }

        return storageValue;
    }

    remove(key) {
        window.localStorage.removeItem(key);
    }

}

export default new LocalStorageService();