import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Concert, ConcertDocument } from '../schemas/concert.schema';

@Injectable()
export class ConcertService {
    constructor(@InjectModel(Concert.name) private concertModel: Model<ConcertDocument>) {}

    async create(concert: Concert): Promise<Concert> {
			const newConcert = new this.concertModel({
				...concert,
				created_at: new Date()
			});
			return newConcert.save();
    }

    async readAll(): Promise<Concert[]> {
      return await this.concertModel.find().exec();
    }

    async readById(id): Promise<Concert> {
      return await this.concertModel.findById(id).exec();
    }

    async update(id, concert: Concert): Promise<Concert> {
      return await this.concertModel.findByIdAndUpdate(id, concert, {new: true})
    }

    async delete(id): Promise<any> {
      return await this.concertModel.findByIdAndRemove(id);
    }

    async updateGroup(id: Types.ObjectId, value: String): Promise<Concert> { // example value = { 'id': 50 } ('id' is group_id in db)
			await this.concertModel.updateOne({_id: id}, {$push: {groups: value['id']}})
			return await this.concertModel.findById(id).exec();
    }

		async deleteGroup(id: Types.ObjectId, value: String): Promise<Concert> { // example value = { 'id': 50 } ('id' is group_id in db)
			await this.concertModel.updateOne({_id: id}, {$pull: {groups: value['id']}})
			return await this.concertModel.findById(id).exec();
		}

    async updateGenre(id: Types.ObjectId, value: String): Promise<Concert> { // example value = { 'id': 50 } ('id' is genre_id in db)
			await this.concertModel.updateOne({_id: id}, {$push: {genres: value['id']}})
			return await this.concertModel.findById(id).exec();
    }

		async deleteGenre(id: Types.ObjectId, value: String): Promise<Concert> { // example value = { 'id': 50 } ('id' is genre_id in db)
			await this.concertModel.updateOne({_id: id}, {$pull: {genres: value['id']}})
			return await this.concertModel.findById(id).exec();
		}
}