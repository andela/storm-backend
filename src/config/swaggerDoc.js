import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import './env';

const swaggerDefinition = {
  openapi: '3.0.1',
  info: {
    title: 'Barefoot Nomad API documentation',
    version: '1.0.0',
    description: 'Barefoot Nomad auto generated swagger documentation',
    contact: {
      email: 'kolaakindoju@gmail.com'
    }
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  }
};

const options = {
  swaggerDefinition,
  apis: ['src/routes/api/*.js', 'src/routes/*.js'],
};


const specs = swaggerJsDoc(options);

module.exports = (router) => {
  router.get('/docs', swaggerUi.setup(specs));
};
