import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
// import { User } from "src/schemas/user.schema";
import { ConcertService } from "src/services/concert.service";
import { AuthGuard } from "@nestjs/passport"

@Controller('concerts/genres')
export class ConcertGenreController {
    constructor(private readonly concertService: ConcertService){}

    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
			const genre = await (await this.concertService.readById(id)).genres;
			return response.status(HttpStatus.OK).json({ genre	})
    }

    @Put('/:id')
		@UseGuards(AuthGuard('jwt'))
    async updateGroup(@Res() response, @Param('id') id, @Body() value: string) {
			const respAdmin = response.req.user.admin;
			if (respAdmin===true) {
				const updateGenre = await (await this.concertService.updateGenre(id, value)).genres;
				return response.status(HttpStatus.OK).json({ updateGenre	})
			} else {
				return response.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({"message": "Unauthorized"})
			}
    }

		@Delete('/:id')
		@UseGuards(AuthGuard('jwt'))
		async deleteGroup(@Res() response, @Param('id') id, @Body() value: string) {
			const respAdmin = response.req.user.admin;
			if (respAdmin===true) {
				const deleteGenre = await (await this.concertService.deleteGenre(id, value)).genres;
				return response.status(HttpStatus.OK).json({ deleteGenre	})
			} else {
				return response.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({"message": "Unauthorized"})
			}
		}
}