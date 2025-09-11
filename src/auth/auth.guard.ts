
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Token de autorização não fornecido');
    }

    if (!authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Formato de token inválido. Use: Bearer <token>');
    }

    const token = authHeader.substring(7); // Remove "Bearer " prefix
    const expectedToken = this.configService.get<string>('AUTH_TOKEN');

    if (!expectedToken) {
      throw new UnauthorizedException('Token de autorização não configurado no servidor');
    }

    if (token !== expectedToken) {
      throw new UnauthorizedException('Token de autorização inválido');
    }

    return true;
  }
}
