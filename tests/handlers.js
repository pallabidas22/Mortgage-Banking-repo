import { http, HttpResponse } from 'msw'
import { API, HOST } from '../src/constants/api'
import responses from './responses.json'
 
export const handlers = [
  http.get(`${HOST}${API.TRANSFER_HISTORY}`, () => {
    return HttpResponse.json(responses['transfer-history'])
  }),
]