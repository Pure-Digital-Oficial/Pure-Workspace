import { ErrorResponse } from '@pure-workspace/domain';
import { AxiosError } from 'axios';
import {
  ConnectionError,
  EntityAlreadyExists,
  EntityIsNotEmpty,
  EntityNotAllowed,
  EntityNotConverted,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotNegativeNumber,
  NotPermission,
  StartTimeCannotBeGreaterEndTime,
  EntityNotEdited,
  EntityNotDeleted,
  EntityNotMoved,
  EntityNotFound,
  EntityNotValid,
  EntityNotComplete,
  EntityMinValue,
  EntityNotExist,
} from '../../messages';

export function ValidationsError(
  errors: AxiosError<ErrorResponse>,
  entitie: string,
  quantity?: string,
  destiny?: string
) {
  if (!quantity) quantity = '';
  if (!destiny) destiny = '';

  switch (errors.response?.data.error.name) {
    case 'EntityNotExists':
      return EntityNotExist(entitie, 'PT-BR');

    case 'EntityNotEmpty':
      return EntityNotEmpty(entitie, 'PT-BR');

    case 'EntityNotCreated':
      return EntityNotCreated(entitie, 'PT-BR');

    case 'FileNotAllowed':
      return EntityNotAllowed(entitie, 'PT-BR');

    case 'EntityAlreadyExists':
      return EntityAlreadyExists(entitie, 'PT-BR');

    case 'EntityNotConverted':
      return EntityNotConverted(entitie, 'PT-BR');

    case 'StartTimeCannotBeGreaterEndTime':
      return StartTimeCannotBeGreaterEndTime('PT-BR');

    case 'EntityNotNegativeNumber':
      return EntityNotNegativeNumber(entitie, 'PT-BR');

    case 'NotPermissionError':
      return NotPermission('PT-BR');

    case 'EntityIsNotEmpty':
      return EntityIsNotEmpty(entitie, 'PT-BR');

    case 'EntityNotEdit':
      return EntityNotEdited(entitie, 'PT-BR');

    case 'EntityNotDeleted':
      return EntityNotDeleted(entitie, 'PT-BR');

    case 'EntityNotMoved':
      return EntityNotMoved(entitie, 'PT-BR');

    case 'EntityNotFound':
      return EntityNotFound(entitie, 'PT-BR');

    case 'EntityNotValid':
      return EntityNotValid(entitie, 'PT-BR');

    case 'EntityNotComplete':
      return EntityNotComplete(entitie, 'PT-BR');

    case 'EntityMinValue':
      return EntityMinValue({ entitie, destiny, quantity }, 'PT-BR');

    default:
      return ConnectionError('PT-BR');
  }
}
