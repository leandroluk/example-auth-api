import { LoginUseCase } from '$/domain/usecases/login';
import vars from '$/vars';
import { OpenAPIV3 } from 'openapi-types';
import { SimpleError } from './types/error';
import { ObjectSchema } from './types/object-schema';

const enum Tags {
  Auth = 'AUTH'
}

const enum ContentType {
  Json = 'application/json'
}

const commonResponses: OpenAPIV3.ResponsesObject = {
  400: {
    description: 'bad request',
    content: {
      [ContentType.Json]: {
        schema: {
          type: 'object',
          required: ['message', 'name'],
          properties: {
            name: { type: 'string' },
            message: { type: 'string' },
          },
        } satisfies ObjectSchema<SimpleError>,
        example: {
          name: 'ValidationSimpleError',
          message: 'body.{{field}} is required',
        } satisfies SimpleError,
      },
    },
  },
  401: {
    description: 'unauthorized',
    content: {
      [ContentType.Json]: {
        schema: {
          type: 'object',
          required: ['message', 'name'],
          properties: {
            name: { type: 'string' },
            message: { type: 'string' },
          },
        } satisfies ObjectSchema<SimpleError>,
        example: {
          name: 'UnauthorizedSimpleError',
          message: 'Unauthorized',
        } satisfies SimpleError,
      },
    },
  },
  403: {
    description: 'forbidden',
    content: {
      [ContentType.Json]: {
        schema: {
          type: 'object',
          required: ['message', 'name'],
          properties: {
            name: { type: 'string' },
            message: { type: 'string' },
          },
        } satisfies ObjectSchema<SimpleError>,
        example: {
          name: 'ForbiddenSimpleError',
          message: 'Forbidden',
        } satisfies SimpleError,
      },
    },
  },
} as const;

const docs: OpenAPIV3.Document = {
  openapi: '3.0.3',
  info: {
    title: vars.app.name,
    version: vars.app.version,
  },
  tags: [{ name: Tags.Auth }],
  paths: {
    // Auth
    '/api/auth/check': {
      post: {
        tags: [Tags.Auth],
        security: [{ bearerAuth: [] }],
        description: 'check token',
        responses: {
          202: {
            description: 'accepted',
          },
          400: commonResponses[400],
          401: commonResponses[401],
          403: commonResponses[403],
        },
      },
    },
    '/api/auth/login': {
      post: {
        tags: [Tags.Auth],
        description: 'login',
        requestBody: {
          content: {
            [ContentType.Json]: {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string' },
                  password: { type: 'string' },
                },
              } satisfies ObjectSchema<LoginUseCase.Data['body']>,
              example: {
                email: 'user@email.com',
                password: 'P4s$W0rd',
              } satisfies LoginUseCase.Data['body'],
            },
          },
        },
        responses: {
          200: {
            description: 'ok',
            content: {
              [ContentType.Json]: {
                schema: {
                  type: 'object',
                  required: ['accessToken', 'refreshToken', 'type'],
                  properties: {
                    accessToken: { type: 'string' },
                    refreshToken: { type: 'string' },
                    type: { type: 'string' },
                  },
                } satisfies ObjectSchema<LoginUseCase.Result>,
                example: {
                  accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                  refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ...',
                  type: 'Bearer',
                } satisfies LoginUseCase.Result,
              },
            },
          },
          400: commonResponses[400],
          401: commonResponses[401],
          403: commonResponses[403],
        },
      },
    },
    '/api/auth/logout': {
      post: {
        tags: [Tags.Auth],
        security: [{ bearerAuth: [] }],
        description: 'logout',
        responses: {
          204: {
            description: 'success',
          },
          400: commonResponses[400],
          401: commonResponses[401],
          403: commonResponses[403],
        },
      },
    },
    '/api/auth/refresh': {
      post: {
        tags: [Tags.Auth],
        security: [{ bearerAuth: [] }],
        description: 'refresh token',
        responses: {
          200: {
            description: 'ok',
          },
          400: commonResponses[400],
          401: commonResponses[401],
          403: commonResponses[403],
        },
      },
    },
    // default
    '/health': {
      get: {
        responses: {
          200: {
            description: 'Application is healthy',
            content: {
              [ContentType.Json]: {
                schema: {
                  type: 'object',
                  required: ['name', 'version', 'env', 'uptime'],
                  properties: {
                    name: { type: 'string' },
                    version: { type: 'string' },
                    env: { type: 'string' },
                    uptime: { type: 'string' },
                  },
                },
                example: {
                  name: vars.app.name,
                  version: vars.app.version,
                  env: vars.app.env,
                  uptime: '1m',
                },
              },
            },
          },
          500: {
            description: 'Application is unhealthy',
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

export default docs;