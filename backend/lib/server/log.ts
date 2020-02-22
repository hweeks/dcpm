import bunyan, { Stream } from 'bunyan'
import { DcpmRequest } from '.';

const isProd = process.env.NODE_ENV === 'production'

const requestSerializer = (request: DcpmRequest) => ({
  method: request.method,
  url: request.url,
  tid: request.tid
})

const getStreams = () => {
  return isProd ? [
    {
      type: 'rotating-file',
      period: '1d',
      count: 3,
      level: 'info',
      path: '/app/be/logs/info.log'
    },
    {
      type: 'rotating-file',
      period: '1d',
      count: 3,
      level: 'error',
      path: '/app/be/logs/error.log'
    },
  ] : [
    {
      level: 'info',
      stream: process.stdout
    },
    {
      level: 'debug',
      stream: process.stdout
    },
    {
      level: 'error',
      stream: process.stderr
    }
  ]
}

export const logger = bunyan.createLogger({
  name: 'DCPM-BE',
  level: isProd ? 'info' : 'debug',
  streams: getStreams() as Stream[],
  serializers: {
    req: requestSerializer
  }
});
