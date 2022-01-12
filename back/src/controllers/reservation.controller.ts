import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
// import { User } from "src/schemas/user.schema";
import { UserService } from "src/services/user.service";
import { ConcertService } from "src/services/concert.service";
import { AuthGuard } from "@nestjs/passport"

@Controller('users/reservations')
export class ReservationController {
    constructor(
			private readonly userService: UserService,
			private readonly concertService: ConcertService
		){}

	// @Get('/:id')
	// async findById(@Res() response, @Param('id') id) {
	// 	const reservation = await (await this.userService.readById(id)).reservations;
	// 	return response.status(HttpStatus.OK).json({ reservation })
	// }

	@Get('/:id')
	async findById(@Res() response, @Param('id') id) {
		const user = await (await this.userService.readById(id));
		const reservations = await Promise.all(user.reservations.map(reservation_id => {
			return this.concertService.readById(reservation_id)
		}))
		return response.status(HttpStatus.OK).json({ reservations })
	}

	// @Put('/:id')
	// async updateReservation(@Res() response, @Param('id') id, @Body() value: string) {
	// 	const updateReservation = await (await this.userService.updateReservation(id, value)).reservations;
	// 	return response.status(HttpStatus.OK).json({ updateReservation })
	// }

	// @Delete('/:id')
	// async deleteReservation(@Res() response, @Param('id') id, @Body() value: string) {
	// 	const deleteReservation = await (await this.userService.deleteReservation(id, value)).reservations;
	// 	return response.status(HttpStatus.OK).json({ deleteReservation })
	// }

	@Put('/:id')
	@UseGuards(AuthGuard('jwt'))
	async updateReservation(@Res() response, @Param('id') id, @Body() value: string) {
		const stringID = JSON.stringify(response.req.user._id);
		const stringIDdmde = JSON.stringify(id);
		if ((stringID===stringIDdmde) || (response.req.user.admin === true)) {
			const updateReservation = await (await this.userService.updateReservation(id, value)).reservations;
			return response.status(HttpStatus.OK).json({ updateReservation })
		} else {
			return response.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({"message": "Unauthorized"})
		}
	}

	@Delete('/:id')
	@UseGuards(AuthGuard('jwt'))
	async deleteReservation(@Res() response, @Param('id') id, @Body() value: string) {
		const stringID = JSON.stringify(response.req.user._id);
		const stringIDdmde = JSON.stringify(id);
		if ((stringID===stringIDdmde) || (response.req.user.admin === true)) {
			const deleteReservation = await (await this.userService.deleteReservation(id, value)).reservations;
			return response.status(HttpStatus.OK).json({ deleteReservation })
		} else {
			return response.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({"message": "Unauthorized"})
		}
	}
}
