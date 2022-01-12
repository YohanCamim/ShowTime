import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
// import { User } from "src/schemas/user.schema";
// import { UserDTO } from '../schemas/user.dto';
import { UserService } from "src/services/user.service";
import { GroupeService } from "../services/groupe.service";
import { AuthGuard } from "@nestjs/passport"

@Controller('users/favorites')
export class FavoriteController {
    constructor(
			private readonly userService: UserService,
			private readonly groupeService: GroupeService,
		){}

	// @Get('/:id')
	// async findById(@Res() response, @Param('id') id) {
	// 	const favorite = await (await this.userService.readById(id)).favorites;
	// 	return response.status(HttpStatus.OK).json({ favorite	})
	// }

	// @Put('/:id')
	// async updateFavorite(@Res() response, @Param('id') id, @Body() value: string) {
	// 	const updateFavorite = await (await this.userService.updateFavorite(id, value)).favorites;
	// 	return response.status(HttpStatus.OK).json({ updateFavorite	})
	// }

	// @Delete('/:id')
	// async deleteFavorite(@Res() response, @Param('id') id, @Body() value: string) {
	// 	const deleteFavorite = await (await this.userService.deleteFavorite(id, value)).favorites;
	// 	return response.status(HttpStatus.OK).json({ deleteFavorite	})
	// }

	@Get('/:id')
	async findById(@Res() response, @Param('id') id) {
		const user = await this.userService.readById(id);
		const favorites = await Promise.all(user.favorites.map(favorite_id => {
			return this.groupeService.readById(favorite_id)
		}))
		return response.status(HttpStatus.OK).json({ favorites })
	}

	@Put('/:id')
	@UseGuards(AuthGuard('jwt'))
	async updateFavorite(@Res() response, @Param('id') id, @Body() value: string) {
		const stringID = JSON.stringify(response.req.user._id);
		const stringIDdmde = JSON.stringify(id);
		if ((stringID===stringIDdmde) || (response.req.user.admin === true)) {
			const updateFavorite = await (await this.userService.updateFavorite(id, value)).favorites;
			return response.status(HttpStatus.OK).json({ updateFavorite	})
		} else {
			return response.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({"message": "Unauthorized"})
		}
	}

	@Delete('/:id')
	@UseGuards(AuthGuard('jwt'))
	async deleteFavorite(@Res() response, @Param('id') id, @Body() value: string) {
		const stringID = JSON.stringify(response.req.user._id);
		const stringIDdmde = JSON.stringify(id);
		if ((stringID===stringIDdmde) || (response.req.user.admin === true)) {
			const deleteFavorite = await (await this.userService.deleteFavorite(id, value)).favorites;
			return response.status(HttpStatus.OK).json({ deleteFavorite	})
		} else {
			return response.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({"message": "Unauthorized"})
		}
	}
}
