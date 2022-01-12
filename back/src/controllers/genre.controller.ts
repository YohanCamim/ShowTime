import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res,UseGuards } from "@nestjs/common";
import { Genre } from "../schemas/genre.schema";
import { GenreService } from "src/services/genre.service";
import { AuthGuard } from "@nestjs/passport"

@Controller('genres')
export class GenreController {
    constructor(private readonly genreService: GenreService){}

    @Post()
    @UseGuards(AuthGuard('jwt')) 
    async createGroupe(@Res() response, @Body() genre: Genre) {
			const respAdmin = response.req.user.admin;
			if (respAdmin===true) {
				const newGenre = await this.genreService.create(genre);
				return response.status(HttpStatus.CREATED).json({ newGenre })
			} else {
				return response.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({"message": "Unauthorized"})
			}
    }

    @Get()
    async fetchAll(@Res() response) {
        const genres = await this.genreService.readAll();
        return response.status(HttpStatus.OK).json({ genres })
    }

    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
			const genre = await this.genreService.readById(id);
			return response.status(HttpStatus.OK).json({ genre })
    }

    @Put('/:id')
    @UseGuards(AuthGuard('jwt'))
    async update(@Res() response, @Param('id') id, @Body() genre: Genre) {
			const respAdmin = response.req.user.admin;
			if (respAdmin===true) {
				const updatedGenre = await this.genreService.update(id, genre);
				return response.status(HttpStatus.OK).json({ updatedGenre })
			} else {
				return response.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({"message": "Unauthorized"})
			}
    }

    @Delete('/:id')
    @UseGuards(AuthGuard('jwt'))
    async delete(@Res() response, @Param('id') id) {
			const respAdmin = response.req.user.admin;
			if (respAdmin===true) {
				const deletedGenre = await this.genreService.delete(id);
				return response.status(HttpStatus.OK).json({ deletedGenre })
			} else {
				return response.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({"message": "Unauthorized"})
			}
    }
}

