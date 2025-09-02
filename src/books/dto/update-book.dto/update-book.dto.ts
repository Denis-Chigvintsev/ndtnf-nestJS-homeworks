/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  readonly title?: string;
  @IsString()
  @IsOptional()
  readonly description?: string;
  @IsString({ each: true })
  @IsOptional()
  readonly authors?: string[];
  @IsBoolean()
  @IsOptional()
  readonly favorite?: boolean;
  @IsString()
  @IsOptional()
  readonly fileCover?: string;
  @IsString()
  @IsOptional()
  readonly fileName?: string;
}
