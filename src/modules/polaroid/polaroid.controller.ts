import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Body,
  BadRequestException,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { PolaroidService } from './polaroid.service';
import { CreatePolaroidDto } from './dto/create-polaroid.dto';
import { UpdatePolaroidDto } from './dto/update-polaroid.dto';
import { PolaroidResponseDto } from './dto/polaroid-response.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

interface UploadedFileType {
  filename: string;
  originalname: string;
  mimetype: string;
  size: number;
  path: string;
}

@ApiTags('polaroids')
@Controller('polaroids')
export class PolaroidController {
  constructor(private readonly polaroidService: PolaroidService) { }

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
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['image', 'backContent', 'keyNumber'],
      properties: {
        image: {
          type: 'string',
          format: 'binary',
          description: 'Arquivo de imagem (JPG, JPEG, PNG, GIF)',
        },
        backContent: {
          type: 'string',
          description: 'Conteúdo do verso do polaroid',
          example: 'Minha lembrança especial',
        },
        keyNumber: {
          type: 'number',
          description: 'Número chave do polaroid',
          example: 2,
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/polaroids',
        filename: (_req, file: { originalname: string }, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `polaroid-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (_req, file: { mimetype: string }, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          cb(new BadRequestException('Apenas imagens são permitidas!'), false);
          return;
        }
        cb(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }),
  )
  async create(
    @UploadedFile() file: UploadedFileType | undefined,
    @Body() createPolaroidDto: CreatePolaroidDto,
  ): Promise<PolaroidResponseDto> {
    if (!file?.filename) {
      throw new BadRequestException('Imagem é obrigatória');
    }

    const imageUrl = `/uploads/polaroids/${file.filename}`;
    const polaroid = await this.polaroidService.create(
      createPolaroidDto,
      imageUrl,
    );
    return new PolaroidResponseDto(polaroid);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar um polaroid' })
  @ApiResponse({ status: 200, type: PolaroidResponseDto })
  @ApiResponse({ status: 404, description: 'Polaroid não encontrado' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['image', 'backContent', 'keyNumber'],
      properties: {
        image: {
          type: 'string',
          format: 'binary',
          description: 'Arquivo de imagem (JPG, JPEG, PNG, GIF)',
        },
        backContent: {
          type: 'string',
          description: 'Conteúdo do verso do polaroid',
          example: 'Minha lembrança especial',
        },
        keyNumber: {
          type: 'number',
          description: 'Número chave do polaroid',
          example: 2,
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/polaroids',
        filename: (_req, file: { originalname: string }, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `polaroid-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (_req, file: { mimetype: string }, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          cb(new BadRequestException('Apenas imagens são permitidas!'), false);
          return;
        }
        cb(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }),
  )
  async update(
    @Param('id') id: string,
    @UploadedFile() file: UploadedFileType | undefined,
    @Body() updatePolaroidDto: UpdatePolaroidDto,
  ): Promise<PolaroidResponseDto> {
    if (!file?.filename) {
      throw new BadRequestException('Imagem é obrigatória');
    }

    const imageUrl = `/uploads/polaroids/${file.filename}`;
    const polaroid = await this.polaroidService.update(
      id,
      updatePolaroidDto,
      imageUrl
    );
    return new PolaroidResponseDto(polaroid);
  }
}
