/**
 * SELEZIONE DELL'INSTALLAZIONE (TEST O PRODUZIONE) */
const TEST_MODE = true;

if (TEST_MODE) {
    this.base_url = 'https://test.eurofoodservice.it/api';
    this.ws_key = 'DDRSMHTSBZPQME7P7WFRFNXB29FGEU6C';
} else {
    this.base_url = 'https://www.eurofoodservice.it/api';
    this.ws_key = 'RKGNZR2YSP6JNC56596D2FI94JFNXY2C';
}
export const BASE_URL = this.base_url;
export const WS_KEY = this.ws_key;

/**
 * COSTANTI ONESIGNAL */
export const APP_ID = 'ad8c202b-1223-494c-b7ea-3805a783cd33';
export const ONESIGNAL_HEADER_AUTHORIZATION = 'Basic NzY1YjlhODUtNTc0Mi00ZmE3LWJjOGUtMzUxZTdjYmFhZTgw';
export const ONESIGNAL_BASE_URL = 'https://onesignal.com/api/v1/notifications';

