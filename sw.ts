import { Serwist } from 'serwist'

declare const self: any

const serwist = new Serwist({
    precacheEntries: self.__SW_MANIFEST,
    skipWaiting: true,
    clientsClaim: true,
})

serwist.addEventListeners()
