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
export const ONESIGNAL_EUROFOOD_APP_ID = 'ad8c202b-1223-494c-b7ea-3805a783cd33';
export const ONESIGNAL_HEADER_AUTH_REST_API_KEYS = 'Basic NzY1YjlhODUtNTc0Mi00ZmE3LWJjOGUtMzUxZTdjYmFhZTgw';
export const ONESIGNAL_POST_NOTIFICATION_BASE_URL = 'https://onesignal.com/api/v1/notifications';
export const ONESIGNAL_GET_EUROFOOD_DEVICES_BASE_URL = 'https://onesignal.com/api/v1/players';
// ad8c202b-1223-494c-b7ea-3805a783cd33&limit=300&offset=0
