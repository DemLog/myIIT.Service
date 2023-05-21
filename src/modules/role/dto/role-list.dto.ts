import { OmitType } from "@nestjs/swagger";
import { RoleDto } from "./role.dto";

export class RoleListDto extends OmitType(RoleDto, ['permissions'] as const) {}