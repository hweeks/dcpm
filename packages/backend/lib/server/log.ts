import bunyan from 'bunyan'
import { DcpmRequest } from '.';

const requestSerializer = (request: DcpmRequest) => ({
  method: request.method,
  url: request.url,
  tid: request.tid
})

export const logger = bunyan.createLogger({
  name: 'DCPM-BE',
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  streams: [
    {
      level: 'info',
      stream: process.stdout // later a file path...
    },
    {
      level: 'debug',
      stream: process.stdout // later a file path...
    },
    {
      level: 'error',
      stream: process.stderr // later a file path...
    }
  ],
  serializers: {
    req: requestSerializer
  }
});
