/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateBookDto {
  @IsString()
  readonly title: string;
  @IsString()
  readonly description: string;
  @IsString({ each: true })
  readonly authors: string[];
  @IsBoolean()
  @IsOptional()
  readonly favorite?: boolean;
  @IsString()
  @IsOptional()
  readonly fileCover?: string;
  @IsString()
  @IsOptional()
  readonly fileName?: string;
  @IsString()
  @IsOptional()
  readonly id?: string;
}
