import express from 'express';

export abstract class BaseController {

  getRouter(): express.Router {
    return express.Router();
  }

}
