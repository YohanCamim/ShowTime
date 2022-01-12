import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
// import { Groupe } from "src/schemas/groupe.schema";
import { ConcertService } from "src/services/concert.service";
import { GroupeService } from "src/services/groupe.service";
import { AuthGuard } from "@nestjs/passport"

@Controller('concerts/groups')
export class ConcertGroupController {
    constructor(
			private readonly concertService: ConcertService,
			private readonly groupeService: GroupeService
		){}

    // @Get('/:id')
    // async findById(@Res() response, @Param('id') id) {
		// 	const group = await (await this.concertService.readById(id)).groups;
		// 	return response.status(HttpStatus.OK).json({ group	})
    // }

    @Get('/:id')
    async findById(@Res() response, @Param('id') id) {
			const concert = await this.concertService.readById(id);
			const groups2 = await Promise.all(concert.groups.map(group_id => {
				return this.groupeService.readById(group_id)
			}));
			return await response.status(HttpStatus.OK).json({ groups2 })
    }

    @Put('/:id')
		@UseGuards(AuthGuard('jwt'))
    async updateGroup(@Res() response, @Param('id') id, @Body() value: string) {
			const respAdmin = response.req.user.admin;
			if (respAdmin===true) {
				const updateGroup = await (await this.concertService.updateGroup(id, value)).groups;
				return response.status(HttpStatus.OK).json({ updateGroup	})
			} else {
				return response.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({"message": "Unauthorized"})
			}
    }

		@Delete('/:id')
		@UseGuards(AuthGuard('jwt'))
		async deleteGroup(@Res() response, @Param('id') id, @Body() value: string) {
			const respAdmin = response.req.user.admin;
			if (respAdmin===true) {
				const deleteGroup = await (await this.concertService.deleteGroup(id, value)).groups;
				return response.status(HttpStatus.OK).json({ deleteGroup	})
			} else {
				return response.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({"message": "Unauthorized"})
			}
		}
}