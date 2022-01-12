import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
// import { User } from "src/schemas/user.schema";
import { UserService } from "src/services/user.service";
import { GroupeService } from "../services/groupe.service";
import { ConcertService } from "../services/concert.service";
import { UserDTO } from "src/schemas/user.dto";
import { AuthGuard } from "@nestjs/passport"

@Controller('users')
export class UserController {
    constructor(
			private readonly userService: UserService,
			private readonly groupeService: GroupeService,
			private readonly concertService: ConcertService,
		){}

  @Get()
	@UseGuards(AuthGuard('jwt'))
	async fetchAll(@Res() response) {
	const respAdmin = response.req.user.admin;
		// console.log(respAdmin);
		if (respAdmin===true) {
			const users = await this.userService.readAll();
			return response.status(HttpStatus.OK).json({ users })
		} else {
			return response.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({"message": "Unauthorized"})
		}
	}

  @Get('/:id')
	@UseGuards(AuthGuard('jwt'))
    async findById(@Res() response, @Param('id') id) {
		const stringID = JSON.stringify(response.req.user._id);
		const stringIDdmde = JSON.stringify(id);
		// console.log(stringID, stringIDdmde);
		if ((stringID===stringIDdmde) || (response.req.user.admin === true)) {
			const user = await this.userService.readById(id);
			// (user as any).favorites = await Promise.all(user.favorites.map(group_id => {
			// 	return (this.groupeService.readById(group_id) as Object)
			// })),
			// (user as any).reservations = await Promise.all(user.reservations.map(reservation_id => {
			// 	return this.concertService.readById(reservation_id)
			// }))
			return response.status(HttpStatus.OK).json({ user	})
		} else {
			return response.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({"message": "Unauthorized"})
		}	
  }

	@Put('/:id')
	@UseGuards(AuthGuard('jwt'))
	async update(@Res() response, @Param('id') id, @Body() UserDTO: UserDTO) {
		const stringID = JSON.stringify(response.req.user._id);
		const stringIDdmde = JSON.stringify(id);
		if ((stringID===stringIDdmde) || (response.req.user.admin === true)) {
			const updatedUser = await this.userService.update(id, UserDTO);
			return response.status(HttpStatus.OK).json({ updatedUser})
		} else {
			return response.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({"message": "Unauthorized"})
		}
	}

	// @Put('/:id')
	// async update(@Res() response, @Param('id') id, @Body() UserDTO: UserDTO) {
	// 	const updatedUser = await this.userService.update(id, UserDTO);
	// 	return response.status(HttpStatus.OK).json({ updatedUser})
	// }

  @Delete('/:id')
	@UseGuards(AuthGuard('jwt'))
	async delete(@Res() response, @Param('id') id) {
	const respAdmin = response.req.user.admin;
		if (respAdmin===true) {
			const deletedUser = await this.userService.delete(id);
			return response.status(HttpStatus.OK).json({ deletedUser })
		} else {
			return response.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({"message": "Unauthorized"})
		}
	}
}

