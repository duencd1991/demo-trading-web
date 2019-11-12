//import idb from 'idb';
//import * as idb from 'idb';
import { StoreNames } from '../configs/GlobalConfig';

var idb = require('idb');
class IndexedDB {
    dbPromise;

    constructor() {
        //check for support
        if (!('indexedDB' in window)) {
            console.log('This browser doesn\'t support IndexedDB');
            return;
        }

        this.dbPromise = idb.openDB('wtp24', 1, db => {
            if (!db.objectStoreNames.contains(StoreNames.Tickers)) {
                db.createObjectStore(StoreNames.Tickers, { keyPath: 'ticker' });
            }

            if (!db.objectStoreNames.contains(StoreNames.Exchanges)) {
                db.createObjectStore(StoreNames.Exchanges, { keyPath: 'exchange' });
            }

            if (!db.objectStoreNames.contains(StoreNames.Sectors)) {
                const store = db.createObjectStore(StoreNames.Sectors);
                store.createIndex('sector', ['sector']);
                store.createIndex('sector_exchange', ['sector', 'exchange'], { unique: true });
            }
        });
    }

    // get 1 item by primary key
    get(storeName, key) {
        this.checkSupport();

        return this.dbPromise.then(db => {
            return db.transaction(storeName, 'readonly')
                .objectStore(storeName)
                .get(key);
        });
    }

    // get all items
    getAll(storeName) {
        this.checkSupport();

        return this.dbPromise.then(db => {
            return db.transaction(storeName, 'readonly')
                .objectStore(storeName)
                .getAll();
        });
    }

    // select many items by filter func
    select(storeName, filter) {
        this.checkSupport();

        let res = [];

        return this.dbPromise.then(db => {
            let trans = db.transaction(storeName, 'readonly');
            let store = trans.objectStore(storeName);

            return store.openCursor();
        }).then(function loadItems(cursor) {
            if (!cursor) {
                return;
            }

            if (filter(cursor.value)) {
                res.push(cursor.value);
            }

            return cursor.continue().then(loadItems);
        }).then(() => res);
    }

    //get first item that match the index
    first(storeName, index, values) {
        this.checkSupport();

        return this.dbPromise.then(db => {
            return db.trans(storeName, 'readonly')
                .objectStore(storeName)
                .index(index)
                .get(IDBKeyRange.only(values));
        });
    }

    //get all items that match index
    match(storeName, index, values) {
        this.checkSupport();
        let res = [];

        return this.dbPromise.then(db => {
            return db.trans(storeName, 'readonly')
                .objectStore(storeName)
                .index(index)
                .openCursor(IDBKeyRange.only(values));
        }).then(function loadItems(cursor) {
            if (!cursor) {
                return;
            }

            res.push(cursor.value);

            return cursor.continue().then(loadItems);
        }).then(() => res);
    }

    // select many items by index range
    range(storeName, index, lowerBound, upperBound) {
        this.checkSupport();

        let r;
        if (lowerBound !== '' && upperBound !== '') {
            r = IDBKeyRange.bound(lowerBound, upperBound);
        } else if (lowerBound === '') {
            r = IDBKeyRange.upperBound(upperBound);
        } else {
            r = IDBKeyRange.lowerBound(lowerBound);
        }

        let res = [];

        return this.dbPromise.then(db => {
            return db.transaction(storeName, 'readonly')
                .objectStore(storeName)
                .index(index)
                .openCursor(r);
        }).then(function loadItems(cursor) {
            if (!cursor) {
                return;
            }

            res.push(cursor.value);

            return cursor.continue().then(loadItems);
        }).then(() => res);
    }

    // update or insert 1 item
    upsert(storeName, value) {
        this.checkSupport();

        return this.dbPromise.then(db => {
            const trans = db.transaction(storeName, 'readwrite')
                .objectStore(storeName)
                .put(value)
            return trans.complete;
        });
    }

    // update or insert many items
    upsertMany(storeName, values) {
        this.checkSupport();

        return this.dbPromise.then(db => {
            const trans = db.transaction(storeName, 'readwrite');
            const store = trans.objectStore(storeName);
            values.forEach(value => {
                store.put(value);
            });

            return trans.complete;
        });
    }

    // delete 1 item
    delete(storeName, key) {
        this.checkSupport();

        return this.dbPromise.then(db => {
            const trans = db.transaction(storeName, 'readwrite')
                .objectStore(storeName)
                .delete(key);
            return trans.complete;
        });
    }

    // check if indexedDb initialized or not
    checkSupport() {
        if (!this.dbPromise) {
            throw new Error('not supported');
        }
    }
}

const fiintradeDb = new IndexedDB();
export default fiintradeDb;