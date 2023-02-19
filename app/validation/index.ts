import { ValidationChain } from 'express-validator';
import { Hash } from './../types';

export const nullValidator = (): ValidationChain[] => [];
export type Validator = ()=>ValidationChain[];

export const runValidators = (validators: Hash<Validator>) => 
    (route: string) => 
        (validators[route] || nullValidator)();