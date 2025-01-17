import winston, { Logger } from 'winston';
import {
  ElasticsearchTransformer,
  ElasticsearchTransport,
  LogData,
  TransformedData,
} from 'winston-elasticsearch';

const elasticTransformer = (logData: LogData): TransformedData => {
  return ElasticsearchTransformer(logData);
};

export const winstonLogger = (
  elasticsearchNode: string,
  serviceName: string,
  level: string
): Logger => {
  const loggerOptions = {
    console: {
      level: level,
      handleExceptions: true,
      json: true,
      colorize: true,
    },
    elasticSearch: {
      level,
      transformer: elasticTransformer,
      clientOpts: {
        log: level,
        node: elasticsearchNode,
        maxRetries: 2,
        requestTimeout: 10000,
      },
    },
  };

  const esTransport = new ElasticsearchTransport(loggerOptions.elasticSearch);
  const logger = winston.createLogger({
    exitOnError: false,
    defaultMeta: { name: serviceName },
    transports: [
      new winston.transports.Console(loggerOptions.console),
      esTransport,
    ],
  });
  return logger;
};
