import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

export const GUARDS = [LocalAuthGuard, JwtAuthGuard];
