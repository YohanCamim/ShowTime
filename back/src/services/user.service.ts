import { Injectable, HttpException, HttpStatus, Type } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
// import { User, UserDocument } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { User } from 'src/types/user';
import { RegisterDTO } from 'src/user/register.dto';
import { LoginDTO } from 'src/auth/login.dto';
import { Payload } from 'src/types/payload';
import { UserDTO } from "src/schemas/user.dto";

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private userModel: Model<User>) {}
	// (@InjectModel(User.name) private userModel: Model<UserDocument>)

	async create(RegisterDTO: RegisterDTO) {
    const { email } = RegisterDTO;
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
    }
    const createdUser = new this.userModel(RegisterDTO);
    await createdUser.save();
    return this.sanitizeUser(createdUser);
  }
  async findByPayload(payload: Payload) {
    const { email } = payload;
    return await this.userModel.findOne({ email });
  }
  
  async findByLogin(UserDTO: LoginDTO) {
    const { email, password } = UserDTO;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new HttpException('user doesnt exists', HttpStatus.BAD_REQUEST);
    }
    if (await bcrypt.compare(password, user.password)) {
      return this.sanitizeUser(user)
    } else {
      throw new HttpException('invalid credential', HttpStatus.BAD_REQUEST);
    }
  }
  sanitizeUser(user: User) {
    const sanitized = user.toObject();
    delete sanitized['password'];
    return sanitized;
  }

  async readAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async readById(id: Types.ObjectId): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async update(id, UserDTO: UserDTO): Promise<User> {
    const update = await this.userModel.findByIdAndUpdate(id)
    return await this.userModel.findByIdAndUpdate(id, UserDTO, {new: true})
    }

	// async update(id: Types.ObjectId, user: User): Promise<User> {
	// 	return await this.userModel.findByIdAndUpdate(id, user, {new: true})
	// }

	async updateFavorite(id: Types.ObjectId, value: String): Promise<User> { // example value = { 'id': 50 } ('id' is favorite_id)
		await this.userModel.updateOne({_id: id}, {$push: {favorites: value['id']}})
		return await this.userModel.findById(id).exec();
	}

	async deleteFavorite(id: Types.ObjectId, value: String): Promise<User> { // example value = { 'id': 50 } ('id' is favorite_id)
		await this.userModel.updateOne({_id: id}, {$pull: {favorites: value['id']}})
		return await this.userModel.findById(id).exec();
	}

	async updateReservation(id: Types.ObjectId, value: String): Promise<User> { // example value = { 'id': 50 } ('id' is reservation_id)
		await this.userModel.updateOne({_id: id}, {$push: {reservations: value['id']}})
		return await this.userModel.findById(id).exec();
	}

	async deleteReservation(id: Types.ObjectId, value: String): Promise<User> { // example value = { 'id': 50 } ('id' is reservation_id)
		await this.userModel.updateOne({_id: id}, {$pull: {reservations: value['id']}})
		return await this.userModel.findById(id).exec();
	}

	async updateWishlist(id: Types.ObjectId, value: String): Promise<User> { // example value = { 'id': 50 } ('id' is wishlist_id)
		await this.userModel.updateOne({_id: id}, {$push: {wishlist: value['id']}})
		return await this.userModel.findById(id).exec();
	}

	async deleteWishlist(id: Types.ObjectId, value: String): Promise<User> { // example value = { 'id': 50 } ('id' is wishlist_id)
		await this.userModel.updateOne({_id: id}, {$pull: {wishlist: value['id']}})
		return await this.userModel.findById(id).exec();
	}

	async delete(id: Types.ObjectId): Promise<any> {
		return await this.userModel.findByIdAndRemove(id);
	}
}