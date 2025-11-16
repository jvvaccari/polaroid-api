import { Controller, Get, Param, Post, Put, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PolaroidService } from './polaroid.service';
import { CreatePolaroidDto } from './dto/create-polaroid.dto';
import { UpdatePolaroidDto } from './dto/update-polaroid.dto';
import { PolaroidResponseDto } from './dto/polaroid-response.dto';

@ApiTags('polaroids')
@Controller('polaroids')
export class PolaroidController {
  constructor(private readonly polaroidService: PolaroidService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os polaroids' })
  @ApiResponse({ status: 200, type: [PolaroidResponseDto] })
  async findAll(): Promise<PolaroidResponseDto[]> {
    const polaroids = await this.polaroidService.findAll();
    return polaroids.map((p) => new PolaroidResponseDto(p));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um polaroid por ID' })
  @ApiResponse({ status: 200, type: PolaroidResponseDto })
  @ApiResponse({ status: 404, description: 'Polaroid não encontrado' })
  async findOne(@Param('id') id: string): Promise<PolaroidResponseDto> {
    const polaroid = await this.polaroidService.findOne(id);
    if (!polaroid) {
      throw new Error(`Polaroid with id ${id} not found`);
    }
    return new PolaroidResponseDto(polaroid);
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo polaroid' })
  @ApiResponse({ status: 201, type: PolaroidResponseDto })
  async create(
    @Body() createPolaroidDto: CreatePolaroidDto,
  ): Promise<PolaroidResponseDto> {
    const polaroid = await this.polaroidService.create(createPolaroidDto);
    return new PolaroidResponseDto(polaroid);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um polaroid' })
  @ApiResponse({ status: 200, type: PolaroidResponseDto })
  @ApiResponse({ status: 404, description: 'Polaroid não encontrado' })
  async update(
    @Param('id') id: string,
    @Body() updatePolaroidDto: UpdatePolaroidDto,
  ): Promise<PolaroidResponseDto> {
    const polaroid = await this.polaroidService.update(id, updatePolaroidDto);
    return new PolaroidResponseDto(polaroid);
  }
}
