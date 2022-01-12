import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
// import { User } from "src/schemas/user.schema";
import { UserService } from "src/services/user.service";
import { ConcertService } from "src/services/concert.service";
import { AuthGuard } from "@nestjs/passport"

@Controller('users/wishlist')
export class WishlistController {
    constructor(
			private readonly userService: UserService,
			private readonly concertService: ConcertService,
		){}

	// @Get('/:id')
	// async findById(@Res() response, @Param('id') id) {
	// 	const wishlist = await (await this.userService.readById(id)).wishlist;
	// 	return response.status(HttpStatus.OK).json({ wishlist })
	// }

	@Get('/:id')
	async findById(@Res() response, @Param('id') id) {
		const user = await (await this.userService.readById(id));
		const wishlist = await Promise.all(user.wishlist.map(wishlist_id => {
			return this.concertService.readById(wishlist_id)
		}))
		return response.status(HttpStatus.OK).json({ wishlist })
	}

	// @Put('/:id')
	// async updateWishlist(@Res() response, @Param('id') id, @Body() value: string) {
	// 	const updateWishlist = await (await this.userService.updateWishlist(id, value)).wishlist;
	// 	return response.status(HttpStatus.OK).json({ updateWishlist })
	// }

	// @Delete('/:id')
	// async deleteWishlist(@Res() response, @Param('id') id, @Body() value: string) {
	// 	const deleteWishlist = await (await this.userService.deleteWishlist(id, value)).wishlist;
	// 	return response.status(HttpStatus.OK).json({ deleteWishlist })
	// }

	@Put('/:id')
	@UseGuards(AuthGuard('jwt'))
	async updateWishlist(@Res() response, @Param('id') id, @Body() value: string) {
		const stringID = JSON.stringify(response.req.user._id);
		const stringIDdmde = JSON.stringify(id);
		if ((stringID===stringIDdmde) || (response.req.user.admin === true)) {
			const updateWishlist = await (await this.userService.updateWishlist(id, value)).wishlist;
			return response.status(HttpStatus.OK).json({ updateWishlist })
		} else {
			return response.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({"message": "Unauthorized"})
		}
	}

	@Delete('/:id')
	@UseGuards(AuthGuard('jwt'))
	async deleteWishlist(@Res() response, @Param('id') id, @Body() value: string) {
		const stringID = JSON.stringify(response.req.user._id);
		const stringIDdmde = JSON.stringify(id);
		if ((stringID===stringIDdmde) || (response.req.user.admin === true)) {
			const deleteWishlist = await (await this.userService.deleteWishlist(id, value)).wishlist;
			return response.status(HttpStatus.OK).json({ deleteWishlist })
		} else {
			return response.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION).json({"message": "Unauthorized"})
		}
	}
}
