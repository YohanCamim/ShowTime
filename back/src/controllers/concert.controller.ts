import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
import { Concert, ConcertDocument } from "src/schemas/concert.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ConcertService } from "../services/concert.service";
import { GroupeService } from "../services/groupe.service";
import { AuthGuard } from "@nestjs/passport"

@Controller('concerts')
export class ConcertController {
	constructor(
		@InjectModel(Concert.name) private concertModel: Model<ConcertDocument>,
		private readonly concertService: ConcertService,
		private readonly groupeService: GroupeService,
	){}

	@Post()
	@UseGuards(AuthGuard('jwt'))
	async createConcert(@Res() response, @Body() concert: Concert) {         
		const respAdmin = response.req.user.admin;
		// console.log(respAdmin);
		if (respAdmin===true) {
				const newConcert = await this.concertService.create(concert);
				return response.status(HttpStatus.CREATED).json({ newConcert })
		} else {
				return response.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({"message": "Unauthorized"})
		}
	}

	@Get()
	async fetchAll(@Res() response) {
		const concerts = await this.concertService.readAll();
		return response.status(HttpStatus.OK).json({ concerts })
	}

	@Get('/:id')
	async findById(@Res() response, @Param('id') id) {
		const concert = await this.concertService.readById(id);
		(concert as any).groups = await Promise.all(concert.groups.map(group_id => {
			return this.groupeService.readById(group_id)
		}))
		return response.status(HttpStatus.OK).json({ concert })
	}

	@Put('/:id')
	@UseGuards(AuthGuard('jwt'))
	async update(@Res() response, @Param('id') id, @Body() concert: Concert) {
		const respAdmin = response.req.user.admin;
		if (respAdmin===true) {
				const updatedConcert = await this.concertService.update(id, concert);
				return response.status(HttpStatus.OK).json({ updatedConcert }) 
		} else {
				return response.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({"message": "Unauthorized"})
		}
	}

	@Delete('/:id')
	@UseGuards(AuthGuard('jwt'))
	async delete(@Res() response, @Param('id') id) {
		const respAdmin = response.req.user.admin;
		if (respAdmin===true) {
				const deletedConcert = await this.concertService.delete(id);
				return response.status(HttpStatus.OK).json({ deletedConcert })
		} else {
				return response.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({"message": "Unauthorized"})
		}
	}
}

