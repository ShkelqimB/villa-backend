import { Request, RequestHandler, Response, NextFunction } from 'express';

export type HttpRequest = Request;
export type HttpRequestHandler = RequestHandler;
export type HttpResponse = Response;
export type HttpNext = NextFunction;

export type StringHash = { [key: string]: string };
export type Hash<T = any> = { [key: string]: T };

export type Headers = StringHash;

export interface Err extends Error {
    logged?: boolean;
}
